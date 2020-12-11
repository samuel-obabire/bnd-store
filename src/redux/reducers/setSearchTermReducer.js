import { SET_SEARCH_TERM } from '../actions/types';

const setSearchTerm = (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.payload;
    default:
      return state;
  }
};

export default setSearchTerm;
