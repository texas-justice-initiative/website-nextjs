import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import NewsFeed from '../components/NewsFeed';
import content from '../content/newsfeed.md';

const {
  attributes: { heading, news },
} = content;

const News = () => {
  const router = useRouter();
  let { page } = router.query;
  page = parseInt(page);
  if (Number.isNaN(page) || page < 1) {
    page = 1;
  }

  const perPage = 5;
  const pageLinks = [];
  for (let pageNumber = 1; pageNumber <= Math.ceil(news.length / perPage); pageNumber += 1) {
    if (pageNumber === page) {
      pageLinks.push(
        <PageNumber className="current" key={pageNumber}>
          {pageNumber}
        </PageNumber>
      );
    } else {
      const pagePath = `/news?page=${pageNumber}`;

      pageLinks.push(
        <Link href={pagePath} key={pageNumber}>
          <a href={pagePath} style={{ textDecoration: 'none' }}>
            <PageNumber>{pageNumber}</PageNumber>
          </a>
        </Link>
      );
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Texas Justice Initiative | {heading}</title>
      </Head>
      <Layout>
        <Primary>
          <NewsFeed page={page} perPage={perPage} />
          <div style={{ textAlign: 'center' }}>{pageLinks}</div>
        </Primary>
        <Sidebar />
      </Layout>
    </React.Fragment>
  );
};
export default News;

const PageNumber = styled.span`
  padding: 0.5em 0.8em;
  border: 1px solid ${props => props.theme.colors.grayLight};
  margin-left: -1px;
  color: ${props => props.theme.colors.primaryBlue};
  background-color: ${props => props.theme.colors.white};
  transition: all 0.35s;

  &.current,
  &:hover {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primaryBlue};
  }
`;
