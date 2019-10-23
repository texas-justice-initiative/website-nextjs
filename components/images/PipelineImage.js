import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Image(props) {
  const { src, alt } = props;
  return (
    <PipeLineGraphic className="tji-pipeline-graphic">
      <img src={src} alt={alt} className="tji-pipeline-graphic__img" />
    </PipeLineGraphic>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

const PipeLineGraphic = styled.div`
  text-align: center;
  padding: 4rem 0;

  .tji-pipeline-graphic__img {
    width: 100%;
    max-width: 600px;
    height: auto;
  }

  /* Class to tag elements which should only show on mobile */
  .mobile-only {
    @media screen and (min-width: ${props => props.theme.medium}) {
      display: none;
    }
  }
`;
