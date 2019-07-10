import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Primary from '../components/Primary';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const pageTitle = 'Support TJI';

class Page extends React.Component {
  render() {
    const client = {
      sandbox: 'AZ2LDJwEbuFjH45Izqk5pmxHtyzxtooUPBCrvrn7tjKXIbv-xGxXsflhCMGl6dy2tRBEliztwiPzCckc',
      production: 'YOUR-PRODUCTION-APP-ID',
    };
    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <Primary>
          <h1>{pageTitle}</h1>
          <p>
            Texas Justice Initiative is entirely supported through public donations. If you feel like this is a useful
            resource, please help us through a donation. Funding helps us continue to grow and improve the data we
            provide.
          </p>
          <p>
            You can also donate conveniently through our{' '}
            <a
              href="https://www.facebook.com/donate/605145886526139/10106361188494357/"
              target="_blank"
              ref="noreferrer noopener"
            >
              Facebook Page
            </a>
            .
          </p>
          <form>
            <label>First Name</label>
            <input name="firstName" type="text" />
            <label>Last Name</label>
            <input name="lastName" type="text" />
            <label>Email Address</label>
            <input name="emailAddress" type="email" />
          </form>
          <PaypalExpressBtn client={client} currency={'USD'} total={1.0} />
        </Primary>
      </React.Fragment>
    );
  }
}

export default Page;
