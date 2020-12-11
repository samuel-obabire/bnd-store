import { SET_MOBILE_MENU_VISIBILITY } from '../actions/types';

const INITIAL_STATE = { visible: false };

const setMobileMenuVisiblity = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MOBILE_MENU_VISIBILITY:
      return { ...state, visible: !state.visible };
    default:
      return state;
  }
};

export default setMobileMenuVisiblity;
