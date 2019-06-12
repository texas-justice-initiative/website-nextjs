import React from 'react';
import styled from 'styled-components';
import Parser from './Parser';

const BioBox = ({ bio }) => (
  <Bio>
    <div id="image">
      <img src={require(`../images/headshots/${bio.image}`)} alt={bio.name} />
    </div>
    <div id="text">
      <h3>{bio.name}</h3>
      <Parser>{bio.bio}</Parser>
    </div>
  </Bio>
);

export default BioBox;

const Bio = styled.div`
  padding-top: 2rem;

  @media (min-width: ${props => props.theme.medium}) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  div#image {
    flex: 1;
    min-width: 20%;
    img {
      width: 100%;

      @media (min-width: ${props => props.theme.medium}) {
        float: left;
      }
    }
  }

  div#text {
    @media (min-width: ${props => props.theme.medium}) {
      flex: 3;
      padding-left: 2rem;
    }
  }
`;
