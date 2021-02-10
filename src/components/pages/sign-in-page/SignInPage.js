import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { ReactComponent as GoogleIcon } from '../../../asset/google.svg'
import useQuery from '../../../hooks/useQuery'

import { displayNoticationModal } from '../../../redux/actions'

import Form from '../../form/Form'
import NotificationModal from '../../notification-modal/NotificationModal'

import { auth, signInWithGoogle } from '../../utils/firebase'

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
  }
]

const formFooterComponent = (
  <div className="field footer">
    Don't have an account? <Link to="/sign-up">Sign up</Link>
  </div>
)

const SignIn = ({ user, displayNoticationModal }) => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const query = useQuery()

  useEffect(() => {
    if (!user) return

    const next = query.get('next')

    history.push(next ?? '/')
  }, [user])

  const onSubmit = ({ email, password }) => {
    setLoading(true)
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => setLoading(false))
      .catch(e => {
        console.log(e)
        displayNoticationModal(e.message ?? 'something went wrong', 'error')
        setLoading(false)
      })
  }

  return (
    <div className="container sign-in" style={{ marginTop: '8rem' }}>
      <NotificationModal />
      <h1 style={{ textAlign: 'center' }}>Login!</h1>
      <button
        onClick={signInWithGoogle}
        style={{
          display: 'flex',
          margin: 'var(--element-margin) auto',
          width: '90%',
          maxWidth: '17rem',
          padding: '0.3rem',
          borderRadius: '.5rem',
          border: '2px solid rgb(176, 176, 176)',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'transparent'
        }}>
        <div style={{ width: 20, height: 'auto' }}>
          <GoogleIcon />
        </div>
        <span style={{ margin: 'auto' }}>Continue with Google</span>
      </button>
      <div
        style={{
          margin: '2rem auto .3rem',
          height: '1px',
          width: '90%',
          maxWidth: '17rem',
          textAlign: 'center',
          position: 'relative'
        }}>
        <hr />
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            fontSize: '.9rem',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '.3rem .5rem',
            borderRadius: '.3rem'
          }}>
          or
        </span>
      </div>
      <Form
        onFormSubmit={onSubmit}
        fieldProps={fieldProps}
        loading={loading}
        buttonText="Login"
        formFooterComponent={formFooterComponent}
      />
    </div>
  )
}

const mapState = state => {
  return { user: state.user.currentUser }
}

export default connect(mapState, { displayNoticationModal })(SignIn)
