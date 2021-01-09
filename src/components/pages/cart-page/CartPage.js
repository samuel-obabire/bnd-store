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
import CustomBtn from '../../custom-btn/CustomBtn'
import { useHistory } from 'react-router-dom'
import { getUserCartTotal, getUserCart } from '../../../redux/selectors'

const CartPage = ({
  cart,
  deleteFromCart,
  addToCart,
  removeFromCart,
  total
}) => {
  const history = useHistory()

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
        <h1>Your cart:</h1>
        {renderCart()}
        <footer className="cartpage-footer">
          <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total:</span> <span>&#8358; {total}</span>
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

export default connect(mapState, { deleteFromCart, addToCart, removeFromCart })(
  CartPage
)
