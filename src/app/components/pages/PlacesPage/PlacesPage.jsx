import React, { useState, useEffect } from 'react'
import './PlacesPage.sass'
import {
  Paper,
  InputBase,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Avatar,
  Box,
  Modal,
} from '@mui/material'

import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import StarIcon from '@mui/icons-material/Star'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'
import PlacesCategories from './PlacesCategories/PlacesCategories'
import PlacesPageForm from './Form/PlacesPageForm'
import PaginationForm from '../../PaginationForm/PaginationForm'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllPlaces } from '../../../redux/places/placesSlice'
import Spinner from '../../Spinner/Spinner'
import { getUserById } from '../../../redux/user/userSlice'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  boxShadow: 24,
  height: 600,
  p: 4,
  borderRadius: 4,
}

const PlacesPage = ({ setIsMain }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [categoryId, setCategoryId] = useState(8)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user && user.id

  useEffect(() => {
    setIsMain(true)
    dispatch(getUserById(userId))
  }, [])

  useEffect(() => {
    dispatch(getAllPlaces(categoryId))
  }, [dispatch, categoryId])

  const { allPlaces, isLoading, isError, message } = useSelector(
    (state) => state.places
  )

  // if (isError) {
  //   toast.error()
  // }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div className='places'>
        <h1 className='places_banner'>Discover new horizons</h1>
      </div>

      <div className='places-items'>
        <h4>Categories</h4>
        <p className='places-items_text'>
          Everything you need to know to take your trip
        </p>
        <div className='places-items_btns'>
          <PlacesCategories setCategoryId={setCategoryId} />
          <Paper
            component='form'
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
              borderRadius: 20,
              height: 50,
              mt: 7,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Search place'
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        <div className='places-cards'>
          {allPlaces &&
            allPlaces.map((place) => (
              <Card
                key={place.name}
                className='places-cards_card'
                sx={{
                  maxWidth: 350,
                  marginBottom: 3,
                  borderRadius: 10,
                }}
              >
                <CardActionArea>
                  <CardMedia
                    className='cardmedia'
                    component='img'
                    height='350'
                    src={place.mainFilePath}
                    alt='green iguana'
                  />
                  <TurnedInNotIcon
                    onClick={handleOpen}
                    className='saved-icon'
                    fontSize='large'
                  />
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box sx={style}>
                      <div className='modal'>
                        <div className='modal_img'>
                          <img src={place.mainFilePath} alt='#' />
                        </div>

                        <div className='modal_right'>
                          <CloseIcon
                            onClick={handleClose}
                            fontSize='medium'
                            className='modal_right_icon'
                          />
                          <h4 className='modal_right-item'>{place.title}</h4>
                          <div className='modal_right_ava'>
                            <Avatar sx={{ width: 50, height: 50 }}>
                              <img
                                className='modal_right_ava-img'
                                src='../assets/ImageTemplates/ava.png'
                                alt=''
                              />
                            </Avatar>

                            <h5 className='modal_right_ava-title'>My plan</h5>
                          </div>

                          <div>
                            <PlacesPageForm />
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                  <CardContent className='card-item'>
                    <Link to={`${place.placeId}`}>
                      <Typography
                        variant='body2'
                        color='#000'
                        fontSize='22px'
                        fontWeight='500'
                      >
                        {place.name}
                      </Typography>

                      <span className='card-rate'>
                        5.0
                        <StarIcon className='card-rate_star' />
                      </span>
                    </Link>
                    <Typography className='card_view'>Review 10</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}

export default PlacesPage
