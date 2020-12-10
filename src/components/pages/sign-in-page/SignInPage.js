import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import './SignInPage.scss';

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <div className="field-error">{error}</div>;
  }
};

const renderFormComponent = ({ type, text, input, meta }) => {
  console.log(meta);

  return (
    <>
      <label htmlFor={type}>{text}</label>
      <input id={type} {...input} type={type} />
      {renderError(meta)}
    </>
  );
};

const SignIn = ({ handleSubmit, ...meta }) => {
  console.log(meta);
  const onSubmit = formWalues => {
    console.log(formWalues);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <Field
          name="email"
          component={renderFormComponent}
          type="email"
          text="Email"
        />
      </div>
      <div className="field">
        <Field
          name="password"
          component={renderFormComponent}
          type="password"
          text="Password"
        />
      </div>
      <button
        className={`${
          meta.invalid ? 'disabled' : meta.pristine ? 'disabled' : ''
        }`}
        type="submit"
        disabled={meta.pristine || meta.invalid}>
        Submit
      </button>

      <div className="field footer">
        <Link to="/">Forgot password?</Link>
      </div>
      <div className="field footer">
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

export default reduxForm({ form: 'Login Information', validate })(SignIn);
