import React from 'react';
import styled from 'styled-components';
import volunteers from '../data/volunteers';

const Volunteers = () => (
  <Wrapper>
    {volunteers.map(vol => {
      // Documentation about using src and srcset with `next-optimized-images`
      // https://www.npmjs.com/package/next-optimized-images

      const imageSizes = require(`../images/headshots/${vol.image}?resize`);

      return (
        <figure key={vol.image}>
          <img src={imageSizes.src} srcSet={imageSizes.srcSet} alt={vol.name} />
          <figcaption>
            {vol.name}, <em>{vol.title}</em>
          </figcaption>
        </figure>
      );
    })}
  </Wrapper>
);

export default Volunteers;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  figure {
    width: 100%;

    @media (min-width: ${props => props.theme.small}) {
      padding: 2rem;
      max-width: 50%;
    }
    @media (min-width: ${props => props.theme.medium}) {
      max-width: 33%;
    }
    img {
      width: 100%;
    }
  }
`;
