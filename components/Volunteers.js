import React from 'react';
import styled from 'styled-components';
import CloudinaryImage from './CloudinaryImage';
import content from '../content/about-us.md';
import theme from '../theme';

const {
  attributes: {
    who: {
      volunteerTeam: { title: volunteersTitle, volunteers },
      teamAlumni: { title: alumniTitle, alumni },
    },
  },
} = content;

const Volunteers = () => (
  <div>
    <h2 className="align--center spacing--large">{volunteersTitle}</h2>
    <Wrapper>
      {volunteers.map(vol => (
        <figure key={vol.name}>
          <CloudinaryImage url={vol.headshot} alt={vol.name} maxWidth={theme.halfMediumWidthPixels} aspectRatio={1} />
          <figcaption>
            <h4>{vol.name}</h4>
            <span>{vol.title}</span>
          </figcaption>
        </figure>
      ))}
    </Wrapper>

    <h2 className="align--center spacing--large">{alumniTitle}</h2>
    <Wrapper>
      {alumni.map(alum => (
        <figure key={alum.name}>
          <CloudinaryImage url={alum.headshot} alt={alum.name} maxWidth={theme.halfMediumWidthPixels} aspectRatio={1} />
          <figcaption>
            <h4>{alum.name}</h4>
            <span>{alum.title}</span>
          </figcaption>
        </figure>
      ))}
    </Wrapper>
  </div>
);

export default Volunteers;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

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
