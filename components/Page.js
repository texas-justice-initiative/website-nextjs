/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { DefaultSeo } from 'next-seo';
import Banner from './Banner';
import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../theme';
import GoogleAnalytics from './GoogleAnalytics';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = { headerMenuOpen: false };
    this.onHeaderMenuToggle = this.onHeaderMenuToggle.bind(this);
  }

  onHeaderMenuToggle(menuHidden) {
    this.setState(() => ({ headerMenuOpen: !menuHidden }));
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage className={this.state.headerMenuOpen ? 'header-menu-open' : ''}>
          <Meta />
          <GoogleAnalytics />
          <GlobalStyle />
          <Banner />
          <Header onMenuToggle={this.onHeaderMenuToggle} theme={theme} />
          <DummyDiv />
          <DefaultSeo
            title="Oversight of the Texas Criminal Justice System"
            titleTemplate="%s | Texas Justice Initiative"
            defaultTitle="Oversight for criminal justice data throughout Texas"
            description="Nonprofit organization that collects, analyzes, publishes and provides oversight for criminal justice data throughout Texas."
            openGraph={{
              type: 'website',
              locale: 'en_IE',
              url: 'https://texasjusticeinitiative.org',
              images: [
                {
                  url: 'https://texasjusticeinitiative.org/texas-justice-initiative-large.png',
                  width: 1000,
                  height: 636,
                  alt: 'Texas Justice Initiative',
                },
              ],
            }}
            twitter={{
              handle: '@JusticeTexas',
              site: '@JusticeTexas',
              cardType: 'summary_large_image',
            }}
          />
          <div>{this.props.children && this.props.children}</div>
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
  @media (max-width: ${(props) => props.theme.breakpoints.medium}) {
    &.header-menu-open {
      height: 100vh;
      overflow: hidden;
    }
  }
`;

const DummyDiv = styled.div`
  height: ${(props) => props.theme.mediumHeaderHeight};
  width: 100%;

  @media (min-width: ${(props) => props.theme.breakpoints.smallMax}) {
    height: 0px;
  }
`;
