import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import './RegisterForm.sass'
import MyTextInput from '../../MyTextInput/MyTextInput'
import { register } from '../../../redux/auth/authSlice'

const RegisterForm = () => {
  const dispatch = useDispatch()
  
  function onSubmit(values) {
    const { name, surname, email, password } = values
    dispatch(register({ name, surname, email, password }))
  }

  return (
    <Formik
      initialValues={{
        name: '',
        surname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, 'First name must be at least 2 characters')
          .required('This field is required'),
        surname: Yup.string()
          .min(2, 'Last name must be at least 2 characters')
          .required('This field is required'),
        email: Yup.string()
          .email('Please enter a valid email address')
          .required('This field is required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('This field is required'),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Passwords do not match'
        ),
      })}
      onSubmit={onSubmit}
    >
      <Form className='register-form'>
        <h2 className='register-form__title'>Welcome Back</h2>
        <MyTextInput
          label='First Name'
          id='name'
          name='name'
          type='text'
        />
        <MyTextInput
          label='Last Name'
          id='surname'
          name='surname'
          type='text'
        />
        <MyTextInput
          label='Gmail'
          id='email'
          name='email'
          type='email'
        />
        <MyTextInput
          label='Password'
          id='password'
          name='password'
          type='password'
        />
        <MyTextInput
          label='Confirm Password'
          id='passwordConfirmation'
          name='passwordConfirmation'
          type='password'
        />
        <button type='submit'>Register</button>
      </Form>
    </Formik>
  )
}

export default RegisterForm
