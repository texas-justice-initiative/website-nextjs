import React from 'react';
import styled from 'styled-components';
import CloudinaryImage from './CloudinaryImage';
import content from '../content/about-us.md';
import theme from '../theme';

const {
  attributes: {
    who: {
      donors: { donorLogos },
    },
  },
} = content;

const DonorThumbnails = () => (
  <Wrapper>
    {donorLogos.map((donorLogo, key) => (
      <div key={key}>
        <CloudinaryImage url={donorLogo.logo} alt={donorLogo.name} maxWidth={theme.integrations.cloudinary.halfMediumWidthPixels} />
      </div>
    ))}
  </Wrapper>
);

export default DonorThumbnails;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem;
  width: 100%;

  div {
    width: 50%;
    padding: 2rem;

    @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
      width: 33%;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
`;
