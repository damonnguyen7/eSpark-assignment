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

class AerospaceEngineerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question1: {
        question: 'What does Aerospace Engineer design and construct?',
        questionAnswer: ['plane', 'spacecraft'],
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
          ...question1,
          totalAttempt: question1.totalAttempt + 1,
          errorMessage: 'This field must have an answer',
          hasCorrectAnswer: false
        }
      });
    } else if (question1.questionAnswer.indexOf(question1.answer) === -1) {
      if (hasIncorrectAnswer) {
        this.setState({
          question1: {
            ...question1,
            totalAttempt: question1.totalAttempt + 1,
            errorMessage: 'Incorrect answer',
            hasCorrectAnswer: false
          }
        });
      }
    } else {
      this.setState({
        question1: {
          ...question1,
          hasCorrectAnswer: true
        }
      }, function() {
        const { question, answer, totalAttempt } = question1;
        this.props.setResultFor('AerospaceEngineer', {
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
    let hasSolution = this.props.AerospaceEngineerAnswer && this.props.AerospaceEngineerAnswer.length > 0;
    if (hasSolution) {
      solution = this.props.AerospaceEngineerAnswer;
    }
    
    return (
      <form className="quiz-form" onSubmit={this.handleSubmit}>
        <label>{question1.question}<i className="material-icons" style={hasSolution ? {color: '#2ecc71'} : {display: 'none'}}>check_circle</i></label>
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

AerospaceEngineerForm = connect((state) => {
  if (state.appReducer.results.AerospaceEngineer) {
    return {
      AerospaceEngineerAnswer: state.appReducer.results.AerospaceEngineer.answer
    };
  }
  return {};
},{
  setResultFor
})(AerospaceEngineerForm);

class AerospaceEngineer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <QuizCard title="Aerospace Engineer" videoLocation={237} >
        <AerospaceEngineerForm />
      </QuizCard>
    );
  }
}

export default AerospaceEngineer;