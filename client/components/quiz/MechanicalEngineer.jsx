import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import QuizCard from './QuizCard';
import { setResultFor } from '../../actions/index';

class MechanicalEngineerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question1: {
        question: 'What industry could a mechanical engineer work in?',
        questionAnswer: 'manufacturing industry',
        answer: '',
        hasCorrectAnswer: false,
        errorMessage: undefined,
        totalAttempt: 0
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({ 
      [name]: {
        ...this.state[name],
        answer: event.target.value
      } 
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    let question1 = this.state.question1;
    if (question1.answer.length === 0) {
      this.setState({
        question1: {
          ...this.state.question1,
          totalAttempt: this.state.question1.totalAttempt + 1,
          errorMessage: 'This field must have an answer',
          hasCorrectAnswer: false
        }
      });
    } else if (question1.answer !== question1.questionAnswer ) {
      this.setState({
        question1: {
          ...this.state.question1,
          totalAttempt: this.state.question1.totalAttempt + 1,
          errorMessage: 'Incorrect answer',
          hasCorrectAnswer: false
        }
      });
    } else {
      this.setState({
        question1: {
          ...this.state.question1,
          hasCorrectAnswer: true
        }
      }, function() {
        const { question, answer, totalAttempt } = this.state.question1;
        this.props.setResultFor('MechanicalEngineer', {
          question,
          answer,
          totalAttempt
        });
      });
    }
  }

  render() {
    let question1 = this.state.question1;
    let solution;
    let hasSolution = this.props.MechanicalEngineerAnswer && this.props.MechanicalEngineerAnswer.length > 0;
    if (hasSolution) {
      solution = this.props.MechanicalEngineerAnswer;
    }
    
    return (
      <form className="quiz-form" onSubmit={this.handleSubmit}>
        <label>{question1.question}<i class="material-icons" style={hasSolution ? {color: '#2ecc71'} : {display: 'none'}}>check_circle</i></label>
        <TextField 
          name='question1' 
          value={hasSolution ? solution : question1.answer} 
          onChange={this.handleChange('question1')}
          error={!question1.hasCorrectAnswer && question1.totalAttempt >= 1}
          label={!question1.hasCorrectAnswer && question1.totalAttempt >= 1 ? question1.errorMessage : ''}
          disabled={hasSolution}
        />
        <Button disabled={hasSolution} type='submit' size="small" color="primary">
          Submit
        </Button>
      </form>
    );
  }
};

MechanicalEngineerForm = connect((state) => {
  if (state.appReducer.results.MechanicalEngineer) {
    console.log('state: ', state);
    return {
      MechanicalEngineerAnswer: state.appReducer.results.MechanicalEngineer.answer
    };
  }
  return {};
},{
  setResultFor
})(MechanicalEngineerForm);


class WhatIsAnElectricalEngineer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <QuizCard title="Mechanical Engineer" videoLocation={160}>
        <MechanicalEngineerForm />
      </QuizCard>
    );
  }
}

export default WhatIsAnElectricalEngineer;