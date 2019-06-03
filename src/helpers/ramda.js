import * as ramda from 'ramda';
import AppLocale from 'lngProvider';
import moment from 'moment';
import { PostCall } from 'helpers/ajax';

// const iconv = require('iconv-lite');

export const R = ramda;

// Checkbox 처리용 데이터변환
const typeChangeToCB2 = defaultBool =>
  R.reduce((a, b) => R.append({ id: b.value, name: b.name, value: defaultBool }, a), []);
const typeChangeToCB = typeChangeToCB2(true);
// [{ name: "RadioTest1", value: 'rTest1' }, ...] --> [{ id: "rTest1", name: "RadioTest1", value: true }, ...]

// 날짜 표기 관련
const yearMonth = date => {
  if (!date) return null;
  const mOjb = moment.isMoment(date) ? date : new moment(date);
  return mOjb.format('YYYY-MM');
}; // "2018-09"
const yearMonthDay = date => {
  if (!date) return null;
  const mOjb = moment.isMoment(date) ? date : new moment(date);
  return mOjb.format('YYYY-MM-DD');
}; // "2018-09-04"
const yearMDHMS = date => {
  if (!date) return null;
  const mOjb = moment.isMoment(date) ? date : new moment(date);
  return mOjb.format('YYYY-MM-DD_h-mm-ss');
}; // "2018-09-14_05-56-44"

// Checkbox 데이터에서 Check된 데이터만 Get
const checkedIDArr = R.pipe(
  R.filter(R.prop('value')),
  R.pluck('id'),
);
// [{ "id": "LTYPE_0010", "name": "개인정보", "value": false }, { "id": "LTYPE_0020", "name": "계약해석", "value": true }]
// ==> ["LTYPE_0020"]

const checkedNames = R.pipe(
  R.filter(R.prop('value')),
  R.pluck('name'),
);
// [{ "id": "LTYPE_0010", "name": "개인정보", "value": false }, { "id": "LTYPE_0020", "name": "계약해석", "value": true }]
// ==> ["계약해석"]

// Checkbox value 일괄변경
const checkedReset_One = onoff => R.merge(R.__, { value: onoff });
const checkedReset = onoff => R.map(checkedReset_One(onoff));
// [{ "id": "LTYPE_0010", "name": "개인정보", "value": false }, { "id": "LTYPE_0020", "name": "계약해석", "value": true }]
// ==> [{ "id": "LTYPE_0010", "name": "개인정보", "value": true }, { "id": "LTYPE_0020", "name": "계약해석", "value": true }] // checkedReset(true) 일때

// 페이지 이동
const changeURL = url => {
  window.location = `#/app${url}`;
};

// query-string 또는 hash-string parsing
const cleanQStr = firstChar =>
  R.ifElse(
    R.pipe(
      R.head,
      R.equals(firstChar),
    ),
    R.tail,
    R.identity,
  );
const parseQStr = firstChar =>
  R.pipe(
    cleanQStr(firstChar),
    R.split('&'),
    R.map(R.split('=')),
    R.fromPairs,
  );
const parseQueryStr = parseQStr('?');
// '?test=1&test2=2&test3=3' 또는 '#test=1&test2=2&test3=3'
// ==> {"test":"1","test2":"2","test3":"3"}
// console.log(JSON.stringify(parseQueryStr('?test=1&test2=2&test3=3')));

// SAVE 정상 확인
const checkSave = result => result.status === 200;

// 기본 타입값 설정
const wEmpStr = a => a || '';
const wEmpNum = (a, v) => a || (v || -1);

// 말줄임 처리
const shortenStr = R.curry((wantLenth, str) => {
  if (str.length > wantLenth) {
    return `${str.substring(0, wantLenth)}...`;
  }
  return str;
});

// DB Select 형식의 File -> Redux 형태로 변환
const convertFilesToRedux = R.map(a => ({
  key: a.S3Key,
  size: a.FileSize,
  name: a.FileName,
}));

// 에디터 Detail시 Style 변경
const convertEditorText = a => (a ? a.replace('<p>', '<p style="margin-bottom: 0px;">') : '');

// English Language ?
const isEng = e => localStorage.getItem('language') === 'ENG';

