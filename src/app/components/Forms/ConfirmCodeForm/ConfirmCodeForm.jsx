import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import MyTextInput from '../../MyTextInput/MyTextInput'
import './ConfirmCodeForm.sass'
import { verifyResetPassCode } from '../../../redux/user/userSlice'

const ConfirmCodeForm = () => {
  const dispatch = useDispatch()

  function onSubmit(values) {
    const { confirmCode } = values
    console.log(confirmCode)
    dispatch(verifyResetPassCode(confirmCode))
  }
  return (
    <Formik
      initialValues={{
        confirmCode: '',
      }}
      validationSchema={Yup.object({
        confirmCode: Yup.string()
          .min(6, 'Confirmation code must be at least 6 characters')
          .required('This field is required'),
      })}
      onSubmit={onSubmit}
    >
      <Form className='confirm-code-form'>
        <h2 className='confirm-code-form__title'>Confirmation code</h2>
        <p className='confirm-code-form__descr'>
          Enter the code sent to you by gmail
        </p>
        <MyTextInput
          label='Code'
          id='confirmCode'
          name='confirmCode'
          type='password'
        />
        <button type='submit'>Confirm</button>
      </Form>
    </Formik>
  )
}

export default ConfirmCodeForm
