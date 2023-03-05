import React, { useState, useEffect } from 'react';
import datasets from '../../data/datasets';

export default function useDataset(props) {
    const { dataset } = props;
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState({});

    useEffect(() => {
        const datasetNames = Object.keys(datasets);
        let targetDataset = 0;

        const index = datasetNames.findIndex((name) => name === dataset);
        targetDataset = index !== -1 ? index : 0;

        const selectedDataset = datasetNames[targetDataset];

        const fetchData = async () => {
            try {
                const res = await fetch(datasets[selectedDataset].urls.compressed);

                if ( res.status === 200 ) {
                    console.log('Dataset loaded succesfully.');
                }
                setData(res.json());
                setLoading(false);
            } catch ( error ) {
                console.error('Dataset failed to load.')
            } 
        }
        
        fetchData();
    },[dataset])

    return { loading, data };


/**
   * Check if we have already loaded the json for the selected dataset and fetch if we haven't.
   * @param {string} selectedDataset the slug of the new dataset to fetch. Should be an id with no spaces, rather than the title.
   */
async fetchData() {
    const { isLoading, data, activeDataset } = this.state;
    const { dataset } = this.props;
    const datasetNames = Object.keys(datasets);
    let targetDataset = 0;

    const index = datasetNames.findIndex((name) => name === dataset);
    targetDataset = index !== -1 ? index : 0;

    const selectedDataset = datasetNames[targetDataset];

    // Do nothing if the selected dataset is already active.
    if (activeDataset === selectedDataset) {
      return;
    }

    if (!isLoading) {
      this.setState({ isLoading: true });
    }

    // Have we already fetched this json? If not let's get it, add it to state, and update the active dataset
    // If we don't need to fetch the json again, just update the active dataset
    const existingData = data[selectedDataset] && data[selectedDataset].compressed;
    let newData;
    if (!existingData) {
      const res = await fetch(datasets[selectedDataset].urls.compressed);
      newData = await res.json();
      this.fetchFullData(selectedDataset);
    } else {
      newData = existingData;
    }

    // Finally we want to reset the filters to a fresh state
    // In order to setup our filters object, we need to get each key, along with all options for that key.
    // We can then create our filter object with all filters turned off by default
    const recordKeys = Object.keys(newData.records);

    const filters = {};
    recordKeys.forEach((key) => {
      filters[key] = Object.create(null, {});
      const uniqueRecords = [...new Set(newData.records[key])];
      uniqueRecords.forEach((record) => (filters[key][record] = false));
    });
    this.setState((prevState) => ({
      isLoading: false,
      activeDataset: selectedDataset,
      data: {
        ...prevState.data,
        [selectedDataset]: {
          ...prevState.data[selectedDataset],
          compressed: newData,
        },
      },
      filters,
    }));
  }
}