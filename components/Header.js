/* eslint-disable max-classes-per-file */
/* eslint-disable global-require */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from "next/legacy/image";
import Link from 'next/link';
import styled from 'styled-components';

import tjiLogo from '../images/tji-logo.svg';

function Header() {
  const [menuHidden, setMenuHidden] = useState(true);

  return (
    <StyledHeader>
      <div className="inner-wrapper">
        <div className="logo">
          <Link href="/">

            <Image alt="Texas Justice Initiative Logo" src={tjiLogo} width={100} height={70} />

          </Link>
        </div>
        <button
          aria-controls="primary-menu"
          aria-expanded="false"
          type="button"
          className="btn btn--primary menu-toggle"
          onClick={() => setMenuHidden(!menuHidden)}
        >
          Menu
        </button>
        <nav className={menuHidden ? 'hidden main-menu-wrapper' : 'visible main-menu-wrapper'}>
          <ul>
            <li className="desktop-menu has-submenu">
              <button type="button" className="btn--link submenu-btn">
                About
              </button>
              <ul className="submenu">
                <AboutLinks />
              </ul>
            </li>
            <div className="mobile-menu">
              <AboutLinks />
            </div>
            <li className="desktop-menu has-submenu">
              <button type="button" className="btn--link submenu-btn">
                Data
              </button>
              <ul className="submenu">
                <DataLinks />
              </ul>
            </li>
            <div className="mobile-menu">
              <DataLinks />
            </div>
            <li>
              <HeaderLink href="/publications">Publications</HeaderLink>
            </li>
            <li>
              <HeaderLink href="/blog">Blog</HeaderLink>
            </li>
            <li>
              <HeaderLink href="/donate" className="btn btn--donate">
                Donate
              </HeaderLink>
            </li>
          </ul>
        </nav>
      </div>
    </StyledHeader>
  );
}

export default Header;

function HeaderLink({ href, className, children }) {
  return (
    (<Link href={href} className={className}>

      {children}

    </Link>)
  );
}

HeaderLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

function AboutLinks() {
  return (
    <>
      <li>
        <HeaderLink href="/about">About Us</HeaderLink>
      </li>
      <li>
        <HeaderLink href="/about-the-data">About the Data</HeaderLink>
      </li>
      <li>
        <HeaderLink href="/related-organizations">Related Organizations</HeaderLink>
      </li>
    </>
  );
}

/**
 * todo: Refactor submenu into component
 */
function DataLinks() {
  return (
    <>
      <li>
        <HeaderLink href="/data">Interactive Data Tools</HeaderLink>
      </li>
      <li>
        <HeaderLink href="/tcjs-reports">TCJS Reports</HeaderLink>
      </li>
    </>
  );
}

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  padding: 2rem;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
  box-shadow: 1px 2px 3px rgba(64, 64, 64, 0.35);

  @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
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
    max-width: ${(props) => props.theme.site.maxWidth};

    @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
      align-items: stretch;
    }
  }

  .logo {
    flex: 0 1 60px;

    img {
      max-width: 100%;
    }

    @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
      flex: 0 1 80px;
      padding-bottom: 15px;
    }

    @media (min-width: ${(props) => props.theme.breakpoints.large}) {
      flex: 0 1 100px;
    }
  }

  /* Mobile Menu */

  @media (max-width: ${(props) => props.theme.breakpoints.smallMax}) {
    height: ${(props) => props.theme.mediumHeaderHeight};

    nav.main-menu-wrapper {
      padding: 2rem 1rem;
      width: 250px;
      height: calc(100vh - ${(props) => props.theme.mediumHeaderHeight});
      position: fixed;
      top: ${(props) => props.theme.mediumHeaderHeight};
      left: -250px;
      background: ${(props) => props.theme.colors.black};
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
        background-color: ${(props) => props.theme.colors.primaryBlue};
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
        color: ${(props) => props.theme.colors.white};

        &:hover {
          color: ${(props) => props.theme.colors.grayLight};
          background-color: ${(props) => props.theme.colors.primaryBlue};
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

    @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
      display: none;
    }
  }

  /* End mobile menu */

  nav.main-menu-wrapper {
    > ul {
      @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        position: relative;
        margin-top: 0;
        margin-bottom: 0;
        height: 100%;

        > li {
          height: 100%;
        }
      }

      li {
        padding-bottom: 0;

        @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          &:hover {
            ul {
              display: block;
            }
          }
        }
      }

      ul {
        display: none;
        background-color: ${(props) => props.theme.colors.primaryBlue};
        padding: 0;

        @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
          text-align: left;
          width: 20rem;
          position: absolute;
          margin-top: 0;
          margin-bottom: 0;
          top: calc(100% - 2rem);
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
              background: ${(props) => props.theme.colors.secondaryBlue};
            }
            a {
              color: ${(props) => props.theme.colors.white};
              display: block;
              font-size: 1.2rem;
              margin-bottom: 0;

              &:hover {
                color: ${(props) => props.theme.colors.white};
              }
            }
          }
        }
      }
    }
  }

  a,
  .btn--link {
    color: ${(props) => props.theme.colors.primaryBlue};
    text-decoration: none;
    text-transform: uppercase;
    font-size: 1.35rem;
    font-weight: 400;
    letter-spacing: 1px;
    margin: 0 1rem;

    &:hover {
      color: ${(props) => props.theme.colors.secondaryBlue};
    }

    @media (min-width: ${(props) => props.theme.breakpoints.large}) {
      font-size: 1.6rem;
    }
  }

  .btn--link {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .btn--donate {
    margin: 0;
    color: ${(props) => props.theme.colors.white};

    &:hover {
      background-color: ${(props) => props.theme.colors.secondaryRed};
      color: ${(props) => props.theme.colors.white};
    }

    @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
      margin-left: 2rem;
    }
  }

  .desktop-menu {
    display: none;

    @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
      display: block;
    }
  }

  .mobile-menu {
    display: block;

    @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
      display: none;
    }
  }
`;
