import React, { useState, useEffect } from 'react';
import DeathReportsChart from '../components/DeathReportsChart';
import Sidebar from '../components/Sidebar';
import Primary from '../components/Primary';
import Layout from '../components/Layout';
import { NextSeo } from 'next-seo';
import content from '../content/cdr_summaries.md';
import { getPublicDataObjectUrl, PUBLIC_DATA_URLS } from '../lib/publicData';

const {
  html,
  attributes: { title },
} = content;

const CDR_SUMMARIES_URL = getPublicDataObjectUrl(
  PUBLIC_DATA_URLS.custodialReports,
  'json/cdr_summaries_long.json'
);

export const fetchCdrSummaries = async () => {
  const response = await fetch(CDR_SUMMARIES_URL);

  if (!response.ok) {
    throw new Error(
      `Could not load custodial death summaries (${response.status})`
    );
  }

  return response.json();
};

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCdrSummaries();
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
