import React from 'react';
import { NextSeo } from 'next-seo';
import MarkdownIt from 'markdown-it';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import BlockQuote from '../components/BlockQuote';
import DonorThumbnails from '../components/DonorThumbnails';
import Parser from '../components/Parser';
import VideoPlayer from '../components/VideoPlayer';
import content from '../content/about-us.md';
import People from '@/components/People/People';
import Section from '@/components/Section';

const {
  html,
  attributes: {
    title,
    mission,
    who: {
      title: whoTitle,
      people,
      volunteerTeam,
      governance,
      teamAlumni,
      donors,
    },
  },
} = content;

const md = new MarkdownIt();

function About() {
  return (
    <>
      <NextSeo
        title={title}
        description="Texas Justice Initiative was founded to increase transparency of state-reported criminal justice data."
        openGraph={{
          description:
            'Texas Justice Initiative was founded to increase transparency of state-reported criminal justice data.',
        }}
      />
      <Layout>
        <Primary>
          <h1>{title}</h1>
          <BlockQuote>{mission}</BlockQuote>

          <VideoPlayer
            url="https://res.cloudinary.com/texas-justice-initiative/video/upload/v1586367151/tji-intro-video-long-updated_i6rybk.mp4"
            title="introVideo"
          />

          <div dangerouslySetInnerHTML={{ __html: html }} />

          <Section>
            <h2>{whoTitle}</h2>
            <People people={people} />
          </Section>

          <Section>
            <h2>{volunteerTeam.title}</h2>
            <People people={volunteerTeam.volunteers} layout="cards" />
          </Section>

          <Section>
            <h2>{governance.title}</h2>
            <Parser>{md.render(governance.body)}</Parser>
            <People people={governance.boardMembers} />
          </Section>

          <Section>
            <h2>{teamAlumni.title}</h2>
            <Parser>{md.render(governance.body)}</Parser>
            <People people={teamAlumni.alumni} layout="cards" />
          </Section>

          {/* todo: break into donors component */}
          <Section>
            <h2>{donors.title}</h2>
            <Parser>{md.render(donors.body)}</Parser>
            <DonorThumbnails />
          </Section>
        </Primary>
        <Sidebar />
      </Layout>
    </>
  );
}
export default About;
