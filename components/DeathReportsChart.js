// TODO
// add verbiage
// add donate link/contact
// make table more pretty
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import Button from '../components/Button/Button';
import s3 from '../components/utils/aws/s3';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormHelperText,
  Typography,
  Slider,
  ButtonGroup,
  FormLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import markdownToTxt from 'markdown-to-txt';

Chart.register(...registerables);

const s3_client = s3();

const options = {
  maintainAspectRatio: false,
  title: {
    display: false,
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
    },
  },
  scales: {
    y: {
      min: 0,
    },
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 20,
      bottom: 20,
    },
  },
};

function prepareReadmeText() {
  let fullText = 'Texas Justice Initiative\n';
  fullText += 'https://texasjusticeinitiative.org\n\n';

  // rawReports.forEach((report) => {
  //   fullText += `${report.title}\n`;
  //   fullText += '-';
  //   fullText += markdownToTxt(report.description);
  //   fullText += markdownToTxt('---');
  // });

  return fullText;
}

export const getPdfUrl = async (bucket, key) => {
  try {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    const url = s3_client.getSignedUrl('getObject', params);
    return url;
  } catch (error) {
    console.error('Error getting PDF URL:', error);
    throw error;
  }
};

const DeathReportsChart = ({ data }) => {
  const defaultStartDate = new Date(2025, 0, 1).toISOString().split('T')[0];
  const defaultEndDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  )
    .toISOString()
    .split('T')[0];
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCustodyDuration, setSelectedCustodyDuration] = useState('all');
  const [selectedCustody, setSelectedCustody] = useState('all');
  const [selectedWordCount, setSelectedWordCount] = useState('all');
  const [summarySearchTerm, setSummarySearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([
    new Date(defaultStartDate),
    new Date(defaultEndDate),
  ]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let result = data;

    if (selectedCustodyDuration !== 'all') {
      result = result.filter(
        (item) => item.duration_in_custody_category === selectedCustodyDuration
      );
    }

    if (selectedCustody !== 'all') {
      result = result.filter(
        (item) => item.cleaned_custody_type === selectedCustody
      );
    }

    if (selectedWordCount !== 'all') {
      result = result.filter(
        (item) => item.summary_word_count_category === selectedWordCount
      );
    }

    if (summarySearchTerm) {
      const searchTerms = summarySearchTerm.toLowerCase().split(',');
      result = result.filter((item) =>
        searchTerms.some((term) => item.words && item.words.includes(term))
      );
    }

    if (dateRange[0] || dateRange[1]) {
      result = result.filter((item) => {
        const incidentDate = new Date(item.death_datetime_dt);
        return incidentDate >= dateRange[0] && incidentDate <= dateRange[1];
      });
    }

    setFilteredData(result);
  }, [
    selectedCustodyDuration,
    selectedCustody,
    selectedWordCount,
    summarySearchTerm,
    dateRange,
    data,
  ]);

  const custodyDurations = Array.from(
    new Set(data.map((item) => item.duration_in_custody_category))
  );

  const custodyTypes = Array.from(
    new Set(data.map((item) => item.cleaned_custody_type))
  );

  const wordCountCategories = Array.from(
    new Set(data.map((item) => item.summary_word_count_category))
  );

  // Get min and max dates from the data for the slider
  const allDates = data.map((item) => new Date(item.death_datetime_dt));
  const minDate = new Date(Math.min(...allDates.map((date) => date.getTime())));
  const maxDate = new Date(Math.max(...allDates.map((date) => date.getTime())));

  // Format dates for display
  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  // Group data by month
  const groupedData = filteredData.reduce((acc, item) => {
    const incidentDate = new Date(item.death_datetime_dt);
    const year = incidentDate.getFullYear();
    const month = incidentDate.getMonth(); // Months are zero-based (0-11)
    const monthKey = `${year}-${month.toString().padStart(2, '0')}`;

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        dates: [],
        cdrNumbers: [],
      };
    }

    acc[monthKey].dates.push(incidentDate.toISOString().split('T')[0]);
    acc[monthKey].cdrNumbers.push(item.cdr_number);

    return acc;
  }, {});
  const chartData = {
    labels: Object.values(groupedData)
      .sort((a, b) => new Date(a.dates[0]) - new Date(b.dates[0]))
      .map((item) => {
        const date = new Date(item.dates[0]);
        return `${date.toLocaleString('default', {
          month: 'short',
        })} ${date.getFullYear()}`;
      }),
    datasets: [
      {
        label: 'Number of Incidents',
        data: Object.values(groupedData)
          .sort((a, b) => new Date(a.dates[0]) - new Date(b.dates[0]))
          .map((item) => item.cdrNumbers.length),
        background: '#04405B',
        tension: 0.1,
      },
    ],
  };

  const handleDownload = async (event) => {
    event.preventDefault();
    const zip = new JSZip();

    const selectedReports = filteredData
      .slice(0, 50)
      .map((item) => item.s3_pdf_uri);
    let count = 0;

    // add README with disclaimer
    const readmeText = prepareReadmeText();

    zip.file('README', markdownToTxt(readmeText));

    // create CSV of data
    const dataset = JSON.stringify(filteredData, null, 2);
    const headers = [
      'cdr_number',
      'report_date',
      'death_datetime_dt',
      'duration_in_custody_category',
      'age_at_death_category',
      'cleaned_custody_type',
      'summary_word_count_category',
    ];
    const csvRows = [];

    // Add headers to CSV
    csvRows.push(headers.join(','));

    // Add data rows to CSV
    filteredData.forEach((item) => {
      const values = headers.map((header) => {
        const escapedValue = String(item[header]).replace(/"/g, '\\"');
        return `"${escapedValue}"`;
      });
      csvRows.push(values.join(','));
    });
    const csvString = csvRows.join('\n');

    // TODO: better naming here
    zip.file('raw_data.csv', csvString);

    selectedReports.forEach(async (report) => {
      const bucket = report.split('/')[0];
      const key = report.substr(report.indexOf('/') + 1);
      const filename = report.substr(report.lastIndexOf('/') + 1);

      const url = await getPdfUrl(bucket, key);
      console.log(url);

      JSZipUtils.getBinaryContent(url, (err, fileData) => {
        if (err) {
          throw err; // handle the error
        }

        zip.file(filename, fileData, { binary: true });
        count += 1;

        if (count === selectedReports.length) {
          zip.generateAsync({ type: 'blob' }).then((body) => {
            //TODO: create more dynamic name
            saveAs(body, 'cdr_reports.zip');
          });
        }
      });
    });
    handleClose();
  };

  // Handle date range change
  const handleDateRangeChange = (event, newValue) => {
    setDateRange(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box>
          <h4>Filter summary data</h4>
        </Box>
        <Box sx={{ minWidth: 200, gap: 5, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Date Range
          </Typography>
          <Slider
            value={dateRange}
            onChange={handleDateRangeChange}
            valueLabelDisplay="auto"
            min={minDate.getTime()}
            max={maxDate.getTime()}
            valueLabelFormat={(value) => formatDate(new Date(value))}
            getAriaValueText={(value) => formatDate(new Date(value))}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="h6">{formatDate(minDate)}</Typography>
            <Typography variant="h6">{formatDate(maxDate)}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, mb: 4 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <FormLabel sx={{ mb: 1 }}>
              <Typography variant="h6">Custody Duration</Typography>
            </FormLabel>
            <Select
              id="cause-filter"
              value={selectedCustodyDuration}
              onChange={(e) => setSelectedCustodyDuration(e.target.value)}
            >
              <MenuItem value="all">All Durations</MenuItem>
              {custodyDurations.map((cause) => (
                <MenuItem key={cause} value={cause}>
                  {cause}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText id="custody-duration">
              The amount of time the decedent was in custody
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <FormLabel sx={{ mb: 1 }}>
              <Typography variant="h6">Custody Type</Typography>
            </FormLabel>
            <Select
              id="custody-filter"
              value={selectedCustody}
              onChange={(e) => setSelectedCustody(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              {custodyTypes.map((cause) => (
                <MenuItem key={cause} value={cause}>
                  {cause}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText id="custody-type">
              Type of custody (Jail, Prison, Pre-custodial, etc.)
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <FormLabel sx={{ mb: 1 }}>
              <Typography variant="h6">Word Count Range</Typography>
            </FormLabel>
            <Select
              id="word-count-filter"
              value={selectedWordCount}
              onChange={(e) => setSelectedWordCount(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              {wordCountCategories.map((cause) => (
                <MenuItem key={cause} value={cause}>
                  {cause}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText id="word-count-type">
              Number of words in incident summary
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <h5>
            Enter comma-separated search terms or select a group of
            frequently-occurring keywords
          </h5>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 5,
            mt: 2,
          }}
        >
          <TextField
            id="summary-search"
            variant="outlined"
            value={summarySearchTerm}
            onChange={(e) => setSummarySearchTerm(e.target.value)}
            sx={{ minWidth: 200 }}
          />
          <ButtonGroup
            sx={{ gap: 2 }}
            variant="text"
            aria-label="Common keyword searches"
          >
            <Button onClick={() => setSummarySearchTerm('vehicle,car')}>
              Vehicle
            </Button>
            <Button
              onClick={() =>
                setSummarySearchTerm(
                  'drug,drugs,meth,fentanyl,cocaine,overdose'
                )
              }
            >
              Drugs
            </Button>
            <Button
              onClick={() => setSummarySearchTerm('suicide,hanging,hang')}
            >
              Suicide
            </Button>
            <Button
              onClick={() => setSummarySearchTerm('covid,covid-19,coronavirus')}
            >
              COVID-19
            </Button>
          </ButtonGroup>
        </Box>

        <Box sx={{ height: 400, width: '100%', mb: 4 }}>
          <Bar data={chartData} options={options} />
        </Box>
        <Box sx={{ height: 200, width: '100%', mb: 4 }}>
          <h4>Download Report PDFs</h4>
          <p>
            We only allow downloads of 50 CDR reports at a time. If you require
            a larger dataset, please{' '}
            <a href="https://texasjusticeinitiative.org/contact">reach out</a>{' '}
            to discuss collaboration opportunities.
          </p>

          <Button
            onClick={handleClickOpen}
            disabled={filteredData.length === 0}
          >
            Download Report PDFs
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            sx={{ justifyContent: 'right' }}
          >
            <DialogContent sx={{ paddingBottom: 0 }}>
              <IconButton
                aria-label="cancel"
                size="large"
                onClick={handleClose}
              >
                <CancelIcon fontSize="large" />
              </IconButton>
              <DialogContentText variant="h5">
                If you use TJI’s data, you must give TJI credit and adhere to
                TJI’s{' '}
                <a
                  href="https://github.com/texas-justice-initiative/data-processing/blob/master/DataUsageAgreement.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Data Access License Terms
                </a>
                . Pursuant to the License, you must always link back to the
                original TJI data set. Further, if you use the data set, please
                tag us on social media when referring to data retrieved from
                this site.
              </DialogContentText>
              <form onSubmit={handleDownload}>
                <DialogActions>
                  <Button type="submit">Accept & Download</Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </Box>
        <Box sx={{ height: 500, width: '100%', mb: 4 }}>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 450, overflow: 'auto' }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Report Date/Time</TableCell>
                  <TableCell>Death Date/Time</TableCell>
                  <TableCell>CDR Number</TableCell>
                  <TableCell>Custody Type</TableCell>
                  <TableCell>Summary Word Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.cdr_number}>
                    <TableCell>{item.report_date}</TableCell>
                    <TableCell>{item.death_datetime_dt}</TableCell>
                    <TableCell>{item.cdr_number}</TableCell>
                    <TableCell>{item.cleaned_custody_type}</TableCell>
                    <TableCell>{item.summary_word_count_category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default DeathReportsChart;
