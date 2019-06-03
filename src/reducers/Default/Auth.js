import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  CHANGE_AUTH_VALUES,
} from 'constants/ActionTypes';
import { produce } from 'immer';

// 주의 ! 아래 형태가 아닌 reducerSelector & prod 공통 func 형태로 개발.
const INIT_STATE = {
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
  authUser: null,
  isOpenIP_Phone: false,
  isOpenIP_Email: false,
  ipInfo_email: 'swgo@humaxdigital.com',
  ipInfo_ip: '123.123.123.123',
  ipInfo_phone: '010-1234-1234',
  ipInfo_phone_expired: 60,
  ipInfo_recognitionUUID: '',
  ipInfo_email_expired: 15 * 60,
  ipInfo_input_code: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH_VALUES: {
      return produce(state, draft => {
        draft[action.payload.name] = action.payload.value;
      });
    }
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload,
      };
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        initURL: '/',
        loader: false,
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false,
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: '',
        showMessage: false,
        loader: false,
      };
    }
    case SIGNIN_GOOGLE_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case SIGNIN_FACEBOOK_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case SIGNIN_TWITTER_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case SIGNIN_GITHUB_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
      };
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true,
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false,
      };
    }
    default:
      return state;
  }
};
