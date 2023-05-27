import React, { useEffect, useState } from 'react'
import './CreateNewArticle.sass'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../../../MyTextInput/MyTextInput'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewArticle,
  reset,
} from '../../../../../../redux/article/articleSlice'
import { toast } from 'react-toastify'
import AdminSpinner from '../../../../../AdminSpinner/AdminSpinner'
import FormData from 'form-data'

function CreateNewArticle() {
  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.article
  )

  function onSubmit(values) {
    const formData = new FormData()
    formData.append('multipartFile', selectedImage)

    const { title, description, subtitle, text } = values
    const articleData = {
      title,
      description,
      subtitle,
      text,
    }

    dispatch(addNewArticle({articleData, formData}))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }

    if (isSuccess) {
      toast.success('Article is created successfully')
      dispatch(reset())
    }
  }, [isError, message, isSuccess, dispatch, navigate])

  if (isLoading) {
    return <AdminSpinner />
  }

  return (
    <div className='db-art'>
      <div className='db-art_theme'>
        <h2>Create new article</h2>
      </div>

      <div className='create-art'>
        <div className='create-art__wrapper'>
          <div className='create-art__upload'>
            {selectedImage && (
              <div className='image-display'>
                <img
                  alt='not fount'
                  width={'400px'}
                  src={URL.createObjectURL(selectedImage)}
                />
              </div>
            )}
            <br />
            <input
              className='create-art_inp'
              type='file'
              name='myImage'
              onChange={(event) => {
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
          <div className='create-art__content'>
            <Formik
              initialValues={{
                title: '',
                description: '',
                subtitle: '',
                text: '',
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
              <Form className='create-art-form'>
                <MyTextInput
                  placeholder='Title'
                  id='title'
                  name='title'
                  type='text'
                  className='create-art-form_input'
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
                  className='create-art-form_input'
                  placeholder='Subtitle'
                  id='subtitle'
                  name='subtitle'
                  type='text'
                />
                <Field
                  id='text'
                  name='text'
                  as='textarea'
                  className='description'
                  placeholder='Text'
                />
                <ErrorMessage className='error' name='text' component='div' />
                <div className='create-art_btns'>
                  <button className='create-art_btns_create' type='submit'>
                    Create
                  </button>

                  <button
                    type='button'
                    className='create-art_btns_cancel'
                    onClick={() => navigate(-1)}
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

export default CreateNewArticle
