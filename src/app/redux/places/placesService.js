import axios from 'axios'

axios.defaults.baseURL = 'https://light-up-travel.herokuapp.com'
const API_URL = '/places/'

// Get all active places by category
const getAllActivePlaces = async (categoryId) => {
  const response = await axios.get(
    `${API_URL}get-all-active-by-category/${categoryId}`
  )
  return response.data
}

// Get place by ID
const getPlaceById = async (id) => {
  const response = await axios.get(API_URL + 'get-by-id/' + id)
  return response.data
}

// Create new place
const addNewPlace = async ({ placeData, formData, token }) => {
  const response = await axios.post(
    `${API_URL}create-new-place-without-photo`,
    placeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const result = await axios.post(
    `${API_URL}create-new-place-main-photo/${response.data}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/form-data`,
      },
    }
  )

  return result.data
}

// Delete place by ID
// Delete article by ID
const deletePlaceById = async (id) => {
  const response = await axios.delete(`${API_URL}delete-place/${id}`)

  return response.data
}

const placesService = {
  getAllActivePlaces,
  getPlaceById,
  addNewPlace,
  deletePlaceById,
}
export default placesService
