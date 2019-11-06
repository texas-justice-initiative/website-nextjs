/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../theme';

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
          <GlobalStyle />
          <Header onMenuToggle={this.onHeaderMenuToggle} theme={theme} />
          <InnerContainer>{this.props.children}</InnerContainer>
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

const InnerContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  width: 100%;
  max-width: ${props => props.theme.large};
  margin: 4rem auto;

  @media (min-width: ${props => props.theme.medium}) {
    flex-flow: row nowrap;
  }

  @media (min-width: ${props => props.theme.medium}) and (max-width: calc(1028px + 2rem)) {
    padding: 0 2rem;
  }
`;