// MultiLanguage 메세지
const mlMessage = a => AppLocale[isEng() ? 'en' : 'ko'].messages[a];

// CurrentUser 삭제 예정, 추가로 사용 금지 (?) (-> page unload 시, localstorage : user 를 지우는 방식 적용함.)
// (후순위) 로그인 사용자 정보 -> Redux Store 로 변경.
// 참고 : redux의 auth.authUser. 안에 기존 CurrentUser(인증 당시 : localstorage에 저장한 값) 정보들 모두 존재함.
export const CurrentUser = a => {
  try {
    return JSON.parse(localStorage.getItem('user'))[a];
  } catch (e) {
    return '';
  }
};

// Role Array 에서 각 boolean의 권한 Obj 리턴
const getRoleAuth = roleArr => ({
  authLawyerGroup: R.contains('Role.Legal.ExternalLawyer', roleArr) || R.contains('Role.Legal.InternalLawyer', roleArr),
  authAdmin: R.contains('Role.Legal.SuperAdmin', roleArr),
  authContractAdmin: R.contains('Role.Legal.ContractAdmin', roleArr),
});

// 참조 수신자 여부 리턴
const checkRelevant = (relevantUsers, userID) => R.contains(userID, R.pluck('UserID', relevantUsers));

// Index field 가 추가된 Array-Object 리턴
const mapIndexed = R.addIndex(R.map);
// const addIndexArrObj = indexName => mapIndexed((val, idx) => { val[indexName] = idx; return val; }); // version1
const addIndexArrObj = indexName => mapIndexed((val, idx) => ({ ...val, [indexName]: idx })); // version2
// console.log(addIndexArrObj('iiii')([{ name: 'a' }, { name: 'b' }])); // [{ name: 'a',  iiii: 0}, { name: 'b', iiii: 1}]

// 고정 자릿수 숫자 리턴
const getFixedLenNum = (len, number) => {
  if (len > `${number}`.length) {
    return getFixedLenNum(len, `0${number}`);
  }
  return `${number}`;
};
// console.log(getFixedLenNum(4, 23)); // "0023"

// Pluck 적용된 모든 값이 True 인지 체크.
const pluckAllTrue = R.curry((column, array) => R.all(R.identity, R.pluck(column, array)));
// pluckAllTrue('col1')([{ col1: '', test: 'aa'}, { col1: '123', test: 'bb'}]) // false
// pluckAllTrue('col1')([{ col1: '444', test: 'aa'}, { col1: '123', test: 'bb'}]) // true

// 업로드 대상 파일의 확장자 검사 (-> 모든 확장자 사용하는것으로 변경.)
const checkUploadFileExt = inputFileExt => true; // R.contains(R.toLower(inputFileExt), ['pdf', 'doc', 'docx']);
// console.log(checkUploadFileExt('pdf')); // true
// console.log(checkUploadFileExt('PDf')); // true
// console.log(checkUploadFileExt('ppt')); // false

const downloadFile = (file, fileName) => {
  const url = window.URL.createObjectURL(file);
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
};

const fileReadFunc = (fileBuffer, mimetype, fileName) => {
  const arr = new Uint8Array(fileBuffer);
  const f = new File([arr], { type: mimetype });
  downloadFile(f, fileName);
};

/*
const arr1 = new Uint8Array([255]);
const str = new TextDecoder('utf-8').decode(arr1);
const arr2 = new TextEncoder().encode(str);
console.log(arr1); // Uint8Array [255]
console.log(str);
console.log(arr2); // Uint8Array(3) [239, 191, 189]
*/

const readFile = async (Key, Name) => {
  const result = await PostCall('/ext/file_read', { Key });
  const fileBuffer = result.data.result.data;
  const { mimetype } = result.data;
  const arr = new Uint8Array(fileBuffer);
  downloadFile(new File([arr], { type: mimetype }), Name);

  // TEST : encode/decode file
  // const result2 = await PostCall('/ext/file_read_stream', { Key });
  // const fileStr = result2.data;
  // const arr2 = iconv.encode(fileStr, 'binary');
  // downloadFile(new File([arr2], { type: mimetype }), Name);
  // console.log(arr);
  // console.log(arr2);
};

