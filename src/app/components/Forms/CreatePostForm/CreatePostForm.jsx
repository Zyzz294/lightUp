import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { addNewPost } from '../../../redux/post/postSlice'
import MyTextInput from '../../MyTextInput/MyTextInput'
import './CreatePostForm.sass'
import FormData from 'form-data'

const CreatePostForm = ( { selectedImage, setModalActive } ) => {
  const dispatch = useDispatch()
  
  function onSubmit(values) {
    const formData = new FormData()
    formData.append('multipartFile', selectedImage)
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user && user.token

    const { title, description } = values
    const postData = {
      title,
      description,
    }

    dispatch(addNewPost({ postData, formData, token }))
    setModalActive(false)
  }

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(2, 'Title must be at least 2 characters')
          .required('This field is required'),
        description: Yup.string()
          .min(10, 'Text must be at least 10 characters')
          .required('This field is required'),
      })}
      onSubmit={onSubmit}
    >
      <Form className='create-post-form'>
        <MyTextInput
          placeholder='Title'
          id='title'
          name='title'
          type='text'
          className='title'
        />
        <Field
          id='description'
          name='description'
          as='textarea'
          className='post'
          placeholder='Write a post'
        />
        <ErrorMessage className='error' name='description' component='div' />
        <button type='submit'>Publish</button>
      </Form>
    </Formik>
  )
}

export default CreatePostForm
