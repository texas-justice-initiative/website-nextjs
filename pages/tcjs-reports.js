import * as React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import markdownToTxt from 'markdown-to-txt';
import Sidebar from '../components/Sidebar';
import Primary from '../components/Primary';
import Layout from '../components/Layout';
import s3 from '../components/utils/aws/s3';
import TCJSReportSchema from '../schema/tcjs-reports';
import EnhancedTable from '../components/EnhancedTable';
import content from '../content/tcjs_reports.md';
import Accordion from '../components/Accordion';

const {
  html,
  attributes: { title, reports },
} = content;

function prepareReadmeText(rawReports) {
  let fullText = 'Texas Justice Initiative\n';
  fullText += 'https://texasjusticeinitiative.org\n\n';

  rawReports.forEach((report) => {
    fullText += `${report.title}\n`;
    fullText += '-';
    fullText += markdownToTxt(report.description);
    fullText += markdownToTxt('---');
  });

  return fullText;
}

const params = {
  Bucket: 'tcjs-reports' /* required */,
  //   ContinuationToken: 'STRING_VALUE',
  //   Delimiter: 'STRING_VALUE',
  //   EncodingType: url,
  //   ExpectedBucketOwner: 'STRING_VALUE',
  //   FetchOwner: true || false,
  //   MaxKeys: 2,
  //   Prefix: 'STRING_VALUE',
  //   RequestPayer: requester,
  //   StartAfter: 'STRING_VALUE'
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function createData(type, year, filename, Key) {
  return {
    type,
    year,
    filename,
    Key,
  };
}

const headCells = [
  {
    id: 'type',
    numeric: false,
    disablePadding: true,
    label: 'Report Type',
  },
  {
    id: 'year',
    numeric: false,
    disablePadding: true,
    label: 'Year',
  },
  {
    id: 'filename',
    numeric: false,
    disablePadding: true,
    label: 'Filename',
  },
  {
    id: 'url',
    numeric: false,
    disablePadding: true,
    label: 'Download',
  },
];

const Content = styled.div`
  li {
    margin: 1em 0;
  }
`;

export async function getServerSideProps() {
  const res = await new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) reject(err, err.stack);
      resolve(data);
    });
  });

  return {
    props: { data: JSON.stringify(res.Contents) },
  };
}

export default function Page({ data }) {
  const [years, setYears] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setYears(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const reportsForAccordion = reports.map((report) => ({
    title: report.report_title,
    description: report.report_description,
  }));

  const generatePDFZip = (selectedReports) => {
    const zip = new JSZip();

    const readmeText = prepareReadmeText(reportsForAccordion);

    zip.file('README', markdownToTxt(readmeText));

    const reportsFolder = zip.folder('reports');
    let count = 0;

    selectedReports.forEach((report) => {
      const filename = report.substr(report.lastIndexOf('/') + 1);
      const url = `https://tcjs-reports.s3.amazonaws.com/${report}`;

      JSZipUtils.getBinaryContent(url, (err, fileData) => {
        if (err) {
          throw err; // handle the error
        }
        reportsFolder.file(filename, fileData, { binary: true });
        count += 1;

        if (count === selectedReports.length) {
          zip.generateAsync({ type: 'blob' }).then((body) => {
            saveAs(body, 'tcjs_reports.zip');
          });
        }
      });
    });
  };

  const items = JSON.parse(data);
  const rows = [];

  // Desconstruct our file path to extract some useful data from each report
  const reformedData = items.map((item) => {
    const itemPath = item.Key.split('/');

    rows.push(createData(TCJSReportSchema[itemPath[0]].label, itemPath[1], itemPath[2], item.Key));

    return {
      type: itemPath[0] ? itemPath[0] : null,
      year: itemPath[1] ? itemPath[1] : null,
      fileName: itemPath[2] ? itemPath[2] : null,
      ...item,
    };
  });

  const filteredData = rows.filter((item) => years.indexOf(parseInt(item.year)) !== -1);
  const availableYears = [...new Set(reformedData.map((dataItem) => parseInt(dataItem.year)))].sort((a, b) => b - a);

  return (
    <>
      <NextSeo title={title} />
      <Layout>
        <Primary>
          <h1>{title}</h1>
          {/* eslint-disable-next-line react/no-danger */}
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
          <Accordion items={reportsForAccordion} />
          <Content>
            <div style={{ marginBlock: '48px' }}>
              <h2>Available Reports</h2>
              <p>To download reports, start be selecting a year or group of years.</p>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Available Years</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={years}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  renderValue={(selectedYear) => selectedYear.join(', ')}
                  MenuProps={MenuProps}
                >
                  {availableYears.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={years.indexOf(name) > -1} />
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {filteredData.length > 0 && (
              <EnhancedTable headCells={headCells} rows={filteredData} handleSelected={generatePDFZip} />
            )}
          </Content>
        </Primary>
        <Sidebar />
      </Layout>
    </>
  );
}

Page.propTypes = {
  data: PropTypes.string.isRequired,
};
