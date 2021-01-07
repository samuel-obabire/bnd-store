import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import './Form.scss'

import { renderFormComponent, validate } from '../utils/formUtils'

const Form = ({
  additionalStyles,
  fieldProps,
  onFormSubmit,
  loading,
  handleSubmit,
  formFooterComponent,
  selectedState,
  ...otherProps
}) => {
  const renderFormFields = fieldProps =>
    fieldProps.map(({ ...props }) => {
      return (
        <div className="field" key={props.id}>
          <Field
            {...props}
            component={props =>
              renderFormComponent({ ...props, selectedState })
            }
          />
        </div>
      )
    })

  const onSubmit = formProps => {
    onFormSubmit(formProps)
  }

  return (
    <form
      style={additionalStyles || {}}
      className="form container"
      onSubmit={handleSubmit(onSubmit)}>
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
        {loading ? '...' : 'Submit'}
      </button>
      {formFooterComponent}
    </form>
  )
}

const mapState = state => {
  return {
    selectedState: state.form?.form?.values?.state
  }
}

export default connect(mapState)(reduxForm({ form: 'form', validate })(Form))
