import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class DataCharts extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <h2>What Our Data Shows</h2>
          <p>
            This is a sampling of the data we collect and provide for public use with our easy to use data exploration
            tools. If you want to dive deeper into the data, head to our Explore the Data page.
          </p>
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default DataCharts;

const Wrapper = styled.div`
  order: 3;
  width: 100%;

  h2 {
    color: ${props => props.theme.colors.black};
    padding-bottom: 5px;
    border-bottom: 3px solid ${props => props.theme.colors.black};
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
    order: 3;
  }
`;
