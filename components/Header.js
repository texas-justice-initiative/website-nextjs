/* eslint-disable no-unused-vars, global-require, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, react/destructuring-assignment */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { menuHidden: true };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.menuHidden !== prevState.menuHidden) {
      this.props.onMenuToggle(this.state.menuHidden);
    }
  }

  handleMenuToggle = e => {
    // console.log(e.target);
    if (window.innerWidth <= parseInt(this.props.theme.medium)) {
      this.setState(prevState => ({
        menuHidden: !prevState.menuHidden,
      }));
    }
  };

  render() {
    return (
      <StyledHeader>
        <div className="inner-wrapper">
          <div className="logo">
            <Link href="/">
              <a>
                <img src={require('../images/tji-logo.svg')} alt="TJI Logo" />
              </a>
            </Link>
          </div>
          <button
            aria-controls="primary-menu"
            aria-expanded="false"
            type="button"
            className="btn btn--primary menu-toggle"
            onClick={this.handleMenuToggle}
          >
            Menu
          </button>
          <nav
            className={this.state.menuHidden ? 'hidden main-menu-wrapper' : 'visible main-menu-wrapper'}
            onClick={this.handleMenuToggle}
          >
            <ul>
              <li className="has-submenu">
                <button type="button" className="btn--link">
                  About
                </button>
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
                  <li>
                    <Link href="/related-organizations">
                      <a>Related Organizations</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/data">
                  <a>Explore the Data</a>
                </Link>
              </li>
              <li>
                <Link href="/publications">
                  <a>Publications</a>
                </Link>
              </li>
              <li>
                <Link href="/donate">
                  <a className="btn btn--donate">Donate</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </StyledHeader>
    );
  }
}

export default Header;

Header.propTypes = {
  onMenuToggle: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.white};
  padding: 2rem;
  width: 100%;
  z-index: 1;
  box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);

  @media (min-width: ${props => props.theme.medium}) {
    position: sticky;
    flex-direction: row;
    padding: 2.6rem 5rem 0;
  }

  .inner-wrapper {
    display: flex;
    margin: 0 auto;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    max-width: ${props => props.theme.large};
  }

  .logo {
    flex: 0 1 auto;
    padding-bottom: 15px;

    img {
      width: 80px;
    }

    @media (min-width: ${props => props.theme.medium}) {
      img {
        width: 150px;
      }
    }
  }

  /* Mobile Menu */

  @media (max-width: ${props => props.theme.medium}) {
    height: ${props => props.theme.mediumHeaderHeight};

    nav.main-menu-wrapper {
      padding: 2rem 1rem;
      width: 250px;
      height: calc(100vh - ${props => props.theme.mediumHeaderHeight});
      position: fixed;
      top: ${props => props.theme.mediumHeaderHeight};
      left: -250px;
      background: ${props => props.theme.colors.black};
      opacity: 0;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 999;
      -webkit-transition: left 0.25s ease;
      -moz-transition: left 0.25s ease;
      -ms-transition: left 0.25s ease;
      -o-transition: left 0.25s ease;
      transition: left 0.25s ease;

      &.visible {
        opacity: 1;
        left: 0;
        background-color: ${props => props.theme.colors.primaryBlue};
        -webkit-transition: left 0.25s ease;
        -moz-transition: left 0.25s ease;
        -ms-transition: left 0.25s ease;
        -o-transition: left 0.25s ease;
        transition: left 0.25s ease;
      }

      .btn--link {
        display: none;
      }

      ul {
        height: 100%;

        li {
          margin: 0;
          padding: 1rem 0;

          &.has-submenu {
            padding: 0;
          }
        }
      }

      a {
        margin: 0;
        color: ${props => props.theme.colors.white};

        &:hover {
          color: ${props => props.theme.colors.grayLight};
          background-color: ${props => props.theme.colors.primaryBlue};
        }
      }

      .btn--donate {
        position: absolute;
        bottom: 0;
        width: calc(100% - 2rem);
      }
    }
  }

  button.menu-toggle {
    font-size: 1rem;

    @media (min-width: ${props => props.theme.medium}) {
      display: none;
    }
  }

  /* End mobile menu */

  nav.main-menu-wrapper {
    ul {
      display: block;
      position: relative;

      li {
        padding-bottom: 1em;

        @media (min-width: ${props => props.theme.medium}) {
          display: inline-block;
        }

        &.has-submenu:hover > ul {
          display: block;
        }
      }

      ul {
        background-color: ${props => props.theme.colors.primaryBlue};
        padding: 0;

        @media (min-width: ${props => props.theme.medium}) {
          text-align: left;
          display: none;
          width: 20rem;
          position: absolute;
          margin-top: 4rem;
          margin-bottom: 2rem;
          top: 0;
          left: 0;
          z-index: 1;
          width: 26rem;

          li {
            display: block;
            padding: 0.5rem 0.6rem;

            &:first-child {
              padding-top: 1rem;
            }

            &:last-child {
              padding-bottom: 1rem;
            }

            &:hover {
              background: ${props => props.theme.colors.secondaryBlue};
            }
            a {
              color: ${props => props.theme.colors.white};
              display: block;
              font-size: 1.2rem;
              margin-bottom: 0;

              &:hover {
                color: ${props => props.theme.colors.white};
              }
            }
          }
        }
      }
    }
  }

  a,
  .btn--link {
    color: ${props => props.theme.colors.primaryBlue};
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 1px;
    margin: 0 1rem;

    &:hover {
      color: ${props => props.theme.colors.secondaryBlue};
    }

    @media (min-width: ${props => props.theme.large}) {
      font-size: 1.6rem;
    }
  }

  .btn--link {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 1.6rem;
    cursor: pointer;
  }

  .btn--donate {
    margin: 0;
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.white};

    &:hover {
      background-color: ${props => props.theme.colors.secondaryRed};
      color: ${props => props.theme.colors.white};
    }

    @media (min-width: ${props => props.theme.medium}) {
      margin-left: 2rem;
    }
  }
`;
