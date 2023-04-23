/* eslint-disable global-require */

import React, { Component } from 'react';
import Image from 'next/legacy/image';
import styled from 'styled-components';
import Link from 'next/link';

// Images
import tjiLogo from '../images/tji-logo-white.svg';
import facebook from '../images/tji-fb-icon-white.svg';
import twitter from '../images/tji-twitter-icon-white.svg';
import github from '../images/tji-github-logo-white.svg';

const currentYear = new Date().getFullYear();

class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <div className="footer-section-container">
          <div className="footer-section footer-section__copyright">
            <Link href="/">
              <Image
                alt="Texas Justice Initiative Logo"
                src={tjiLogo}
                className="footer-logo"
                width={150}
                height={105}
              />
            </Link>{' '}
            <p>
              Copyright {currentYear} Texas Justice Initiative. All rights
              reserved. <Link href="/disclaimer">Disclaimer</Link>.
            </p>
          </div>
          <div className="footer-section footer-section__about-links">
            <h4 className="footer-section-title">About</h4>
            <Link href="/about">About Us</Link>
            <br />
            <Link href="/about-the-data">About the Data</Link>
            <br />
            <Link href="/related-organizations">Related Organizations</Link>
          </div>
          <div className="footer-section footer-section__data-links">
            <h4 className="footer-section-title">Data & Analysis</h4>
            <Link href="/data">Explore the Data</Link>
            <br />
            <Link href="/publications">Publications</Link>
            <br />
            <Link href="/blog">Blog</Link>
          </div>
          <div className="footer-section footer-section__get-involved-links">
            <h4 className="footer-section-title">Get Involved</h4>
            <Link href="/volunteer">Volunteer</Link>
            <br />
            <Link href="/donate">Donate</Link>
            <br />
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="footer-section footer-section__social-links">
            <h4 className="footer-section-title">Follow Us</h4>
            <a
              href="https://www.facebook.com/TXJusticeInitiative"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Texas Justice Initiative on Facebook"
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
              title="Visit Texas Justice Initiative on Twitter"
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
              title="Visit Texas Justice Initiative on Github"
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
      </StyledFooter>
    );
  }
}

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.colors.primaryBlue};
  color: white;
  font-size: ${(props) => props.theme.typography.sizes.body.small};
  padding: 2em;

  .footer-logo {
    max-width: 100px;
  }

  hr {
    border-width: 0.4px;
    max-width: ${(props) => props.theme.breakpoints.large};
    margin: 20px auto;
  }
  .footer-section-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 0;
    max-width: ${(props) => props.theme.breakpoints.large};
    margin: auto;

    .footer-section {
      width: 50%;
      padding: 2em 0;

      @media screen and (min-width: ${(props) =>
          props.theme.breakpoints.medium}) {
        width: auto;
        padding: 1em 0 0;
      }

      a {
        &:hover {
          color: ${(props) => props.theme.colors.secondaryBlue};
        }
        color: ${(props) => props.theme.colors.white};
        text-decoration: none;
      }
    }
    .footer-section:first-of-type {
      width: 100%;
      text-align: center;
      @media screen and (min-width: ${(props) =>
          props.theme.breakpoints.medium}) {
        width: 266px;
        text-align: left;
      }
      h2 {
        color: ${(props) => props.theme.colors.white};
        font-size: 3rem;
      }
    }
    @media screen and (min-width: ${(props) =>
        props.theme.breakpoints.medium}) {
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
      color: ${(props) => props.theme.colors.white};
      padding-bottom: 15px;
      @media screen and (min-width: ${(props) =>
          props.theme.breakpoints.medium}) {
        padding-bottom: 30px;
      }
    }
    .footer-section__social-links {
      a {
        margin-right: 15px;
      }
    }
  }
`;

export default Footer;
