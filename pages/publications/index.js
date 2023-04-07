/* eslint-disable react/no-danger */

import { NextSeo } from 'next-seo'
import React from 'react'
import Layout from '../../components/Layout'
import Primary from '../../components/Primary'
import Sidebar from '../../components/Sidebar'
import content from '../../content/publications.md'

const {
  html,
  attributes: { title, newslettersHeading, newslettersIntro, newsletters },
} = content

const Page = () => (
  <>
    <NextSeo
      title={title}
      description="Texas Justice Initiative’s latest press releases and reports."
      openGraph={{
        description:
          'Texas Justice Initiative’s latest press releases and reports.',
      }}
    />
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Primary>
      <Sidebar>
        <h3>{newslettersHeading}</h3>
        <p>{newslettersIntro}</p>
        {newsletters.map((newsletter, k) => (
          <p key={k}>
            <a target="_blank" rel="noopener noreferrer" href={newsletter.url}>
              {newsletter.title}
            </a>
          </p>
        ))}
      </Sidebar>
    </Layout>
  </>
)
export default Page
