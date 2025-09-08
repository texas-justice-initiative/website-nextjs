import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import DeathReportsChart from '../components/DeathReportsChart';
import Sidebar from '../components/Sidebar';
import Primary from '../components/Primary';
import Layout from '../components/Layout';
import { NextSeo } from 'next-seo';
import content from '../content/cdr_summaries.md';
import s3 from '../components/utils/aws/s3';

const {
  html,
  attributes: { title },
} = content;

const s3_client = s3();

export const fetchDataFromS3 = async (bucketName, key) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    const response = await s3_client.getObject(params).promise();
    const data = JSON.parse(response.Body.toString('utf-8'));
    return data;
  } catch (error) {
    console.error('Error fetching data from S3:', error);
    throw error;
  }
};

export const getCachedData = (key) => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
};

export const setCachedData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataWithCache = async (bucketName, key) => {
  const cacheKey = `s3-${bucketName}-${key}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    console.log('Using cached data');
    return cachedData;
  }

  console.log('Fetching fresh data from S3');
  const freshData = await fetchDataFromS3(bucketName, key);
  setCachedData(cacheKey, freshData);
  return freshData;
};

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bucketName = 'custodial-death-reports';
        const key = 'json/cdr_summaries_long.json';
        const result = await getDataWithCache(bucketName, key);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <NextSeo title={title} />
      <Layout>
        <Primary>
          <h1>{title}</h1>
          {/* eslint-disable-next-line react/no-danger */}
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
          <div>
            {data.length > 0 ? (
              <DeathReportsChart data={data} />
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </Primary>
        <Sidebar />
      </Layout>
    </>
  );
}
