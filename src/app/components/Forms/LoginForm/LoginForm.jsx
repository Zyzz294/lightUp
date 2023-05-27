import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import './LoginForm.sass'
import MyTextInput from '../../MyTextInput/MyTextInput'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/auth/authSlice'

const LoginForm = () => {
  const dispatch = useDispatch()

  function onSubmit(values) {
    const { username, password } = values
    dispatch(login({username, password}))
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .email('Please enter a valid email address')
          .required('This field is required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('This field is required'),
      })}
      onSubmit={onSubmit}
    >
      <Form className='login-form'>
        <h2 className='login-form__title'>Welcome Back</h2>
        <MyTextInput 
          label='Gmail' 
          id='username' 
          name='username' 
          type='email' 
        />
        <MyTextInput
          label='Password'
          id='password'
          name='password'
          type='password'
        />
        <button type='submit'>Login</button>
        <div className='login-form__forgot-pass'>
          <Link to='/forgot-password'>Forgot Password?</Link>
        </div>
      </Form>
    </Formik>
  )
}

export default LoginForm
