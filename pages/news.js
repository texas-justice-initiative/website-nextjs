import React, { useState } from 'react';

import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import NewsFeed from '../components/NewsFeed';
import content from '../content/newsfeed.md';
import Pagelinks from '../components/Pagelinks';

const {
  attributes: { title, news },
} = content;

const News = () => {
  const perPage = 5;
  const router = useRouter();
  let { page } = router.query;
  const [query, setQuery] = useState('');
  page = parseInt(page);

  return (
    <React.Fragment>
      <NextSeo title={title} />
      <Layout>
        <Primary>
          <input
            className="search-bar"
            style={{ marginBottom: '1em' }}
            type="text"
            placeholder="Search for relevant articles..."
            onChange={event => {
              setQuery(event.target.value);
            }}
          />
          <NewsFeed
            page={page}
            perPage={perPage}
            // eslint-disable-next-line array-callback-return
            news={news.filter(val => {
              if (query === '') {
                return val;
              }
              if (val.title.toLowerCase().includes(query.toLowerCase())) {
                return val;
              }
            })}
          />
          <Pagelinks
            page={page}
            perPage={perPage}
            // eslint-disable-next-line array-callback-return
            news={news.filter(val => {
              if (query === '') {
                return val;
              }
              if (val.title.toLowerCase().includes(query.toLowerCase())) {
                return val;
              }
            })}
          />
        </Primary>
        <Sidebar />
      </Layout>
    </React.Fragment>
  );
};
export default News;
