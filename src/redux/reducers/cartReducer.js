import {
  reduceCartItems,
  removeCartItem,
  deleteCartItem
} from '../../components/utils/cartUtils'

import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  DELETE_PRODUCT_FROM_CART
} from '../actions/types'

const INITIAL_STATE = {
  cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return reduceCartItems(state, action.payload)
    case REMOVE_PRODUCT_FROM_CART:
      return removeCartItem(state, action.payload)
    case DELETE_PRODUCT_FROM_CART:
      return deleteCartItem(state, action.payload)
    default:
      return state
  }
}

export default cartReducer
