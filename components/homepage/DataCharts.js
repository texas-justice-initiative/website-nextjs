import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class DataCharts extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Column>
          Data Charts
        </Column>
      </React.Fragment>
    )
  }
}

export default DataCharts;

const Column = styled.div`
  width: 100%;
`;
