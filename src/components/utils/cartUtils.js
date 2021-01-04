export const reduceCartItems = (state, productToAdd) => {
  const productIsExisting = !!state.cart.find(
    product => productToAdd.id === product.id
  )

  if (!productIsExisting)
    return { ...state, cart: state.cart.concat(productToAdd) }

  const cart = state.cart.map(product =>
    productToAdd.id === product.id
      ? { ...product, quantity: product.quantity + 1 }
      : product
  )

  return { ...state, cart }
}
