import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import datasets from '../data/datasets';

export default function useDataset(dataset) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [fullData, setFullData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const datasetNames = Object.keys(datasets);
    let targetDataset = 0;

    const index = datasetNames.findIndex((name) => name === dataset);
    targetDataset = index !== -1 ? index : 0;

    const selectedDataset = datasetNames[targetDataset];

    const fetchData = async () => {
      try {
        const response = await fetch(datasets[selectedDataset].urls.compressed);
        const s3Data = await response.json();

        if (response.ok) {
          const recordKeys = Object.keys(s3Data?.records);
          const newFilters = {};

          recordKeys.forEach((key) => {
            newFilters[key] = Object.create(null, {});
            const uniqueRecords = [...new Set(s3Data?.records[key])];
            uniqueRecords.forEach((record) => (newFilters[key][record] = false));
          });

          setData(s3Data);
          setFilters(newFilters);
          setLoading(false);
        }
      } catch (error) {
        console.error('Dataset failed to load.', error);
      }
    };

    const fetchFullData = async () => {
      Papa.parse(datasets[selectedDataset].urls.full, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setFullData(results.data);
        },
      });
    };

    fetchData();
    fetchFullData();
  }, [dataset]);

  return { loading, data, fullData, filters, setFilters };
}
