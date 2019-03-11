import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  IndexRoute
} from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import AppContainer from "./containers/AppContainer";
import Footer from "./components/Footer";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));
const routes = (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <div className="app-wrapper">
            <Route exact path="/" component={AppContainer} />
            <Footer />
          </div>
        </Switch>
      </div>
    </Router>
  </Provider>
);

render(routes, document.getElementById("app"));
module.hot.accept();
