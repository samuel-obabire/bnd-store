import { usePaystackPayment } from 'react-paystack'

const onSuccess = reference => {
  console.log(reference)
}

const onClose = () => {
  console.log('closed')
}

const Paystack = ({ email, amount = 2000 }) => {
  const config = {
    reference: new Date().getTime(),
    email,
    amount,
    publicKey: 'pk_test_d00648b17fe2e7748862f8dca90d4d84368fcf5b'
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
