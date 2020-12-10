import { Link } from 'react-router-dom';

import Form from '../../form/Form';

import { auth } from '../../utils/firebase';

const fieldProps = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    id: 'password',
    label: 'Password',
  },
];

const formFooterComponent = (
  <div className="field footer">
    Don't have an account? <Link to="/sign-up">Sign up</Link>
  </div>
);

const SignIn = () => {
  const onSubmit = ({ email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(console.log)
      .catch(e => console.log(e));
  };

  return (
    <Form
      onFormSubmit={onSubmit}
      fieldProps={fieldProps}
      formFooterComponent={formFooterComponent}
    />
  );
};

export default SignIn;
