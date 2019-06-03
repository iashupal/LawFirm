import { call, put, select } from 'redux-saga/effects';
import { PostCall } from 'helpers/ajax';
import { R, RU } from 'helpers/ramda';
import { handleCommonChangeValues, handleIsLoading } from 'actions/Default/Common';
import { SetAllCodes } from 'sagas/Default/Common';

const { getErrObj } = RU;

export const FileInsert = function*(Files, bizCode) {
  const state = yield select(state => state);
  const { common } = state;
  const { current_CCID: CCID } = common;

  let fileID = null;
  if (Files && Files.length > 0) {
    const files = Files;
    const insertResult = yield call(PostCall, '/file/insert', {
      bizCode, // 업무 분류 (계약검토 B01, 체결계약서 B02, 법률자문 B03, 프로젝트 B04, 송무 B05)
      files,
      CCID,
    });
    // eslint-disable-next-line prefer-destructuring
    fileID = insertResult.data.fileID;
    yield call(PostCall, '/ext/file_tagging', { files, CCID });
    yield call(PostCall, '/file/tag_update', { fileID, CCID });
  }

  // 파일관련, 기존 FileRefID 에서 필요시 추후 처리. (Detail-Key 전달 추가 등.)
  // Delete : S3 File Storage.
  // R.map(a => PostCall('/ext/file_delete', { Key: a.key }), lawSave.detailFiles);
  // Delete : File Data (DB-mysql)
  // R.map(a => PostCall('/file/remove', { Key: a.key }), lawSave.detailFiles);

  return fileID;
};

export const RecipientInsert = function*(RelevantUsers) {
  let recipientId = null;
  if (RelevantUsers && RelevantUsers.length > 0) {
    const userIDs = R.pluck('UserID', RelevantUsers);
    const recipientInsertResult = yield call(PostCall, '/common/recipient_insert', { userIDs });
    recipientId = recipientInsertResult.data.insertId;
  }

  return recipientId;
};

export const Common_DetailBind = function*(detailID, ajaxURL, ajaxParam, bindReduxFunc, ChangeValuesFunc) {
  yield put(handleIsLoading(true));
  yield put(ChangeValuesFunc({ name: 'pageErrTitle', value: '' }));
  yield put(ChangeValuesFunc({ name: 'pageErrMsg', value: '' }));
  if (detailID) {
    try {
      const result = yield call(PostCall, ajaxURL, ajaxParam);
      const { data } = result;
      const { CCID, CCName } = data;

      yield put(handleCommonChangeValues({ name: 'current_CCID', value: CCID }));
      yield put(handleCommonChangeValues({ name: 'current_CCName', value: CCName }));
      yield SetAllCodes();
      yield put(bindReduxFunc(data));
      yield put(handleIsLoading(false));
    } catch (e) {
      const { pageErrTitle, pageErrMsg } = getErrObj(e);

      yield put(ChangeValuesFunc({ name: 'pageErrTitle', value: pageErrTitle }));
      yield put(ChangeValuesFunc({ name: 'pageErrMsg', value: pageErrMsg }));
      yield put(handleIsLoading(false));
    }
  } else {
    yield put(bindReduxFunc());
    yield put(handleIsLoading(false));
  }
};
