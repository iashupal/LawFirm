import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
import {
  SIGNIN_USER,
  SIGNIN_USER_TOKEN,
  SIGNIN_USER_EMAIL_LINK,
  SIGNOUT_USER,
  IP_AUTH_PHONE_CODE,
  IP_AUTH_PHONE_RE_SEND,
} from 'constants/ActionTypes';
import { showAuthMessage, userSignInSuccess, userSignOutSuccess, handleAuthChangeValues } from 'actions/Default/Auth';
import { handleCommonChangeValues } from 'actions/Default/Common';
import { PostCall } from 'helpers/ajax';
import { R, RU } from 'helpers/ramda';

const { getErrObj, isEng } = RU;

const getAuthUserObj = function*(result) {
  const {
    loginID,
    userID,
    userName,
    image,
    phone,
    userKorName,
    userEngName,
    isSlack,
    ccList,
    MyCCID,
  } = result.data.user;
  const { token } = result.data;

  const multiCompanyUser = ccList && ccList.length > 1; // Multi Company 소속 User (법무법인)
  yield put(handleCommonChangeValues({ name: 'current_CCID', value: MyCCID }));
  if (MyCCID === 0) {
    // 소속 회사가 없으면, Multi 옵션 강제함 (+ localStorage 변경)
    yield put(handleCommonChangeValues({ name: 'isMC_MyCompanyMode', value: false }));
    localStorage.setItem('isMC_MyCompanyMode', false);
  }

  return {
    loginID,
    userID,
    userName,
    image,
    phone,
    userKorName,
    userEngName,
    token,
    isSlack,
    email: loginID,
    multiCompanyUser,
    ccList, // Multi Company 정보
    MyCCID, // 실제 회사 Number 일수도, 0번 일수도 있음 (0번은, MultiCompany 유저인데 소속회사가 없는 경우)

    // 참고 : MyCCID 는 내부적으로, 유저 초대시점에 "이미 생성된 Email ID" + "권한이 외부변호사" 가 아닌 경우, 자신의 기본회사로 설정됨.
  };
};

let resetCount = false;
function* countDown(num) {
  while (!resetCount && num > -1) {
    yield put(handleAuthChangeValues({ name: 'ipInfo_phone_expired', value: num-- }));
    yield delay(1000);
  }
}

const setLocalStorage = signInUser => {
  localStorage.setItem('token', signInUser.token); // ajax call을 위한 특수 용도 (일반 유저 정보는 redux-auth 에서 사용!)
  localStorage.setItem('user', JSON.stringify(signInUser));
  localStorage.setItem('CCID', signInUser.ccList[0].CCID);
  localStorage.setItem('CCIDList', JSON.stringify(R.pluck('CCID', signInUser.ccList)));
  localStorage.setItem('MyCCID', signInUser.MyCCID);
};

function* signInUserWithEmailPassword({ payload }) {
  const { email, password } = payload;
  try {
    const result = yield call(PostCall, '/auth/login', { loginID: email, pass: password });
    const signInUser = yield getAuthUserObj(result);
    setLocalStorage(signInUser);
    yield put(userSignInSuccess(signInUser));
  } catch (error) {
    const { eCode, type, code, message, data } = getErrObj(error, true);

    if (eCode === 500 && type === 'info' && code === 'SYS_MSG_0100') {
      // IP 최초접속 // Your recognition number has been issued.
      const { ip, loginID, phone, validityPeriod, recognitionUUID } = data;
      yield put(handleAuthChangeValues({ name: 'ipInfo_email', value: loginID }));
      yield put(handleAuthChangeValues({ name: 'ipInfo_ip', value: ip }));
      yield put(handleAuthChangeValues({ name: 'ipInfo_phone', value: phone }));
      yield put(handleAuthChangeValues({ name: 'ipInfo_recognitionUUID', value: recognitionUUID }));
      yield put(handleAuthChangeValues({ name: 'isOpenIP_Phone', value: true }));
      yield call(countDown, validityPeriod);
    } else if (eCode === 500 && type === 'info' && code === 'SYS_MSG_0200') {
      // IP 비활성화 : We have sent a secure access URL by email.
      const { ip, loginID } = data;
      yield put(handleAuthChangeValues({ name: 'ipInfo_email', value: loginID }));
      yield put(handleAuthChangeValues({ name: 'ipInfo_ip', value: ip }));
      yield put(handleAuthChangeValues({ name: 'isOpenIP_Email', value: true }));
    } else {
      yield put(showAuthMessage(`입력된 계정 정보가 맞는지 다시 확인해 주시기 바랍니다. (${message})`));
      // yield put(showAuthMessage('개발참고|' + eCode + '|' + type + '|' + code + '|' + message + ')'));
    }
  }
}

function* signInUserWithToken() {
  try {
    const result = yield call(PostCall, '/auth/loginWithToken', {
      token: localStorage.getItem('token'),
      language: isEng() ? 'ENG' : 'KOR',
    });
    const signInUser = yield getAuthUserObj(result);
    setLocalStorage(signInUser);
    yield put(userSignInSuccess(signInUser));
  } catch (error) {
    window.location = '#/signin'; // Token 에 문제가 있을 경우, 로그인 페이지로..
  }
}

