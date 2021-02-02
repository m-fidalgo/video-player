import React, { Component, createRef } from "react";
import { VideoService } from "./services/VideoService";
import { Channel } from "./services/EventService";
import VideoPlayer from "./components/VideoPlayer";
import VideoList from "./components/VideoList";
import VideoInline from "./components/VideoInline";
import VideoCinema from "./components/VideoCinema";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.selectVideo = this.selectVideo.bind(this);
    this.toggleCinema = this.toggleCinema.bind(this);
    this.inlineVideo = createRef();
    this.cinemaVideo = createRef();

    this.state = {
      videos: [],
      selectedVideo: {},
      videoContainer: this.inlineVideo,
    };
  }

  async componentDidMount() {
    const videos = await VideoService.list();
    this.setState({ videos });
    Channel.on("video:select", this.selectVideo);
    Channel.on("video:toggleCinema", this.toggleCinema);
  }

  componentWillUnmount() {
    Channel.removeListener("video:select", this.selectVideo);
    Channel.removeListener("video:toggleCinema", this.toggleCinema);
  }

  selectVideo(selectedVideo) {
    this.setState({ selectedVideo });
  }

  toggleCinema() {
    const currentContainer = this.state.videoContainer;
    const newContainer =
      currentContainer === this.inlineVideo
        ? this.cinemaVideo
        : this.inlineVideo;
    this.setState({
      videoContainer: newContainer,
    });
  }

  render() {
    const { state } = this;
    return (
      <div className="App">
        <VideoPlayer
          video={state.selectedVideo}
          container={state.videoContainer.current}
        />
        <VideoInline>
          <div ref={this.inlineVideo} />
        </VideoInline>
        <VideoList videos={state.videos} />
        <VideoCinema isActive={state.videoContainer === this.cinemaVideo}>
          <div ref={this.cinemaVideo} />
        </VideoCinema>
      </div>
    );
  }
}

export default App;