// 개인 이미지 URL 관련
const imageURL_prefix = 'https://legal-file.s3.ap-northeast-2.amazonaws.com/';

const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
// console.log(validateEmail('test@seof.com')); // true
// console.log(validateEmail('test@seof3com')); // false

const validatePhone = phone => {
  const re = /^\d+(\-\d+)+$/;
  return re.test(phone);
};

// 200 외 다른 응답코드 발생시, Error 객체 처리를 위한 함수
const getErrObj = (error, isRawValues) => {
  const eCode = error.response.status; // 200 - 정상, 404 - Not Found, 500 - 서버오류 및 의도된 정보 전달
  const {
    type, // type : 'error' | 'info'
    code, // code : 'sentry키' | '' | '서버용-관리-키(SYS_MSG_0001..)'
    message, // message : '상세정보'
    data,
  } = error.response.data;

  if (isRawValues) {
    return { eCode, type, code, message, data };
  }
  return {
    pageErrTitle: type === 'info' ? 'Info' : 'Error',
    pageErrMsg: type === 'info' ? message : `unexpected error occurred (${eCode})`,
  };
};

const getLinkURL = (type, id) => {
  let preURL = '/#/app/';
  if (type === 'Contract') preURL += 'contract';
  if (type === 'SignedContract') preURL += 'signedContract';
  if (type === 'Law') preURL += 'law';
  if (type === 'Project') preURL += 'project';
  if (type === 'Litigation') preURL += 'litigation';
  return `${preURL}/save?id=${id}`;
};

const checkUserInfoData = (valueObj, isMustPW) => {
  const {
    detail_loginID,
    detail_name_kor,
    detail_name_eng,
    detail_phone,
    detail_pass,
    detail_pass2,
    detail_authList,
  } = valueObj;
  const alertMsg = [];

  if (!detail_loginID) {
    alertMsg.push('Login ID');
  }
  if (!detail_name_kor) {
    alertMsg.push('한글 이름');
  }
  if (!detail_name_eng) {
    alertMsg.push('영문 이름');
  }
  if (!detail_phone) {
    alertMsg.push('핸드폰 번호');
  }
  if (detail_authList) {
    // 권한 리스트가 있으면
    if (!detail_authList.length) {
      alertMsg.push('권한 등록(1개 이상)');
    }
  }
  if (detail_loginID && detail_loginID.length > 127) {
    alertMsg.push('Login ID 최대 127자');
  }
  if (detail_loginID && !validateEmail(detail_loginID)) {
    alertMsg.push('Login ID는 Email 형식');
  }
  if (detail_phone && detail_phone.length > 31) {
    alertMsg.push('핸드폰 번호는 최대 31자');
  }
  if (detail_phone && !validatePhone(detail_phone)) {
    alertMsg.push('핸드폰 번호 형식');
  }

  if (detail_pass || detail_pass2 || isMustPW) {
    if (detail_pass !== detail_pass2) {
      alertMsg.push('Password 같지 않음');
    }
    if (detail_pass.length < 8) {
      alertMsg.push('Password 자릿수');
    }
  }

  return alertMsg;
};

const checkUserInvitationInfoData = valueObj => {
  const { detail_authList } = valueObj;
  const alertMsg = [];

  if (!detail_authList.length) {
    alertMsg.push('권한 등록(1개 이상)');
  }

  return alertMsg;
};

const getEnv = e => {
  const { host } = window.location;

  let result = '';
  if (host === 'live.law365ai.com') result = 'prod';
  if (host === 'dev.law365ai.com') result = 'dev';
  if (host === 'qa.law365ai.com') result = 'master';
  if (host === 'localhost:3000') result = 'localhost';

  return result; // prod dev master localhost
};

const payBaseInfo = {
  oneUserAmount: getEnv() === 'prod' ? 330 : 10, // 1인당 기본 금액 (/1일)
  oneUserAmount_Month: getEnv() === 'prod' ? 9900 : 300, // 1인당 기본 금액 (/1달)
  discountUserCount: [[100, 50, 1], [10, 5, 0]], // [100명 이상, 50명 이상, 1명 이상] -> [10% 할인, 5% 할인, 0% 할인]
  discountPayMonth: [[12, 1], [5, 0]], // [12개월 결재, 1개월 결재] -> [5% 할인, 0% 할인]
  discountEvent: { name: '', value: 0 }, // Event : 0% 할인
  trialDays: 15, // trial 제공 기간(일수)
  trialUsers: 5, // trial 제공 유저 수
  vatPercent: 10, // VAT 추가 % (최종 금액에 추가)
};

