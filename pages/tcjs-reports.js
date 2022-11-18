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
import Sidebar from '../components/Sidebar';
import Primary from '../components/Primary';
import Layout from '../components/Layout';

import s3 from '../components/utils/aws/s3';
import TCJSReportSchema from '../schema/tcjs-reports';
import EnhancedTable from '../components/EnhancedTable';

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
    s3.listObjectsV2(params, function(err, data) {
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

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setYears(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const items = JSON.parse(data);
  const rows = [];

  // Desconstruct our file path to extract some useful data from each report
  const reformedData = items.map(item => {
    const itemPath = item.Key.split('/');

    rows.push(createData(TCJSReportSchema[itemPath[0]].label, itemPath[1], itemPath[2], item.Key));

    return {
      type: itemPath[0] ? itemPath[0] : null,
      year: itemPath[1] ? itemPath[1] : null,
      fileName: itemPath[2] ? itemPath[2] : null,
      ...item,
    };
  });

  const filteredData = rows.filter(item => years.indexOf(parseInt(item.year)) !== -1);
  const availableYears = [...new Set(reformedData.map(dataItem => parseInt(dataItem.year)))].sort((a, b) => b - a);

  return (
    <React.Fragment>
      <NextSeo title="TCJS Reports" />
      <Layout>
        <Primary>
          <h1>TCJS Reports</h1>
          <Content>
            <div style={{ marginBlock: '24px' }}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Available Years</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={years}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  renderValue={selectedYear => selectedYear.join(', ')}
                  MenuProps={MenuProps}
                >
                  {availableYears.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={years.indexOf(name) > -1} />
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {filteredData.length > 0 && <EnhancedTable headCells={headCells} rows={filteredData} />}
          </Content>
        </Primary>
        <Sidebar />
      </Layout>
    </React.Fragment>
  );
}

Page.propTypes = {
  data: PropTypes.string.isRequired,
};
