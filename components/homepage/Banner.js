import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class Banner extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <ColumnLeft>
            <h1>Since 2005, xxx deaths have been reported in Texas Custody</h1>
            <figure>
              Compelling image to convey our message.
            </figure>
          </ColumnLeft>
          <ColumnRight>
            <h3>So far this year...</h3>
            <table>
              <tr>
                <td>Deaths in custody:</td>
                <td>Civilians shot by officers:</td>
                <td>Civilian deaths by firearm:</td>
              </tr>
            </table>
            <div>
              <h3>Alarmed by these statistics?</h3>
              <p>Learn more about these shootings and how they compare to previous years.</p>
              <a href="/data/" className="tji-form-submit">
                Explore the Data
              </a>
            </div>
          </ColumnRight>
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default Banner;

const Wrapper 
= styled.div`
  order: 0;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  background: ${props => props.theme.colors.grayLighter};
  padding: 2rem;
`;

const ColumnLeft = styled.div`
  width: 100%;

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 75%;
    padding-right: 2rem;
  }

  figure {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background: ${props => props.theme.colors.grayLightest};
  }
`;

const ColumnRight = styled.div`
  width: 100%;

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 25%;
    padding-left: 2rem;
    border-left: 1px solid ${props => props.theme.black};
  }
`;