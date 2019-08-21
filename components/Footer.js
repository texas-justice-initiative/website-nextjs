import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <div className="footer-section-container">
          <div className="footer-section footer-section__copyright">
            <h2>Texas Justice Initiative</h2>
            <p>
              Copyright 2018 Texas Justice Initiative. All rights reserved.{' '}
              <a href="http://texasjusticeinitiative.org/disclaimer">Disclaimer</a>.
            </p>
          </div>
          <div className="footer-section footer-section__about-links">
            <h4 class="footer-section-title">About</h4>
            <Link href="/about">About TJI</Link><br></br>
            <Link href="/about-the-data">About the Data</Link>
          </div>
          <div className="footer-section footer-section__data-links">
            <h4 class="footer-section-title">Data</h4>
            <Link href="/data">Explore the Data</Link><br></br>
            <Link href="/publications">Publications</Link>
          </div>
          <div className="footer-section footer-section__get-involved-links">
            <h4 class="footer-section-title">Get Involved</h4>
            <Link href="/contact">Volunteer</Link><br></br>
            <Link href="/donate">Donate</Link><br></br>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="footer-section footer-section__social-links">
            <h4 class="footer-section-title">Follow Us</h4>
            <a
              href="https://www.facebook.com/TXJusticeInitiative"
              target="_blank" rel="noopener"
              title="Visit Texas Justice Initiative on Facebook"
            >
              <img src={require('../images/tji-fb-icon-yellow.svg')} alt="TJI Facebook" />
            </a>
            <a href="https://twitter.com/JusticeTexas" target="_blank" rel="noopener" title="Visit Texas Justice Initiative on Twitter">
              <img src={require('../images/tji-twitter-icon-yellow.svg')} alt="TJI Facebook" />
            </a>
            <a href="https://github.com/texas-justice-initiative" target="_blank" rel="noopener" title="Visit Texas Justice Initiative on Github">
              <img src={require('../images/tji-github-logo-yellow.svg')} alt="TJI Github" />
            </a>
          </div>
        </div>
        <hr></hr>
        <div className="site-info">
          <p>
            TJI <a href="http://texasjusticeinitiative.org/thanks">appreciates</a> your creativity and talent. <Link href="/about">Learn more</Link> about the individuals and organizations who have helped us in our mission.
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
  hr {
    border-width: 0.4px;
    width: ${props => props.theme.large};
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
        font-weight: bold;
      }
    }
    .footer-section:first-of-type {
      width: 100%;
      text-align: center;
      @media screen and (min-width: ${props => props.theme.medium}) {
        width: 300px;
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
