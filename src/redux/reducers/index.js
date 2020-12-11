import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import setUserReducer from './setUserReducer';
import setSearchTermReducer from './setSearchTermReducer';

export default combineReducers({
  form: formReducer,
  user: setUserReducer,
  searchTerm: setSearchTermReducer,
});
