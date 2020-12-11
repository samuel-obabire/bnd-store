import { SET_USER, SET_SEARCH_TERM } from './types';

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
