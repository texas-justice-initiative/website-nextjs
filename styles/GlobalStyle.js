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

  h1, h2 {
    font-family: ${props => props.theme.displayFont};
  }

  h3, h4, h5, h6 {
    font-family: ${props => props.theme.bodyFont};
    font-weight: 400;
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

  ol {
    margin-left: 2rem;
  }
  ol>li {
    margin: 2rem 0;
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

  /* Mobile utilities */
  .mobile-only {
    @media screen and (min-width: ${props => props.theme.medium}) {
      display: none;
    }
  }

  /* Font styles */
  .text--blue {
    color: ${props => props.theme.colors.primaryBlue};
  }
  .text--red {
    color: ${props => props.theme.colors.primaryRed};
  }

  /* Sidebars */
  .sidebar {
    padding: 2rem;
    font-size: ${props => props.theme.sidebarFont__size};

  }
  .sidebar--subtle {
    background-color: ${props => props.theme.colors.grayLightest};
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
    padding: 1rem 2.6rem;
    border: none;
    border-radius: 1rem;
    box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
    transition: all 0.35s;
    text-align: center;
    line-height: 1.25;
    font-size: 1.6rem;

    :disabled {
      opacity: .4;
      cursor: not-allowed;
    }
  }
  
  .btn--disabled {
    opacity: .4;
    cursor: not-allowed;
  }

  .btn--primary {
    background-color: ${props => props.theme.colors.primaryBlue};
    color: ${props => props.theme.colors.white};

    &:hover {
      box-shadow: none;
      background-color: ${props => props.theme.colors.secondaryBlue};
    }
  }

  .btn--secondary {
    background-color: ${props => props.theme.colors.secondaryBlue};
    color: ${props => props.theme.colors.white};

    &:hover {
      box-shadow: none;
      background-color: ${props => props.theme.colors.tertiaryBlue};
    }
  }

  .btn--donate {
    background-color: ${props => props.theme.colors.primaryRed};
    color: ${props => props.theme.colors.white};

    &:hover {
      background-color: ${props => props.theme.colors.secondaryRed};
    }
  }

  .btn--simple {
    background: transparent;
    display: inline-block;
    font-family: ${props => props.theme.displayFont};
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1rem 2.6rem;
    border: none;
    text-align: center;
    line-height: 1.25;
    font-size: 1.6rem;    
  }

  /* Dividers */
  .divider--small {
    height: 1px;
    background-color: ${props => props.theme.colors.grayLighter};
    width: 100%;
    margin: 2rem 0;
  }

  .divider--large {
    height: 3px;
    background-color: ${props => props.theme.colors.grayLighter};
    width: 100%;
    margin: 4rem 0;
  }

  /* Social icons */
  .social-icon-row {
    display: flex;
    align-items: center;
  }

  .social-icon-row__link {
    width: 24px;
    margin-right: 1rem;
  }
`;

export default GlobalStyle;
