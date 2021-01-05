import { connect } from 'react-redux'
import './CartPage.scss'

import { ReactComponent as DeleteIcon } from '../../../asset/delete.svg'
import { ReactComponent as PlusIcon } from '../../../asset/plus.svg'
import { ReactComponent as MinusIcon } from '../../../asset/minus.svg'
import {
  deleteFromCart,
  addToCart,
  removeFromCart
} from '../../../redux/actions'

const CartPage = ({ cart, deleteFromCart, addToCart, removeFromCart }) => {
  const renderCart = () => {
    if (!cart.length) return null

    return cart.map(item => (
      <div className="cart-item" key={item.id}>
        <div className="cart-wrapper">
          <div className="image-wrapper">
            <img src={item.image} alt="" />
          </div>
          <div>{item.title}</div>
        </div>
        <div className="item-controls">
          <div className="icon" onClick={() => deleteFromCart(item)}>
            <DeleteIcon />
          </div>
          <div
            className="icon"
            style={item.quantity === 1 ? { opacity: '0.2' } : {}}
            onClick={() => item.quantity > 1 && removeFromCart(item)}>
            <MinusIcon />
          </div>
          <div className="icon">{item.quantity}</div>
          <div
            className="icon"
            onClick={() => {
              addToCart(item)
            }}>
            <PlusIcon />
          </div>
        </div>
      </div>
    ))
  }

  return (
    <main className="container cart-page">
      {cart.length ? (
        <h1>Your cart:</h1>
      ) : (
        <h1 style={{ textAlign: 'center' }}>You have no items selected</h1>
      )}
      {renderCart()}
    </main>
  )
}

const mapState = ({ cart: { cartItems: cart } }) => {
  return { cart }
}

export default connect(mapState, { deleteFromCart, addToCart, removeFromCart })(
  CartPage
)
