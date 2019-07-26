import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

class Header extends Component {
  state = { menuHidden: true };

  handleMenuToggle = e => {
    // console.log(e.target);
    this.setState(prevState => ({
      menuHidden: !prevState.menuHidden,
    }));
  };

  render() {
    return (
      <StyledHeader>
        <div id="inner-wrapper">
          <div id="logo">
            <Link href="/">
              <img src={require('../images/tji-logo.svg')} alt="TJI Logo" />
            </Link>
          </div>
          <nav>
            <Link href="/donate">
              <a id="donate-button" className="button">
                Donate
              </a>
            </Link>
            <button
              id="menu-toggle"
              aria-controls="primary-menu"
              aria-expanded="false"
              type="button"
              className="button"
              onClick={this.handleMenuToggle}
            >
              Menu
            </button>
            <div id="main-menu-wrapper" className={this.state.menuHidden ? 'hidden' : ''}>
              <div id="about" className="submenu-wrapper">
                <button type="button">About</button>
                <ul className="submenu">
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
            </div>
          </nav>
        </div>
      </StyledHeader>
    );
  }
}

export default Header;

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.white};
  padding: 2.6rem 5rem 0;
  width: 100%;
  z-index: 1;

  @media (min-width: ${props => props.theme.medium}) {
    position: sticky;
    box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
    flex-direction: row;
  }
  #inner-wrapper {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: space-between;
    max-width: ${props => props.theme.large};

    @media (min-width: ${props => props.theme.medium}) {
      flex-direction: row;
    }
  }

  #logo {
    flex: 1;
    img {
      width: 17rem;
    }
  }

  nav {
    flex: 3;
    flex-direction: column;
    display: flex;
    align-items: center;
    text-align: center;

    @media (min-width: ${props => props.theme.medium}) {
      align-items: flex-end;
    }
    button.menu-toggle {
      @media (min-width: ${props => props.theme.medium}) {
        display: none;
      }
    }

    #main-menu-wrapper {
      width: 100%;
      @media (min-width: ${props => props.theme.medium}) {
        display: block;
        text-align: right;
        padding-top: 1.4rem;
      }

      &.hidden {
        display: none;

        @media (min-width: ${props => props.theme.medium}) {
          display: block;
        }
      }
    }
    div.submenu-wrapper {
      display: block;
      position: relative;

      @media (min-width: ${props => props.theme.medium}) {
        display: inline-block;
      }

      &:hover ul {
        display: block;
      }

      button {
        text-align: center;
        width: 100%;
        background-color: white;

        @media (min-width: ${props => props.theme.medium}) {
          padding-bottom: 2rem;
        }
      }

      ul {
        background-color: ${props => props.theme.colors.primaryBlue};
        margin-bottom: 2rem;
        padding: 0;

        @media (min-width: ${props => props.theme.medium}) {
          text-align: left;
          display: none;
          width: 20rem;
          position: absolute;
          margin-top: 2.6rem;
          top: 0;
          left: 0;
          z-index: 1;
          width: 22rem;
        }
        li {
          padding: 1rem 0.6rem;

          &:hover {
            background: ${props => props.theme.colors.black};
          }
          a {
            color: white;
            display: block;
            font-size: 1.2rem;
            margin-bottom: 0;
          }
        }
      }
    }
  }

  a,
  button {
    font-family: ${props => props.theme.displayFont};
    display: block;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    margin: 0;
    font-size: 1.3rem;
    margin-bottom: 2rem;

    @media (min-width: ${props => props.theme.medium}) {
      display: inline-block;
      padding-left: 2rem;
    }
    @media (min-width: ${props => props.theme.large}) {
      font-size: 1.6rem;
    }

    &:hover {
      text-decoration: none;
    }

    &.button {
      padding: 1rem 1.6rem 0.7rem;
      border-radius: 0.4rem;
      color: ${props => props.theme.colors.white};
      box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
      transition: all 0.35s;
      height: 3.7rem;
      cursor: pointer;
    }

    &#donate-button {
      background-color: ${props => props.theme.colors.primaryRed};
      display: block;
      margin-bottom: 2rem;
      text-align: center;
      width: 10rem;
    }

    &#menu-toggle {
      background-color: ${props => props.theme.colors.primaryBlue};
      @media (min-width: ${props => props.theme.medium}) {
        display: none;
      }
    }
  }
`;
