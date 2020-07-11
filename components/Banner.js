import React from 'react';
import styled from 'styled-components';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
    this.dismiss = this.dismiss.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('bannerDismissed') !== 'true') {
      this.setState({ hidden: false });
    }
  }

  dismiss() {
    localStorage.setItem('bannerDismissed', 'true');
    this.setState({ hidden: true });
  }

  render() {
    const { hidden } = this.state;

    return (
      <StyledBanner className={hidden ? 'hidden' : ''}>
        <div>
          We’ve released our 2019 Officer Involved Shootings Report. <a>Learn more</a> about the trends our analysis
          uncovered.
        </div>
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
  background-color: ${props => props.theme.colors.primaryBlue};
  color: ${props => props.theme.colors.white};
  padding: 2rem;
  text-align: center;

  a {
    &:hover {
      color: ${props => props.theme.colors.secondaryBlue};
    }
    color: ${props => props.theme.colors.white};
  }

  &.hidden {
    display: none;
  }
`;

const DismissButton = styled.button`
  margin-left: 1rem;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.white};
  text-decoration: none;
`;
