/* eslint-disable react/no-danger */

import React from 'react';
import { NextSeo } from 'next-seo';

import S3 from 'aws-sdk/clients/s3';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Paper, Stack } from '@mui/material';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';

import RangeSlider from '../components/RangeSlider';

import TCJSReportSchema from '../schema/tcjs-reports';

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

  // Create a sorted array of all available report years
  const availableYears = [...new Set(reformedData.map(dataItem => parseInt(dataItem.year)))].sort((a, b) => a - b);

  // Create an array to help loop through each report type
  const reportTypes = Object.keys(TCJSReportSchema);

  console.log(reformedData);
  return (
    <React.Fragment>
      <NextSeo title="S3 Fetch Test" />
      <Layout>
        <Primary>
          <h1>S3 Fetch Test</h1>
          <Content>
            {reportTypes && (
              <Stack>
                {reportTypes.map(report => (
                  <Paper elevation={1} style={{ marginBottom: '32px', padding: '24px' }}>
                    <h2 style={{ fontSize: '24px' }}>{TCJSReportSchema[report].label}</h2>
                  </Paper>
                ))}
              </Stack>
            )}
            <RangeSlider range={availableYears} />
            {items.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <span>Select a report to download:</span>
                <select style={{ maxWidth: '250px', marginLeft: '16px' }}>
                  {items.map((item, index) => (
                    <option value={item.Key} key={index}>
                      {item.Key}
                    </option>
                  ))}
                </select>
              </div>
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
