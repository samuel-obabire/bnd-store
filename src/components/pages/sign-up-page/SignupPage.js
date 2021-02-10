import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../utils/firebase'

import { displayNoticationModal } from '../../../redux/actions'

import Form from '../../form/Form'
import NotificationModal from '../../notification-modal/NotificationModal'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

const fieldProps = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    label: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    id: 'password',
    label: 'Password'
  },

  {
    name: 'password-confirmation',
    type: 'password',
    id: 'password-confirmation',
    label: 'Confirm Password'
  }
]

const formFooterComponent = (
  <div className="field footer">
    Already have an account? <Link to="/login">login</Link>
  </div>
)

const SignUp = ({ user }) => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    history.push('/')
  })

  const onSubmit = ({ email, password }) => {
    setLoading(true)
    console.log('runn')
    auth.createUserWithEmailAndPassword(email, password).catch(e => {
      displayNoticationModal(e.message ?? 'something went wrong')
      setLoading(false)
    })
  }

  return (
    <div style={{ margin: '8rem 0' }}>
      <NotificationModal />
      <Form
        loading={loading}
        onFormSubmit={onSubmit}
        fieldProps={fieldProps}
        buttonText="Sign up"
        formFooterComponent={formFooterComponent}
      />
    </div>
  )
}

const mapState = state => {
  return { user: state.user.currentUser }
}

export default connect(mapState, { displayNoticationModal })(SignUp)
