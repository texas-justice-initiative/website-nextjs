/* eslint-disable no-unused-vars, global-require, react/no-danger, jsx-a11y/anchor-is-valid */

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import MarkdownIt from 'markdown-it';
import moment from 'moment';
import CloudinaryImage from '../CloudinaryImage';
import newsfeed from '../../content/newsfeed.md';
import Parser from '../Parser';
import theme from '../../theme';

class NewsFeed extends React.Component {
  render() {
    const {
      html,
      attributes: { heading, intro, news },
    } = newsfeed;
    const md = new MarkdownIt();
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
            <p>
              We{' '}
              <Link href="/thanks">
                <a>appreciate</a>
              </Link>{' '}
              the support of our gracious donors and volunteers who make this happen.
            </p>
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
          <div className="news news__container">
            <h2 className="news__heading">{heading}</h2>
            <span className="news__tagline">{intro}</span>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <ul className="news__items">
              {news.map((item, k) => (
                <li className="news__item" key={k}>
                  {item.thumbnail && (
                    <div className="news__item__image">
                      <CloudinaryImage
                        url={item.thumbnail}
                        alt={item.title}
                        maxWidth={theme.newsItemImageWidthPixels}
                      />
                    </div>
                  )}
                  <div className="news__item__content">
                    <a href={item.link} className="news__item__read-more" target="_blank" rel="noopener noreferrer">
                      <h3>{item.title}</h3>
                    </a>
                    <div className="news__item__date">Published on {moment(item.date).format('MMMM D, YYYY')}</div>
                    {item.description && <Parser>{md.render(item.description)}</Parser>}
                  </div>
                </li>
              ))}
            </ul>
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

    .news__item__read-more {
      text-decoration: none;

      h3 {
        margin-bottom: 0;
      }
    }

    .news__tagline,
    .news__item__date {
      color: ${props => props.theme.colors.gray};
      font-size: ${props => props.theme.sidebarFont__size};
    }

    .news__item__date {
      margin: 0.5rem 0;
    }

    .news__item {
      display: flex;
      flex-wrap: wrap;
      margin: 2rem 0;
      padding: 1rem 0;
      border-bottom: 1px solid ${props => props.theme.colors.grayLightest};

      @media screen and (min-width: ${props => props.theme.medium}) {
        flex-wrap: nowrap;
      }

      &:last-of-type {
        border-bottom-width: 0;
      }

      .news__item__image {
        width: ${props => props.theme.newsItemImageWidthPixels}px;
        flex: 0 0 ${props => props.theme.newsItemImageWidthPixels}px;
      }

      .news__item__content {
        flex: 0 1 auto;
        padding: 2rem 0;

        p {
          color: ${props => props.theme.colors.grayDark};
          margin-top: 0.5rem;
        }

        @media screen and (min-width: ${props => props.theme.medium}) {
          padding: 0 0 0 2rem;
        }
      }

      img {
        width: 100%;
        height: auto;
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
