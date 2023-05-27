import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import './AddNewUserForm.sass'
import MyTextInput from '../../../../../MyTextInput/MyTextInput'
import { addNewUser, reset } from '../../../../../../redux/user/userSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const AddNewUserForm = ({ handleClose }) => {
  const dispatch = useDispatch()
  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.user
  )

  function onSubmit(values) {
    const { name, surname, email, role } = values
    dispatch(
      addNewUser({
        name,
        surname,
        email,
        role: [role],
      })
    )
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
      handleClose()
    }
  }, [isError, message, dispatch, handleClose])

  useEffect(() => {
    if (isSuccess) {
      toast.success('User is created successfully')
      dispatch(reset())
      handleClose()
    }
  }, [isSuccess, dispatch, handleClose])

  return (
    <Formik
      initialValues={{
        name: '',
        surname: '',
        email: '',
        role: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, 'Name must be at least 2 characters')
          .required('This field is required'),
        surname: Yup.string()
          .min(2, 'Surname must be at least 2 characters')
          .required('This field is required'),
        email: Yup.string()
          .email('Please enter a valid email address')
          .required('This field is required'),
        role: Yup.string().required('Please select a role'),
      })}
      onSubmit={onSubmit}
    >
      <Form className='user-form'>
        <div className='user-form__title-wrapper'>
          <h2>Add new user</h2>
        </div>
        <div className='user-form__content'>
          <div className='user-form__left'>
            <MyTextInput label='Name' id='name' name='name' type='text' />
            <MyTextInput label='Gmail' id='email' name='email' type='email' />
            <div className='form-btn__wrapper'>
              <button type='submit'>{isLoading ? 'Loadnig...' : 'Add'}</button>
              <button
                className='cancel-btn'
                onClick={(e) => {
                  e.preventDefault()
                  handleClose()
                }}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className='user-form__right'>
            <MyTextInput
              label='Surname'
              id='surname'
              name='surname'
              type='text'
            />
            <label htmlFor='role'>Role</label>
            <Field id='role' name='role' as='select'>
              <option value=''>Select a role</option>
              <option value='user'>user</option>
              <option value='moderator'>moderator</option>
            </Field>
            <ErrorMessage className='error' name='role' component='div' />
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default AddNewUserForm
