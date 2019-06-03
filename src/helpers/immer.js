import produce from 'immer';

export const prod = func => (state, payload) => produce(state, draft => func(state, draft, payload));
export const reducerSelector = (initial, handlers) => (state = initial, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action.payload) : state;
};
