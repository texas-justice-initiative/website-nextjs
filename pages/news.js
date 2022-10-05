import React, { useState } from 'react';

import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import NewsFeed from '../components/NewsFeed';
import content from '../content/newsfeed.md';
import Pagelinks from '../components/pagelinks';

let {
  attributes: { title, news },
} = content;

const News = () => {
  news = news.sort((a, b) => {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  });
  const perPage = 5;
  const router = useRouter();
  let { page } = router.query;
  const [query, setQuery] = useState('');
  page = parseInt(page);
  // const pageLinks = [];
  // for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
  //   if (pageNumber === page) {
  //     pageLinks.push(
  //       <PageNumber className="current" key={pageNumber}>
  //         {pageNumber}
  //       </PageNumber>
  //     );
  //   } else {
  //     const pagePath = `/news?page=${pageNumber}`;

  //     pageLinks.push(
  //       <Link href={pagePath} key={pageNumber}>
  //         <a href={pagePath} style={{ textDecoration: 'none' }}>
  //           <PageNumber>{pageNumber}</PageNumber>
  //         </a>
  //       </Link>
  //     );
  //   }
  // }

  return (
    <React.Fragment>
      <NextSeo title={title} />
      <Layout>
        <Primary>
          <input
            type="text"
            placeholder="Search ..."
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

// const PageNumber = styled.span`
//   padding: 0.5em 0.8em;
//   border: 1px solid ${props => props.theme.colors.grayLight};
//   margin-left: -1px;
//   color: ${props => props.theme.colors.primaryBlue};
//   background-color: ${props => props.theme.colors.white};
//   transition: all 0.35s;

//   &.current,
//   &:hover {
//     color: ${props => props.theme.colors.white};
//     background-color: ${props => props.theme.colors.primaryBlue};
//   }
// `;
