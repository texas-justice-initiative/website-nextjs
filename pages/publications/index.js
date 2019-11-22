import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Primary from '../../components/Primary';
import Sidebar from '../../components/Sidebar';

const pageTitle = 'Publications';

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Primary>
      <h1>{pageTitle}</h1>

      <p>
        Informing the public about our data, our findings and what the data means is of the utmost importance to the
        Texas Justice Initiative. More information about our data sets can be found{' '}
        <Link href="/about-the-data">
          <a>here</a>
        </Link>
        , and all of our data is available through data.world (free account required){' '}
        <a href="https://data.world/tji" target="_blank" rel="noopener noreferrer">
          here
        </a>
        . Below, you’ll find the Texas Justice Initiative’s latest press releases and reports.
      </p>
      <h2>Pre-conviction deaths in Texas jails since 2005</h2>
      <p>
        In this dashboard, the Texas Justice Initiative examines cases of individuals who have died in county jails
        before going to trial. These individuals have not been convicted of a crime but were all arrested on criminal
        charges and held in a county jail, and therefore their deaths must be reported as “custodial deaths” to the
        state’s Oﬃce of the Attorney General. TJI uses those reports to populate our Custodial Death Records database.
        Here, we filtered our data for individuals who died in jails before being convicted of a crime – and in some
        cases, before even being charged in connection with a crime.
      </p>
      <p>
        Some 48% of all the fatalities over a 13-year period were attributed to “natural causes” in the reports, while
        26.3% were labeled as “suicides.” Half of the deaths of individuals awaiting trial took place within their first
        eight days of incarceration.
      </p>
      <p>
        <Link href="/publications/pre-conviction-deaths-in-texas-jails">
          <a>Pre-trial deaths in Texas jails since 2005: A Tableau dashboard</a>
        </Link>
      </p>
      <h2>Life and Death in a Carceral State (2018)</h2>
      <p>
        In 2017, TJI partnered with the{' '}
        <a href="https://texasafterviolence.org/" target="_blank" rel="noopener noreferrer">
          Texas After Violence Project
        </a>{' '}
        to document the experiences people who have been directly impacted by the criminal justice system in Texas. The
        result was a 25-minute-long video with{' '}
        <a
          href="http://texasafterviolence.org/wp-content/uploads/2018/02/TAVP_TJI_Booklet.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          in-depth interviews
        </a>{' '}
        with five individuals who speak about topics like:
      </p>
      <ul>
        <li>Custodial deaths caused by “natural causes”: 90% of deaths in Texas prisons are classified this way;</li>
        <li>
          Pregnancy: Thousands of pregnant women are booked into Texas county jails each year, and 165 women gave birth
          while incarcerated in 2016;
        </li>
        <li>
          Officer-involved shootings: About 169 people are shot by Texas law enforcement each year, with about half
          causing fatalities;
        </li>
        <li>
          Harris County Jail suicides: The facility houses 13% of the state’s jail population and reports having 3% of
          the suicides in Texas jails.
        </li>
      </ul>
      <p>
        <a
          href="https://drive.google.com/a/texasjusticeinitiative.org/file/d/167qxHtgRhuCCcg2-VoYBMJ0buatf6krF/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the full data report for “Life and Death in a Carceral State”
        </a>
      </p>
      <h2>Officer-Involved Shootings and Custodial Deaths in Texas (2018)</h2>
      <p>
        Since 2005, there have been 8,730 deaths of civilians in the custody of Texas law enforcement. In the past
        decade, officer-involved shootings in Texas have been on the rise. Data obtained from the Texas Office of the
        Attorney General shows that since Sept. 1, 2015, there have been 466 civilians shot by Texas law enforcement,
        and 78 officers have been shot.{' '}
      </p>
      <p>
        Officers involved in shootings skew younger and male than the general population of Texas law enforcement
        officers. Overall, most deaths that occur in Texas law enforcement custody are due to natural causes, but that
        nearly half of all deaths of inmates housed alone in a jail cell are suicides.{' '}
      </p>
      <p>
        <a
          href="https://drive.google.com/a/texasjusticeinitiative.org/file/d/1LhrFlyAT8SV5rRF3YzY08mMMzgKQqwua/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Press Release
        </a>
      </p>
      <p>
        <a
          href="https://drive.google.com/a/texasjusticeinitiative.org/file/d/1d2UBGXA_5YSv6TdcTZLrGe2X3zUBU3QR/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          TJI’s Fact Sheet
        </a>
      </p>
      <h2>Texas Custodial Death Report (2016)</h2>
      <p>
        From 2005 to 2015, a reported 6,913 people died in the custody of law enforcement and other state officials in
        Texas. More than 1,900 of the people who died (28%) had not been convicted of, or in many cases, even charged
        with a crime. Despite recent growing interest in counting and reporting on custodial and police-involved deaths,
        most of the nearly 7,000 people who died have never had their stories told, and aggregate data regarding the
        manner and locations of their deaths have not been widely available.
      </p>
      <p>
        <a
          href="https://drive.google.com/open?id=1VlqnOokJ-Ta6u61mXpB5ES8JoP_RK7Yq"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the Report
        </a>
      </p>
    </Primary>
    <Sidebar>
      <h3>State of the Data</h3>
      <p>
        In the Texas Justice Initiative’s periodic newsletter, “State of the Data,” we feature our latest data, provide
        insights and more. Read previous editions:
      </p>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://mailchi.mp/9b565593c7a4/matching-grant-challenge-help-us-soar-221081"
        >
          Issue 1: October 2018
        </a>
      </p>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://mailchi.mp/8b29905c144e/state_of_the_data_december_2018"
        >
          Issue 2: December 2018
        </a>
      </p>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://mailchi.mp/973d370699d1/state_of_the_data_december_2018-316421"
        >
          Issue 3: February 2019
        </a>
      </p>
      <p>
        <a target="_blank" rel="noopener noreferrer" href="https://mailchi.mp/b7f6bf62b4b7/stateofthedata4">
          Issue 4: April 2019
        </a>
      </p>
      <p>
        <a target="_blank" rel="noopener noreferrer" href="https://mailchi.mp/01d503312561/stateofthedata4-382825">
          Issue 5: June 2019
        </a>
      </p>
      <p>
        <a target="_blank" rel="noopener noreferrer" href="https://mailchi.mp/f085563e4913/stateofthedata4-397117">
          Issue 6: August 2019
        </a>
      </p>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://mailchi.mp/259f91748e16/texas-justice-initiative-state-of-the-data-issue-7"
        >
          Issue 7: October 2019
        </a>
      </p>
      <h3 style={{ marginBottom: '1em' }}>Join Our Mailing List</h3>
    </Sidebar>
  </React.Fragment>
);
export default Page;
