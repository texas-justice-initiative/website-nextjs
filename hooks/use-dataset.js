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
      } else {
        throw new Error('Failed to retrieve dataset.', datasets[selectedDataset].urls.compressed);
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

    try {
      fetchData();
    } catch (error) {
      throw new Error('Dataset failed to load.', error);
    }

    fetchFullData();
  }, [dataset]);

  /**
   * Updates state whenever a filter is changed
   */
  function handleFilters(event) {
    const { target } = event;
    const group = target.name;
    const key = group === 'year' ? parseInt(target.value) : target.value;
    const isChecked = target.checked;

    setFilters({
      ...filters,
      [group]: {
        ...filters[group],
        [key]: isChecked,
      },
    });
  }

  // TODO: this is currently not working, needs to be reworked with all filter functionality
  function handleAutocompleteSelection(event) {
    const { target } = event;
    const group = target.name;
    const key = target.value;
    const newFilters = filters;
    const allGroupFiltersAreChecked = !Object.values(filters[group]).includes(false);

    if (allGroupFiltersAreChecked) {
      Object.keys(newFilters[group]).forEach((groupKey) => {
        newFilters[group][groupKey] = false;
      });
    }

    newFilters[group][key] = true;

    setFilters(newFilters);
  }

  function handleFilterGroup(event) {
    const { groupName, isChecked } = event;
    const filterGroup = filters[groupName];
    for (const key in filterGroup) {
      filterGroup[key] = isChecked;
    }

    setFilters({
      ...filters,
      [groupName]: filterGroup,
    });
  }

  return {
    loading,
    data,
    fullData,
    filters,
    handleFilters,
    handleFilterGroup,
    handleAutocompleteSelection,
  };
}
