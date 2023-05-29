import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import PaginationLinks from './PaginationLinks';

/**
 * A helper utility to create an array of pages for pagination
 *
 * @param {array} children
 * @param {number} perPage
 * @returns array
 */
function createPages(children, perPage) {
  let i = 0;
  let currentPage = 0;
  const pages = [];

  children.forEach((child) => {
    if (pages[currentPage]) {
      pages[currentPage].push(child);
    } else {
      pages[currentPage] = [child];
    }

    i += 1;

    if (i >= perPage) {
      currentPage += 1;
      i = 0;
    }
  });

  return pages;
}

/**
 * Paginate is a utility which allows an array of children to be
 * input and turned into a paginated display.
 *
 * @prop (object|array) children
 * @prop (number) childrenPerPage
 * @returns node
 */
function Paginate({ children, childrenPerPage = 5, basePath = '/' }) {
  const searchParams = useSearchParams();
  let page = searchParams.get('page');
  const totalChildren = React.Children.count(children);
  const totalPages = Math.ceil(totalChildren / childrenPerPage);

  page = parseInt(page);

  if (Number.isNaN(page) || page < 1 || page > totalPages) {
    page = 1;
  }

  const pages = createPages(React.Children.toArray(children), childrenPerPage);

  console.log(pages);

  return (
    <StyledBlogFeed>
      <div className="blog blog__container">
        {!children && <div>Nothing to show!</div>}
        <ul className="blog__posts">
          {pages[page - 1]}
          {totalChildren > childrenPerPage && (
            <PaginationLinks
              basePath={basePath}
              page={page}
              totalPages={totalPages}
            />
          )}
        </ul>
      </div>
    </StyledBlogFeed>
  );
}

export default Paginate;

Paginate.propTypes = {
  children: PropTypes.array || PropTypes.object,
  childrenPerPage: PropTypes.number,
  basePath: PropTypes.string,
};

const StyledBlogFeed = styled.div`
  .blog__post__read-more {
    text-decoration: none;

    h2 {
      margin-bottom: 0;
    }
  }

  .blog__post__authors {
    margin: 1rem 0;
    display: flex;
    flex-flow: row wrap;

    span:not(:last-child)::after {
      content: ', \u2009';
    }
  }

  .blog__post__details {
    margin: 0.5rem 0;

    .blog__post__date,
    .blog__post__authors {
      font-style: italic;
    }
  }

  .blog__tagline {
    color: ${(props) => props.theme.colors.grayDarkest};
    font-size: ${(props) => props.theme.typography.sizes.body.regular};
  }

  .blog__post {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.grayLightest};

    @media screen and (min-width: ${(props) =>
        props.theme.breakpoints.medium}) {
      display: flex;
      flex-wrap: nowrap;
    }

    &:last-of-type {
      border-bottom-width: 0;
    }

    .blog__post__image {
      width: ${(props) =>
        props.theme.integrations.cloudinary.newsItemImageWidthPixels}px;
      flex: 1 0 100%;
      order: 0;
      padding: 2rem 0;

      @media screen and (min-width: ${(props) =>
          props.theme.breakpoints.medium}) {
        order: 1;
        flex: 0 0
          ${(props) =>
            props.theme.integrations.cloudinary.newsItemImageWidthPixels}px;
        padding: 2rem 0 2rem 2rem;
      }
    }

    .blog__post__content {
      /* flex: 0 1 auto; */
      padding: 2rem 0;
      flex: 1 0 100%;
      order: 1;

      p {
        color: ${(props) => props.theme.colors.grayDarkest};
        margin-top: 0.5rem;
      }

      a {
        text-decoration: unset;
      }

      @media screen and (min-width: ${(props) =>
          props.theme.breakpoints.medium}) {
        flex: 0 1 100%;
        order: 0;
      }
    }

    .blog__post__topics {
      margin-top: 2rem;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
`;
