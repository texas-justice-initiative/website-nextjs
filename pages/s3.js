/* eslint-disable react/no-danger */

import React from 'react';
import { NextSeo } from 'next-seo';
import S3 from 'aws-sdk/clients/s3';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';

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
  return (
    <React.Fragment>
      <NextSeo title="S3 Fetch Test" />
      <Layout>
        <Primary>
          <h1>S3 Fetch Test</h1>
          <Content>
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
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
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
