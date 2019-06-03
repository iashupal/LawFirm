import axios from 'axios';
import * as R from 'ramda';
import { api_sample } from 'helpers/api_sample';

// English Language ?
const isEng = e => localStorage.getItem('language') === 'ENG';

const getEnv = e => {
  const { host } = window.location;

  let result = '';
  if (host === 'live.law365ai.com') result = 'prod';
  if (host === 'dev.law365ai.com') result = 'dev';
  if (host === 'qa.law365ai.com') result = 'master';
  if (host === 'localhost:3000') result = 'localhost';

  return result; // prod dev master localhost
};

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
// console.log('isDev : ' + isDev);

export const urlMaster = isDev ? 'http://localhost:3001/api' : '/api';
const iamport_code = getEnv() === 'prod' ? 'imp86481778' : 'imp69434445'; // 아임포트 가맹점 식별코드

// 신규 (Saga, Component 통합)
// Component 사용 예 :
// const fetchedData = await PostCall('/user/selectList', { CCID:123 });
// Saga 사용 예 :
// const fetchedData = yield call(PostCall, '/code/select');
// const fetchedData = yield call(PostCall, '/code/select', { CCID:123 });
export const PostCall = (restUrl, params) => {
  // Ajax 통신없이 (고정데이터로) 동작하는 모드
  const isFakeAPI = true;
  if (isFakeAPI) {
    return new Promise((resolve, reject) => {
      console.log(`fake-API: '${restUrl}'`);
      resolve(api_sample[restUrl]);
    });
  }

  const token = localStorage.getItem('token');
  const language = isEng() ? 'ENG' : 'KOR';
  const paramObj = { ...params };
  const CCIDList = paramObj.CCIDList ? paramObj.CCIDList : JSON.parse(localStorage.getItem('CCIDList')); // 개별 쿼리값이 있으면 우선.
  return axios.post(urlMaster + restUrl, { ...params, token, language, CCIDList });
};

// 법인카드 결제 (아임포트)
export const cardPayIMP = (req, res) => {
  const { IMP } = window;
  IMP.init(iamport_code);
  IMP.request_pay(req, res);
};
