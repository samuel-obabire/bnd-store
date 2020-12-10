import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import setUserReducer from './setUserReducer';

export default combineReducers({ form: formReducer, user: setUserReducer });
