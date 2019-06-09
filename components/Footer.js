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
  }
`;

export default Footer;
