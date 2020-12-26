import { SET_USER, SET_SELECTED_PRODUCT } from '../actions/types';

const INITIAL_STATE = {
  currentUser: null,
  lastProductSelected: null,
};

const setUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUser: action.payload };
    case SET_SELECTED_PRODUCT:
      return { ...state, lastProductSelected: action.payload };
    default:
      return state;
  }
};

export default setUserReducer;
