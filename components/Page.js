import React, { Component } from 'react';
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

const StyledPage = styled.div``;

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 1068px;
  padding: 20rem 0 2rem;

  @media screen and (min-width: ${props => props.theme.medium}) {
    margin-top: 100px;
    display: flex;
    flex-flow: row nowrap;
  }
`;
