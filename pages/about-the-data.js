import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import AboutSidebar from '../components/AboutSidebar';
import PipelineImage from '../components/images/PipelineImage';

const pageTitle = 'About The Data';

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Layout>
      <Primary>
        <h1>{pageTitle}</h1>
        <p>
          Increasing transparency in the criminal justice system is of vital importance to us at the Texas Justice
          Initiative. Our work relies on the use of information that can be released to the public.
        </p>{' '}
        <p>
          Currently on our website, <strong>we compile data about three main incident types that occur in Texas</strong>
          :
        </p>
        <ol>
          <li>
            <strong>Injury of officer(s) and/or civilian(s): </strong>Any shooting of or by a Texas peace officer,
            occurring while the officer is on- or off-duty, causing an injury.
          </li>
          <li>
            <strong>Death of officer(s) and/or civilian(s): </strong> Any fatal shooting of or by a Texas peace officer,
            occurring while the officer is on- or off-duty.
          </li>
          <li>
            <strong>Death in custody: </strong>
            Any death of an individual while they are in a penal institution, in the custody of a peace officer or as a
            result of a peace officer’s use of force, in a jail, correctional facility, or state juvenile facility dies.
          </li>
        </ol>
        <p>
          After an incident, the governmental agency in which it occurred (i.e. a county jail etc.) is required to file
          a report for the respective incident (
          <a
            href="https://drive.google.com/file/d/1qRRN6HJpVTXvo4G5MzJGLwAHSPEHvNNR/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>1</strong>
          </a>
          ,{' '}
          <a
            href="https://drive.google.com/open?id=1iBJQ6zl1UQOEUnd18Krb9PnZEL8Nd0kY"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>2</strong>
          </a>
          ,{' '}
          <a
            href="https://drive.google.com/file/d/1MEEDDiIHfXdi6yM7bYoN8bROa8iYh8vP/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>3</strong>
          </a>
          ) with the Texas Office of the Attorney General (OAG) within 30 days.{' '}
        </p>
        <PipelineImage
          src="/static/images/TJI_pipeline_Part1_horz_v4_mode.svg"
          alt="Diagram showing the process that begins once an incident occurs and ends when the Office of the Attorney General publishes a report"
        />
        <p>
          The Texas OAG publishes the raw .PDFs of these reports. Through open records requests filed monthly, TJI
          obtains data from the reports through the Texas OAG.
        </p>
        <p>
          We then clean, analyze, and present the data to the public – both in the form of a full data set and in
          comparative graphics – through our analysis pipeline.
        </p>
        <p>
          Our analysis pipeline is summarized below. The scripts we use in the analysis pipeline can be found on{' '}
          <a href="https://github.com/texas-justice-initiative" target="_blank" rel="noopener noreferrer">
            our GitHub page
          </a>
          .
        </p>
        <h2>TJI's Analysis Pipeline</h2>
        <PipelineImage
          src="/static/images/TJI_pipeline_Part2_vert_v4_mode.svg"
          alt="Diagram showing Texas Justice Initiative's data pipeline"
        />
        <h2>Generated datasets</h2>
        <p>
          The following are some more detailed descriptions of our current datasets, which are generated through the
          processing pipeline as shown above.
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
          of unreported incidents. In 2017, lawmakers amended state law to impose potential penalties when agencies do
          not properly file their reports. Since failure to properly report incidents can lead to a{' '}
          <a
            href="https://capitol.texas.gov/tlodocs/85R/billtext/pdf/HB00245F.pdf#navpanes=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            $1,000-a-day fine
          </a>
          , agencies have generally filed their reports upon being notified that the report was missing.
        </p>
        <p>
          <i>Access and download TJI’s officer-involved shootings data </i>
          <a
            href="https://data.world/tji/officer-involved-shootings/workspace/project-summary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>here</i>
          </a>
          <i>. The data is updated monthly.</i>
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
          <i>Access and download TJI’s custodial death data </i>
          <a
            href="https://data.world/tji/deaths-in-custody/workspace/project-summary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>here</i>
          </a>
          <i>
            . This data was obtained through an open records request for data on deaths reported through May 1, 2018.
          </i>
        </p>
        <p>
          <b>
            <i>A note about this set:</i>
          </b>
          <i>
            {' '}
            For years, until January 2013, the Texas Department of Criminal Justice (TDCJ) reported all deaths to the
            Bureau of Justice Statistics{' '}
          </i>
          <a
            href="http://gritsforbreakfast.blogspot.com/2014/12/tdcj-reporting-change-explains-death-in.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>but only reported some deaths</i>
          </a>
          <i>
            {' '}
            to the OAG . To capture those deaths, too, TJI has added data that TDCJ filed with BJS from 2005-2013 to our
            data from the OAG.
          </i>
        </p>
        <h3>Future Datasets</h3>
        <p>
          TJI is currently acquiring and analyzing more data sets, and we’re always on the lookout for more. Stay tuned
          as we release more reports and complete data sets in the future, and please email
          info@texasjusticeinitiative.org if you know of a data set we should include.
        </p>
      </Primary>
      <AboutSidebar />
    </Layout>
  </React.Fragment>
);
export default About;
