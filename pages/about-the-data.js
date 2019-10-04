import React from 'react';
import Head from 'next/head';
import Primary from '../components/Primary';
import AboutSidebar from '../components/AboutSidebar';

const pageTitle = 'About The Data';

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Primary>
      <h1>{pageTitle}</h1>
      <p>
        Increasing transparency in the criminal justice system is of vital importance to{' '}
        <a href="http://texasjusticeinitiative.org/about/">TJI</a>, as our work relies on the use of information that
        can be released to the public.
      </p>
      <p>
        State laws allow anyone to get a good glimpse at the criminal justice system, though plenty of hurdles remain.
        Through open records requests, TJI has obtained data from various governmental agencies. We then clean, analyze
        and present the data – both in the form of a full data set and in comparative graphics – to the public. Here is
        a description of our current data sets:
      </p>

      <h3>Officer-involved shootings</h3>
      <p>
        This data set reflects information included in reports filed with the{' '}
        <a href="https://texasattorneygeneral.gov/" target="_blank" rel="noopener noreferrer">
          Office of the Attorney General (OAG)
        </a>{' '}
        since Sept. 1, 2015. State law requires agencies to report all shootings{' '}
        <a
          href="https://drive.google.com/file/d/1MEEDDiIHfXdi6yM7bYoN8bROa8iYh8vP/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          of
        </a>{' '}
        and{' '}
        <a
          href="https://drive.google.com/file/d/1iBJQ6zl1UQOEUnd18Krb9PnZEL8Nd0kY/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          by
        </a>{' '}
        officers to the state within 30 days. Since the state law went into effect, we have found{' '}
        <a
          href="https://www.mystatesman.com/news/crime--law/state-database-officer-involved-shootings-missing-cases/0kajkOgm3kQ6Q5Sy8pCxgI/"
          target="_blank"
          rel="noopener noreferrer"
        >
          dozens
        </a>{' '}
        of unreported incidents. Failure to properly report incidents can lead to a{' '}
        <a
          href="https://capitol.texas.gov/tlodocs/85R/billtext/pdf/HB00245F.pdf#navpanes=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          $1,000-a-day fine
        </a>
        , but in each case, agencies have filed reports upon TJI’s notification that the report was missing.
      </p>
      <p>
        <em>
          Access and download TJI’s officer-involved shootings data{' '}
          <a
            href="https://data.world/tji/officer-involved-shootings/workspace/project-summary"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          . The data is updated when new reports are filed.{' '}
        </em>
      </p>

      <h3>Custodial deaths</h3>
      <p>
        For decades, Texas has required law enforcement agencies, local jails, and the Texas Department of Criminal
        Justice{' '}
        <a
          href="https://drive.google.com/file/d/1qRRN6HJpVTXvo4G5MzJGLwAHSPEHvNNR/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          to report to the OAG
        </a>{' '}
        every time a person dies in their custody. This includes deaths during an arrest, suicides in state and local
        lock-ups and deaths by natural causes, like an illness or disease.{' '}
        <a href="https://statutes.capitol.texas.gov/Docs/PE/htm/PE.39.htm" target="_blank" rel="noopener noreferrer">
          Failing to report a death
        </a>{' '}
        can be a criminal offense – a Class B misdemeanor – though it never is.
      </p>
      <p>
        Although the requirement has been in place for decades, reporting was sporadic and inconsistent until 2005.
        Then, the state streamlined reporting and{' '}
        <a
          href="https://www.chron.com/news/houston-texas/houston/article/police-custody-deaths-database-texas-10781199.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          in 2016
        </a>
        , the reports were made publicly available in{' '}
        <a href="https://oagtx.force.com/cdr/cdrreportdeaths" target="_blank" rel="noopener noreferrer">
          a searchable online catalog
        </a>
        . TJI’s data set includes reports dating back to the 1980s, but only after 2005 do the records represent a
        complete set.
      </p>
      <p>
        <em>
          Access and download TJI’s custodial death data{' '}
          <a
            href="https://data.world/tji/deaths-in-custody/workspace/project-summary"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          . This data was obtained through an open records request for data on deaths reported through May 1, 2018.{' '}
        </em>
      </p>
      <p>
        <em>
          <strong>A note about this set:</strong> For years, until January 2013, the Texas Department of Criminal
          Justice (TDCJ) reported all deaths to the Bureau of Justice Statistics{' '}
          <a
            href="http://gritsforbreakfast.blogspot.com/2014/12/tdcj-reporting-change-explains-death-in.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            but only reported some deaths
          </a>{' '}
          to the OAG . To capture those deaths, too, TJI has added data that TDCJ filed with BJS from 2005-2013 to our
          data from the OAG.{' '}
        </em>
      </p>

      <h3>Future Datasets</h3>
      <p>
        TJI is currently acquiring and analyzing more data sets, and we’re always on the lookout for more. Stay tuned as
        we release more reports and complete data sets in the future, and please email info@texasjusticeinitiative.org
        if you know of a data set we should include.
      </p>
    </Primary>
    <AboutSidebar />
  </React.Fragment>
);
export default About;
