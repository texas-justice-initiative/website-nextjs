import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Primary from '../components/Primary';
import AboutSidebar from '../components/AboutSidebar';

const pageTitle = 'Related Organizations';

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Layout>
      <Primary>
        <h1>{pageTitle}</h1>
        <p>
          <a href="http://copcrisis.com/" target="_blank" rel="noopener noreferrer">
            Cop Crisis
          </a>
          : This nonprofit produces data visualizations on police brutality and misconduct using data collected by
          others.
        </p>
        <p>
          <a
            href="http://www.dps.texas.gov/administration/crime_records/pages/crimestatistics.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Crime in Texas
          </a>
          : About 1,000 Texas law enforcement agencies voluntarily submit data monthly to the Texas Department of Public
          Safety, which compiles the data in an annual report.
        </p>
        <p>
          <a href="https://ebwiki.org/" target="_blank" rel="noopener noreferrer">
            EBWiki
          </a>
          : This crowdsourced platform tracks the progression of fatal use-of-force cases.
        </p>
        <p>
          <a href="http://www.fatalencounters.org/" target="_blank" rel="noopener noreferrer">
            Fatal Encounters
          </a>
          : This journalist-run nonprofit seeks to collect and present all data on police killings in the U.S. since
          2000.
        </p>
        <p>
          <a
            href="https://www.washingtonpost.com/graphics/national/police-shootings-2017/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fatal Force
          </a>
          : The Washington Post has tracked fatal police shootings throughout the U.S. since 2015.
        </p>
        <p>
          <a href="http://www.killedbypolice.net/" target="_blank" rel="noopener noreferrer">
            Killed By Police
          </a>
          : This site aggregates information about law enforcement-related deaths in the U.S. since 2013.
        </p>
        <p>
          <a href="https://www.bjs.gov/index.cfm?ty=pbdetail&amp;iid=5865" target="_blank" rel="noopener noreferrer">
            Mortality in Local Jails
          </a>
          : Deaths in local jails as reported to the Bureau of Justice Statistics.
        </p>
        <p>
          <a href="https://www.bjs.gov/index.cfm?ty=pbdetail&amp;iid=5866" target="_blank" rel="noopener noreferrer">
            Mortality in State Prisons
          </a>
          : Deaths in state lock-ups as reported to the Bureau of Justice Statistics.
        </p>
        <p>
          <a href="https://www.cesariolab.com/race-bias-in-shooting" target="_blank" rel="noopener noreferrer">
            Social Cognition Laboratory
          </a>
          : Michigan State University’s Joseph Cesario examines bias in American police shootings in 2015.
        </p>
        <p>
          <a
            href="https://www.theguardian.com/us-news/ng-interactive/2015/jun/01/the-counted-police-killings-us-database"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Counted
          </a>
          : The Guardian (U.K.) analyzed fatal shootings by police of Americans in 2015 and 2016.
        </p>
        <p>
          <a href="https://ucr.fbi.gov/ucr-publications" target="_blank" rel="noopener noreferrer">
            Uniform Crime Reporting
          </a>
          : 18,000 departments nationwide voluntarily submit data to the U.S. Federal Bureau of Investigation’s UCR
          program, resulting in data sets such as the{' '}
          <a href="https://ucr.fbi.gov/leoka" target="_blank" rel="noopener noreferrer">
            Law Enforcement Officers Killed and Assaulted
          </a>{' '}
          and{' '}
          <a
            href="https://ucr.fbi.gov/crime-in-the-u.s/2017/preliminary-report"
            target="_blank"
            rel="noopener noreferrer"
          >
            Crime in the United States
          </a>
          .
        </p>
        <p>
          <a
            href="https://news.vice.com/en_us/article/a3jjpa/nonfatal-police-shootings-data"
            target="_blank"
            rel="noopener noreferrer"
          >
            VICE News
          </a>
          : VICE’s database of fatal and non-fatal police shootings in the 50 largest cities in the U.S. from 2010-2016
          is the result of open records requests.
        </p>
        <p>
          <a
            href="https://drive.google.com/file/d/0B6HJLeMEu3hlcVc4cHhjMjlZSEFGeEdYX09OS1ZjaFRobzA4/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            Williams, H.E. et al.
          </a>
          : Texas State University’s Williams et al found that despite federal and state data-collection efforts, many
          officer-involved shootings aren’t reported. Texas’ own database was missing 201 reports on deaths from Jan. 1,
          2006 to Dec. 31, 2015.
        </p>
      </Primary>
      <AboutSidebar />
    </Layout>
  </React.Fragment>
);
export default About;
