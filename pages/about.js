/* eslint-disable no-unused-vars */

import React from 'react';
import Head from 'next/head';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import BlockQuote from '../components/BlockQuote';
import BioBox from '../components/BioBox';
import bio from '../data/bios';
import Volunteers from '../components/Volunteers';
import DonorThumbnails from '../components/DonorThumbnails';
import AboutSidebar from '../components/AboutSidebar';

const pageTitle = 'About TJI';

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Primary>
      <h1>{pageTitle}</h1>
      <BlockQuote>
        Texas Justice Initiative is a nonprofit organization that collects, analyzes, publishes and provides oversight
        for criminal justice data throughout Texas.
      </BlockQuote>

      <p>
        After Michael Brown was shot and killed by former officer Darren Wilson in Ferguson, Missouri, in 2014,
        Americans suddenly realized the dismal state of data-collection on officer-involved shootings.
      </p>
      <p>
        A scramble ensued to track how often members of the{' '}
        <a
          href="http://www.politifact.com/punditfact/statements/2016/jul/10/charles-ramsey/how-many-police-departments-are-us/"
          target="_blank"
          rel="noopener noreferrer"
        >
          18,000 law enforcement agencies
        </a>{' '}
        in America shot civilians – a daunting, complex and fragmented task. Departments vary vastly in their approaches
        to collecting data on their interactions with the public, including their uses of force, rendering comparisons
        and analysis impossible. Even when departments do collect data, it’s often difficult for the public to access,
        parse and analyze for themselves.
      </p>
      <h3>But in Texas, things are different.</h3>
      <p>
        In 2015, lawmakers passed{' '}
        <a
          href="https://capitol.texas.gov/tlodocs/84R/billtext/pdf/HB01036F.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          legislation
        </a>{' '}
        that required agencies to report shootings to the state. Paired with a{' '}
        <a href="https://statutes.capitol.texas.gov/Docs/CR/htm/CR.49.htm" targer="_blank">
          decades-old law
        </a>{' '}
        that mandates deaths by officer-involved shootings and in any other type of law enforcement custody are reported
        to the state, the laws set Texas apart from most other states in requiring such reporting by police.
      </p>

      <p>
        Amanda Woog and Eva Ruth Moravec had each worked with one of the data sets independently but decided to join
        forces in 2016, when they co-founded the Texas Justice Initiative to build a portal for our criminal justice
        data. Through the portal and other tools, TJI makes the data available to the public in a user-friendly way. TJI
        also analyzes the data and explains our findings, and attempts to provide oversight by helping to ensure the
        data sets are complete and accurate.
      </p>
      <p>
        We believe that with quality information, we can better understand each other, craft good policy, improve
        governance, ensure accountability and identify creative solutions. TJI hopes to promote informed discussion on
        controversial topics of grave importance and impact research that leads to police, detention, and sentencing
        policy reform. We hope our work will also encourage replication in other states, both by bringing attention to
        the Texas policies and how they do or do not work, and by creating a platform that can be duplicated using data
        from other states.
      </p>

      <h2 className="align--center spacing--large">Who We Are</h2>

      <BioBox bio={bio.evaRuthMoravec} />

      <h2 className="align--center spacing--large">Governance</h2>
      <p>
        The Texas Justice Initiative is a nonprofit, tax-exempt organization under the governance of a board of
        directors: William Kelly, Karen Kennard, Meme Styles and Bryan Whoolery. The board meets quarterly and can be
        reached via email to:{' '}
        <a href="mailto:directors@texasjusticeinitiative.org">directors@texasjusticeinitiative.org</a>
      </p>

      <BioBox bio={bio.memeStyles} />
      <BioBox bio={bio.williamKelly} />
      <BioBox bio={bio.karenKennard} />
      <BioBox bio={bio.bryanWhoolery} />

      <h2 className="align--center spacing--large">Volunteer Team</h2>
      <Volunteers />

      <h2 className="align--center spacing--large">Our Donors</h2>
      <p>
        TJI is grateful for the financial support we’ve received so far. Many thanks to the individuals who’ve donated
        to TJI directly and through Facebook, and to our grantors: the Awesome Foundation, CredCon, the John and
        Florence Newman Foundation, and the Charles Koch Institute.
      </p>
      <DonorThumbnails />
    </Primary>

    <AboutSidebar />
  </React.Fragment>
);
export default About;
