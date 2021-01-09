import { usePaystackPayment } from 'react-paystack'

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

  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose)
        }}>
        PayNow
      </button>
    </div>
  )
}

export default Paystack
