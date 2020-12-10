import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { compose } from 'redux';

import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
