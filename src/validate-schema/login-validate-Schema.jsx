import * as yup from 'yup'

const loginValidationSchema = yup.object({
  email: yup.string()
  .required('Email is required')
  .email('Invalid email format')
  .matches(/^[^!#$%^&*()]*$/, 'Email cannot contain !#$%^&*() characters'),
  
  password: yup.string()
  .required('password is required')
  .min(5, 'password must have at least 5 symbols')
  .max(20, 'password can\'t have more than 20 symbols'),

})

export default loginValidationSchema;
