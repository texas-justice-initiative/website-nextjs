import React from 'react';
import Head from 'next/head';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';

const pageTitle = 'About The Data';

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Primary>
      <h1>{pageTitle}</h1>
      <p>
        Increasing transparency in the criminal justice system is of vital importance to TJI, as our work relies on the
        use of information that can be released to the public.
      </p>
      <p>
        State laws allow anyone to get a good glimpse at the criminal justice system, though plenty of hurdles remain.
        Through open records requests, TJI has obtained data from various governmental agencies. We then clean, analyze
        and present the data – both in the form of a full data set and in comparative graphics – to the public. Here is a
        description of our current data sets:
      </p>
      <h3>Officer-involved shootings</h3>
      <p>
        This data set reflects information included in reports filed with the Office of the Attorney General (OAG) since
        Sept. 1, 2015. State law requires agencies to report all shootings of and by officers to the state within 30 days.
        Since the state law went into effect, we have found dozens of unreported incidents. Failure to properly report
        incidents can lead to a $1,000-a-day fine, but in each case, agencies have filed reports upon TJI’s notification
        that the report was missing.
      </p>
      <p>
        Access and download TJI’s officer-involved shootings data here. The data is updated when new reports are filed.
      </p>
      <h3>Custodial deaths</h3>
      <p>
        For decades, Texas has required law enforcement agencies, local jails, and the Texas Department of Criminal
        Justice to report to the OAG every time a person dies in their custody. This includes deaths during an arrest,
        suicides in state and local lock-ups and deaths by natural causes, like an illness or disease. Failing to report a
        death can be a criminal offense – a Class B misdemeanor – though it never is.
      </p>
      <p>
        Although the requirement has been in place for decades, reporting was sporadic and inconsistent until 2005. Then,
        the state streamlined reporting and in 2016, the reports were made publicly available in a searchable online
        catalog. TJI’s data set includes reports dating back to the 1980s, but only after 2005 do the records represent a
        complete set.
      </p>
      <p>
        Access and download TJI’s custodial death data here. This data was obtained through an open records request for
        data on deaths reported through May 1, 2018.
      </p>
      <p>
        A note about this set: For years, until January 2013, the Texas Department of Criminal Justice (TDCJ) reported all
        deaths to the Bureau of Justice Statistics but only reported some deaths to the OAG . To capture those deaths,
        too, TJI has added data that TDCJ filed with BJS from 2005-2013 to our data from the OAG.
      </p>
      <h3>Future Datasets</h3>
      <p>
        TJI is currently acquiring and analyzing more data sets, and we’re always on the lookout for more. Stay tuned as
        we release more reports and complete data sets in the future, and please email info@texasjusticeinitiative.org if
        you know of a data set we should include.
      </p>
    </Primary>
    <Sidebar>
      <h3>Related Data</h3>
      <p><a href="http://copcrisis.com/" target="_blank" rel="noopener">Cop Crisis</a>: This nonprofit produces data visualizations on police brutality and misconduct using data collected by others.</p>
      <p><a href="http://www.dps.texas.gov/administration/crime_records/pages/crimestatistics.htm" target="_blank" rel="noopener">Crime in Texas</a>: About 1,000 Texas law enforcement agencies voluntarily submit data monthly to the Texas Department of Public Safety, which compiles the data in an annual report.</p>
      <p><a href="https://ebwiki.org/" target="_blank" rel="noopener">EBWiki</a>: This crowdsourced platform tracks the progression of fatal use-of-force cases.</p>
      <p><a href="http://www.fatalencounters.org/" target="_blank" rel="noopener">Fatal Encounters</a>: This journalist-run nonprofit seeks to collect and present all data on police killings in the U.S. since 2000.</p>
      <p><a href="https://www.washingtonpost.com/graphics/national/police-shootings-2017/" target="_blank" rel="noopener">Fatal Force</a>: The Washington Post has tracked fatal police shootings throughout the U.S. since 2015.</p>
      <p><a href="http://www.killedbypolice.net/" target="_blank" rel="noopener">Killed By Police</a>: This site aggregates information about law enforcement-related deaths in the U.S. since 2013.</p>
      <p><a href="https://www.bjs.gov/index.cfm?ty=pbdetail&amp;iid=5865" target="_blank" rel="noopener">Mortality in Local Jails</a>: Deaths in local jails as reported to the Bureau of Justice Statistics.</p>
      <p><a href="https://www.bjs.gov/index.cfm?ty=pbdetail&amp;iid=5866" target="_blank" rel="noopener">Mortality in State Prisons</a>: Deaths in state lock-ups as reported to the Bureau of Justice Statistics.</p>
      <p><a href="https://www.cesariolab.com/race-bias-in-shooting" target="_blank" rel="noopener">Social Cognition Laboratory</a>: Michigan State University’s Joseph Cesario examines bias in American police shootings in 2015.</p>
      <p><a href="https://www.theguardian.com/us-news/ng-interactive/2015/jun/01/the-counted-police-killings-us-database" target="_blank" rel="noopener">The Counted</a>: The Guardian (U.K.) analyzed fatal shootings by police of Americans in 2015 and 2016.</p>
      <p><a href="https://ucr.fbi.gov/ucr-publications" target="_blank" rel="noopener">Uniform Crime Reporting</a>:&nbsp;18,000 departments nationwide voluntarily submit data to the U.S. Federal Bureau of Investigation’s UCR program, resulting in data sets such as the&nbsp;<a href="https://ucr.fbi.gov/leoka" target="_blank" rel="noopener">Law Enforcement Officers Killed and Assaulted</a>&nbsp;and&nbsp;<a href="https://ucr.fbi.gov/crime-in-the-u.s/2017/preliminary-report" target="_blank" rel="noopener">Crime in the United States</a>.</p>
      <p><a href="https://news.vice.com/en_us/article/a3jjpa/nonfatal-police-shootings-data" target="_blank" rel="noopener">VICE News</a>: VICE’s database of fatal and non-fatal police shootings in the 50 largest cities in the U.S. from 2010-2016 is the result of open records requests.</p>
      <p><a href="https://drive.google.com/file/d/0B6HJLeMEu3hlcVc4cHhjMjlZSEFGeEdYX09OS1ZjaFRobzA4/view" target="_blank" rel="noopener">Williams, H.E. et al.</a>: Texas State University’s Williams et al found that despite federal and state data-collection efforts, many officer-involved shootings aren’t reported. Texas’ own database was missing 201 reports on deaths from&nbsp;Jan. 1, 2006 to Dec. 31, 2015.</p>
    </Sidebar>
  </React.Fragment>
);
export default About;
