import { usePaystackPayment } from 'react-paystack'
import CustomBtn from '../components/custom-btn/CustomBtn'

const onSuccess = reference => {
  console.log(reference)
  window.alert('payment successful')
}

const onClose = () => {
  console.log('closed')
  window.alert('Payment cancelled')
}

const publicKey = process.env.REACT_APP_PAYSTACK_API_KEY

const Paystack = ({ email, amount = 20000 }) => {
  const config = {
    email,
    amount,
    publicKey
  }

  const initializePayment = usePaystackPayment(config)

  const onClick = () => {
    initializePayment(onSuccess, onClose)
  }

  return (
    <div>
      <CustomBtn onClick={onClick} text="Pay Now" />
    </div>
  )
}

export default Paystack
