import {
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_QUERY,
  CLEAR_PRODUCTS
} from '../actions/types'
const INITIAL_STATE = {
  categories: [
    // 'Women Clothing',
    // 'Electronics',
    // 'Slippers',
    // 'Fabrics',
    // 'Hair Accessories',
    // 'Bags'
  ],
  categories: {},
  products: {},
  query: {
    q: '',
    field: ''
  }
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      const category = action.payload.category
      return {
        ...state,
        categories: {
          ...state.categories,
          [category]: action.payload[category]
        }
      }
    case CLEAR_PRODUCTS:
      return { ...state, products: {} }
    case SET_PRODUCTS:
      return { ...state, products: action.payload }
    case SET_QUERY:
      return { ...state, query: action.payload }
    default:
      return state
  }
}

export default shopReducer
