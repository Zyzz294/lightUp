import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import './ChangePassForm.sass'
import MyTextInput from '../../MyTextInput/MyTextInput'
import { changePassword } from '../../../redux/user/userSlice'

const ChangePassForm = () => {
  const dispatch = useDispatch()

  function onSubmit(values) {
    const { newPassword } = values
    dispatch(changePassword(newPassword))
  }
  return (
    <Formik
      initialValues={{
        newPassword: '',
        newPassConfirmation: '',
      }}
      validationSchema={Yup.object({
        newPassword: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('This field is required'),
        newPassConfirmation: Yup.string().oneOf(
          [Yup.ref('newPassword'), null],
          'Passwords do not match'
        ),
      })}
      onSubmit={onSubmit}
    >
      <Form className='change-pass-form'>
        <h2 className='change-pass-form__title'>Change password</h2>
        <MyTextInput
          label='New password'
          id='newPassword'
          name='newPassword'
          type='password'
        />
        <MyTextInput
          label='Confirm new password'
          id='newPassConfirmation'
          name='newPassConfirmation'
          type='password'
        />
        <button type='submit'>Change password</button>
      </Form>
    </Formik>
  )
}

export default ChangePassForm
