import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* @import url('https://use.typekit.net/ccq8qac.css'); */

  html, body, #screen {
    min-height: 100%;
  }

  html {
    box-sizing: border-box;
    /* Set font-size to 10px to make rem math easier
      ie. 1.6rem == 16px */
    font-size: 10px;  
    width: 100%;
    overflow-x: hidden;
  }

  *, *::before, *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  body {
    background: white;
    padding: 0;
    margin: 0;
    font-family: ${props => props.theme.bodyFont};
    font-size: ${props => props.theme.bodyFont__size};
    line-height: 2.4rem;
    color: ${props => props.theme.colors.black};

  }

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.primaryBlue};
    letter-spacing: 1px;
    line-height: 1.25;
  }

  h1 {
    padding: 2.2rem 0;
    border-bottom: 1px solid ${props => props.theme.colors.grayLight}; 
  }

  p {
    margin: 1.6rem 0 2.4rem;
  }
  a, button {
    color: ${props => props.theme.colors.primaryBlue};
    text-decoration: underline;
  }

  ul {
    list-style: none;
  }

  .align--center {
    text-align: center;
  }

  .spacing--large {
    margin: 4rem 0;
  }

  /* Font styles */
  .text--blue {
    color: ${props => props.theme.colors.primaryBlue};
  }
  .text--red {
    color: ${props => props.theme.colors.primaryRed};
  }

  /* Form controls */

  input[type=text],
  input[type=email],
  input[type=tel] {
    font-size: 1.6rem;
    border: 1px solid ${props => props.theme.colors.grayLight};
    padding: 6px 10px;
    height: 38px;
    width: 100%;
    line-height: 1.3;    
    margin: 1rem 0;
  }

  .tji-form-submit,
  button {
    background-color: ${props => props.theme.colors.primaryBlue};
    color: ${props => props.theme.colors.white};
    width: 150px;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.35s;
    border: 1px solid #ddd;
    font-size: 1em !important;
    padding: 10px 15px !important;
    border-radius: 0 !important;
  }
`;

export default GlobalStyle;
