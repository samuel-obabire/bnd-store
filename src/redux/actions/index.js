import {
  SET_USER,
  SET_MOBILE_MENU_VISIBILITY,
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_SELECTED_PRODUCT,
  CLEAR_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  DELETE_PRODUCT_FROM_CART
} from './types'

import { firestore, getCollection } from '../../components/utils/firebase'

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const setMobileMenuVisiblity = () => {
  return {
    type: SET_MOBILE_MENU_VISIBILITY
  }
}

export const getCollections = () => async dispatch => {
  const categories = await firestore
    .collection('categories')
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data().category))

  const promises = []

  categories.forEach(category =>
    promises.push(
      getCollection({
        field: 'category',
        operator: '==',
        value: category
      })
    )
  )

  const products = await Promise.all(promises)

  categories.forEach((category, i) => {
    dispatch({
      type: SET_CATEGORIES,
      payload: { [category]: products[i], category }
    })
  })
}

export const setQuery = params => {
  return {
    type: 'SET_QUERY',
    payload: params
  }
}

export const clearProducts = () => ({ type: CLEAR_PRODUCTS })

export const getProducts = (field, operator, q) => async dispatch => {
  dispatch(clearProducts())

  const products = await getCollection({
    field,
    operator,
    value: q,
    limit: 21
  })

  dispatch({
    type: SET_PRODUCTS,
    payload: products
  })
}

export const setSelectedProduct = product => {
  return {
    type: SET_SELECTED_PRODUCT,
    payload: product
  }
}

export const addToCart = item => {
  const product = { ...item, quantity: 1 }

  return {
    type: ADD_PRODUCT_TO_CART,
    payload: product
  }
}

export const deleteFromCart = product => {
  return {
    type: DELETE_PRODUCT_FROM_CART,
    payload: product
  }
}

export const removeFromCart = item => {
  const product = { ...item, quantity: item.quantity - 1 }

  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: product
  }
}
