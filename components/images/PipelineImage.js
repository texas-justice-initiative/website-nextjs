import React from 'react';
import PropTypes from 'prop-types';

export default function Image(props) {
  const { src, alt } = props;
  return (
    <div className="tji-pipeline-graphic">
      <img src={src} alt={alt} className="tji-pipeline-graphic__img" />
    </div>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
