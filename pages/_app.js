import React from 'react';
import App, { Container } from 'next/app';
import Page from '../components/Page';

// https://nextjs.org/docs/#custom-app

class CustomApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Page>
        <Container>
          <Component />
        </Container>
      </Page>
    );
  }
}

export default CustomApp;
