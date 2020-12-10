import { SET_USER } from '../actions/types';

const INITIAL_STATE = {
  currentUser: null,
};

const setUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

export default setUserReducer;