const getMainURL = e => window.location.origin;

const licenseCalc = ({ compCreateDate, payStartDate, payEndDate, isTrial, userMax, userNum }) => {
  const { trialDays, trialUsers } = payBaseInfo;

  const trialStartDate = compCreateDate;
  const trialEndDate = moment(compCreateDate)
    .add(trialDays, 'days')
    .format('YYYY-MM-DD');

  const startDate = isTrial ? trialStartDate : payStartDate;
  const endDate = isTrial ? trialEndDate : payEndDate;

  const maxCount = isTrial ? trialUsers : userMax;
  const usePercent = Math.round((userNum / maxCount) * 100 * 100) / 100;
  const addAvailableCount = maxCount - userNum;
  const systemDisable = !isTrial && addAvailableCount <= 0; // Trial 기간 종료 && 구입한 유저수도 없을 때,

  return {
    trialDays,
    trialUsers,
    trialStartDate,
    trialEndDate,
    startDate,
    endDate,
    maxCount,
    systemDisable,
    usePercent,
    addAvailableCount,
  };
};

const payOutputCalc = ({
  baseInfo,
  input,
  plusUser,
  checkOneYear,
  startDate,
  thisMonth_LastDayUsers,
  nextMonth_LastDayUsers,
  payEndDate,
  lastPayCheckOneYear,
}) => {
  const {
    oneUserAmount,
    oneUserAmount_Month,
    discountUserCount: oldDiscountUserCount,
    discountPayMonth: oldDiscountPayMonth,
    discountEvent: oldDiscountEvent,
    vatPercent,
  } = baseInfo;

  const { payRuleApply } = input;
  const { userCount, payMonth } = payRuleApply;
  const isNextMonthPayExists = nextMonth_LastDayUsers > 0; // 다음달 말일 기준으로, 활성화된 유저가 있는지.

  // 사용자가 직접 1개월 또는 12개월 단위를 선택하며, 이 기준으로 종료일이 "다음달 말일" 또는 "1년 후 말일"로 고정됨.
  const endDateNew = checkOneYear
    ? moment()
        .add(1, 'years')
        .endOf('month')
    : moment()
        .endOf('month')
        .add(1, 'day')
        .endOf('month');

  // "전결재 종료일" 과 동일하게 고정함. (만일 그 결재가 12개월 할인을 받았다면, 신규 기간과 무관하게 적용 혜택)
  const endDateExist = moment(payEndDate);

  const endDate = isNextMonthPayExists ? endDateExist : endDateNew;
  const fullMonthNum = Math.floor(moment.duration(endDate.diff(startDate)).asMonths());

  const thisMonthLeftDays = checkOneYear
    ? 0
    : Math.ceil(
        moment
          .duration(
            moment(startDate)
              .endOf('month')
              .diff(moment(startDate)),
          )
          .asDays(),
      ); // 이번달 잔여일 (일할계산 대상 기간)

  const nextMonthDays = moment(endDate)
    .add(1, 'day')
    .endOf('month')
    .date(); // 다다음달 기준 일수 산정 (다음달 자동결제 사용예정 -> 월기준으로 바뀌어서 불필요해 보임..)

  const isDecreaseUser = plusUser < thisMonth_LastDayUsers;

  const baseAmount_1 = oneUserAmount * (isDecreaseUser ? 0 : plusUser - thisMonth_LastDayUsers) * thisMonthLeftDays;
  const baseAmount_2 = oneUserAmount_Month * (plusUser - nextMonth_LastDayUsers) * fullMonthNum;
  const baseTotalAmount = baseAmount_1 + baseAmount_2;

  const discountUserCount_Rule_Index = R.findIndex(a => R.gte(plusUser, a))(oldDiscountUserCount[0]);
  const discountUserCount_Rule = oldDiscountUserCount[0][discountUserCount_Rule_Index];

  // 단체 : 할인 적용률
  const discountUserCount_Org = oldDiscountUserCount[1][discountUserCount_Rule_Index];
  const discountUserCount = userCount ? discountUserCount_Org : 0; // 할인 불가

  // 단체 : 할인 금액
  const discountUserCount_Amount_Org = Math.round((baseTotalAmount / 100) * discountUserCount);
  const discountUserCount_Amount = userCount ? discountUserCount_Amount_Org : 0; // 할인 불가

  const isUseOld_CheckOneYear = nextMonth_LastDayUsers > 0;
  const newCheckOneYear = isUseOld_CheckOneYear ? lastPayCheckOneYear : checkOneYear;

  const discountPayMonth_Rule_Index = R.findIndex(a => R.gte(newCheckOneYear ? 12 : 1, a))(oldDiscountPayMonth[0]);
  const discountPayMonth_Rule = oldDiscountPayMonth[0][discountPayMonth_Rule_Index];

  // 결재기간 : 할인 적용률
  const discountPayMonth_Org = oldDiscountPayMonth[1][discountPayMonth_Rule_Index];
  const discountPayMonth = payMonth ? discountPayMonth_Org : 0; // 할인 불가

  // 결재기간 : 할인 금액
  const discountPayMonth_Amount_Org = Math.round((baseTotalAmount / 100) * discountPayMonth);
  const discountPayMonth_Amount = payMonth ? discountPayMonth_Amount_Org : 0; // 할인 불가

  const discountEvent_Name = oldDiscountEvent.name;
  const discountEvent = oldDiscountEvent.value;
  const discountEvent_Amount = Math.round((baseTotalAmount / 100) * discountEvent);

  const totalAmount_beforeVAT =
    baseTotalAmount - discountUserCount_Amount - discountPayMonth_Amount - discountEvent_Amount;
  const vatAmount = Math.round((totalAmount_beforeVAT * vatPercent) / 100);
  const totalAmount = totalAmount_beforeVAT + vatAmount;

  return {
    baseTotalAmount,
    discountUserCount_Rule,
    discountUserCount,
    discountUserCount_Amount,
    discountPayMonth_Rule,
    discountPayMonth,
    discountPayMonth_Amount,
    discountEvent_Name,
    discountEvent,
    discountEvent_Amount,
    totalAmount_beforeVAT, // VAT 적용 전
    vatAmount, // VAT 금액
    totalAmount, // VAT 적용 후 최종금액
    nextMonthDays,
    endDate,
    thisMonthLeftDays,
    baseAmount_1,
    baseAmount_2,
    fullMonthNum,
    newCheckOneYear,
  };
};

