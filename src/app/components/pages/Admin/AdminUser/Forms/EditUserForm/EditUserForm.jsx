import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './EditUserForm.sass'
import MyTextInput from '../../../../../MyTextInput/MyTextInput'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, reset } from '../../../../../../redux/user/userSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const EditUserForm = ({ handleClose }) => {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.getUser)
  const { id, name, surname, email, roles } = userData // Старые данные со стора которые идут в нач.знач формика
  const { isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.user
  )

  let role = roles[0].name // Роль юзера
  if (role === 'ROLE_ADMIN') {
    role = 'admin'
  } else if (role === 'ROLE_MODERATOR') {
    role = 'moderator'
  } else if (role === 'ROLE_USER') {
    role = 'user'
  }

  function onSubmit(values) {
    const { name, surname, email, role } = values

    const userData = {
      id,
      name,
      surname,
      email,
      role: [role],
    }

    dispatch(editUser(userData))
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
      toast.success('User updated successfully')
      dispatch(reset())
      handleClose()
    }
  }, [isSuccess, dispatch, handleClose])

  return (
    <Formik
      initialValues={{
        name,
        surname,
        email,
        role,
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
          <h2>Edit</h2>
        </div>
        <div className='user-form__content'>
          <div className='user-form__left'>
            <MyTextInput label='Name' id='name' name='name' type='text' />
            <MyTextInput label='Gmail' id='email' name='email' type='email' />
            <div className='form-btn__wrapper'>
              <button type='submit'>{isLoading ? 'Loading...' : 'Save'}</button>
              <button
                className='cancel-btn'
                type='button'
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
              <option value={role}>{role}</option>
              {role === 'user' ? (
                <option value='moderator'>moderator</option>
              ) : role === 'moderator' ? (
                <option value='user'>user</option>
              ) : null}
            </Field>
            <ErrorMessage className='error' name='role' component='div' />
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default EditUserForm
