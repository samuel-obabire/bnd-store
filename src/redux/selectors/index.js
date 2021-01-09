import { createSelector } from 'reselect'

const selectMobileMenuVisibility = state => state.mobileMenuVisibility.visible
const selectShopCategories = state => state.shop.categories
const selectShopCollections = state => state.shop.collections
const selectUserSelectedProduct = state => state.user.lastProductSelected
const selectUserSelectedState = state => state.form?.form?.values?.state
const selectCart = state => state.cart.cartItems

export const getMobileMenuVisibility = createSelector(
  selectMobileMenuVisibility,
  visibility => visibility
)

export const makeUniqueGetShopCategories = () =>
  createSelector(selectShopCategories, categories => categories)

export const makeGetShopCollections = () =>
  createSelector(selectShopCollections, collections => {
    return collections
  })

export const getUserSelectedProduct = createSelector(
  selectUserSelectedProduct,
  product => product
)

export const getUserSelectedState = createSelector(
  selectUserSelectedState,
  state => state
)

export const getUserCartTotal = createSelector(selectCart, cart =>
  cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
)

export const getUserCart = createSelector(selectCart, cart => cart)
