import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import login from './login';
import courts from './courts';
import styles from './styles';

const reducers = combineReducers({
  login,
  courts,
  styles,
  routing: routerReducer,
});

export default reducers;
