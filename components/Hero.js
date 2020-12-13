/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Hero = ({ title, description }) => (
  <HeroContainer img={require('../images/map-desktop.svg')}>
    <div className="content-container">
      <h1 className="title">{title}</h1>
      <h2 className="description">{description}</h2>
    </div>
  </HeroContainer>
);
export default Hero;

Hero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

const HeroContainer = styled.div`
  background-image: url(${props => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${props => props.theme.small}) {
    height: 700px;
  }

  .content-container {
    background-color: white;
    max-width: 600px;
    padding: 3rem;
    text-align: center;
    border-top: 5px solid ${props => props.theme.colors.secondaryBlue};
    margin: 2rem;

    @media (max-width: ${props => props.theme.small}) {
      width: 400px;
    }

    .title {
      border-bottom: unset;
      font-size: 3rem;
      padding-top: 0;
    }

    .description {
      color: black;
      font-weight: 500;
      line-height: 1.5;
    }
  }
`;
