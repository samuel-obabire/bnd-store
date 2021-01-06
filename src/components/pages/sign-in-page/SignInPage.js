import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { ReactComponent as GoogleIcon } from '../../../asset/google.svg'

import Form from '../../form/Form'

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

const SignIn = ({ user }) => {
  const history = useHistory()

  useEffect(() => {
    if (user) history.push('/')
  }, [user])

  const handleGoogleLogin = () => {
    signInWithGoogle()
  }

  const onSubmit = ({ email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(console.log)
      .catch(e => console.log(e))
  }

  return (
    <div className="container sign-in" style={{ marginTop: '8rem' }}>
      <h1 style={{ textAlign: 'center' }}>Login!</h1>
      <button
        onClick={handleGoogleLogin}
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
          margin: 'var(--element-margin) auto',
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
        formFooterComponent={formFooterComponent}
      />
    </div>
  )
}

const mapState = state => {
  return { user: state.user.currentUser }
}
export default connect(mapState)(SignIn)
