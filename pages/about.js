/* eslint-disable react/no-danger */

import React from 'react';
import Head from 'next/head';
import MarkdownIt from 'markdown-it';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import BlockQuote from '../components/BlockQuote';
import BioBox from '../components/BioBox';
import Volunteers from '../components/Volunteers';
import DonorThumbnails from '../components/DonorThumbnails';
import Parser from '../components/Parser';
import content from '../content/about-us.md';

const {
  html,
  attributes: {
    title,
    mission,
    who: { title: whoTitle, executiveDirector, volunteerTeam, governance, donors },
  },
} = content;

const md = new MarkdownIt();

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <BlockQuote>{mission}</BlockQuote>
        <div dangerouslySetInnerHTML={{ __html: html }} />

        <h2 className="align--center spacing--large">{whoTitle}</h2>

        <BioBox bio={executiveDirector} />

        <h2 className="align--center spacing--large">{volunteerTeam.title}</h2>
        <Volunteers />

        <h2 className="align--center spacing--large">{governance.title}</h2>
        <Parser>{md.render(governance.body)}</Parser>

        {governance.boardMembers.map((boardMember, key) => (
          <BioBox bio={boardMember} key={key}></BioBox>
        ))}

        <h2 className="align--center spacing--large">{donors.title}</h2>
        <Parser>{md.render(donors.body)}</Parser>
        <DonorThumbnails />
      </Primary>
      <Sidebar />
    </Layout>
  </React.Fragment>
);
export default About;
