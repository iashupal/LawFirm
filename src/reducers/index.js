import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Settings from './Default/Settings';
import Auth from './Default/Auth';
import Common from './Default/Common';
import Apps from './Default/Apps';

const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  common: Common,
  // apps: combineReducers({}),
  apps: Apps,
});

export default reducers;
