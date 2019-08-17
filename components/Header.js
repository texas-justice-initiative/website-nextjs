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
          <button
            aria-controls="primary-menu"
            aria-expanded="false"
            type="button"
            className="btn btn--primary menu-toggle"
            onClick={this.handleMenuToggle}
          >
            Menu
          </button>
          <nav className={this.state.menuHidden ? 'hidden' : 'visible'} onClick={this.handleMenuToggle}>
            <div className="main-menu-wrapper">
              <div id="about" className="submenu-wrapper">
                <button type="button" className="btn--link">About</button>
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
              <Link href="/donate">
                <a className="btn btn--donate">Donate</a>
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
  padding: 2rem;
  width: 100%;
  z-index: 1;

  @media (min-width: ${props => props.theme.medium}) {
    position: sticky;
    box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
    flex-direction: row;
    padding: 2.6rem 5rem 0;
  }

  #inner-wrapper {
    display: flex;
    margin: 0 auto;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    max-width: ${props => props.theme.large};
  }

  #logo {
    flex: 1;
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
    height: 90px;

    nav {
      width: 100vw;
      height: calc(100vh - 90px);
      position: fixed;
      top: 90px;
      left: -100vw;
      background: ${props => props.theme.colors.black};
      opacity: 0;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 999;

      .main-menu-wrapper {
        position: relative;
        left: -100vw;
        display: flex;
        flex-flow: column;
        padding: 2rem 1rem;
        height: 100%;
        width: 200px;
        -webkit-transition: left 0.25s ease;
        -moz-transition: left 0.25s ease;
        -ms-transition: left 0.25s ease;
        -o-transition: left 0.25s ease;
        transition: left 0.25s ease;
      }

      &.visible {
        left: 0%;
        opacity: 1;
        background: rgba(0,0,0,0.5);

        .main-menu-wrapper {
          left: 0;
          background-color: ${props => props.theme.colors.primaryBlue};
        }
      }

      .btn--link {
        display: none;
      }

      div.submenu-wrapper {
        ul {

          li {
            &:first-child {
              margin: 2rem 0;
            }
            &:last-child {
              margin-bottom: 1rem;
            }

            &:hover {
              background-color: ${props => props.theme.colors.primaryBlue};
            }
          }
        }
      }

      a {
        margin: 1rem 0;
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

  nav {

    .main-menu-wrapper {
      @media (min-width: ${props => props.theme.medium}) {
        display: block;
        width: 100%;
        text-align: right;
        padding-top: 1.4rem;
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

      ul {
        background-color: ${props => props.theme.colors.primaryBlue};
        padding: 0;

        @media (min-width: ${props => props.theme.medium}) {
          text-align: left;
          display: none;
          width: 20rem;
          position: absolute;
          margin-top: 2.6rem;
          margin-bottom: 2rem;
          top: 0;
          left: 0;
          z-index: 1;
          width: 22rem;

          li {
            padding: 1rem 0.6rem;

            &:hover {
              background: ${props => props.theme.colors.secondaryBlue};
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
  }

  a,
  .btn--link {
    color: ${props => props.theme.colors.primaryBlue};
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 300;
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
