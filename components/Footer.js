import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import MailChimpForm from './MailChimpForm';

class Footer extends Component {
  render() {
    return (
      <StyledFooter>
        <p className="newsletter-cta">Subscribe to Our Newsletter</p>
        <MailChimpForm />

        <div className="social-links">
          <a
            href="https://www.facebook.com/TXJusticeInitiative"
            target="_blank"
            title="Visit Texas Justice Initiative on Facebook"
          >
            <img src={require('../images/tji-fb-icon.svg')} alt="TJI Facebook" />
          </a>
          <a href="https://twitter.com/JusticeTexas" target="_blank" title="Visit Texas Justice Initiative on Twitter">
            <img src={require('../images/tji-twitter-icon.svg')} alt="TJI Facebook" />
          </a>
        </div>

        <div id="logo">
          <Link href="/">
            <img src={require('../images/tji-logo.svg')} alt="TJI Logo" />
          </Link>
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
  background-color: #ebebeb;
  color: #0b5d93;
  font-size: 12px;
  border-top: 1px solid #0b5d93;
  padding: 2em;

  .newsletter-cta {
    font-size: 26px;
  }
  #logo {
    text-align: center;
    img {
      height: 100px;
    }
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
  .social-links img {
    height: 40px;
    margin-right: 10px;
  }
`;

export default Footer;
