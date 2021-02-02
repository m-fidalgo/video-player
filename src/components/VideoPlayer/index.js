import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import { Channel } from "../../services/EventService";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.videoElement = createRef();
    this.currentTime = 0;
    this.toggleCinema = this.toggleCinema.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  toggleCinema() {
    this.onStop();
    Channel.emit("video:toggleCinema");
  }

  onPlay() {
    this.videoElement.current.currentTime = this.currentTime;
  }

  onStop() {
    this.currentTime = this.videoElement.current.currentTime;
  }

  componentDidUpdate(prevProps) {
    if (this.props.video.videoLink !== prevProps.video.videoLink) {
      this.currentTime = 0;
    }
  }

  render() {
    const { container, video } = this.props;
    const element = (
      <div className="video-player">
        <video
          src={video.videoLink}
          ref={this.videoElement}
          onPlay={this.onPlay}
          onPause={this.onStop}
          controls
          autoPlay
          loop
        />
        <button onClick={this.toggleCinema}>[ ]</button>
      </div>
    );

    if (!video.videoLink) {
      return null;
    } else if (!container) {
      return "Carregando ...";
    } else {
      return ReactDOM.createPortal(element, container);
    }
  }
}

export default VideoPlayer;
