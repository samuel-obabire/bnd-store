export const reduceCartItems = (state, productToAdd) => {
  const productIsExisting = !!state.cartItems.find(
    product => productToAdd.id === product.id
  )

  if (!productIsExisting)
    return { ...state, cartItems: state.cartItems.concat(productToAdd) }

  const cartItems = state.cartItems.map(product =>
    productToAdd.id === product.id
      ? { ...productToAdd, quantity: product.quantity + 1 }
      : product
  )

  return { ...state, cartItems }
}

export const deleteCartItem = (state, productToRemove) => {
  const cartItems = state.cartItems.filter(product => {
    return productToRemove.id !== product.id
  })

  return { ...state, cartItems }
}

export const removeCartItem = (state, productToRemove) => {
  const cartItems = state.cartItems.map(product =>
    productToRemove.id === product.id
      ? { ...product, quantity: product.quantity - 1 }
      : product
  )

  return { ...state, cartItems }
}
