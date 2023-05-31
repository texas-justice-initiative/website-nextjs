'use client';
/* eslint-disable react/no-danger */

import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import Primary from '@/components/Primary';
import Sidebar from '@/components/Sidebar';

function Thanks(props) {
  const { content } = props;

  const {
    html,
    attributes: { title },
  } = content;

  return (
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <Content dangerouslySetInnerHTML={{ __html: html }} />
      </Primary>
      <Sidebar />
    </Layout>
  );
}

export default Thanks;

const Content = styled.div`
  li {
    margin: 1em 0;
  }
`;
