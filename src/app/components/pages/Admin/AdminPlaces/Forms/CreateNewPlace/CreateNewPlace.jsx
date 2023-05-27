import React, { useState } from 'react'
import './CreateNewPlace.sass'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../../../MyTextInput/MyTextInput'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import AdminSpinner from '../../../../../AdminSpinner/AdminSpinner'
import FormData from 'form-data'
import { addNewPlace } from '../../../../../../redux/places/placesSlice'

function CreateNewPlace() {
  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function onSubmit(values) {
    const formData = new FormData()
    formData.append('multipartFile', selectedImage)
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user && user.token

    const { category, name, description, addressLink } = values
    const categoryId = parseInt(category)
    const placeData = {
      categoryId,
      name,
      description,
      addressLink,
    }

    dispatch(addNewPlace({ placeData, formData, token }))
  }

  return (
    <div className='db-art'>
      <div className='db-art_theme'>
        <h2>Create new Place</h2>
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
                category: '',
                name: '',
                description: '',
                addressLink: '',
              }}
              validationSchema={Yup.object({
                category: Yup.string().required('Please select a category'),
                name: Yup.string()
                  .min(2, 'Title must be at least 2 characters')
                  .required('This field is required'),
                description: Yup.string()
                  .min(10, 'Text must be at least 10 characters')
                  .required('This field is required'),
                addressLink: Yup.string()
                  .min(2, 'Address link must be at least 2 characters')
                  .required('This field is required'),
              })}
              onSubmit={onSubmit}
            >
              <Form className='create-art-form'>
                <Field
                  className='create-art-form_input'
                  id='category'
                  name='category'
                  as='select'
                >
                  <option value='1'>Winter</option>
                  <option value='2'>Spring</option>
                </Field>
                <ErrorMessage
                  className='error'
                  name='category'
                  component='div'
                />
                <MyTextInput
                  placeholder='Title'
                  id='name'
                  name='name'
                  type='text'
                  className='create-art-form_input'
                />
                <Field
                  id='description'
                  name='description'
                  as='textarea'
                  className='description'
                  placeholder='Description'
                />
                <ErrorMessage
                  className='error'
                  name='description'
                  component='div'
                />
                <MyTextInput
                  className='create-art-form_input'
                  placeholder='Address link'
                  id='addressLink'
                  name='addressLink'
                  type='text'
                />
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

export default CreateNewPlace
