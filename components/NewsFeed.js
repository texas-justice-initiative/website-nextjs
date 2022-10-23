/* eslint-disable react/no-danger */

import React from 'react';
import styled from 'styled-components';
import MarkdownIt from 'markdown-it';
import moment from 'moment';
import PropTypes from 'prop-types';
import CloudinaryImage from './CloudinaryImage';
import content from '../content/newsfeed.md';
import Parser from './Parser';
import theme from '../theme';

class NewsFeed extends React.Component {
  render() {
    const {
      html,
      attributes: { heading, intro },
    } = content;
    const md = new MarkdownIt();
    const { page, perPage, news } = this.props;

    return (
      <StyledNewsFeed>
        <div className="news news__container">
          <h2 className="news__heading">{heading}</h2>
          <span className="news__tagline">{intro}</span>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <ul className="news__items">
            {news.slice((page - 1) * perPage, page * perPage).map((item, k) => (
              <li className="news__item" key={k}>
                {item.thumbnail && (
                  <div className="news__item__image">
                    <CloudinaryImage
                      url={item.thumbnail}
                      alt={item.title}
                      maxWidth={theme.integrations.cloudinary.newsItemImageWidthPixels}
                    />
                  </div>
                )}
                <div className="news__item__content">
                  <a href={item.link} className="news__item__read-more" target="_blank" rel="noopener noreferrer">
                    <h3>{item.title}</h3>
                  </a>
                  <div className="news__item__date">Published on {moment(item.date).format('MMMM D, YYYY')}</div>
                  {item.description && <Parser>{md.render(item.description)}</Parser>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </StyledNewsFeed>
    );
  }
}

export default NewsFeed;
NewsFeed.propTypes = {
  news: PropTypes.array,
};

const StyledNewsFeed = styled.div`
  h2 {
    color: ${props => props.theme.colors.black};
  }

  .news__item__read-more {
    text-decoration: none;

    h3 {
      margin-bottom: 0;
    }
  }

  .news__tagline,
  .news__item__date {
    color: ${props => props.theme.colors.gray};
    font-size: ${props => props.theme.typography.sizes.body.small};
  }

  .news__item__date {
    margin: 0.5rem 0;
  }

  .news__item {
    display: flex;
    flex-wrap: wrap;
    margin: 2rem 0;
    padding: 1rem 0;
    border-bottom: 1px solid ${props => props.theme.colors.grayLightest};

    @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
      flex-wrap: nowrap;
    }

    &:last-of-type {
      border-bottom-width: 0;
    }

    .news__item__image {
      width: ${props => props.theme.integrations.cloudinary.newsItemImageWidthPixels}px;
      flex: 0 0 ${props => props.theme.integrations.cloudinary.newsItemImageWidthPixels}px;
    }

    .news__item__content {
      flex: 0 1 auto;
      padding: 2rem 0;

      p {
        color: ${props => props.theme.colors.grayDarkest};
        margin-top: 0.5rem;
      }

      @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
        padding: 0 0 0 2rem;
      }
    }

    img {
      width: 100%;
      height: auto;
    }
  }
`;

NewsFeed.propTypes = {
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};
