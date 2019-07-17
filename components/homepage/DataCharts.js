import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class DataCharts extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          Data Charts
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default DataCharts;

const Wrapper = styled.div`
  width: 100%;
`;
