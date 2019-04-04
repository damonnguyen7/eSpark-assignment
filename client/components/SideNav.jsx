import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { incrementReplayCounter } from '../actions/index';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: ''
    };
    this.goBackToVideo = this.goBackToVideo.bind(this);
  }
  goBackToVideo() {
    this.props.incrementReplayCounter();
    this.setState({
      redirect: '/video'
    });
  }
  render() {
    let toRedirect = this.state.redirect.length > 0;
    if (toRedirect) {
      return (
        <Redirect to={`${this.state.redirect}`} />
      );
    }

    return (
      <div id="side-nav">
        <List component="nav">
          <ListItem button onClick={this.goBackToVideo}>
            <i className="material-icons">replay</i> <ListItemText primary="Replay Video" />
          </ListItem>
          <Divider />
          <Link to="/quiz/engineer">
            <ListItem button>
              <ListItemText primary="Engineer" />
            </ListItem>
          </Link>
          <Link to="/quiz/electrical-engineer">
            <ListItem button>
              <ListItemText primary="Electrical Engineer" />
            </ListItem>
          </Link>
          <Link to="/quiz/mechanical-engineer">
            <ListItem button>
              <ListItemText primary="Mechanical Engineer" />
            </ListItem>
          </Link>
          <Link to="/quiz/software-engineer">
            <ListItem button>
              <ListItemText primary="Software Engineer" />
            </ListItem>
          </Link>
          <Link to="/quiz/civil-engineer">
            <ListItem button>
              <ListItemText primary="Civil Engineer" />
            </ListItem>
          </Link>
          <Link to="/quiz/aerospace-engineer">
            <ListItem button>
              <ListItemText primary="Aerospace Engineer" />
            </ListItem>
          </Link>
          {
            this.props.toRenderAnalysisItem ?
            <Link to="/quiz/analysis">
              <ListItem button>
                <ListItemText primary="Student Analysis" />
              </ListItem>
            </Link> : null
          }
        </List>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { clickedBackToVideoFromQuiz } = state.appReducer;
  function hasAllResults(results) {
    for (let result in results) {
      if (Object.keys(results[result]).length === 0) {
        return false;
      }
    }
    return true;
  }
  let toRenderAnalysisItem = hasAllResults(state.appReducer.results);
  console.log('toRenderAnalysisItem: ', toRenderAnalysisItem);
  return {
    clickedBackToVideoFromQuiz,
    toRenderAnalysisItem
  }
}

export default connect(mapStateToProps, {
  incrementReplayCounter
})(SideNav);