import { Link } from 'react-router-dom'
import { auth } from '../../utils/firebase'

import Form from '../../form/Form'

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
    Already have an account? <Link to="/sign-in">Sign in</Link>
  </div>
)

const SignUp = () => {
  const onSubmit = ({ email, password }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(console.log)
      .catch(e => console.log(e))
  }

  return (
    <Form
      onFormSubmit={onSubmit}
      fieldProps={fieldProps}
      buttonText="Sign up"
      formFooterComponent={formFooterComponent}
    />
  )
}

export default SignUp
