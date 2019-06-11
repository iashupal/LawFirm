import axios from 'axios';
import { api_sample } from 'helpers/api_sample';
import { makePostCall } from 'FrameworkTemp/common';

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
export const urlMaster = isDev ? 'http://localhost:3001/api' : '/api';
const iamport_code = getEnv() === 'prod' ? 'imp86481778' : 'imp69434445'; // 아임포트 가맹점 식별코드

export const PostCall = makePostCall(axios, urlMaster, true, api_sample);

// 법인카드 결제 (아임포트)
export const cardPayIMP = (req, res) => {
  const { IMP } = window;
  IMP.init(iamport_code);
  IMP.request_pay(req, res);
};
