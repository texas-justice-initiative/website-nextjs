import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Header = props => (
  <StyledHeader>
    <div id="logo">
      <Link href="/">
        <img src={require('../images/tji-logo.svg')} alt="TJI Logo" />
      </Link>
    </div>

    <nav>
      <div id="about">
        <button>About</button>
        <ul>
          <li>
            <Link href="/about">
              <a>About TJI</a>
            </Link>
          </li>
          <li>
            <Link href="/about-the-data">
              <a>About the Data</a>
            </Link>
          </li>
        </ul>
      </div>
      <Link href="/data">
        <a>Explore the Data</a>
      </Link>
      <Link href="/publications">
        <a>Publications</a>
      </Link>
      <Link href="/contact">
        <a>Contact Us</a>
      </Link>
      <Link href="/donate">
        <a id="donate-button">Donate</a>
      </Link>
    </nav>
  </StyledHeader>
);

export default Header;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 2.6rem 5rem;
  position: fixed;
  box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
  width: 100%;
  z-index: 1;

  #logo {
    flex: 1;

    img {
      width: 17rem;
    }
  }

  nav {
    padding-top: 4rem;
    text-align: right;

    div {
      display: inline-block;
      position: relative;

      &:hover ul {
        display: block;
      }

      button {
        padding-bottom: 2rem;
      }

      ul {
        display: none;
        width: 20rem;
        text-align: left;
        background-color: ${props => props.theme.colors.primaryBlue};
        position: absolute;
        margin-top: 2.6rem;
        top: 0;
        left: 0;
        padding: 0;
        z-index: 1;

        li {
          padding: 1rem 0.6rem;

          &:hover {
            background: ${props => props.theme.colors.black};
          }
          a {
            color: white;
            display: block;
            font-size: 1.2rem;
          }
        }
      }
    }
  }

  a,
  button {
    font-family: ${props => props.theme.displayFont};
    font-size: 1.6rem;
    display: inline-block;
    padding-right: 1rem;
    text-transform: uppercase;
    border: none;
    margin: 0 1rem;

    &:hover {
      text-decoration: none;
    }

    &#donate-button {
      background-color: #ce2727;
      padding: 1rem 1.6rem 0.7rem;
      border-radius: 0.4rem;
      color: #fff;
      box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
      transition: all 0.35s;
      margin: 0 auto;
    }
  }
`;
