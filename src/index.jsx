import { Router, IndexRoute, Route, browserHistory } from "react-router";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import AppContainer from "AppContainer";
import Wrapper from "./components/Wrapper";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

const history = syncHistoryWithStore(browserHistory, store);
const routes = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" pageId="wrapper" component={Wrapper}>
        <IndexRoute pageId="index" component={AppContainer} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(routes, document.getElementById("root"));
