import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import courts from './courts';
import styles from './styles';

const reducers = combineReducers({
  courts,
  styles,
  routing: routerReducer,
});

export default reducers;
