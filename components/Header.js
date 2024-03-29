'use client';

import React, { useState } from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import styled from 'styled-components';

import tjiLogo from '../images/tji-logo.svg';
import Button from '@/components/Button';

function Header() {
  const [menuHidden, setMenuHidden] = useState(true);

  return (
    <StyledHeader>
      <div className="inner-wrapper">
        <div className="logo">
          <Link href="/">
            <Image
              alt="Texas Justice Initiative Logo"
              src={tjiLogo}
              width={100}
              height={70}
            />
          </Link>
        </div>
        <Button
          aria-controls="primary-menu"
          aria-expanded="false"
          className="menu-toggle"
          onClick={() => setMenuHidden(!menuHidden)}
        >
          Menu
        </Button>
        {!menuHidden && <Overlay onClick={() => setMenuHidden(true)} />}
        <nav
          className={
            menuHidden
              ? 'hidden main-menu-wrapper'
              : 'visible main-menu-wrapper'
          }
        >
          <ul>
            <li className="desktop-menu has-submenu">
              <Button className="btn--link submenu-btn" variant="text">
                About
              </Button>
              <ul className="submenu">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/about-the-data">About the Data</Link>
                </li>
                <li>
                  <Link href="/related-organizations">
                    Related Organizations
                  </Link>
                </li>
              </ul>
            </li>
            {/** This structure is incorrect, we should improve the markup of the header overall */}
            <div className="mobile-menu">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/about-the-data">About the Data</Link>
              </li>
              <li>
                <Link href="/related-organizations">Related Organizations</Link>
              </li>
            </div>
            <li className="desktop-menu has-submenu">
              <Button className="btn--link submenu-btn" variant="text">
                Data
              </Button>
              <ul className="submenu">
                <li>
                  <Link href="/data">Interactive Data Tools</Link>
                </li>
                <li>
                  <Link href="/tcjs-reports">TCJS Reports</Link>
                </li>
              </ul>
            </li>
            <div className="mobile-menu">
              <li>
                <Link href="/data">Interactive Data Tools</Link>
              </li>
              <li>
                <Link href="/tcjs-reports">TCJS Reports</Link>
              </li>
            </div>
            <li>
              <Link href="/publications">Publications</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/donate" className="btn btn--donate">
                Donate
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </StyledHeader>
  );
}

export default Header;

const Overlay = styled.div`
  position: absolute;
  top: 90px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  height: calc(100vh - 90px);
  background-color: transparent;

  @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
    display: none;
  }
`;

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  padding: 2rem;
  width: 100%;
  position: sticky;
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
        width: 100%;
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
    display: inline-block;
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
    color: #cbcbcb;
    padding: 1rem 2.6rem;
    border: none;
    border-radius: 1rem;
    box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
    transition: all 0.35s;
    text-align: center;
    line-height: 1.25;
    font-size: 1.6rem;
    background-color: #ce2727;
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
