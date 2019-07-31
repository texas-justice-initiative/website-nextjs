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
    width: 100%;
    line-height: 1.3;
  }

  /* Buttons */
  .btn {
    display: inline-block;
    font-family: ${props => props.theme.displayFont};
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
    color: ${props => props.theme.colors.white};
    font-size: 1.3rem;
    padding: 1rem 2.6rem;
    border: none;
    border-radius: 1rem;
    box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
    transition: all 0.35s;
    text-align: center;
    line-height: 1.25;
    font-size: 1.6rem;
  }

  .btn--primary {
    background-color: ${props => props.theme.colors.primaryBlue};
    color: ${props => props.theme.colors.white};

    &:hover {
      box-shadow: none;
      background-color: ${props => props.theme.colors.secondaryBlue};
    }
  }

  .btn--donate {
    background-color: ${props => props.theme.colors.primaryRed};
    color: ${props => props.theme.colors.white};

    &:hover {
      background-color: ${props => props.theme.colors.secondaryRed};
    }
  }
`;

export default GlobalStyle;
