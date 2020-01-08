/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Router from 'next/router';
import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../theme';
import { initGA, LogPageView } from './GoogleAnalytics';

// Fetch env variables
async function fetchData(url) {
  const res = await fetch(url);
  const params = await res.json();
  return params;
}

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);

  fetchData(`${window.location.origin}/.netlify/functions/fetch_env_vars`)
    .then(params => {
      initGA(params.analyticsID);
    })
    .then(() => {
      LogPageView();
    });
});

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = { headerMenuOpen: false };
    this.onHeaderMenuToggle = this.onHeaderMenuToggle.bind(this);
  }

  componentDidMount() {
    const url = `${window.location.origin}/.netlify/functions/fetch_env_vars`;
    fetchData(url)
      .then(params => {
        initGA(params.analyticsID);
      })
      .then(() => {
        LogPageView();
      });
  }

  onHeaderMenuToggle(menuHidden) {
    this.setState(() => ({ headerMenuOpen: !menuHidden }));
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage className={this.state.headerMenuOpen ? 'header-menu-open' : ''}>
          <Meta />
          <GlobalStyle />
          <Header onMenuToggle={this.onHeaderMenuToggle} theme={theme} />
          <div>{this.props.children}</div>
          <Footer />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;

Page.propTypes = {
  children: PropTypes.element.isRequired,
};

const StyledPage = styled.div`
  // Stop the page from scrolling when the menu is open on mobile
  @media (max-width: ${props => props.theme.medium}) {
    &.header-menu-open {
      height: 100vh;
      overflow: hidden;
    }
  }
`;
