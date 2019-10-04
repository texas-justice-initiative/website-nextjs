import React from 'react';
import styled from 'styled-components';
import volunteers from '../data/volunteers';

const Volunteers = () => (
  <Wrapper>
    {volunteers.map(vol => (
      // Documentation about using src and srcset with `next-optimized-images`
      // https://www.npmjs.com/package/next-optimized-images

      <figure key={vol.name}>
        <img src={vol.imageSizes.src} srcSet={vol.imageSizes.srcSet} alt={vol.name} />
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
