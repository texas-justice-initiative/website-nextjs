import React from 'react';
import styled from 'styled-components';
import { Image, Transformation } from 'cloudinary-react';
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
        <Image publicId={donorLogo.logo} cloud_name="texas-justice-initiative" secure="true" alt={donorLogo.name}>
          <Transformation width={theme.halfMediumWidthPixels} crop="scale" />
        </Image>
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

    @media screen and (min-width: ${props => props.theme.medium}) {
      width: 25%;
      padding: 0 2rem;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
`;
