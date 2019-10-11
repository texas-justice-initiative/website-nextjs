/* eslint-disable global-require */

import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <div className="footer-section-container">
          <div className="footer-section footer-section__copyright">
            <Link href="/">
              <img src={require('../images/tji-logo-white.svg')} alt="TJI Logo" className="footer-logo" />
            </Link>{' '}
            <p>
              Copyright 2018 Texas Justice Initiative. All rights reserved.{' '}
              <a href="http://texasjusticeinitiative.org/disclaimer">Disclaimer</a>.
            </p>
          </div>
          <div className="footer-section footer-section__about-links">
            <h4 className="footer-section-title">About</h4>
            <Link href="/about">
              <a>About TJI</a>
            </Link>
            <br />
            <Link href="/about-the-data">
              <a>About the Data</a>
            </Link>
          </div>
          <div className="footer-section footer-section__data-links">
            <h4 className="footer-section-title">Data</h4>
            <Link href="/data">
              <a>Explore the Data</a>
            </Link>
            <br />
            <Link href="/publications">
              <a>Publications</a>
            </Link>
          </div>
          <div className="footer-section footer-section__get-involved-links">
            <h4 className="footer-section-title">Get Involved</h4>
            <Link href="/contact">
              <a>Volunteer</a>
            </Link>
            <br />
            <Link href="/donate">
              <a>Donate</a>
            </Link>
            <br />
            <Link href="/contact">
              <a>Contact Us</a>
            </Link>
          </div>
          <div className="footer-section footer-section__social-links">
            <h4 className="footer-section-title">Follow Us</h4>
            <a
              href="https://www.facebook.com/TXJusticeInitiative"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Texas Justice Initiative on Facebook"
            >
              <img src={require('../images/tji-fb-icon-yellow.svg')} alt="TJI Facebook" />
            </a>
            <a
              href="https://twitter.com/JusticeTexas"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Texas Justice Initiative on Twitter"
            >
              <img src={require('../images/tji-twitter-icon-yellow.svg')} alt="TJI Facebook" />
            </a>
            <a
              href="https://github.com/texas-justice-initiative"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Texas Justice Initiative on Github"
            >
              <img src={require('../images/tji-github-logo-yellow.svg')} alt="TJI Github" />
            </a>
          </div>
        </div>
        <hr />
        <div className="site-info">
          <p>
            TJI <a href="http://texasjusticeinitiative.org/thanks">appreciates</a> your creativity and talent.{' '}
            <Link href="/about">
              <a>Learn more</a>
            </Link>{' '}
            about the individuals and organizations who have helped us in our mission.
          </p>
        </div>
      </StyledFooter>
    );
  }
}

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.primaryBlue};
  color: white;
  font-size: ${props => props.theme.sidebarFont__size};
  padding: 2em;

  .footer-logo {
    max-width: 266px;
  }

  hr {
    border-width: 0.4px;
    max-width: ${props => props.theme.large};
    margin: 20px auto;
  }
  .footer-section-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 2em 0;
    max-width: ${props => props.theme.large};
    margin: auto;
    .footer-section {
      width: 50%;
      padding: 20px;

      @media screen and (min-width: ${props => props.theme.medium}) {
        width: auto;
        padding: 20px;
      }
      a {
        &:hover {
          color: ${props => props.theme.colors.secondaryBlue};
        }
        color: ${props => props.theme.colors.white};
        text-decoration: none;
      }
    }
    .footer-section:first-of-type {
      width: 100%;
      text-align: center;
      @media screen and (min-width: ${props => props.theme.medium}) {
        width: 266px;
        text-align: left;
      }
      h2 {
        color: ${props => props.theme.colors.white};
        font-size: 3rem;
      }
    }
    @media screen and (min-width: ${props => props.theme.medium}) {
      .footer-section:first-of-type {
        padding-left: 0;
      }
      .footer-section:last-of-type {
        padding-right: 0;
      }
    }
    .footer-section-title {
      font-size: 1.5rem;
      text-transform: uppercase;
      color: ${props => props.theme.colors.white};
      padding-bottom: 15px;
      @media screen and (min-width: ${props => props.theme.medium}) {
        padding-bottom: 30px;
      }
    }
    .footer-section__social-links {
      img {
        margin-right: 15px;
        height: 20px;
        @media screen and (min-width: ${props => props.theme.medium}) {
          height: 30px;
        }
      }
    }
  }
  .site-info {
    text-align: center;
    max-width: 400px;
    margin: auto;
    p {
      margin: 0;
    }
    a {
      &:hover {
        color: ${props => props.theme.colors.primaryBlue};
      }
      color: ${props => props.theme.colors.white};
      text-decoration: underline;
      font-weight: 700;
    }
  }
`;

export default Footer;
