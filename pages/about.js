import React from 'react';
import Head from 'next/head';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';

const pageTitle = 'About Us';

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Primary>
      <h1>About TJI</h1>
      <p>
        Texas Justice Initiative is a nonprofit organization that collects,
        analyzes, publishes and provides oversight for criminal justice data
        throughout Texas.
      </p>
      <p>
        After Michael Brown was shot and killed by former officer Darren Wilson
        in Ferguson, Missouri, in 2014, Americans suddenly realized the dismal
        state of data-collection on officer-involved shootings.
      </p>
      <p>
        A scramble ensued to track how often members of the 18,000 law
        enforcement agencies in America shot civilians – a daunting, complex and
        fragmented task. Departments vary vastly in their approaches to
        collecting data on their interactions with the public, including their
        uses of force, rendering comparisons and analysis impossible. Even when
        departments do collect data, it’s often difficult for the public to
        access, parse and analyze for themselves.
      </p>
    </Primary>

    <Sidebar>I'm a sidebar!</Sidebar>
  </React.Fragment>
);
export default About;
