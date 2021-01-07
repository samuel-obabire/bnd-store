import './CheckoutPage.scss'

import Form from '../../../components/form/Form'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import NaijaStates from 'naija-state-local-government'

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
    name: 'city',
    type: 'text',
    id: 'city',
    label: 'City'
  },
  {
    name: 'addtional notes',
    type: 'textarea',
    id: 'addtional-notes',
    label: 'Additional Notes (optional)'
  }
]

const onFormSubmit = props => console.log(props)

const CheckoutPage = ({ user }) => {
  const history = useHistory()

  useEffect(() => {
    if (!user) history.push('/login')
  }, [user])

  if (!user) return null

  const { displayName, email, phoneNumber } = user

  return (
    <div className="checkout-page">
      <Form
        initialValues={{
          email,
          'full name': displayName,
          'phone number': phoneNumber
        }}
        additionalStyles={{ maxWidth: '30rem' }}
        onFormSubmit={onFormSubmit}
        fieldProps={fieldProps}
      />
    </div>
  )
}

const mapState = ({ user }) => ({ user: user.currentUser })

export default connect(mapState)(CheckoutPage)
