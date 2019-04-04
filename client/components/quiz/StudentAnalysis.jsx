import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    
  },
};

class QuestionAnalysis extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      answer,
      pause,
      play,
      question,
      replay,
      totalAttempt,
      id
    } = this.props.data;
    return (
      <div>
        <div style={{margin: '8px 0px'}}>
          <label className="question-section">{id[0].toUpperCase() + id.slice(1)}</label>
          <Typography color="textSecondary" style={{color: 'black', fontWeight: 'bold'}}>
            { question }
          </Typography>
          <Typography component="p" style={{marginBottom: 16}}>
            {answer}
          </Typography>
          <div className="analysis-interaction">
            <Typography color="textSecondary">
              Number of time the student got this question wrong:
            </Typography>
            <Typography className="analysis-interaction-2" component="p">
              {totalAttempt}
            </Typography>
          </div>
          <div className="analysis-interaction">
            <Typography color="textSecondary">
              Student had watched this video:
            </Typography>
            <Typography className="analysis-interaction-2" component="p">
              { play === 1 ? <span>true</span> : <span>false</span> } 
            </Typography>
          </div>
          <div className="analysis-interaction">
            <Typography color="textSecondary">
              Number of time the student had paused the video at the segment about {id}:
            </Typography>
            <Typography className="analysis-interaction-2" component="p">
              {pause}
            </Typography>
          </div>
          <div className="analysis-interaction">
            <Typography color="textSecondary">
              Number of time the student replayed this segment in the video:
            </Typography>
            <Typography className="analysis-interaction-2" component="p">
              {replay}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

function StudentAnalysis(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  const { 
    firstName, 
    lastName,
    totalPlay,
    totalPause,
    totalReplay,
    EngineerData,
    CivilEngineerData,
    MechanicalEngineerData,
    ElectricalEngineerData,
    SoftwareEngineerData,
    AerospaceEngineerData
  } = props;
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Student Interaction Analysis
        </Typography>
        <Typography variant="p" component="p" style={{color: 'black', fontWeight: 'bold'}}>
           {firstName} {lastName}
        </Typography>
        <div className="analysis-total">
          <Typography color="textSecondary">
            Total Play Clicked:
          </Typography>
          <Typography component="p">
            {totalPlay}
          </Typography>

          <Typography color="textSecondary">
            Total Pause Clicked:
          </Typography>
          <Typography component="p">
            {totalPause}
          </Typography>

          <Typography color="textSecondary">
            Total Replay Clicked:
          </Typography>
          <Typography component="p">
            {totalReplay}
          </Typography>
        </div>

        <QuestionAnalysis data={EngineerData} />
        <QuestionAnalysis data={CivilEngineerData} />
        <QuestionAnalysis data={MechanicalEngineerData} />
        <QuestionAnalysis data={ElectricalEngineerData} />
        <QuestionAnalysis data={SoftwareEngineerData} />
        <QuestionAnalysis data={AerospaceEngineerData} />

      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => {
  const { firstName, lastName } = state.appReducer;
  const { play, pause, replay } = state.appReducer.behavior.videoPlayer;
  const  EngineerSegment = state.appReducer.behavior.videoSegment.Engineer;
  const  CivilEngineerSegment = state.appReducer.behavior.videoSegment.CivilEngineer;
  const  MechanicalEngineerSegment = state.appReducer.behavior.videoSegment.MechanicalEngineer;
  const  ElectricalEngineerSegment = state.appReducer.behavior.videoSegment.ElectricalEngineer;
  const  SoftwareEngineerSegment = state.appReducer.behavior.videoSegment.SofwareEngineer;
  const  AerospaceSegment = state.appReducer.behavior.videoSegment.AerospaceEngineer;
  const { 
      Engineer, 
      CivilEngineer, 
      MechanicalEngineer,
      ElectricalEngineer,
      SoftwareEngineer,
      AerospaceEngineer
    } = state.appReducer.results;

  const EngineerData = Object.assign(EngineerSegment, Engineer, {id: 'engineer'});
  const CivilEngineerData = Object.assign(CivilEngineerSegment, CivilEngineer, {id: 'civil engineer'});
  const MechanicalEngineerData = Object.assign(MechanicalEngineerSegment, MechanicalEngineer, {id: 'mechanical engineer'});
  const ElectricalEngineerData = Object.assign(ElectricalEngineerSegment, ElectricalEngineer, {id: 'electrical engineer'});
  const SoftwareEngineerData = Object.assign(SoftwareEngineerSegment, SoftwareEngineer, {id: 'software engineer'});
  const AerospaceEngineerData = Object.assign(AerospaceSegment, AerospaceEngineer, {id: 'aerospace engineer'});

  return {
    firstName,
    lastName,
    totalPlay: play,
    totalPause: pause,
    totalReplay: replay,
    EngineerData,
    CivilEngineerData,
    MechanicalEngineerData,
    ElectricalEngineerData,
    SoftwareEngineerData,
    AerospaceEngineerData
  };
};

export default withStyles(styles)(connect(mapStateToProps, {})(StudentAnalysis));