function* signInUserWithEmailLink({ payload }) {
  try {
    const { qsEmail, qsUUID } = payload;

    const result = yield call(PostCall, '/auth/loginWithLoginUUID', {
      loginID: qsEmail,
      loginUUID: qsUUID,
      language: isEng() ? 'ENG' : 'KOR',
    });
    const signInUser = yield getAuthUserObj(result);
    setLocalStorage(signInUser);
    window.location = '/'; // token 로그인이 사용되도록 refresh ..
  } catch (error) {
    const { eCode, type, code, message, data } = getErrObj(error, true);

    if (eCode === 500 && type === 'info' && code === 'SYS_MSG_0209') {
      // 비정상 링크
      yield put(showAuthMessage('정상적인 이메일 링크가 아닙니다.'));
    } else if (eCode === 500 && type === 'info' && code === 'SYS_MSG_0201') {
      // The IP currently connected is different from the IP issued the secure access URL.
      yield put(showAuthMessage(message));
    } else {
      // yield put(showAuthMessage('개발참고|' + eCode + '|' + type + '|' + code + '|' + message + ')'));
      yield put(showAuthMessage('정상적인 이메일 링크가 아닙니다.'));
    }
  }
}

function* signOut() {
  try {
    R.map(key => localStorage.removeItem(key), [
      'token',
      'user',
      'CCID',
      'CCIDList',
      'contractSearch',
      'signedContractSearch',
      'lawSearch',
      'projectSearch',
      'litigationSearch',
      'isMC_MyCompanyMode',
    ]);

    yield put(
      userSignOutSuccess({
        ccID: -1,
        loginID: '',
        userID: -1,
        userName: '',
        image: '',
        phone: '',
        userKorName: '',
        userEngName: '',
        token: '',
        email: '',
        multiCompanyUser: false, // Multi Company 소속 User (법무법인)
        ccList: null, // Multi Company 정보 추가.
      }),
    );
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* PhoneCode({ payload }) {
  const { email, password, code, recognitionUUID } = payload;

  try {
    yield call(PostCall, '/auth/checkRecognitionNumber', {
      loginID: email,
      pass: password,
      recognitionUUID,
      recognitionNumber: parseInt(code, 10),
    });

    yield put(handleAuthChangeValues({ name: 'isOpenIP_Phone', value: false }));
    yield put(handleAuthChangeValues({ name: 'isOpenIP_Email', value: true }));
  } catch (error) {
    const { eCode, type, code, message, data } = getErrObj(error, true);

    if (eCode === 500 && type === 'info' && code === 'SYS_MSG_0103') {
      // The recognition number is inconsistent.
      // 인증불가 & 현재화면 재시도 가능
      yield put(showAuthMessage('입력된 인증번호가 다릅니다. 다시 확인해 보시기 바랍니다.'));
    } else if (eCode === 500 && type === 'info' && code === 'SYS_MSG_0102') {
      // The number of verification has been exceeded.
      // 인증불가 & 로그인 화면으로
      yield put(showAuthMessage('허용된 인증번호 입력 횟수를 초과 했습니다.'));
      yield put(handleAuthChangeValues({ name: 'isOpenIP_Phone', value: false }));
      window.location = '/'; // ID/PASS 도 지워지도록 refresh ..
    }
  }
}

function* PhoneReSend({ payload }) {
  const { email, password } = payload;

  try {
    const result = yield call(PostCall, '/auth/getRecognitionNumber', {
      loginID: email,
      pass: password,
    });
    const { type, code, message, data } = result.data;
    const { ip, loginID, phone, validityPeriod, recognitionUUID } = data;

    yield put(handleAuthChangeValues({ name: 'ipInfo_email', value: loginID }));
    yield put(handleAuthChangeValues({ name: 'ipInfo_ip', value: ip }));
    yield put(handleAuthChangeValues({ name: 'ipInfo_phone', value: phone }));
    yield put(
      handleAuthChangeValues({
        name: 'ipInfo_recognitionUUID',
        value: recognitionUUID,
      }),
    );
    yield put(handleAuthChangeValues({ name: 'isOpenIP_Phone', value: true }));

    yield put(showAuthMessage('[재발송] 인증번호가 다시 발송 되었습니다.'));

    resetCount = true;
    yield delay(1200); // 다시 Count 시에 기존 Count 와 겹치는 문제로 delay 처리함.
    resetCount = false;
    yield call(countDown, validityPeriod);
  } catch (error) {
    // const { eCode, type, code, message, data } = getErrObj(error, true);
    yield put(showAuthMessage('인증번호 재발송에 문제가 발생 했습니다.'));
  }
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}
export function* signInUserToken() {
  yield takeEvery(SIGNIN_USER_TOKEN, signInUserWithToken);
}
export function* signInUserEmailLink() {
  yield takeEvery(SIGNIN_USER_EMAIL_LINK, signInUserWithEmailLink);
}
export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}
export function* AuthIPPhoneCode() {
  yield takeEvery(IP_AUTH_PHONE_CODE, PhoneCode);
}
export function* AuthIPPhoneReSend() {
  yield takeEvery(IP_AUTH_PHONE_RE_SEND, PhoneReSend);
}

export default function* rootSaga() {
  yield all([
    fork(signInUser),
    fork(signInUserToken),
    fork(signInUserEmailLink),
    fork(signOutUser),
    fork(AuthIPPhoneCode),
    fork(AuthIPPhoneReSend),
  ]);
}
