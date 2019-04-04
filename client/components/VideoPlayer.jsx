import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Fab from '@material-ui/core/Fab';

import { 
  setVideoAt, 
  incrementPlayCounter, 
  incrementPauseCounter,
  incrementReplayCounter,
  updateCurrentTime,
  disableReplayForSegment
} from '../actions/index';

import { findVideoSegment, incrementPlayOnce } from '../utility';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.goToQuiz = this.goToQuiz.bind(this);
  }
  state = {
    redirectToQuiz: false
  }
  componentDidMount() {
    let goToQuiz = this.goToQuiz;
    this.player = videojs('vid1');
    let incrementPlayCounterOnceTracker = incrementPlayOnce();

    this.player.on('play', () => {
      let videoLocation = this.player.currentTime();
      //play counter max count = 1
      if (this.props.playedVideoFromBeginningOnce) {
        this.props.incrementPlayCounter();
      } 
    });

    this.player.on('pause', () => {
      let videoLocation = this.player.currentTime();
      this.props.incrementPauseCounter(videoLocation);
    });

    this.player.controlBar.progressControl.seekBar.on('mouseup', (event) => {

    });

    this.player.on('timeupdate', (e) => {
        let videoLocation = this.player.currentTime();
        this.props.updateCurrentTime(Math.floor(videoLocation));
        let atSpecifiedSegment = findVideoSegment(videoLocation);

        let hasBehaviorVideoSegment = this.props.behaviorVideoSegments[findVideoSegment(videoLocation)];
        if (atSpecifiedSegment && hasBehaviorVideoSegment && hasBehaviorVideoSegment.play === 0) {
          this.props.incrementPlayCounter(this.player.currentTime());
        } else if (hasBehaviorVideoSegment && hasBehaviorVideoSegment.play === 1) {
          let enableReplayForThisSegment = this.props.enableReplay[findVideoSegment(videoLocation)];
          if (enableReplayForThisSegment) {
            this.props.incrementReplayCounter(this.player.currentTime());
            this.props.disableReplayForSegment(findVideoSegment(videoLocation));
          }
        }
    });

    this.player.on('ended', function() {
      // goToQuiz();
    });

    let hasVideoLocation = this.props.videoLocation;
    if (hasVideoLocation) {
      this.player.currentTime(this.props.videoLocation);
      this.player.play();
      this.props.setVideoAt(undefined);
    }
  }
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
  goToQuiz() {
    this.setState({redirectToQuiz: true});
  }
  render() {
    return (
      <div>
        <Link to={`/quiz`}>
          <Fab className="go-to-quiz" color="primary" aria-label="Add">
            Quiz
          </Fab>
        </Link>
        <video
          id="vid1"
          className="video-js vjs-default-skin"
          controls
          autoPlay
          width="640" height="264"
          data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=owHF9iLyxic"}], "youtube": { "listType": null } }'
        >
        </video>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { videoLocation, enableReplay } = state.appReducer;
  const { play } = state.appReducer.behavior.videoPlayer;
  const behaviorVideoSegments = state.appReducer.behavior.videoSegment;
  return {
    videoLocation,
    playedVideoFromBeginningOnce: play === 0,
    behaviorVideoSegments,
    enableReplay
  };
};

export default connect(mapStateToProps, {
  setVideoAt,
  incrementPlayCounter,
  incrementPauseCounter,
  incrementReplayCounter,
  updateCurrentTime,
  disableReplayForSegment
})(VideoPlayer);