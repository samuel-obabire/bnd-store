import './CheckoutPage.scss'

import NaijaStates from 'naija-state-local-government'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Form from '../../../components/form/Form'
import Paystack from '../../Paystack'
import { getUserCart } from '../../../redux/selectors'
import ItemsCollection from '../../items-collection/ItemsCollection'
import {
  deleteFromCart,
  addToCart,
  removeFromCart
} from '../../../redux/actions'

const fieldProps = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    label: 'Email'
  },
  {
    name: 'phone number',
    type: 'number',
    id: 'phone-number',
    label: 'Phone Number'
  },
  {
    name: 'full name',
    type: 'text',
    id: 'full-name',
    label: 'Full Name'
  },
  {
    name: 'str address',
    type: 'text',
    id: 'str-address',
    label: 'Street Address'
  },
  {
    name: 'state',
    type: 'select',
    id: 'state',
    label: 'State',
    options: ['Select State', ...NaijaStates.states()]
  },
  {
    name: 'lga',
    type: 'select',
    id: 'local-govt',
    label: 'Local Government',
    options: ['Select LGA', ...NaijaStates.lgas('Ondo').lgas]
  },
  {
    name: 'addtional notes',
    type: 'textarea',
    id: 'addtional-notes',
    label: 'Additional Notes (optional)'
  }
]

const formHeader = (
  <header>
    <h3>Shipping Details</h3>
  </header>
)

const CheckoutPage = ({ user, cart, ...otherProps }) => {
  const history = useHistory()
  const [showNext, setshowNext] = useState(false)
  const [shippingDetails, setShippingDetails] = useState(false)

  useEffect(() => {
    if (!user) history.push('/login?next=/checkout')
  }, [user])

  if (!user) return null

  const { displayName, email, phoneNumber } = user

  const onFormSubmit = props => {
    setShippingDetails(props)
    setshowNext(true)
  }

  const render = () => {
    if (!showNext)
      return (
        <>
          <header>
            <h3>You're almost there! Complete your order</h3>
          </header>
          <Form
            buttonText="Proceed"
            formHeader={formHeader}
            initialValues={{
              email,
              'full name': displayName,
              'phone number': phoneNumber
            }}
            additionalStyles={{ maxWidth: '30rem', backgroundColor: 'white' }}
            onFormSubmit={onFormSubmit}
            fieldProps={fieldProps}
          />
        </>
      )

    return (
      <div>
        <header>
          <h2>Order Summary</h2>
        </header>
        <ItemsCollection items={cart} {...otherProps} />
        <div className="order-summary-fee">
          <div>
            <span>Starting Subtotal</span>
            <span>0000</span>
          </div>
          <div>
            <span>Subtotal</span>
            <span>0000</span>
          </div>
          <div>
            <span>Shipping Fee</span>
            <span>0000</span>
          </div>
          <h3>
            <span>Order Total</span>
            <span>0000</span>
          </h3>
        </div>
        <Paystack
          metadata={shippingDetails}
          amount={50000}
          email={shippingDetails.email}
        />
      </div>
    )
  }

  return <div className="checkout-page">{render()}</div>
}

const mapState = state => ({
  user: state.user.currentUser,
  cart: getUserCart(state)
})

export default connect(mapState, {
  remove: deleteFromCart,
  decrement: removeFromCart,
  increment: addToCart
})(CheckoutPage)
