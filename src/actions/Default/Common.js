import { createAction } from 'redux-actions';
import {
  COMMON_MESSAGE_ADD,
  COMMON_IS_LOADING,
  COMMON_GET_ALL_CODES,
  COMMON_GET_ALL_CODES_SUCCESS,
  COMMON_PROFILE_DIALOG_OPEN,
  COMMON_CHANGE_VALUES,
  COMMON_ALERT_OK_CLICK,
  COMMON_ALERT_CONFIRM_SET,
} from 'constants/ActionTypes';

export const handleCommonChangeValues = createAction(COMMON_CHANGE_VALUES);
export const handleCommonMessageAdd = createAction(COMMON_MESSAGE_ADD);
export const handleCommonAlertOK = createAction(COMMON_ALERT_OK_CLICK);
export const handleIsLoading = createAction(COMMON_IS_LOADING);
export const handleProfileDialogOpen = createAction(COMMON_PROFILE_DIALOG_OPEN);
export const handleGetAllCodes = createAction(COMMON_GET_ALL_CODES);
export const handleGetAllCodesSuccess = createAction(COMMON_GET_ALL_CODES_SUCCESS);
export const handleCommonAlertConfirmSet = createAction(COMMON_ALERT_CONFIRM_SET);
