import { combineReducers } from 'redux';
import login from "./login";
import courts from "./courts";
import { routerReducer } from 'react-router-redux';	

const reducers = combineReducers({
	login,
	courts,
	routing: routerReducer
});

export default reducers;
