import RootReducer from './RootReducer';
import { applyMiddleware, createStore } from 'redux';
import { localStorageMiddleware } from '../middleware';

const middleware = applyMiddleware(localStorageMiddleware);
const store = createStore(RootReducer, middleware);

export default store;