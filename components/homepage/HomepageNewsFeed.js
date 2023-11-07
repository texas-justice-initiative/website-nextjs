/* eslint-disable global-require */

import React from 'react';
import Image from 'next/legacy/image';
import styled from 'styled-components';
import Link from 'next/link';
import NewsFeed from '../NewsFeed';
import content from '../../content/newsfeed.md';

// Load images
import facebook from '../../images/tji-fb-logo-blue.svg';
import twitter from '../../images/tji-twitter-logo-blue.svg';
import github from '../../images/tji-github-logo-blue.svg';

class HomepageNewsFeed extends React.Component {
  render() {
    let {
      attributes: { news },
    } = content;
    news = news.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    });
    return (
      <Wrapper>
        <div className="column-left sidebar sidebar--subtle">
          <div className="follow-tji">
            <h3>Who We Are</h3>
            <p>
              <strong>Texas Justice Initiative</strong> is a nonprofit
              organization that collects, analyzes, publishes oversight for
              criminal justice data throughout Texas.
            </p>
            <p>
              <Link href="/about">Learn more</Link> about who we are and what we
              do, or follow us on social media to stay up to date on the latest
              happening in Texas' criminal justice system.
            </p>
            <div className="social-icon-row">
              <a
                href="https://www.facebook.com/TXJusticeInitiative"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-row__link"
              >
                <Image
                  src={facebook}
                  alt="TJI Facebook"
                  className="footer-section__social-links-image"
                  width={30}
                  height={30}
                />
              </a>
              <a
                href="https://twitter.com/JusticeTexas"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-row__link"
              >
                <Image
                  src={twitter}
                  alt="TJI Twitter"
                  className="footer-section__social-links-image"
                  width={30}
                  height={30}
                />
              </a>
              <a
                href="https://github.com/texas-justice-initiative"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-row__link"
              >
                <Image
                  src={github}
                  alt="TJI Github"
                  className="footer-section__social-links-image"
                  width={30}
                  height={30}
                />
              </a>
            </div>
          </div>
          <div className="divider--small" />
          <div className="follow-tji">
            <h3>Want to Do More?</h3>
            <p>
              Providing important criminal justice data in a way that's easy to
              digest is the result of dedicated work by our passionate team.
            </p>
            <p>
              We <Link href="/thanks">appreciate</Link> the support of our
              gracious donors and volunteers who make this happen.
            </p>
            <p>
              {/* <Link href="/donate">Make a Donation</Link>
              <br /> */}
              <Link href="/data">Explore the Data</Link>
              <br />
              <Link href="/volunteer">Get Involved</Link>
            </p>
          </div>
        </div>
        <div className="column-right">
          <NewsFeed page={1} perPage={4} news={news} />
          <Link href="/news?page=1" style={{ cssFloat: 'right' }}>
            See more of what we’re reading…
          </Link>
        </div>
      </Wrapper>
    );
  }
}

export default HomepageNewsFeed;

const Wrapper = styled.div`
  order: 1;
  width: 100%;
  margin: 1rem 0 4rem 0;
  display: flex;
  flex-flow: row wrap;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.medium}) {
    order: 2;
  }

  .column-left {
    order: 2;
    width: 100%;

    @media screen and (min-width: ${(props) =>
        props.theme.breakpoints.medium}) {
      order: 1;
      width: 25%;
    }
  }

  .column-right {
    order: 1;
    width: 100%;

    @media screen and (min-width: ${(props) =>
        props.theme.breakpoints.medium}) {
      order: 2;
      width: 75%;
      padding-left: 2rem;
    }
  }
`;
