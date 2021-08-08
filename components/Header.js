/* eslint-disable global-require */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

// Load images
import tjiLogo from '../images/tji-logo.svg';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { menuHidden: true };
    this.aboutMenu = React.createRef();
    this.handleEventOutsideAboutMenu = this.handleEventOutsideAboutMenu.bind(this);
  }

  componentDidMount() {
    document.addEventListener('focusin', this.handleEventOutsideAboutMenu);
    document.addEventListener('mousedown', this.handleEventOutsideAboutMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('focusin', this.handleEventOutsideAboutMenu);
    document.removeEventListener('mousedown', this.handleEventOutsideAboutMenu);
  }

  handleEventOutsideAboutMenu = ({ target }) => {
    if (!this.aboutMenu) return;
    if (target === this.aboutMenu.current || this.aboutMenu.current.contains(target)) return;
    this.hideAboutMenu();
  };

  hideMenu = () => {
    this.setState(() => ({
      menuHidden: true,
    }));
  };

  showAboutMenu = () => {
    if (!this.aboutMenu) return;
    this.aboutMenu.current.setAttribute('open', 'open');
  };

  hideAboutMenu = () => {
    if (!this.aboutMenu) return;
    this.aboutMenu.current.removeAttribute('open');
  };

  handleMenuLinkClick = () => {
    this.hideMenu();
    this.hideAboutMenu();
  };

  handleMenuLinkKeyDown = e => {
    if (e.key === 'Escape') {
      this.hideMenu();
      this.hideAboutMenu();
    }
  };

  handleMenuToggle = () => {
    const { theme } = this.props;

    if (window.innerWidth <= parseInt(theme.medium)) {
      this.setState(prevState => ({
        menuHidden: !prevState.menuHidden,
      }));
    }
  };

  render() {
    const { menuHidden } = this.state;

    return (
      <StyledHeader>
        <div className="inner-wrapper">
          <div className="logo">
            <Link href="/">
              <a>
                <Image alt="Texas Justice Initiative Logo" src={tjiLogo} />
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
          <nav className={menuHidden ? 'hidden main-menu-wrapper' : 'visible main-menu-wrapper'}>
            <ul>
              <li className="desktop-about">
                <details ref={this.aboutMenu}>
                  <summary className="btn--link">About</summary>
                  <ul>
                    <AboutLinks onLinkClick={this.handleMenuLinkClick} onLinkKeyDown={this.handleMenuLinkKeyDown} />
                  </ul>
                </details>
              </li>
              <div className="mobile-about">
                <AboutLinks onLinkClick={this.handleMenuLinkClick} onLinkKeyDown={this.handleMenuLinkKeyDown} />
              </div>
              <li>
                <HeaderLink href="/data" onClick={this.handleMenuLinkClick} onKeyDown={this.handleMenuLinkKeyDown}>
                  Explore the Data
                </HeaderLink>
              </li>
              <li>
                <HeaderLink
                  href="/publications"
                  onClick={this.handleMenuLinkClick}
                  onKeyDown={this.handleMenuLinkKeyDown}
                >
                  Publications
                </HeaderLink>
              </li>
              <li>
                <HeaderLink href="/blog" onClick={this.handleMenuLinkClick} onKeyDown={this.handleMenuLinkKeyDown}>
                  Blog
                </HeaderLink>
              </li>
              <li>
                <HeaderLink
                  href="/donate"
                  onClick={this.handleMenuLinkClick}
                  onKeyDown={this.handleMenuLinkKeyDown}
                  className="btn btn--donate"
                >
                  Donate
                </HeaderLink>
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
  theme: PropTypes.object.isRequired,
};

class HeaderLink extends Component {
  render() {
    const { href, onClick, onKeyDown, className, children } = this.props;

    return (
      <Link href={href}>
        <a href={href} onClick={onClick} onKeyDown={onKeyDown} className={className}>
          {children}
        </a>
      </Link>
    );
  }
}

HeaderLink.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

class AboutLinks extends Component {
  render() {
    const { onLinkClick, onLinkKeyDown } = this.props;

    return (
      <React.Fragment>
        <li>
          <HeaderLink href="/about" onClick={onLinkClick} onKeyDown={onLinkKeyDown}>
            About Us
          </HeaderLink>
        </li>
        <li>
          <HeaderLink href="/about-the-data" onClick={onLinkClick} onKeyDown={onLinkKeyDown}>
            About the Data
          </HeaderLink>
        </li>
        <li>
          <HeaderLink href="/related-organizations" onClick={onLinkClick} onKeyDown={onLinkKeyDown}>
            Related Organizations
          </HeaderLink>
        </li>
      </React.Fragment>
    );
  }
}

AboutLinks.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  onLinkKeyDown: PropTypes.func.isRequired,
};

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.white};
  padding: 2rem;
  width: 100%;
  z-index: 1;
  box-shadow: 1px 2px 3px rgba(64, 64, 64, 0.35);

  @media (min-width: ${props => props.theme.breakpoints.medium}) {
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
    max-width: ${props => props.theme.breakpoints.large};
  }

  .logo {
    flex: 0 1 auto;
    padding-bottom: 15px;

    img {
      width: 80px;
    }

    @media (min-width: ${props => props.theme.breakpoints.medium}) {
      img {
        width: 150px;
      }
    }
  }

  /* Mobile Menu */

  @media (max-width: ${props => props.theme.breakpoints.medium}) {
    height: ${props => props.theme.breakpoints.mediumHeaderHeight};

    nav.main-menu-wrapper {
      padding: 2rem 1rem;
      width: 250px;
      height: calc(100vh - ${props => props.theme.breakpoints.mediumHeaderHeight});
      position: fixed;
      top: ${props => props.theme.breakpoints.mediumHeaderHeight};
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

    @media (min-width: ${props => props.theme.breakpoints.medium}) {
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

        @media (min-width: ${props => props.theme.breakpoints.medium}) {
          display: inline-block;
        }
      }

      ul {
        background-color: ${props => props.theme.colors.primaryBlue};
        padding: 0;

        @media (min-width: ${props => props.theme.breakpoints.medium}) {
          text-align: left;
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

    @media (min-width: ${props => props.theme.breakpoints.large}) {
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

    @media (min-width: ${props => props.theme.breakpoints.medium}) {
      margin-left: 2rem;
    }
  }

  details {
    summary {
      list-style: none;

      &::-webkit-details-marker {
        display: none;
      }
    }
  }

  .desktop-about {
    display: none;

    @media (min-width: ${props => props.theme.breakpoints.medium}) {
      display: block;
    }
  }

  .mobile-about {
    display: block;

    @media (min-width: ${props => props.theme.breakpoints.medium}) {
      display: none;
    }
  }
`;
