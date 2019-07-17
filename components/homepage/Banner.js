import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class Banner extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Column>
        Homepage Banner
        </Column>
      </React.Fragment>
    )
  }
}

export default Banner;

const Column = styled.div`
  width: 100%;
`;