import { all } from 'redux-saga/effects';
import authSagas from './Default/Auth';
import common from './Default/Common';
import settings from './Default/Setting';

export default function* rootSaga(getState) {
  yield all([authSagas(), common(), settings()]);
}
