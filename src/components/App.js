// @flow strict-local

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppContainer from '../containers/AppContainer';
import Footer from './Footer';
import reducers from '../reducers';

import '../css/home.css';

const store = createStore(reducers, applyMiddleware(thunk));
const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={AppContainer} />
        <Footer />
      </Switch>
    </Router>
  </Provider>
);

export default App;
