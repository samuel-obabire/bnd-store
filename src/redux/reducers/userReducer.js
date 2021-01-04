import { reduceCartItems } from '../../components/utils/cartUtils'
import {
  SET_USER,
  SET_SELECTED_PRODUCT,
  ADD_PRODUCT_TO_CART
} from '../actions/types'

const INITIAL_STATE = {
  currentUser: null,
  lastProductSelected: null,
  cart: []
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUser: action.payload }
    case SET_SELECTED_PRODUCT:
      return { ...state, lastProductSelected: action.payload }
    case ADD_PRODUCT_TO_CART:
      return reduceCartItems(state, action.payload)
    default:
      return state
  }
}

export default userReducer
