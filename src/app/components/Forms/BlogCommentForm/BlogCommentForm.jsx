import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { commentPostById } from '../../../redux/comment/commentSlice'
import './BlogCommentForm.sass'

const BlogCommentForm = ({ commentRef, id }) => {
  const dispatch = useDispatch()
  const postId = +id

  function onSubmit(values) {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user && user.token

    const { text } = values
    const comment = text

    dispatch(commentPostById({ postId, comment, token }))
  }

  return (
    <Formik
      initialValues={{
        text: '',
      }}
      validationSchema={Yup.object({
        text: Yup.string()
          .min(10, 'Comment must be at least 10 characters')
          .required('This field is required'),
      })}
      onSubmit={onSubmit}
    >
      <Form className='blog-comment-form'>
        <Field
          id='text'
          name='text'
          as='textarea'
          className='text'
          innerRef={commentRef}
        />
        <ErrorMessage className='error' name='text' component='div' />
        <button type='submit'>Add comment</button>
      </Form>
    </Formik>
  )
}

export default BlogCommentForm
