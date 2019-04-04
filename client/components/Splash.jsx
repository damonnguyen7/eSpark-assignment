import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RegisterForm from './RegisterForm';

class Splash extends Component {
  render() {
    return (
      <div id="splash-page">
        <div className="course-card">
          <div className="img-container">
            <img className="img-responsive" src="https://i.ytimg.com/vi/btGYcizV0iI/maxresdefault.jpg" />
          </div>
          <RegisterForm />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Splash);