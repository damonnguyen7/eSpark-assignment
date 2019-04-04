import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { setVideoAt } from '../../actions/index';
import { findVideoSegment } from '../../utility';

class QuizCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toRedirect: false
    };
    this.goToVideoAt = this.goToVideoAt.bind(this);
  }
  goToVideoAt() {
    let videoLocation = this.props.videoLocation;
    if (videoLocation) {
      this.props.setVideoAt(videoLocation);
      let afterSettingVideoLocation = new Promise((res, rej) => {
        this.props.setVideoAt(videoLocation);
        if (true) {
          res();
        }
      });
      afterSettingVideoLocation
        .then(() => {
          this.setState({toRedirect: true});
        });
    }
  }
  render() {
    if (this.state.toRedirect) {
      return <Redirect to={`/video`} />;
    }
    return (
      <Card>
        <CardMedia src="https://i.ytimg.com/vi/owHF9iLyxic/maxresdefault.jpg" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { this.props.title }
          </Typography>
          { this.props.children }
        </CardContent>
        <CardActions>
          <Button onClick={this.goToVideoAt} size="small" color="primary">
            <i className="material-icons">play_arrow</i> Replay video segment
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  let { videoLocation } = state.appReducer;
  return {
    hasVideoLocation: videoLocation
  };
};

export default connect(mapStateToProps, {
  setVideoAt
})(QuizCard);