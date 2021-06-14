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
              <Link href="/disclaimer">
                <a>Disclaimer</a>
              </Link>
              .
            </p>
          </div>
          <div className="footer-section footer-section__about-links">
            <h4 className="footer-section-title">About</h4>
            <Link href="/about">
              <a>About Us</a>
            </Link>
            <br />
            <Link href="/about-the-data">
              <a>About the Data</a>
            </Link>
            <br />
            <Link href="/related-organizations">
              <a>Related Organizations</a>
            </Link>
          </div>
          <div className="footer-section footer-section__data-links">
            <h4 className="footer-section-title">Data & Analysis</h4>
            <Link href="/data">
              <a>Explore the Data</a>
            </Link>
            <br />
            <Link href="/publications">
              <a>Publications</a>
            </Link>
            <br />
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </div>
          <div className="footer-section footer-section__get-involved-links">
            <h4 className="footer-section-title">Get Involved</h4>
            <Link href="/volunteer">
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
              <img src={require('../images/tji-fb-icon-white.svg')} alt="TJI Facebook" />
            </a>
            <a
              href="https://twitter.com/JusticeTexas"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Texas Justice Initiative on Twitter"
            >
              <img src={require('../images/tji-twitter-icon-white.svg')} alt="TJI Facebook" />
            </a>
            <a
              href="https://github.com/texas-justice-initiative"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Texas Justice Initiative on Github"
            >
              <img src={require('../images/tji-github-logo-white.svg')} alt="TJI Github" />
            </a>
          </div>
        </div>
      </StyledFooter>
    );
  }
}

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.primaryBlue};
  color: white;
  font-size: ${props => props.theme.typography.sizes.body.small};
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
    padding: 0;
    max-width: ${props => props.theme.large};
    margin: auto;

    .footer-section {
      width: 50%;
      padding: 2em 0;

      @media screen and (min-width: ${props => props.theme.medium}) {
        width: auto;
        padding: 1em 0 0;
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
`;

export default Footer;
