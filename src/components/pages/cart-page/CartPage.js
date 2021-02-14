import { connect } from 'react-redux'
import './CartPage.scss'

import CustomBtn from '../../custom-btn/CustomBtn'
import { useHistory } from 'react-router-dom'
import { getUserCartTotal, getUserCart } from '../../../redux/selectors'
import {
  deleteFromCart,
  addToCart,
  removeFromCart
} from '../../../redux/actions'

import { Helmet } from 'react-helmet'
import ItemsCollection from '../../items-collection/ItemsCollection'
import { formatPrice } from '../../utils'

const CartPage = ({ total, cart, ...otherProps }) => {
  const history = useHistory()

  const renderCart = () => {
    if (!cart.length) return null

    return <ItemsCollection items={cart} {...otherProps} />
  }

  const onClick = () => {
    history.push('/checkout')
  }

  const render = () => {
    if (!cart.length)
      return (
        <main className="container cart-page">
          <h1 style={{ textAlign: 'center' }}>You have no items selected</h1>
        </main>
      )

    return (
      <main className="container cart-page">
        <Helmet>
          <title>Cart - Bnd Clothings</title>
          <meta name="description" content="Shop quality products" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1>Your cart:</h1>
        {renderCart()}
        <footer className="cartpage-footer">
          <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total:</span> <span>{formatPrice(total)}</span>
          </h3>
        </footer>
        <CustomBtn
          onClick={onClick}
          additionalStyles={{
            fontWeight: '400',
            width: '80%',
            fontSize: '1.2rem'
          }}
          text="Proceed to Checkout"
          className="black"
        />
      </main>
    )
  }

  return render()
}

const mapState = state => {
  const total = getUserCartTotal(state)
  const cart = getUserCart(state)

  return { total, cart }
}

export default connect(mapState, {
  remove: deleteFromCart,
  decrement: removeFromCart,
  increment: addToCart
})(CartPage)
