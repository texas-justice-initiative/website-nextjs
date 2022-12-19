import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import content from '../content/new-content-banner.md';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
    this.dismiss = this.dismiss.bind(this);
    this.dismissedKey = `${content.attributes.name}BannerDismissed`;
  }

  componentDidMount() {
    if (localStorage.getItem(this.dismissedKey) !== 'true') {
      this.setState({ hidden: false });
    }
  }

  dismiss() {
    localStorage.setItem(this.dismissedKey, 'true');
    this.setState({ hidden: true });
  }

  render() {
    const { hidden } = this.state;
    const {
      attributes: { show, text, path },
    } = content;

    if (!show) {
      return null;
    }

    return (
      <StyledBanner className={hidden ? 'hidden' : ''}>
        <Callout>New</Callout>
        <Link href={path}>
          <a href={path}>{text}</a>
        </Link>
        <DismissButton onClick={this.dismiss}>ⓧ</DismissButton>
      </StyledBanner>
    );
  }
}

export default Banner;

const StyledBanner = styled.div`
  @keyframes slideInFromTop {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateY(0);
    }
  }

  animation: 0.8s ease-out 0s 1 slideInFromTop;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primaryBlue};
  color: ${(props) => props.theme.colors.white};
  padding: 2rem;
  text-align: center;

  a {
    &:hover {
      color: ${(props) => props.theme.colors.secondaryBlue};
    }
    color: ${(props) => props.theme.colors.white};
  }

  &.hidden {
    display: none;
  }
`;

const Callout = styled.span`
  border-radius: 0.75rem;
  padding: 0.1rem 0.6rem;
  margin-right: 1rem;
  text-transform: uppercase;
  background-color: ${(props) => props.theme.colors.secondaryBlue};
  font-size: 75%;
  box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
`;

const DismissButton = styled.button`
  margin-left: 1rem;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
`;