// Excel Cell 번호에서 뒷부분 숫자 GET.
const getLastNumber = value => {
  const regex = /[0-9]+/gm;
  let m;
  let lastNumber;

  while ((m = regex.exec(value)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      lastNumber = match;
    });
  }

  return lastNumber;
};

// dropdown 데이터에서 '--All--' 0번째 추가.
const addAllItem = (o, name) => {
  return o ? [{ name: name || '--All--', value: '' }, ...o] : o;
};

const makeCompanyList = ccList => R.map(a => ({ name: isEng() ? a.ccEngName : a.ccKorName, value: a.CCID }), ccList);

export const RU = {
  typeChangeToCB,
  typeChangeToCB2,
  yearMonth,
  yearMonthDay,
  checkedIDArr,
  changeURL,
  parseQueryStr,
  checkSave,
  checkedReset,
  checkedReset_One,
  wEmpStr,
  wEmpNum,
  shortenStr,
  convertFilesToRedux,
  convertEditorText,
  mlMessage,
  getRoleAuth,
  yearMDHMS,
  addIndexArrObj,
  getFixedLenNum,
  pluckAllTrue,
  checkRelevant,
  checkedNames,
  checkUploadFileExt,
  fileReadFunc,
  imageURL_prefix,
  validateEmail,
  validatePhone,
  getErrObj,
  getLinkURL,
  isEng,
  checkUserInfoData,
  payBaseInfo,
  getMainURL,
  getEnv,
  licenseCalc,
  payOutputCalc,
  getLastNumber,
  readFile,
  addAllItem,
  makeCompanyList,
  checkUserInvitationInfoData,
};
