import { Field, reduxForm } from 'redux-form';

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <div className="field-error">{error}</div>;
  }
};

const renderFormComponent = ({ id, type, label, input, meta }) => {
  return (
    <>
      <label htmlFor={type}>{label}</label>
      <input id={id} {...input} type={type} />
      {renderError(meta)}
    </>
  );
};

const Form = ({
  fieldProps,
  onFormSubmit,
  handleSubmit,
  formFooterComponent,
  ...otherProps
}) => {
  const renderFormFields = fieldProps =>
    fieldProps.map(({ ...props }) => {
      return (
        <div className="field" key={props.id}>
          <Field {...props} component={renderFormComponent} />
        </div>
      );
    });

  const onSubmit = formProps => {
    onFormSubmit(formProps);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {renderFormFields(fieldProps)}
      <button
        className={`${
          otherProps.invalid
            ? 'disabled'
            : otherProps.pristine
            ? 'disabled'
            : ''
        }`}
        type="submit"
        disabled={otherProps.invalid || otherProps.pristine}>
        Submit
      </button>
      {formFooterComponent}
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

  if (values.password !== values['password-confirmation']) {
    errors['password-confirmation'] = "Passwords don't match";
  }

  return errors;
};

export default reduxForm({ form: 'Login Information', validate })(Form);
