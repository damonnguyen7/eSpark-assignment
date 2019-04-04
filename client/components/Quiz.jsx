import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

import SideNav from './SideNav';
import Engineer from './quiz/Engineer';
import ElectricalEngineer from './quiz/ElectricalEngineer';
import MechanicalEngineer from './quiz/MechanicalEngineer';
import SoftwareEngineer from './quiz/SoftwareEngineer';
import CivilEngineer from './quiz/CivilEngineer';
import AerospaceEngineer from './quiz/AerospaceEngineer';
import StudentAnalysis from './quiz/StudentAnalysis';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div id="quiz">
        <SideNav />
        <div className="question-container">
          <Route path={`${this.props.match.url}/engineer`} component={Engineer} />
          <Route path={`${this.props.match.url}/electrical-engineer`} component={ElectricalEngineer} />
          <Route path={`${this.props.match.url}/mechanical-engineer`} component={MechanicalEngineer} />
          <Route path={`${this.props.match.url}/software-engineer`} component={SoftwareEngineer} />
          <Route path={`${this.props.match.url}/civil-engineer`} component={CivilEngineer} />
          <Route path={`${this.props.match.url}/aerospace-engineer`} component={AerospaceEngineer} />
          <Route path={`${this.props.match.url}/analysis`} component={StudentAnalysis} />
        </div>
      </div>
    );
  }
};

export default Quiz;