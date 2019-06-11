import produce from 'immer';
import { makeProdFunc, reducerConnector, setReduxVal } from 'FrameworkTemp/common';

export const prod = makeProdFunc(produce);
export const reducerSelector = reducerConnector;
export const prodSetReduxValues = setReduxVal(produce);
