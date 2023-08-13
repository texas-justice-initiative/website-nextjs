import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.onPlay = this.onPlay.bind(this);
  }

  onPlay() {
    const { title } = this.props;

    window.gtag('event', 'play', {
      event_category: 'Videos',
      event_label: title,
    });
  }

  render() {
    const { url } = this.props;
    return <Player controls src={url} width="100%" onPlay={this.onPlay} />;
  }
}

export default VideoPlayer;

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const Player = styled.video`
  background-color: transparent;

  :focus:not(.focus-visible) {
    outline: none;
  }
`;
