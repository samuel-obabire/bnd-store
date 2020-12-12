// import { SET_CATEGORIES } from '../actions/types';
const INITIAL_STATE = {
  categories: [
    'Clothings',
    'Shoes',
    'Slippers',
    'Fabrics',
    'Hair Accessories',
    'Bags',
  ],
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default shopReducer;
