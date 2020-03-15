import React from 'react';
import PropTypes from 'prop-types';
import { Image, Transformation } from 'cloudinary-react';
import path from 'path';

class CloudinaryImage extends React.Component {
  render() {
    const { url, alt, maxWidth, aspectRatio } = this.props;

    return (
      <Image publicId={path.basename(url)} cloud_name="texas-justice-initiative" secure="true" alt={alt}>
        <Transformation width={maxWidth} crop="scale" aspect_ratio={aspectRatio} />
      </Image>
    );
  }
}

CloudinaryImage.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  maxWidth: PropTypes.number.isRequired,
  aspectRatio: PropTypes.number,
};

export default CloudinaryImage;
