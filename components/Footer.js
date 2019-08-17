import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import MailChimpForm from './MailChimpForm';

class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <div className="section-container">
          <div className="section section__copyright">
            <h2>Texas Justice Initiative</h2>
            <p>
              Copyright 2018 Texas Justice Initiative. All rights reserved.{' '}
              <a href="http://texasjusticeinitiative.org/disclaimer">Disclaimer</a>.
            </p>
          </div>
          <div className="section section__about-links">
            <h4 class="section-title">About</h4>
            <Link href="/about">About TJI</Link><br></br>
            <Link href="/about-the-data">About the Data</Link>
          </div>
          <div className="section section__data-links">
            <h4 class="section-title">Data</h4>
            <Link href="/data">Explore the Data</Link><br></br>
            <Link href="/publications">Publications</Link>
          </div>
          <div className="section section__get-involved-links">
            <h4 class="section-title">Get Involved</h4>
            <a href="">Volunteer</a><br></br>
            <Link href="/donate">Donate</Link><br></br>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="section section__social-links">
            <h4 class="section-title">Follow Us</h4>
            <a
              href="https://www.facebook.com/TXJusticeInitiative"
              target="_blank"
              title="Visit Texas Justice Initiative on Facebook"
            >
              <img src={require('../images/tji-fb-icon-yellow.svg')} alt="TJI Facebook" />
            </a>
            <a href="https://twitter.com/JusticeTexas" target="_blank" title="Visit Texas Justice Initiative on Twitter">
              <img src={require('../images/tji-twitter-icon-yellow.svg')} alt="TJI Facebook" />
            </a>
            <a href="https://github.com/texas-justice-initiative" target="_blank" title="Visit Texas Justice Initiative on Github">
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
  font-size: 12px;
  border-top: 1px solid #0b5d93;
  padding: 2em;
  hr {
    border-width: 0.4px;
    width: 80%;
    margin: 20px auto;
  }
  .section-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 2em 0;
    max-width: 1028px;
    margin: auto;
    .section__copyright {
      max-width: 300px;
      h2 {
        color: white;
        font-size: 3rem;
      }
    }
    .section-title {
      font-size: 1.5rem;
      text-transform: uppercase;
      color: white;
      padding-bottom: 30px;
    }
    .section {
      margin: 20px 0 0;
      a { 
        color: white;
        text-decoration: none;
        font-weight: bold;
      } 
    }
    .section__social-links {
      img {
        margin-right: 15px;
        height: 30px;
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
      text-decoration: underline;
      font-weight: 700;
    }
  }
`;

export default Footer;
