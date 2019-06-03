import {
  COMMON_MESSAGE_ADD,
  COMMON_IS_LOADING,
  COMMON_GET_ALL_CODES_SUCCESS,
  COMMON_PROFILE_DIALOG_OPEN,
  COMMON_CHANGE_VALUES,
  COMMON_ALERT_CONFIRM_SET,
} from 'constants/ActionTypes';
import { RU } from 'helpers/ramda';
import { prod, reducerSelector } from 'helpers/immer';

const { getEnv } = RU;
const isMC_MyCompanyMode = localStorage.getItem('isMC_MyCompanyMode') === 'true';

const envStr = getEnv(); // prod dev master localhost
const initial = {
  messages: [],
  isLoading: false,
  isProfileOpen: false,
  alertMsgOpen: false, // designed alert or confirm dialog.
  alertWaitDatas: {},
  alertMsg: {
    title: '',
    contents: '',
    isConfirm: false,
  },
  allCodes: {},
  allUserList: [],
  allErrorOn: false, // 모든 입력형 페이지에서, 필수값들을 최초 체크 한 이후, 각 컴포넌트에서 error (붉은색, TextField.. 등)를 표기하기 위함.
  myRoleArr: [], // ["Role.Legal.ContractAdmin", "Role.Legal.ExternalLawyer", "Role.Legal.InternalLawyer", "Role.Legal.SuperAdmin"]
  isDemoMode: envStr === 'dev' || envStr === 'master',
  companyPayInfo: {},
  enableSave: false,
  isMC_MyCompanyMode, // MultiCompany 유저가 자신의 회사만으로 동작하기 모드.

  // 각종 Detail 에서 아래값 기준으로 동작 (Multi Company User)
  current_CCID: 0,
  current_CCName: '',
};

const handlers = {
  [COMMON_CHANGE_VALUES]: prod((state, draft, payload) => {
    draft[payload.name] = payload.value;
  }),
  [COMMON_ALERT_CONFIRM_SET]: prod((state, draft, payload) => {
    draft.alertMsg = payload.msgObj; // { title: '저장 하시겠습니까?', contents: '', isConfirm: true }
    draft.alertMsgOpen = true;
    draft.alertWaitDatas = payload.waitDatas; // { name: 'contract', value: {isDraft: false, contractSave, detailID, isUpdateMode }
  }),
  [COMMON_MESSAGE_ADD]: prod((state, draft, payload) => {
    draft.messages.push(payload);
  }),
  [COMMON_IS_LOADING]: prod((state, draft, payload) => {
    draft.isLoading = payload;
  }),
  [COMMON_GET_ALL_CODES_SUCCESS]: prod((state, draft, payload) => {
    draft.allCodes = payload;
  }),
  [COMMON_PROFILE_DIALOG_OPEN]: prod((state, draft, payload) => {
    draft.isProfileOpen = payload;
  }),
};

export default reducerSelector(initial, handlers);
