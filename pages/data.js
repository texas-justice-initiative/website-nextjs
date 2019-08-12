import React, { Component } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import fetch from 'isomorphic-unfetch';
import FilterPanel from '../components/FilterPanel';
import CheckboxGroup from '../components/CheckboxGroup';
import BarChart from '../components/charts/chartsjs/BarChart';
import DoughnutChart from '../components/charts/chartsjs/DoughnutChart';
import HeroContent from '../components/explore-the-data-page/HeroContent';
import DatasetButtons from '../components/explore-the-data-page/DatasetButtons';
import Datasets from '../data/datasets';

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentDataset: '',
      chartTitle: '',
      datasetDescription: '',
      loadedDatasets: {},
      totalIncidents: '',
      error: null,
    };
  }

  /**
   * Once component has mounted, fetch our initial dataset.
   */
  componentDidMount() {
    this.fetchData('custodialDeaths');
  }

  calculateData = type => {
    // Not sure why type is undefined, or why this function is called twice ???

    if (type) {
      // return only records when the filter value isn't null
      // ##### Filter all data based on user selections

      let removalList = [];
      let records = this.state.loadedDatasets[currentDataset].data.records;

      Object.keys(records).forEach(key => {
        // Iterate through each of the items in data.records
        records[key].filter((value, index) => {
          // Filter based on the values in the user selected options
          if (this.state[key][value] !== null) return true;
          // Add to removalList if
          removalList.push(index);
          return false;
        });
      });

      // Get unique array to remove ie. get rid of duplicates
      removalList = [...new Set(removalList)];
      // console.log(removalList);

      const currentData = {};

      // Remove filtered values from all data
      Object.keys(records).forEach(key => {
        // console.log(key);
        const category = records[key];
        const filteredData = category.filter((val, index) => removalList.indexOf(index) < 0);
        currentData[key] = filteredData;
      });

      // set state to filtered data
      this.setState({ currentData });
      console.log(currentData);
      // console.log('DATA: ', data.records);
    }
  };

  handleCheckboxChange = e => {
    this.calculateData();
    // Get type of checkbox
    const type = e.target.name;
    const value = type === 'year' ? parseInt(e.target.value) : e.target.value;
    const values = [...this.state[type]];

    if (!e.target.checked) {
      if (values.includes(value)) {
        values[values.indexOf(value)] = null;
      }
    } else if (!values.includes(value)) {
      values[this.props.data.meta.lookups[type].indexOf(value)] = value;
    }
    // console.log('VALUES: ', values);
    this.setState({ [type]: values }, () => {
      // calculate dataset after change
      this.calculateData(type);
    });
  };

  /**
   * Function to take in raw JSON and transform any necessary data so that charts.js can process it
   */
  transformData = data => {
    const ageAtTimeOfDeath = data.records.age_at_time_of_death;
    console.log(data);
    // Create age group buckets
    const agesNegativeOrNull = ageAtTimeOfDeath.filter(age => age < 0 || age === undefined || age === null);
    const agesPositiveNotNull = ageAtTimeOfDeath.filter(age => !agesNegativeOrNull.includes(age));
    const ageGroups = {
      'Negative or Null': agesNegativeOrNull.length,
      'Under 18': 0,
      '18 to 29': 0,
      '30 to 39': 0,
      '40 to 49': 0,
      '50 to 59': 0,
      '60 to 69': 0,
      '70 to 79': 0,
      '80 to 89': 0,
      '90 to 99': 0,
      '100 and up': 0,
    };

    agesPositiveNotNull.forEach(age_at_time_of_death => {
      if (age_at_time_of_death < 18) {
        ageGroups['Under 18']++;
      } else if (age_at_time_of_death >= 18 && age_at_time_of_death <= 29) {
        ageGroups['18 to 29']++;
      } else if (age_at_time_of_death >= 30 && age_at_time_of_death <= 39) {
        ageGroups['30 to 39']++;
      } else if (age_at_time_of_death >= 40 && age_at_time_of_death <= 49) {
        ageGroups['40 to 49']++;
      } else if (age_at_time_of_death >= 50 && age_at_time_of_death <= 59) {
        ageGroups['50 to 59']++;
      } else if (age_at_time_of_death >= 60 && age_at_time_of_death <= 69) {
        ageGroups['60 to 69']++;
      } else if (age_at_time_of_death >= 70 && age_at_time_of_death <= 79) {
        ageGroups['70 to 79']++;
      } else if (age_at_time_of_death >= 80 && age_at_time_of_death <= 89) {
        ageGroups['80 to 89']++;
      } else if (age_at_time_of_death >= 90 && age_at_time_of_death <= 99) {
        ageGroups['90 to 99']++;
      } else if (age_at_time_of_death >= 100) {
        ageGroups['100']++;
      }
    });

    data.meta.lookups.age_at_time_of_death = Object.keys(ageGroups);
    data.records.age_at_time_of_death = Object.values(ageGroups);
    console.log(data);
    return data;
  }

  /**
   * Check if we have already loaded the json for the selected dataset and fetch if we haven't.
   * @param {string} datasetName the slug of the dataset to fetch. Should be an id with no spaces, rather than the title.
   */
  fetchData(datasetName) {
    const { currentDataset, loadedDatasets } = this.state;
    const selectedDataset = Datasets[datasetName];

    /**
     * Is this dataset already being displayed? If so, return without doing anything.
     */
    if (currentDataset === datasetName) {
      return;
    }
    /**
     * Has the JSON for this dataset already been pulled?
     * If it has, load it from component state and update this.state.currentDataset
     */
    if (loadedDatasets[datasetName]) {
      this.setState({
        isLoading: false,
        currentDataset: datasetName,
        chartTitle: loadedDatasets[datasetName].title,
        datasetDescription: loadedDatasets[datasetName].description,
        totalIncidents: loadedDatasets[datasetName].data.meta.num_records,
      });
    } else {
      /**
       * If this isn't the already active datatset and we didn't find the data in state,
       * fetch it from the JSON file, load it into component state, and update the active dataset.
       */
      fetch(selectedDataset.urls.compressed)
        .then(response => response.json())
        .then(data => {
          /**
           * Apply any data transformations necessary
           */
          // this.transformData(data);
          /**
           * This will set the initial state for when a new dataset loads (i.e. on page load or button click)
           * Start here when modifying how objects are stored in state to be referenced later.
           */

          this.setState({
            isLoading: false,
            currentDataset: datasetName,
            chartTitle: selectedDataset.chartTitle,
            datasetDescription: selectedDataset.description,
            loadedDatasets: {
              ...loadedDatasets, // Spread operator to ensure we append new datasets
              [datasetName]: {
                name: selectedDataset.name, // dataset.props are loaded from /data/dataset.js
                title: selectedDataset.chartTitle,
                description: selectedDataset.description,
                data, // Loaded from json stored on AWS
              },
            },
            totalIncidents: data.meta.num_records.toLocaleString(),
          });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }

  render() {
    const pageTitle = 'Explore The Data';
    // Destructure our state into something more readable
    const { isLoading, currentDataset, chartTitle, datasetDescription, loadedDatasets, totalIncidents } = this.state;
    const DatasetNames = Object.keys(Datasets);

    /**
     * Setup our chart configurations. This contains objects defining the type and keys of each chart for a specific dataset.
     */
    const chartConfigs = isLoading ? {} : Datasets[currentDataset].chart_configs;
    const data = isLoading ? {} : loadedDatasets[currentDataset].data;
    const meta = isLoading ? {} : data.meta;
    const lookups = isLoading ? {} : meta.lookups;
    const {
      age_at_time_of_death,
      agency_name,
      death_location_county,
      death_location_type,
      manner_of_death,
      means_of_death,
      race,
      sex,
      type_of_custody,
      year,
    } = lookups;

    const charts = isLoading ? (
      <div className="chart chart-container">Loading...</div>
    ) : (
      Object.keys(chartConfigs).map((chartConfig) => (
        <div className="chart chart-container">
          <h3 className="chart__group--label">{chartConfigs[chartConfig].group_by.replace(/_/g, ' ')}</h3>
          <BarChart title="" meta={lookups[chartConfigs[chartConfig].group_by]} metaData={data.records[chartConfigs[chartConfig].group_by]} />
          <div className="chart__title">{chartTitle}</div>
        </div>
      ))
    );

    /**
     * Check if we are still loading data from JSON and setup our HTML accordingly.
     * If loading is complete, display the chart, otherwise display a loading message.
     */
    let datasetHeading;

    switch (currentDataset) {
      case 'custodialDeaths':
        datasetHeading = (
          <h2>
            Since 2005, <span className="text--red">{totalIncidents.toLocaleString()}</span> deaths have been reported in Texas Custody.
          </h2>
        );
        break;
      case 'civiliansShot':
        datasetHeading = (
          <h2>
            Texas law enforcement officers have shot <span className="text--red">{totalIncidents.toLocaleString()} civilians</span> since
            2015.
          </h2>
        );
        break;
      case 'officersShot':
        datasetHeading = (
          <h2>
            There have been <span className="text--red">{totalIncidents.toLocaleString()} Texas law enforcement officers</span> shot
            since 2015.
          </h2>
        );
        break;
      default:
        datasetHeading = <h2>Texas Justice Initiative...loading Custodial Deaths data</h2>;
        break;
    }

    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <FilterPanel>
          <form action="">
            {/* <CheckboxGroup name="year" values={year} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="race" values={race} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="sex" values={sex} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="manner_of_death" values={manner_of_death} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="age_at_time_of_death" values={age_at_time_of_death} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="type_of_custody" values={type_of_custody} handler={this.handleCheckboxChange} />
            <CheckboxGroup
              name="death_location_type"
              values={death_location_type}
              handler={this.handleCheckboxChange}
            />
            <CheckboxGroup name="means_of_death" values={means_of_death} handler={this.handleCheckboxChange} /> */}
          </form>
        </FilterPanel>
        <Main>
          <h1>{pageTitle}</h1>
          <HeroContent />
          <ButtonsContainer>
            {DatasetNames.map(datasetName => (
              <React.Fragment key={datasetName}>
                <ChangeChartButton
                  onClick={this.fetchData.bind(this, datasetName)}
                  className={
                    datasetName === currentDataset
                      ? 'btn btn--primary btn--chart-toggle active'
                      : 'btn btn--primary btn--chart-toggle'
                  }
                >
                  <span className="btn--chart-toggle--icon">
                    <img src={require('../images/' + Datasets[datasetName].icon)} alt={Datasets[datasetName].name} />
                  </span>
                  <span className="btn--chart-toggle--text">{Datasets[datasetName].name}</span>
                </ChangeChartButton>
              </React.Fragment>
            ))}
          </ButtonsContainer>
          <div className="filtered-incidents">{datasetHeading}</div>
          <ChartContainer>{charts}</ChartContainer>
        </Main>
      </React.Fragment>
    );
  }
}

export default Explore;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

const Main = styled.main`
  padding: 1em;
  width: 100%;
  padding-left: calc(1em + 50px);
  z-index: 1;
  @media screen and (min-width: ${props => props.theme.medium}) {
    position: relative;
    padding: 2em 4rem;
    width: calc(100% - 300px);
    flex-grow: 1;
  }
  .filtered-incidents {
    margin: 4rem 0;
    .incident-number {
    color: ${props => props.theme.colors.primaryRed};
  }
`;

const ChartContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  > div {
    margin: 0.5rem;
    padding: 1.5rem 1rem;
    background: ${props => props.theme.colors.grayLightest};
    border: 1px solid ${props => props.theme.colors.grayLight};
  }
  > div.bar-chart {
    width: 600px;
  }
  > div.doughnut-chart {
    max-width: 300px;
  }
  .chart__group--label {
    text-transform: uppercase;
    font-size: 1.5rem;
    text-align: center;
  }
}
`;

const ButtonsContainer = styled.div`
  display: flex;

  .btn--chart-toggle {
    margin-right: 1rem;
  }
`;

const ChangeChartButton = styled.button`
  display: flex !important;
  align-items: center;
  text-align: left !important;
  text-transform: capitalize !important;
  letter-spacing: 1px !important;
  margin: 1rem 0;

  &.active {
    outline: none; /* Don't display border on chrome */
    box-shadow: none;
    background-color: ${props => props.theme.colors.secondaryBlue};
  }

  .btn--chart-toggle--icon {
    margin-right: 1rem;

    img {
      width: 30px;
      height: 30px;
    }
  }

  .btn--chart-toggle--text {
    font-size: ${props => props.theme.sidebarFont__size};
  }
`;
