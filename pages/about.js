/* eslint-disable react/no-danger */

import React from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import MarkdownIt from 'markdown-it'
import Layout from '../components/Layout'
import Primary from '../components/Primary'
import Sidebar from '../components/Sidebar'
import BlockQuote from '../components/BlockQuote'
import BioBox from '../components/BioBox'
import PeopleGrid from '../components/PeopleGrid'
import DonorThumbnails from '../components/DonorThumbnails'
import Parser from '../components/Parser'
import VideoPlayer from '../components/VideoPlayer'
import content from '../content/about-us.md'

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
} = content

const md = new MarkdownIt()

const About = () => (
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

        <h2 className="align--center spacing--large">{whoTitle}</h2>

        {people.map((person, key) => (
          <BioBox bio={person} key={key} />
        ))}

        <PeopleGrid
          title={volunteerTeam.title}
          people={volunteerTeam.volunteers}
        />

        <h2 className="align--center spacing--large">{governance.title}</h2>
        <Parser>{md.render(governance.body)}</Parser>

        {governance.boardMembers.map((boardMember, key) => (
          <BioBox bio={boardMember} key={key} />
        ))}

        <div>
          <h2 className="align--center spacing--large">{teamAlumni.title}</h2>
          <AlumniList>
            {teamAlumni.alumni.map(({ name: alumName, title: alumTitle }) => (
              <li key={alumName}>
                <h4>{alumName}</h4>
                <div>{alumTitle}</div>
              </li>
            ))}
          </AlumniList>
        </div>

        <h2 className="align--center spacing--large">{donors.title}</h2>
        <Parser>{md.render(donors.body)}</Parser>
        <DonorThumbnails />
      </Primary>
      <Sidebar />
    </Layout>
  </>
)
export default About

const AlumniList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  li {
    padding: 1.5rem;
    width: 50%;

    div {
      margin-top: 0.5rem;
      font-size: ${(props) => props.theme.typography.sizes.body.small};
      line-height: ${(props) => props.theme.typography.line_heights.body.small};
    }

    @media (min-width: ${(props) => props.theme.breakpoints.large}) {
      width: 33%;
    }
  }
`
