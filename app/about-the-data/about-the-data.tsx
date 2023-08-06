'use client';

import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import Primary from '@/components/Primary';
import Sidebar from '@/components/Sidebar';

function AboutTheData(props: { content: any }) {
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

export default AboutTheData;

const Content = styled.div`
  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    padding: 3rem 0;
  }
`;
