import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormMeta, getFormSyncErrors } from 'redux-form';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { setFirstName, setLastName } from '../actions/index';

class FirstLastNameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      redirectToVideo: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };


  onSubmit(event) {
    event.preventDefault();
    this.props.setFirstName(this.state.firstName);
    this.props.setLastName(this.state.lastName);
    this.setState({
      redirectToVideo: true
    });
  }

  render() {
    const { firstNameFromStore, lastNameFromStore } = this.props;
    let toRedirectToVideo = this.state.redirectToVideo;
    if (toRedirectToVideo) {
      return <Redirect to={`/video`} />
    }
    return (
      <form className="form-container">
        <TextField
          label="First name"
          value={firstNameFromStore ? firstNameFromStore : this.state.firstName}
          onChange={this.handleChange('firstName')}
        />

        <TextField
          label="Last name"
          value={lastNameFromStore ? lastNameFromStore : this.state.lastName}
          onChange={this.handleChange('lastName')}
        />

        <Button type="submit" onClick={this.onSubmit} variant="contained" color="primary" style={{marginBottom: 16, marginTop: 16, width: '100%'}}>
          Start course
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstNameFromStore: state.appReducer.firstName,
    lastNameFromStore: state.appReducer.lastName
  };
};

export default connect(mapStateToProps, {
  setFirstName,
  setLastName
})(FirstLastNameForm);