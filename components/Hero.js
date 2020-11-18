import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Hero = ({ title, description }) => (
  <HeroContent>
    {title}
    {description}
  </HeroContent>
);
export default Hero;

Hero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

const HeroContent = styled.div``;
