import './CheckoutPage.scss'

import NaijaStates from 'naija-state-local-government'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Form from '../../../components/form/Form'
import Paystack from '../../Paystack'
import NoticationModal from '../../../components/notification-modal/NotificationModal'

import { getUserCart, getUserCartTotal } from '../../../redux/selectors'
import ItemsCollection from '../../items-collection/ItemsCollection'
import {
  deleteFromCart,
  addToCart,
  removeFromCart,
  displayNoticationModal
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

const CheckoutPage = ({
  user,
  cart,
  total,
  displayNoticationModal,
  ...otherProps
}) => {
  const history = useHistory()
  const [showNext, setshowNext] = useState(false)
  const [shippingDetails, setShippingDetails] = useState(false)

  useEffect(() => {
    if (!user) history.push('/login?next=/checkout')
  }, [user, history])

  if (!user) return null

  const { displayName, email, phoneNumber } = user

  const onFormSubmit = props => {
    setShippingDetails(props)
    setshowNext(true)
  }

  const getShippingFee = () => {
    // if (shippingDetails.state === 'Lagos') {
    //   displayNoticationModal(`free shipping`)

    //   return 0
    // }

    return 1500
  }

  const render = () => {
    if (!showNext)
      return (
        <>
          <NoticationModal />
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
          <h1>Order Summary</h1>
        </header>
        <ItemsCollection items={cart} {...otherProps} />
        <div className="order-summary-fee">
          <div>
            <span>Starting Subtotal</span>
            <span>&#8358; {total}</span>
          </div>
          <div>
            <span>Shipping Fee</span>
            <span>
              &#8358;
              {getShippingFee()}
            </span>
          </div>
          <h3>
            <span>Order Total</span>
            <span>&#8358; {parseFloat(total) + getShippingFee()}</span>
          </h3>
        </div>
        <Paystack
          metadata={shippingDetails}
          amount={total * 100}
          email={shippingDetails.email}
        />
      </div>
    )
  }

  return <div className="checkout-page">{render()}</div>
}

const mapState = state => ({
  user: state.user.currentUser,
  cart: getUserCart(state),
  total: getUserCartTotal(state)
})

export default connect(mapState, {
  remove: deleteFromCart,
  decrement: removeFromCart,
  increment: addToCart,
  displayNoticationModal
})(CheckoutPage)