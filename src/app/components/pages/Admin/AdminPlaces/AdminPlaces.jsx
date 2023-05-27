import React, { useEffect, useState } from 'react'
import './AdminPlaces.sass'
import { Link } from 'react-router-dom'
import Dbcategory from './Dbcategory/Dbcategory'
import { getAllPlaces } from '../../../../redux/places/placesSlice'
import { useDispatch, useSelector } from 'react-redux'
import EditDeleteAdminButtonPlace from './EditDeleteAdminButton/EditDeleteAdminButtonPlacePlace'

const AdminPlaces = () => {
  const dispatch = useDispatch()
  const [categoryId, setCategoryId] = useState(2)

  const { allPlaces } = useSelector((state) => state.places)

  useEffect(() => {
    dispatch(getAllPlaces(categoryId))
  }, [dispatch, categoryId])

  return (
    <div className='dbplaces'>
      <div className='dbplaces-theme'>
        <h2>Places</h2>
        <Link to='create'>
          <button>create new place</button>
        </Link>
      </div>
      <Dbcategory setCategoryId={setCategoryId} />

      <div className='dbplaces-cards'>
        {allPlaces &&
          allPlaces.map((place) => (
            <div className='dbplaces-cards_card' key={place.name}>
              <div>
                <img src={place.mainFilePath} alt='#' />
              </div>
              <div className='dbplaces-cards_card-item'>
                <h5>{place.name}</h5>
                <h5>{place.id}</h5>
                <img
                  className='dbplaces-cards_card-item-star'
                  src='../assets/icons/star.svg'
                  alt=''
                />
                <div className='dbplaces-cards_card-item-title'>
                  <EditDeleteAdminButtonPlace placeId={place.placeId}  to={`edit`} />
                </div>
              </div>

              <p>Review 10</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default AdminPlaces
