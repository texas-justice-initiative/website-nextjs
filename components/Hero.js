/* eslint-disable global-require */

import React from 'react';
import Image from "next/legacy/image";
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Load Images
import map from '../images/map-desktop.svg';

const Hero = ({ title, description }) => (
  <HeroContainer img={require('../images/map-desktop.svg')}>
    <Image src={map} alt="" layout="fill" objectFit="cover" quality={100} />
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
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.small}) {
    height: 700px;
  }

  .content-container {
    position: relative;
    background-color: white;
    max-width: 600px;
    padding: 3rem;
    text-align: center;
    border-top: 5px solid ${(props) => props.theme.colors.secondaryBlue};
    margin: 2rem;

    @media (max-width: ${(props) => props.theme.breakpoints.small}) {
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
