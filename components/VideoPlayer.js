import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import 'focus-visible';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.onPlay = this.onPlay.bind(this);
  }

  onPlay() {
    const { title } = this.props;

    ReactGA.event({
      category: 'Videos',
      action: 'play',
      label: title,
    });
  }

  render() {
    const { url } = this.props;
    return <Player controls src={url} width="100%" onPlay={this.onPlay}></Player>;
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
