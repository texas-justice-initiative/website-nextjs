import React from 'react';
import styled from 'styled-components';
import Person, { PersonProps } from '../Person/';
import { LayoutContext } from './LayoutContext';

type Layout = 'row' | 'cards';

export interface PeopleProps {
  people: PersonProps[];
  layout?: Layout;
}

function People(props: PeopleProps) {
  const { people, layout = 'row' } = props;

  return (
    <LayoutContext.Provider value={layout}>
      <StyledCards className={layout}>
        {people.map((person) => (
          <Person key={person.name} {...person} />
        ))}
      </StyledCards>
    </LayoutContext.Provider>
  );
}

export default People;

const StyledCards = styled.div`
  &.cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    width: 100%;

    @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: ${(props) => props.theme.breakpoints.large}) {
      grid-template-columns: repeat(4, 1fr);
    }

    > * {
      @media (min-width: ${(props) => props.theme.breakpoints.medium}) {
      }
    }
  }
`;
