import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import userReducer from './userReducer'
import setSearchTermReducer from './setSearchTermReducer'
import setMobileMenuVisiblity from './setMobileMenuVisibilityReducer'
import shopReducer from './shopReducer'

export default combineReducers({
  form: formReducer,
  user: userReducer,
  searchTerm: setSearchTermReducer,
  mobileMenuVisibility: setMobileMenuVisiblity,
  shop: shopReducer
})
