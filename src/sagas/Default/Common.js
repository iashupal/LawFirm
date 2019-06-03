import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { COMMON_GET_ALL_CODES, COMMON_ALERT_OK_CLICK } from 'constants/ActionTypes';
import { PostCall } from 'helpers/ajax';
import { R, RU } from 'helpers/ramda';
import { handleGetAllCodesSuccess, handleCommonChangeValues } from 'actions/Default/Common';

const { mlMessage, makeCompanyList } = RU;

export const SetAllCodes = function*() {
  const state = yield select(state => state);
  const { auth, common } = state;
  const { authUser } = auth;
  const { ccList } = authUser;
  const { current_CCID } = common;
  const CCID = current_CCID;
  const newCCList = makeCompanyList(ccList);

  const fetchedData = yield call(PostCall, '/code/select');
  const codes = fetchedData.data;
  const { type, content } = codes;

  if (type === 'auth' && content === 'error') {
    alert('내부 인증(Token) 이 비정상 이거나 만료 되었습니다.\n 로그아웃 후 재로그인 해 주시기 바랍니다.');
    return;
  }

  // Checkbox 형태로 변형
  // yield put(setLTYPE(RU.typeChangeToCB2(false)(codes.LTYPE)));

  // 선택 가능회사 리스트
  const CORPLIST_data = yield call(PostCall, '/common/customercorporation_select_list', { CCID });
  const CORPLIST = CORPLIST_data.data;

  if (CCID) {
    // 전체코드 + 선택가능회사 + 변호사리스트
    const LAWYERS_data = yield call(PostCall, '/user/selectListByRole', {
      RoleCodeList: ['Role.Legal.InternalLawyer', 'Role.Legal.ExternalLawyer'],
      CCID,
    });
    const LAWYERS = R.map(a => ({ value: a.UserID, name: a.UserName }), LAWYERS_data.data.List);
    yield put(handleGetAllCodesSuccess({ ...codes, CORPLIST, LAWYERS }));
  } else {
    yield put(handleGetAllCodesSuccess({ ...codes, CORPLIST, LAWYERS: [] }));
  }

  if (CCID) {
    // 자동완성 용도 UserList
    const allUserList = yield call(PostCall, '/user/select', { CCID });
    yield put(handleCommonChangeValues({ name: 'allUserList', value: allUserList.data }));
  } else {
    yield put(handleCommonChangeValues({ name: 'allUserList', value: [] }));
  }

  // 법무팀, 관리자 등 자신이 가지고 있는 Role(권한) 목록.
  const currentCompanyMyRuleArr = CCID
    ? R.filter(a => `${a.CCID}` === `${CCID}`, ccList)[0].RoleCodeList
    : ccList[0].RoleCodeList;
  yield put(handleCommonChangeValues({ name: 'myRoleArr', value: currentCompanyMyRuleArr }));

  // 회사별 결재정보
  const companyPayInfo = yield call(PostCall, '/system/select_company_users', { CCID });
  yield put(handleCommonChangeValues({ name: 'companyPayInfo', value: companyPayInfo.data }));

  // 저장 가능여부
  const { base, payHistory } = companyPayInfo.data;
  const { isTrial, userCount } = base;
  const { users } = payHistory;
  yield put(handleCommonChangeValues({ name: 'enableSave', value: isTrial || users >= userCount }));
};

const alertOK = function*(action) {
  const { name, value } = action.payload;
  if (name === 'contract') yield put(handleSaveDraftContract(value));
  if (name === 'law') yield put(handleSaveDraftLaw(value));
  if (name === 'litigation') yield put(handleSaveDraftLitigation(value));
  if (name === 'project') yield put(handleSaveDraftProject(value));
  if (name === 'signedcontract') yield put(handleSaveDraftSignedContract(value));
  if (name === 'signedcontractSeparate') yield put(handleSeparateSaveDraftSignedContract(value));
};

export default function* rootSaga() {
  yield all([takeEvery(COMMON_GET_ALL_CODES, SetAllCodes), takeEvery(COMMON_ALERT_OK_CLICK, alertOK)]);
}
