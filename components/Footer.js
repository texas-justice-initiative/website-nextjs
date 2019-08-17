import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import MailChimpForm from './MailChimpForm';

class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <div className="social-links">
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
        <div className="site-info">
          <p>
            Copyright 2018 Texas Justice Initiative. All rights reserved.{' '}
            <a href="http://texasjusticeinitiative.org/disclaimer">Disclaimer</a>.
          </p>
          <p>
            TJI <a href="http://texasjusticeinitiative.org/thanks/">appreciates</a> your creativity and talent.
          </p>
        </div>
      </StyledFooter>
    );
  }
}

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.primaryBlue};
  color: #0b5d93;
  font-size: 12px;
  border-top: 1px solid #0b5d93;
  padding: 2em;
  .newsletter-container {
    font-family: Museo, Arial, Helvetica, sans-serif;
    padding: 20px 50px;
    .newsletter-cta {
      font-size: 26px;
    }
  }
  .section-title {
    font-size: 1.5rem;
    text-transform: uppercase;
    color: white;
    padding-bottom: 20px;
  }
  .site-info {
    text-align: center;
    p {
      margin: 0;
    }
    a {
      text-decoration: underline;
      font-weight: 700;
    }
  }
  .social-links {
    margin: 20px 50px 0;
    img {
      margin-right: 15px;
      height: 30px;
    }
  }
`;

export default Footer;
