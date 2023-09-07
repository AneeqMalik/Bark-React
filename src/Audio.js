import React, { Component } from "react";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
    this.audioRef = React.createRef();
  }

  playAudio = () => {
    this.setState({
      isPlaying: true,
    });
    this.audioRef.current.play();
  }

  pauseAudio = () => {
    this.setState({
      isPlaying: false,
    });
    this.audioRef.current.pause();
  }

  render() {
    const { audio } = this.props;
    const { isPlaying } = this.state;

    if (!audio) {
      return null;
    }

    return (
      <div>
        <audio ref={this.audioRef} src={audio} controls={isPlaying ? false : true} />
        <button onClick={this.playAudio}>Play</button>
        <button onClick={this.pauseAudio}>Pause</button>
      </div>
    );
  }
}

export default AudioPlayer;
