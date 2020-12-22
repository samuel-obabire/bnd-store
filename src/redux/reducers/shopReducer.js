import { SET_CATEGORIES } from '../actions/types';
const INITIAL_STATE = {
  categories: [
    'Clothings',
    'Shoes',
    'Slippers',
    'Fabrics',
    'Hair Accessories',
    'Bags',
  ],
  collections: {},
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, collections: action.payload };
    default:
      return state;
  }
};

export default shopReducer;
