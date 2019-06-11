// immer produce 를 받아서 return 된 함수를, prod((state, draft, payload) => { ... } 과 같이 사용함.
export const makeProdFunc = produce => func => (state, payload) => produce(state, draft => func(state, draft, payload));

// reducer initial 및 handler 연결
export const reducerConnector = (initial, handlers) => (state = initial, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};

// Redux 1Lv 여러값을 재할당 하는데 사용.
export const setReduxVal = produce =>
  makeProdFunc(produce)((state, draft, payload) => {
    if (!payload) return;
    const keyList = Object.keys(payload);

    if (!keyList) return;
    if (keyList.length === 0) return;
    keyList.forEach(item => {
      draft[item] = payload[item];
    });
  });

// 영어 표기상황
export const isEng = () => localStorage.getItem('language') === 'ENG';

// 공통 post ajax call (Saga, Component 통합)
//   Component 사용 예 :
//     const fetchedData = await PostCall('/user/selectList', { CCID:123 });
//   Saga 사용 예 :
//     const fetchedData = yield call(PostCall, '/code/select');
//     const fetchedData = yield call(PostCall, '/code/select', { CCID:123 });
export const makePostCall = (axios, urlMaster, isFakeAPI, api_sample) => (restUrl, params) => {
  if (isFakeAPI) {
    return new Promise(resolve => {
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
