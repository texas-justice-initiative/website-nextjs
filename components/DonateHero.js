/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Hero = ({ title }) => (
  <HeroContainer backgroundImage="/tji-donation-banner.png">
    <div className="content-container">
      <h1 className="title">{title}</h1>
    </div>
  </HeroContainer>
);
export default Hero;

Hero.propTypes = {
  title: PropTypes.string,
};

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    height: 250px;
  }

  .content-container {
    position: relative;
    background-color: white;
    max-width: 600px;
    padding: 3rem;
    text-align: center;
    border-top: 5px solid ${props => props.theme.colors.secondaryBlue};
    margin: 2rem;

    @media (max-width: ${props => props.theme.breakpoints.small}) {
      width: 400px;
    }

    .title {
      border-bottom: unset;
      font-size: 3rem;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
`;
