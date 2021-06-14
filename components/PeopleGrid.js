import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloudinaryImage from './CloudinaryImage';
import theme from '../theme';

class PeopleGrid extends React.Component {
  render() {
    const { title, people } = this.props;

    return (
      <div>
        <h2 className="align--center spacing--large">{title}</h2>
        <Wrapper>
          {people.map(person => (
            <figure key={person.name}>
              <CloudinaryImage
                url={person.headshot}
                alt={person.name}
                maxWidth={theme.halfMediumWidthPixels}
                aspectRatio={1}
              />
              <figcaption>
                <h4>{person.name}</h4>
                <span>{person.title}</span>
              </figcaption>
            </figure>
          ))}
        </Wrapper>
      </div>
    );
  }
}

PeopleGrid.propTypes = {
  title: PropTypes.string.isRequired,
  people: PropTypes.array.isRequired,
};

export default PeopleGrid;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  figure {
    width: 100%;
    margin-bottom: 1.6em;

    span {
      display: block;
      font-size: ${props => props.theme.typography.sizes.body.small};
      line-height: ${props => props.theme.lineHeights.sm};
    }

    @media (min-width: ${props => props.theme.small}) {
      margin-bottom: 0;
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
