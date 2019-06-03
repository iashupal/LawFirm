import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Settings from './Default/Settings';
import Auth from './Default/Auth';
import Common from './Default/Common';

const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  common: Common,
  // apps: combineReducers({}),
});

export default reducers;
