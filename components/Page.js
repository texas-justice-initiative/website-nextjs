import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';
import Meta from './Meta';
import GlobalStyle from '../styles/GlobalStyle';

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <GlobalStyle />
          <Header />
          <InnerContainer>{this.props.children}</InnerContainer>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;

const theme = {
  blue: '#0b5d93',
  red: '#ce2727',
  black: '#404040',
  fontFamily: 'arial',
  siteTitle: 'Texas Justice Initiative',
};

const StyledPage = styled.div``;

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 1068px;
  padding: 14rem 0 2rem;
`;
