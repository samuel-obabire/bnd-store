import { usePaystackPayment } from 'react-paystack'
import { connect } from 'react-redux'
import CustomBtn from '../components/custom-btn/CustomBtn'
import NotificationModal from '../components/notification-modal/NotificationModal'
import { displayNoticationModal } from '../redux/actions'

const publicKey = process.env.REACT_APP_PAYSTACK_API_KEY

const Paystack = ({ email, amount, displayNoticationModal }) => {
  const config = {
    email,
    amount,
    publicKey
  }

  const onSuccess = reference => {
    console.log(reference)
    displayNoticationModal('Payment Sucessful')
  }

  const onClose = () => {
    window.alert('Payment cancelled')
  }

  const initializePayment = usePaystackPayment(config)

  const onClick = () => {
    initializePayment(onSuccess, onClose)
  }

  return (
    <div>
      <NotificationModal />
      <CustomBtn onClick={onClick} text="Pay Now" />
    </div>
  )
}

export default connect(null, { displayNoticationModal })(Paystack)
