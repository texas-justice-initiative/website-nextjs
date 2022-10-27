/* eslint-disable react/no-danger */

import React from 'react';
import { NextSeo } from 'next-seo';

import S3 from 'aws-sdk/clients/s3';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Sidebar from '../components/Sidebar';
import Primary from '../components/Primary';
import Layout from '../components/Layout';

import TCJSReportSchema from '../schema/tcjs-reports';

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

function Page({ data }) {
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

  // Desconstruct our file path to extract some useful data from each report
  const reformedData = items.map(item => {
    const itemPath = item.Key.split('/');
    return {
      type: itemPath[0] ? itemPath[0] : null,
      year: itemPath[1] ? itemPath[1] : null,
      fileName: itemPath[2] ? itemPath[2] : null,
      ...item,
    };
  });

  const filteredData = reformedData.filter(item => years.indexOf(parseInt(item.year)) !== -1);

  // Create a sorted array of all available report years
  const availableYears = [...new Set(reformedData.map(dataItem => parseInt(dataItem.year)))].sort((a, b) => a - b);

  // Create an array to help loop through each report type
  // const reportTypes = Object.keys(TCJSReportSchema);

  return (
    <React.Fragment>
      <NextSeo title="S3 Fetch Test" />
      <Layout>
        <Primary>
          <h1>Downloadable Reports</h1>
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
                  MenuProps={MenuProps}
                >
                  {availableYears.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {filteredData.length > 0 && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <span style={{ fontWeight: '600' }}>Report Type</span>
                      </TableCell>
                      <TableCell align="right">
                        <span style={{ fontWeight: '600' }}>Year</span>
                      </TableCell>
                      <TableCell align="right">
                        <span style={{ fontWeight: '600' }}>Filename</span>
                      </TableCell>
                      <TableCell align="right">
                        <span style={{ fontWeight: '600' }}>Actions</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map(row => (
                      <TableRow key={row.fileName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {TCJSReportSchema[row.type].label}
                        </TableCell>
                        <TableCell align="right">{row.year}</TableCell>
                        <TableCell align="right">{row.fileName}</TableCell>
                        <TableCell align="right">
                          <a href={`https://tcjs-reports.s3.amazonaws.com/${row.Key}`} target="_blank" rel="noreferrer">
                            Download
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Content>
        </Primary>
        <Sidebar />
      </Layout>
    </React.Fragment>
  );
}

export default Page;

Page.propTypes = {
  data: PropTypes.string,
};

export async function getServerSideProps() {
  const newS3 = new S3({
    region: 'us-east-1',
    accessKeyId: process.env.TJI_AWS_ACCESS_KEY,
    secretAccessKey: process.env.TJI_AWS_SECRET_KEY,
    signatureVersion: 'v4',
  });

  const res = await new Promise((resolve, reject) => {
    newS3.listObjectsV2(params, function(err, data) {
      if (err) reject(err, err.stack);
      resolve(data);
    });
  });

  return {
    props: { data: JSON.stringify(res.Contents) },
  };
}

const Content = styled.div`
  li {
    margin: 1em 0;
  }
`;
