/* eslint-disable no-unused-vars, global-require, react/no-danger, jsx-a11y/anchor-is-valid */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import newsfeed from '../../content/newsfeed.md';

class NewsFeed extends React.Component {
  render() {
    const {
      html,
      attributes: { title, cats },
    } = newsfeed;
    return (
      <Wrapper>
        <div className="column-left">
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
                <img src={require('../../images/tji-fb-logo-blue.svg')} alt="TJI Facebook link" />
              </a>
              <a
                href="https://twitter.com/JusticeTexas"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-row__link"
              >
                <img src={require('../../images/tji-twitter-logo-blue.svg')} alt="TJI Twitter link" />
              </a>
              <a
                href="https://github.com/texas-justice-initiative"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-row__link"
              >
                <img src={require('../../images/tji-github-logo-blue.svg')} alt="TJI Github link" />
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
            <p>We appreciate the support of our gracious donors and volunteers who make this happen.</p>
            <p>
              <a href="/donate">Make a Donation</a>
              <br />
              <a href="/data">Explore the Data</a>
              <br />
              <a href="/contact">Get Involved</a>
            </p>
          </div>
        </div>
        <div className="column-right">
          <h2>What's Happening around Texas?</h2>
          <Subtitle>The latest news from around the Texas Criminal Justice system.</Subtitle>
          <div className="news-item">
            <article>
              <h1>{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: html }} />
              <ul>
                {cats.map((cat, k) => (
                  <li key={k}>
                    <h2>{cat.name}</h2>
                    <img src={cat.image} alt={cat.name} width="500px" />
                    <p>{cat.description}</p>
                  </li>
                ))}
              </ul>
            </article>
            <a href="#">Read more...</a>
          </div>
          <div className="news-item">
            <h4>Latest News Story</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat fugiat fugiat fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui anim id est laborum.{' '}
            </p>
            <p>
              <a href="#">Read more...</a>
            </p>
          </div>
          <div className="news-item">
            <h4>Latest News Story</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat fugiat fugiat fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui anim id est laborum.{' '}
            </p>
            <p>
              <a href="#">Read more...</a>
            </p>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default NewsFeed;

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
    background-color: ${props => props.theme.colors.grayLightest};
    padding: 2rem;
    font-size: ${props => props.theme.sidebarFont__size};

    h3 {
      margin-top: 0;
    }

    @media screen and (min-width: ${props => props.theme.medium}) {
      order: 1;
      width: 25%;
    }
  }

  .column-right {
    order: 1;
    width: 100%;

    h2 {
      color: ${props => props.theme.colors.black};
    }

    @media screen and (min-width: ${props => props.theme.medium}) {
      order: 2;
      width: 75%;
      padding-left: 2rem;
    }

    .news-item {
      margin: 2rem 0;
      padding: 1rem 0;
      border-bottom: 1px solid ${props => props.theme.colors.grayLightest};

      &:last-of-type {
        border-bottom-width: 0;
      }
    }
  }
`;

const Subtitle = styled.span`
  display: block;
  margin-top: 0.25rem;
  font-size: ${props => props.theme.sidebarFont__size};
  color: ${props => props.theme.colors.gray};
`;
