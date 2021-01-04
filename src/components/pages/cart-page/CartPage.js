import { connect } from 'react-redux'
import './CartPage.scss'

import { ReactComponent as DeleteIcon } from '../../../asset/delete.svg'
import { ReactComponent as PlusIcon } from '../../../asset/plus.svg'
import { ReactComponent as MinusIcon } from '../../../asset/minus.svg'

const CartPage = ({ cart }) => {
  const renderCart = () => {
    if (!cart.length) return <h1>You have no items selected</h1>

    return cart.map(item => (
      <div className="cart-item" key={item.id}>
        <div className="cart-wrapper">
          <div className="image-wrapper">
            <img src={item.image} alt="" />
          </div>
          <div>{item.title}</div>
        </div>
        <div className="item-controls">
          <div className="icon">
            <DeleteIcon />
          </div>
          <div className="icon">
            <MinusIcon />
          </div>
          <div>{item.quantity}</div>
          <div className="icon">
            <PlusIcon />
          </div>
        </div>
      </div>
    ))
  }

  return <main className="container cart-page">{renderCart()}</main>
}

const mapState = ({ user: { cart } }) => {
  return { cart }
}

export default connect(mapState)(CartPage)
