import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import setUserReducer from './setUserReducer';
import setSearchTermReducer from './setSearchTermReducer';
import setMobileMenuVisiblity from './setMobileMenuVisibilityReducer';
import shopReducer from './shopReducer';

export default combineReducers({
  form: formReducer,
  user: setUserReducer,
  searchTerm: setSearchTermReducer,
  mobileMenuVisibility: setMobileMenuVisiblity,
  shop: shopReducer,
});
