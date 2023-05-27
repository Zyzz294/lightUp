import React, { useEffect, useState } from 'react'
import './EditPlace.sass'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../../../MyTextInput/MyTextInput'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import AdminSpinner from '../../../../../AdminSpinner/AdminSpinner'
// import FormData from 'form-data'
import { getPlaceById } from '../../../../../../redux/places/placesSlice'

function EditPlace() {
  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const { mainFilePath, name, description, addressLink } =
    useSelector((state) => state.places.place)

  useEffect(() => {
    dispatch(getPlaceById(id))
  }, [])

  return (
    <div className='db-art'>
      <div className='db-art_theme'>
        <h2>Edit place</h2>
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
                name,
                description,
                addressLink,
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
              onSubmit={(values) =>
                console.log(JSON.stringify(values, null, 2))
              }
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

export default EditPlace
