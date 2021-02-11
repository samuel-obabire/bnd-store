import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import './Form.scss'

import { renderFormComponent, validate } from '../utils/formUtils'
import { getUserSelectedState } from '../../redux/selectors'

const Form = ({
  additionalStyles,
  fieldProps,
  formHeader,
  buttonText = 'Submit',
  onFormSubmit,
  loading,
  handleSubmit,
  formFooterComponent,
  selectedState = '',
  ...otherProps
}) => {
  const renderFormFields = fieldProps =>
    fieldProps.map(({ ...props }) => {
      // had to use enhancedProps in other to solve input loosing focus
      // after first keystroke
      const enhancedProps = { ...props, selectedState }

      return (
        <div className="field" key={props.id}>
          <Field {...enhancedProps} component={renderFormComponent} />
        </div>
      )
    })

  const onSubmit = formProps => {
    onFormSubmit(formProps)
  }

  return (
    <div style={additionalStyles || {}} className="form-wrapper">
      {formHeader}
      <form className="form container" onSubmit={handleSubmit(onSubmit)}>
        {renderFormFields(fieldProps)}
        {formFooterComponent}
        <button
          // className={`${
          //   otherProps.invalid
          //     ? 'disabled'
          //     : otherProps.pristine
          //     ? 'disabled'
          //     : ''
          // }`}
          type="submit"
          // disabled={otherProps.invalid || otherProps.pristine}
        >
          {loading ? '...' : buttonText}
        </button>
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    selectedState: getUserSelectedState(state)
  }
}

export default connect(mapState)(reduxForm({ form: 'form', validate })(Form))
