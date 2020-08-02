import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import NewsFeed from '../NewsFeed';

class HomepageNewsFeed extends React.Component {
  render() {
    return (
      <Wrapper>
        <div className="column-left sidebar sidebar--subtle">
          <div className="follow-tji">
            <h3>Who We Are</h3>
            <p>
              <strong>Texas Justice Initiative</strong> is a nonprofit organization that collects, analyzes, publishes
              oversight for criminal justice data throughout Texas.
            </p>
            <p>
              <a href="/about">Learn more</a> about who we are and what we do, or follow us on social media to stay up
              to date on the latest happening in Texas' criminal justice system.
            </p>
            <div className="social-icon-row">
              <a
                href="https://www.facebook.com/TXJusticeInitiative"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-row__link"
              >
                <img src="images/tji-fb-logo-blue.svg" alt="TJI Facebook link" />
              </a>
              <a
                href="https://twitter.com/JusticeTexas"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-row__link"
              >
                <img src="images/tji-twitter-logo-blue.svg" alt="TJI Twitter link" />
              </a>
              <a
                href="https://github.com/texas-justice-initiative"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-row__link"
              >
                <img src="images/tji-github-logo-blue.svg" alt="TJI Github link" />
              </a>
            </div>
          </div>
          <div className="divider--small" />
          <div className="follow-tji">
            <h3>Want to Do More?</h3>
            <p>
              Providing important criminal justice data in a way that's easy to digest is the result of dedicated work
              by our passionate team.
            </p>
            <p>
              We{' '}
              <Link href="/thanks">
                <a>appreciate</a>
              </Link>{' '}
              the support of our gracious donors and volunteers who make this happen.
            </p>
            <p>
              <Link href="/donate">
                <a>Make a Donation</a>
              </Link>
              <br />
              <Link href="/data">
                <a>Explore the Data</a>
              </Link>
              <br />
              <Link href="/volunteer">
                <a>Get Involved</a>
              </Link>
            </p>
          </div>
        </div>
        <div className="column-right">
          <NewsFeed page={1} perPage={4} />
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

  @media screen and (min-width: ${props => props.theme.medium}) {
    order: 2;
  }

  .column-left {
    order: 2;
    width: 100%;

    @media screen and (min-width: ${props => props.theme.medium}) {
      order: 1;
      width: 25%;
    }
  }

  .column-right {
    order: 1;
    width: 100%;

    @media screen and (min-width: ${props => props.theme.medium}) {
      order: 2;
      width: 75%;
      padding-left: 2rem;
    }
  }
`;
