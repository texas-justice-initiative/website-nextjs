import React, { Component } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import datasets from '../data/datasets_test';

/*
const datasets = [
  'https://api.myjson.com/bins/v7ajb',
  'https://api.myjson.com/bins/uwkqf',
  'https://api.myjson.com/bins/19bhaf',
];
*/

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDataset: 0,
      data: this.props.data,
      filters: {},
    }
  }

  render() {
    const { race, sex, year } = this.props.data.records;
    const lookups = Object.keys(this.props.data.records);

    let lookupOptions = {};

    lookups.forEach(lookup => (lookupOptions[lookup] = [...new Set(this.props.data.records[lookup])]));
    console.log(lookupOptions);

    return (
      <React.Fragment>
        <ul>
          {race.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <ul>
          {sex.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <ul>
          {year.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

Explore.getInitialProps = async function() {
  // Setup an array to get the property name of each dataset
  const datasetNames = Object.keys(datasets);
  // Fetch the json for the first dataset
  const res = await fetch(datasets[datasetNames[0]].urls.compressed);
  const data = await res.json();
  return { data }
}

export default Explore;