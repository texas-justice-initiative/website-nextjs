import React from 'react';
import Head from 'next/head';

const pageTitle = 'About The Data';

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
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
  </React.Fragment>
);
export default About;
