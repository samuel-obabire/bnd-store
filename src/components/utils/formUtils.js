import NaijaStates from 'naija-state-local-government'
import { firestore } from '../utils/firebase'

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <div className="field-error">{error}</div>
  }
}

const renderOptions = options =>
  options.map((option, i) => {
    if (i === 0)
      return (
        <option key={option} value="">
          {option}
        </option>
      )

    return (
      <option key={option} value={option}>
        {option}
      </option>
    )
  })

export const renderFormComponent = ({
  id,
  type,
  label,
  input,
  meta,
  options,
  selectedState,
  multiple
}) => {
  if (type === 'select' && label === 'Local Government') {
    return (
      <>
        <label htmlFor={type}>{label}</label>
        <select {...input} id={id}>
          {selectedState &&
            renderOptions([
              'Select LGA',
              ...NaijaStates.lgas(selectedState).lgas
            ])}
        </select>
        {renderError(meta)}
      </>
    )
  }

  // if (type === 'select' && label === 'Category') {
  //   const categories = await firestore
  //     .collection('categories')
  //     .get()
  //     .then(querySnapshot => querySnapshot.docs.map(doc => doc.data().category))
  //   console.log(categories)

  //   // return (
  //   //   <>
  //   //     <label htmlFor={type}>{label}</label>
  //   //     <select {...input} id={id} multiple={multiple || false}>
  //   //       {renderOptions(options)}
  //   //     </select>
  //   //     {renderError(meta)}
  //   //   </>
  //   // )
  // }

  if (type === 'select')
    return (
      <>
        <label htmlFor={type}>{label}</label>
        <select {...input} id={id} multiple={multiple || false}>
          {renderOptions(options)}
        </select>
        {renderError(meta)}
      </>
    )

  if (type === 'textarea')
    return (
      <>
        <label htmlFor={type}>{label}</label>
        <textarea {...input} id={id} />
        {renderError(meta)}
      </>
    )

  return (
    <>
      <label htmlFor={type}>{label}</label>
      <input id={id} {...input} type={type} />
      {renderError(meta)}
    </>
  )
}

export const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  if (values.password !== values['password-confirmation']) {
    errors['password-confirmation'] = "Passwords don't match"
  }

  if (!values['str address']) {
    errors['str address'] = 'Address is required'
  }
  if (!values['phone number']) {
    errors['phone number'] = 'Phone number is required'
  }

  if (!values['full name']) {
    errors['full name'] = 'Name is required'
  }

  if (!values.state) {
    errors.state = 'State is required'
  }
  if (!values.lga) {
    errors.lga = 'LGA is required'
  }
  if (!values.title) {
    errors.title = 'Title is required'
  }
  if (!values.price) {
    errors.price = 'Price is required'
  }
  if (!values.category) {
    errors.category = 'Category is required'
  }
  if (!values['description']) {
    errors.description = 'Enter Product Description'
  } else if (values?.description?.trim()?.length < 80) {
    errors.description = 'Description too short'
  }

  if (!values.material) {
    errors.material = 'Material is required'
  }

  if (values?.keywords?.includes(' ') || !values.keywords) {
    errors.keywords = 'Format not correct'
  }

  if (!values?.sizes?.length) {
    errors.sizes = 'Select Sizes'
  }
  return errors
}
