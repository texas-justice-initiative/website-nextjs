import React, { useContext } from 'react';
import styled from 'styled-components';
import CloudinaryImage from '../CloudinaryImage';
import Parser from '../Parser';
import theme from '../../theme';
import { LayoutContext } from '../People/LayoutContext';

const md = require('markdown-it')({
  html: true,
});

/**
 * Create a component to show a group of people with multiple layout options
 */

export interface PersonProps {
  name: string;
  title?: string;
  headshot?: string;
  biography?: string;
}

function Person(props: PersonProps) {
  const { name, title, headshot, biography } = props;
  const layout = useContext(LayoutContext);

  return (
    <StyledPerson className={layout}>
      {headshot && (
        <div className="person__image">
          <CloudinaryImage
            url={headshot}
            alt={name}
            maxWidth={theme.integrations.cloudinary.smallWidthPixels}
          />
        </div>
      )}
      <div className="person__content">
        <h3>{name}</h3>
        {title && <p>{title}</p>}
        {biography && <Parser>{md.render(biography)}</Parser>}
      </div>
    </StyledPerson>
  );
}

export default Person;

const StyledPerson = styled.article`
  &.row {
    display: flex;
    flex-flow: row wrap;

    &:not(:last-of-type) {
      margin-bottom: 32px;
    }

    @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
      flex-wrap: nowrap;
      column-gap: 24px;
    }

    .person__image {
      @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
        flex: 0 0 200px;

        img {
          width: 100%;
        }
      }
    }

    .person__content {
      @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
        flex: 0 1 auto;
      }
    }
  }
  &.cards {
    img {
      width: 100%;
    }
  }
`;
