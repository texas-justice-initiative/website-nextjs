/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Hero = ({ title }) => (
  <HeroContainer backgroundImage="/tji-donation-banner-website.png">
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
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    height: 150px;
  }

  .content-container {
    position: relative;
    padding: 3rem;
    text-align: center;
    margin: 2rem;

    .title {
      border-bottom: unset;
      font-size: 8rem;
      padding-top: 0;
      padding-bottom: 0;
      color: ${props => props.theme.colors.white};

      @media (max-width: ${props => props.theme.breakpoints.small}) {
        font-size: 4rem;
      }
    }
  }
`;
