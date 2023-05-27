import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../MyTextInput/MyTextInput'
import './ForgotPassForm.sass'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../../redux/user/userSlice'

const ForgotPassForm = () => {
  const dispatch = useDispatch()

  function onSubmit(values) {
    const { email } = values
    dispatch(resetPassword(email))
  }
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Please enter a valid email address')
          .required('This field is required'),
      })}
      onSubmit={onSubmit}
    >
      <Form className='forgot-pass-form'>
        <h2 className='forgot-pass-form__title'>Forgot Password?</h2>
        <p className='forgot-pass-form__descr'>
          Enter your gmail to reset your password
        </p>
        <MyTextInput
          label='Gmail'
          id='email'
          name='email'
          type='email'
        />
        <button type='submit'>Send</button>
      </Form>
    </Formik>
  )
}

export default ForgotPassForm
