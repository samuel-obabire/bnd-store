import { SET_USER, SET_SEARCH_TERM, SET_MOBILE_MENU_VISIBILITY } from './types';

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setSearchTerm = term => {
  return {
    type: SET_SEARCH_TERM,
    payload: term,
  };
};

export const setMobileMenuVisiblity = () => {
  return {
    type: SET_MOBILE_MENU_VISIBILITY,
  };
};
