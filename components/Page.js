import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../theme';

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <GlobalStyle />
          <Header />
          <InnerContainer>{this.props.children}</InnerContainer>
          <Footer />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;

Page.propTypes = {
  children: PropTypes.object,
};

const StyledPage = styled.div``;

const InnerContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  width: 100%;
`;
