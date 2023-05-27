import React, { useState, useEffect } from 'react'
import './PlacesDetails.sass'
import StarIcon from '@mui/icons-material/Star'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Rating,
  Stack,
  Box,
  TextField,
  MenuItem,
} from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { getAllPlaces, getPlaceById } from '../../../redux/places/placesSlice'
import Spinner from '../../Spinner/Spinner'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../../redux/user/userSlice'

const currencies = [
  {
    value: '1',
    label: 'Useless',
  },
  {
    value: '2',
    label: 'Poor',
  },
  {
    value: '3',
    label: 'Ok',
  },
  {
    value: '4',
    label: 'Good',
  },
  {
    value: '5',
    label: 'Excellent',
  },
]

function PlacesDetails({ setIsMain }) {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [currency, setCurrency] = useState('EUR')
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user && user.id

  const handleChange = (event) => {
    setCurrency(event.target.value)
  }
  useEffect(() => {
    setIsMain(false)
    dispatch(getUserById(userId))
  }, [])

  useEffect(() => {
    dispatch(getPlaceById(id))
    dispatch(getAllPlaces())
  }, [id, dispatch])

  const { place, isLoading, isError, message } = useSelector(
    (state) => state.places
  )

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // if (isError) {
  //   toast.error(message)
  // }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='container'>
      <div className='p-details'>
        <img className='p-details_banner' src={place.mainFilePath} alt='#' />

        <div className='p-details_theme'>
          <h2>{place.name}</h2>
          <span>
            5.0
            <StarIcon className='p-details_theme-icon' fontSize='large' />
            <FmdGoodIcon
              className='p-details_theme-icon-2'
              fontSize='extra-large'
              onClick={() => openInNewTab(place.addressLink)}
            />
          </span>
        </div>

        <p className='p-details_text'>{place.description}</p>
        <h3 className='p-details_txt'>Comments</h3>
        <div className='p-details_comment'>
          <List
            sx={{
              width: '100%',
              maxWidth: 373,
              bgcolor: '#F5F5F5',
              borderRadius: '10px',
              minHeight: 139,
            }}
          >
            <ListItem alignItems='flex-start'>
              <ListItemAvatar sx={{ width: 50, height: 50 }}>
                <Avatar
                  alt='Remy Sharp'
                  src='../assets/ImageTemplates/ava.png'
                />
              </ListItemAvatar>
              <ListItemText primary='Alexa Sneijder' secondary='20.10.2022' />
              <Stack spacing={1}>
                <Rating name='size-medium' defaultValue={5} />
              </Stack>
            </ListItem>
            <Typography sx={{ padding: 2 }}>
              I've walked through the desert of desperation and now I'm swimming
              in an ocean of joy. Thank you
            </Typography>
          </List>

          <List
            sx={{
              width: '100%',
              maxWidth: 373,
              bgcolor: '#F5F5F5',
              borderRadius: '10px',
              minHeight: 169,
            }}
          >
            <ListItem alignItems='flex-start'>
              <ListItemAvatar sx={{ width: 50, height: 50 }}>
                <Avatar
                  alt='Remy Sharp'
                  src='../assets/ImageTemplates/ava.png'
                />
              </ListItemAvatar>
              <ListItemText
                className='comment'
                primary='Alexa Sneijder'
                secondary='20.10.2022'
                fontSize='large'
              />
              <Stack spacing={1}>
                <Rating name='size-medium' defaultValue={2} />
              </Stack>
            </ListItem>
            <Typography sx={{ padding: 2 }}>
              I've walked through the desert of desperation and now I'm swimming
              in an ocean of joy. Thank you
            </Typography>
          </List>

          <List
            sx={{
              width: '100%',
              maxWidth: 373,
              bgcolor: '#F5F5F5',
              borderRadius: '10px',
              minHeight: 169,
            }}
          >
            <ListItem alignItems='flex-start'>
              <ListItemAvatar sx={{ width: 50, height: 50 }}>
                <Avatar
                  alt='Remy Sharp'
                  src='../assets/ImageTemplates/ava.png'
                />
              </ListItemAvatar>
              <ListItemText primary='Alexa Sneijder' secondary='20.10.2022' />
              <Stack spacing={1}>
                <Rating name='size-medium' defaultValue={3} />
              </Stack>
            </ListItem>
            <Typography sx={{ padding: 2 }}>
              I've walked through the desert of desperation and now I'm swimming
              in an ocean of joy. Thank you
            </Typography>
          </List>
        </div>

        <h3 className='p-details_txt'>Leave a comment</h3>

        <div className='rate'>
          <div className='rate_stars'>
            <p>Rating</p>
          </div>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': {
                m: 1,
                width: 555,
                height: 50,
                borderRadius: 8,
              },
            }}
            noValidate
            autoComplete='off'
          >
            <div>
              <TextField
                id='filled-select-currency'
                select
                label='Select'
                value={currency}
                onChange={handleChange}
                variant='filled'
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>

          <p>Comment</p>
          <Formik
            initialValues={{
              text: '',
            }}
            validationSchema={Yup.object({
              text: Yup.string()
                .min(10, 'Comment must be at least 10 characters')
                .required('This field is required'),
            })}
            onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
          >
            <Form className='ratingComment'>
              <Field
                id='text'
                name='text'
                as='textarea'
                className='ratingComment_inp'
              />
              <ErrorMessage className='error' name='text' component='div' />
              <button className='ratingComment_btn' type='submit'>
                Add comment
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default PlacesDetails
