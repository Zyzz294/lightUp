import React, { useEffect, useState } from 'react'
import './EditArticle.sass'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../../../MyTextInput/MyTextInput'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  editArticle,
  getArticleById,
  reset,
} from '../../../../../../redux/article/articleSlice'
import { toast } from 'react-toastify'
import AdminSpinner from '../../../../../AdminSpinner/AdminSpinner'

function EditArticle() {
  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const { title, dateCreated, filePath, description, subtitle, text } =
    useSelector((state) => state.article.article)

    const { isSuccess, isError, message, isLoading } =
    useSelector((state) => state.article)

  useEffect(() => {
    dispatch(getArticleById(id))
    dispatch(reset())
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success('Article updated successfully')
    }

    dispatch(reset())

  }, [isError, message, dispatch, isSuccess])


  function onSubmit(values) {
    const formData = new FormData()
    formData.append('multipartFile', selectedImage)

    const { title, description, subtitle, text } = values
    const articleData = {
      id,
      title,
      dateCreated,
      description,
      subtitle,
      text,
    }

    dispatch(editArticle({ articleData, formData }))
  }

  if(isLoading) {
    return <AdminSpinner />
  }

  return (
    <div className='db-art'>
      <div className='db-art_theme'>
        <h2>Edit article</h2>
      </div>

      <div className='edit-art'>
        <div className='edit-art__wrapper'>
          <div className='edit-art__upload'>
            <div className='image-display'>
              <img alt='not fount' width={'400px'} src={filePath} />
            </div>
            {/* <div className='image-display'>
              <img
                alt='not fount'
                width={'400px'}
                src={URL.createObjectURL(selectedImage)}
              />
            </div> */}
            <br />
            <input
              className='edit-art_inp'
              type='file'
              name='myImage'
              onChange={(event) => {
                console.log(event.target.files[0])
                setSelectedImage(event.target.files[0])
              }}
            />
            <button
              className={
                selectedImage ? 'image-remove' : 'image-remove disabled-btn '
              }
              onClick={() => setSelectedImage(null)}
            >
              Remove
            </button>
          </div>
          <hr className='hr-line' />
          <div className='edit-art__content'>
            <Formik
              initialValues={{
                title,
                description,
                subtitle,
                text,
              }}
              validationSchema={Yup.object({
                title: Yup.string()
                  .min(2, 'Title must be at least 2 characters')
                  .required('This field is required'),
                description: Yup.string()
                  .min(10, 'Text must be at least 10 characters')
                  .required('This field is required'),
                subtitle: Yup.string()
                  .min(2, 'Title must be at least 2 characters')
                  .required('This field is required'),
                text: Yup.string()
                  .min(30, 'Text must be at least 30 characters')
                  .required('This field is required'),
              })}
              onSubmit={onSubmit}
            >
              <Form className='edit-art-form'>
                <MyTextInput
                  placeholder='Title'
                  id='title'
                  name='title'
                  type='text'
                  className='edit-art-form_input'
                />
                <Field
                  id='description'
                  name='description'
                  as='textarea'
                  className='description'
                  placeholder='Small description'
                />
                <ErrorMessage
                  className='error'
                  name='description'
                  component='div'
                />
                <MyTextInput
                  placeholder='SubTitle'
                  id='subtitle'
                  name='subtitle'
                  type='text'
                  className='edit-art-form_input'
                />
                <Field
                  id='text'
                  name='text'
                  as='textarea'
                  className='description'
                  placeholder='Text'
                />
                <ErrorMessage className='error' name='text' component='div' />
                <div className='edit-art_btns'>
                  <button className='edit-art_btns_save' type='submit'>
                    Save
                  </button>

                  <button
                    className='edit-art_btns_cancel'
                    onClick={() => navigate(-1)}
                    type='button'
                  >
                    Go back
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditArticle
