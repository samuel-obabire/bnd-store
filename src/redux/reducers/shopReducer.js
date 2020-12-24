import { SET_CATEGORIES, SET_PRODUCTS, SET_QUERY } from '../actions/types';
const INITIAL_STATE = {
  categories: [
    'Women Clothing',
    'Electronics',
    'Slippers',
    'Fabrics',
    'Hair Accessories',
    'Bags',
  ],
  collections: {},
  products: {},
  query: {
    q: '',
    field: '',
  },
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        collections: action.payload,
      };
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case SET_QUERY:
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default shopReducer;
