import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import './SupportForm.sass'
import { addNewForum } from '../../../redux/forum/forumSlice'

const SupportForm = ({ token }) => {
  const dispatch = useDispatch()

  function onSubmit(values) {
    const { text } = values
    dispatch(addNewForum({ descr: text, token }))
  }

  return (
    <Formik
      initialValues={{
        text: '',
      }}
      validationSchema={Yup.object({
        text: Yup.string()
          .min(10, 'Message must be at least 10 characters')
          .required('This field is required'),
      })}
      onSubmit={onSubmit}
    >
      <Form className='sup-form'>
        <div className='sup-form__wrapper'>
          <Field
            id='text'
            name='text'
            as='textarea'
            className='text'
            placeholder='Message'
          />
          <ErrorMessage className='error' name='text' component='div' />
          <button type='submit'>Submit</button>
        </div>
      </Form>
    </Formik>
  )
}

export default SupportForm
