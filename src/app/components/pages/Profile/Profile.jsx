import React, { useEffect, useState } from 'react'
import './Profile.sass'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../MyTextInput/MyTextInput'
import MyModal from '../../MyModal/MyModal'
import FormData from 'form-data'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editProfile, getUserById, reset, updateAvatar } from '../../../redux/user/userSlice'
import { toast } from 'react-toastify'
import Spinner from '../../../components/Spinner/Spinner'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modalActive, setModalActive] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const {
    id,
    name,
    surname,
    email,
    gender,
    phoneNumber,
    dob,
    country,
    profileUrl,
  } = useSelector((state) => state.user.user)
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user
  )

  const user = JSON.parse(localStorage.getItem('user'))
  const token = user && user.token
  const userId = user && user.id

  useEffect(() => {
    dispatch(getUserById(userId))
  }, [])

  function saveChanges(values) {
    const {
      name,
      surname,
      email,
      password,
      gender,
      phoneNumber,
      dob,
      country,
    } = values

    const profileData = {
      name,
      surname,
      email,
      password,
      gender,
      phoneNumber,
      dob,
      country,
    }

    dispatch(editProfile({ id, token, profileData }))
  }

  function updateAva() {
    const formData = new FormData()
    formData.append('multipartFile', selectedImage)

    dispatch(updateAvatar({ id, token, formData }))
    setModalActive(false)
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  useEffect(() => {
    if (isSuccess) {
      // toast.success(message)
      dispatch(reset())
    }
  }, [isSuccess, dispatch, message])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='profile-bg'>
      <div className='container'>
        <div className='profile'>
          <MyModal active={modalActive} setActive={setModalActive}>
            <div className='create-post__upload'>
              {selectedImage && (
                <div className='image-display'>
                  <img
                    alt='not fount'
                    width={'500px'}
                    src={URL.createObjectURL(selectedImage)}
                  />
                </div>
              )}
              <br />
              <input
                type='file'
                name='myImage'
                onChange={(event) => {
                  setSelectedImage(event.target.files[0])
                }}
                className='custom-file-input'
              />
              {selectedImage && (
                <>
                  <button
                    className='image-remove'
                    onClick={updateAva}
                  >
                    Update
                  </button>
                  <button
                    className='image-remove'
                    onClick={() => setSelectedImage(null)}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </MyModal>
          <div className='profile__title'>
            <img
              src={profileUrl ? profileUrl : './assets/icons/user.png'}
              alt='ava'
              className='profile__title-ava'
              onClick={() => setModalActive(true)}
            />
            <h5 className='profile__title-name'>
              {name} {surname}
            </h5>
          </div>
          <Formik
            initialValues={{
              name,
              surname,
              email,
              password: '',
              gender,
              phoneNumber,
              dob,
              country,
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
              password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('This field is required'),
              gender: Yup.string().required('Please select a gender'),
              phoneNumber: Yup.string()
                .min(9, 'Number must be at least 9 characters')
                .required('This field is required'),
              dob: Yup.string()
                .min(10, 'Date of birth must be at least 10 characters')
                .required('This field is required'),
              country: Yup.string()
                .min(2, 'Country must be at least 2 characters')
                .required('This field is required'),
            })}
            onSubmit={saveChanges}
          >
            <Form className='profile__form'>
              <div className='profile__form-inputs'>
                <div>
                  <MyTextInput
                    className='profile__form-input'
                    placeholder='Name'
                    id='name'
                    name='name'
                    type='text'
                  />
                  <MyTextInput
                    className='profile__form-input'
                    placeholder='Surname'
                    id='surname'
                    name='surname'
                    type='text'
                  />
                  <MyTextInput
                    className='profile__form-input'
                    placeholder='Gmail'
                    id='email'
                    name='email'
                    type='email'
                  />
                  <MyTextInput
                    className='profile__form-input'
                    placeholder='Password'
                    id='password'
                    name='password'
                    type='password'
                  />
                </div>
                <div>
                  <Field
                    className='profile__form-input'
                    id='gender'
                    name='gender'
                    as='select'
                  >
                    <option value={gender}>{gender}</option>
                    {gender === 'Male' ? (
                      <>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                      </>
                    ) : gender === 'Female' ? (
                      <>
                        <option value='Male'>Male</option>
                        <option value='Other'>Other</option>
                      </>
                    ) : (
                      <>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                      </>
                    )}
                  </Field>
                  <ErrorMessage
                    className='error'
                    name='gender'
                    component='div'
                  />
                  <MyTextInput
                    className='profile__form-input'
                    placeholder='Phone Number'
                    id='phoneNumber'
                    name='phoneNumber'
                    type='text'
                  />
                  <MyTextInput
                    className='profile__form-input'
                    placeholder='Date of Birth'
                    id='dob'
                    name='dob'
                    type='text'
                  />
                  <MyTextInput
                    className='profile__form-input'
                    placeholder='Country'
                    id='country'
                    name='country'
                    type='text'
                  />
                </div>
              </div>
              <div className='profile__form-btn-wrapper'>
                <button className='profile__form-btn' type='submit'>
                  Save changes
                </button>
                <button
                  className='profile__form-btn'
                  type='button'
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Profile
