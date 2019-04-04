import React from 'react';
import { render, ReactDOM } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import Splash from './components/Splash';
import VideoPlayer from './components/VideoPlayer';
import Quiz from './components/Quiz';

import rootReducer from './reducers/root-reducer';

const store = createStore(
  rootReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  )
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Splash} />
        <Route path="/video" component={VideoPlayer} />
        <Route path="/quiz" component={Quiz} />
      </Router>
    </Provider>
  );
}

render(<App />, document.getElementById('app'));