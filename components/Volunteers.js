import React from 'react';
import styled from 'styled-components';
import { Image, Transformation } from 'cloudinary-react';
import content from '../content/about-us.md';
import theme from '../theme';

const {
  attributes: {
    who: {
      volunteerTeam: { volunteers },
    },
  },
} = content;

const Volunteers = () => (
  <Wrapper>
    {volunteers.map(vol => (
      // Documentation about using src and srcset with `next-optimized-images`
      // https://www.npmjs.com/package/next-optimized-images

      <figure key={vol.name}>
        <Image publicId={vol.headshot} cloud_name="texas-justice-initiative" secure="true" alt={vol.name}>
          <Transformation width={theme.halfMediumWidthPixels} crop="scale" aspect_ratio="1" />
        </Image>
        <figcaption>
          <h4>{vol.name}</h4>
          <span>{vol.title}</span>
        </figcaption>
      </figure>
    ))}
  </Wrapper>
);

export default Volunteers;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  figure {
    width: 100%;

    span {
      display: block;
      font-size: 14px;
    }

    @media (min-width: ${props => props.theme.small}) {
      padding: 2rem;
      max-width: 50%;
    }
    @media (min-width: ${props => props.theme.medium}) {
      max-width: 25%;
    }
    img {
      width: 100%;
    }
  }
`;
