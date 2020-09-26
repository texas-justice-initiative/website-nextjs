/* eslint-disable react/no-danger */

import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Card from '../components/Card';

const title = 'Dynamic Data sets';

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <p>View our collection of dynamic data sets which allow you to interact directly with the data we provide.</p>
        <Grid>
          <Card
            thumbnail="texas-covid-deaths.png"
            title="COVID-19 fatalities in Texas prisons and jails"
            excerpt="The Texas Justice Initiative is tracking deaths of individuals related to the novel coronavirus in local, state and federal jails in prisons."
            layout="featured"
            link="/publications/covid-deaths-in-texas"
          />
          <Card
            thumbnail="pre-conviction-deaths-in-texas.png"
            title="Pre-trial deaths in Texas jails"
            excerpt="An interactive dashboard updated monthly with data on individuals who die in Texas county jails before going to trial."
            link="/publications/pre-conviction-deaths-in-texas-jails/"
          />
          <Card
            thumbnail="explore-the-data.png"
            title="Explore Our datasets"
            excerpt="Explore Texas shootings of and by law enforcement, as well as custodial deaths in Texas through interactive charts."
            link="/data"
          />
          <Card
            thumbnail="pre-conviction-deaths-in-texas.png"
            title="Pre-trial deaths in Texas jails"
            excerpt="An interactive dashboard updated monthly with data on individuals who die in Texas county jails before going to trial."
            link="/publications/pre-conviction-deaths-in-texas-jails/"
          />
          <Card
            thumbnail="explore-the-data.png"
            title="Explore Our datasets"
            excerpt="Explore Texas shootings of and by law enforcement, as well as custodial deaths in Texas through interactive charts."
            link="/data"
          />
          <Card
            thumbnail="pre-conviction-deaths-in-texas.png"
            title="Pre-trial deaths in Texas jails"
            excerpt="An interactive dashboard updated monthly with data on individuals who die in Texas county jails before going to trial."
            link="/publications/pre-conviction-deaths-in-texas-jails/"
          />
          <Card
            thumbnail="explore-the-data.png"
            title="Explore Our datasets"
            excerpt="Explore Texas shootings of and by law enforcement, as well as custodial deaths in Texas through interactive charts."
            link="/data"
          />
          <Card
            thumbnail="pre-conviction-deaths-in-texas.png"
            title="Pre-trial deaths in Texas jails"
            excerpt="An interactive dashboard updated monthly with data on individuals who die in Texas county jails before going to trial."
            link="/publications/pre-conviction-deaths-in-texas-jails/"
          />
          <Card
            thumbnail="explore-the-data.png"
            title="Explore Our datasets"
            excerpt="Explore Texas shootings of and by law enforcement, as well as custodial deaths in Texas through interactive charts."
            link="/data"
          />
        </Grid>
      </Primary>
    </Layout>
  </React.Fragment>
);
export default About;

const Grid = styled.div`
  width: 100%;
  margin: 3em 0;

  @media (min-width: ${props => props.theme.medium}) {
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    grid-column-gap: ${props => props.theme.gutter};
    grid-row-gap: ${props => props.theme.gutter};
  }
`;
