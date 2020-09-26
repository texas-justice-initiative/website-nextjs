import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Card(props) {
  const { thumbnail, title, excerpt, layout, link } = props;

  if (link) {
    return (
      <CardWrap className={`card card--${layout}`}>
        <Link href={link}>
          <a className="flexwrap">
            {thumbnail && (
              <div
                className="card__thumbnail"
                style={{ backgroundImage: `url(static/images/thumbnails/${thumbnail})` }}
              ></div>
            )}
            {title && <h3 className="card__title">{title}</h3>}
            {excerpt && <p className="card__excerpt">{excerpt}</p>}
          </a>
        </Link>
      </CardWrap>
    );
  }
  return (
    <CardWrap className={`card card--${layout}`}>
      <div className="flexwrap">
        {thumbnail && (
          <div
            className="card__thumbnail"
            style={{ backgroundImage: `url(static/images/thumbnails/${thumbnail})` }}
          ></div>
        )}
        {title && <h3 className="card__title">{title}</h3>}
        {excerpt && <p className="card__excerpt">{excerpt}</p>}
      </div>
    </CardWrap>
  );
}

Card.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  layout: PropTypes.bool,
  link: PropTypes.string,
};

Card.defaultProps = {
  layout: 'default',
};

const CardWrap = styled.div`
  margin: 1em 0;
  min-height: 290px;

  @media (min-width: ${props => props.theme.medium}) {
    margin: 0;
  }

  .flexwrap {
    display: flex;
    flex-flow: column nowrap;
    background: ${props => props.theme.colors.grayLightest};
    padding: 1em;
    border: 1px solid ${props => props.theme.colors.grayLighter};
    height: 100%;
    transition: 0.1s ease-in;
  }

  a.flexwrap:hover {
    background: ${props => props.theme.colors.grayLighter};
  }

  .card__thumbnail {
    width: 100%;
    flex: 0 1 75%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .card__title {
    flex: 0 0 auto;
    font-weight: 800;
    margin-top: 1em;
    color: ${props => props.theme.colors.black};
  }

  .card__excerpt {
    flex-flow: 1 1 auto;
    font-size: 0.85em;
    line-height: 1.5;
  }

  a,
  p {
    text-decoration: none;
    color: ${props => props.theme.colors.black};
  }

  p {
    margin: 1em 0 0;
  }

  &.card--featured {
    order: 0;
    grid-column: 1/3;
    grid-row: 1/3;
    height: 600px;

    .card__title {
      font-size: 1.5em;
      font-weight: 800;
    }
  }
`;
