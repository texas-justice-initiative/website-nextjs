'use client';

import React from 'react';
import useDataset from '@/hooks/use-dataset';
import Link from 'next/link';
import { useState } from 'react';
import datasets from '@/data/datasets';
import BarChart from '@/components/charts/chartsjs/BarChart';
import ChartNote from '@/components/charts/chartsjs/ChartNote';
import theme from '../../theme';
import styles from './MultiChart.module.css';

export default function MultiChart() {
  const [dataset, setDataset] = useState(datasets['custodial-deaths'].slug);
  const { loading, data } = useDataset(dataset);

  // Setup our lookups
  const chartConfigs = datasets[dataset]?.chart_configs;
  const recordKeys = data ? Object.keys(data.records) : [];
  const totalIncidents = data ? data.records[recordKeys[0]].length : 0;
  const allUniqueRecords = data
    ? [...new Set(data.records[recordKeys[0]])]
    : [];

  // todo: This can be done much better
  let h1;

  switch (dataset) {
    case 'custodial-deaths':
      h1 = (
        <h1>
          Since 2005,{' '}
          <span className="text--red">{totalIncidents.toLocaleString()}</span>{' '}
          people have died in the custody of Texas law enforcement, based on
          state-mandated reports.
        </h1>
      );
      break;
    case 'civilians-shot':
      h1 = (
        <h1>
          Since Sept. 2015, Texas peace officers have shot{' '}
          <span className="text--red">{totalIncidents?.toLocaleString()}</span>{' '}
          people, based on state-mandated reports.
        </h1>
      );
      break;
    case 'officers-shot':
      h1 = (
        <h1>
          Since Sept. 2015,{' '}
          <span className="text--red">{totalIncidents?.toLocaleString()}</span>{' '}
          Texas peace officers have been shot, based on state-mandated reports.
        </h1>
      );
      break;
    default:
      h1 = (
        <h1>
          Since 2005,{' '}
          <span className="text--red">{totalIncidents?.toLocaleString()}</span>{' '}
          people have died in the custody of Texas law enforcement, based on
          state-mandated reports.
        </h1>
      );
      break;
  }

  return (
    <div className={styles.multichart}>
      <div className={styles['multichart__wrapper']}>
        <div className={styles['multichart__left']}>
          <div className="chartContainer bar-chart bar-chart--container">
            <h3 className="bar-chart__title">{datasets[dataset].name}</h3>
            {!loading ? (
              <React.Fragment>
                <BarChart
                  title=""
                  recordKeys={allUniqueRecords}
                  records={data.records.year}
                  theme={theme}
                  incompleteYears={chartConfigs[0].incompleteYears}
                />
                {chartConfigs[0].note && (
                  <ChartNote note={chartConfigs[0].note} />
                )}
              </React.Fragment>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className={styles['multichart__right']}>
          {Object.keys(datasets).map((datasetName) => (
            <button
              key={datasetName}
              onClick={() => setDataset(datasetName)}
              className={
                datasetName === dataset
                  ? 'btn btn--primary btn--chart-toggle active'
                  : 'btn btn--primary btn--chart-toggle'
              }
            >
              <span className="btn--chart-toggle--text">
                {datasets[datasetName].name}
              </span>
            </button>
          ))}
        </div>
        <br />
        <div className={styles['multichart__heading']}>{h1}</div>
        <div className={styles['multichart__callout']}>
          <span className={styles['multichart__callout-text']}>
            Want to learn more?
          </span>
          <Link href="/data" className="btn btn--primary">
            Explore the Data
          </Link>
        </div>
      </div>
    </div>
  );
}
