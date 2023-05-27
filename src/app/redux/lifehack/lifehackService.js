import axios from 'axios'

axios.defaults.baseURL = 'https://light-up-travel.herokuapp.com'
const API_URL = '/lifehack/'

// Get all active lifehacks
const getAllActiveLifehacks = async ({page}) => {
    const response = await axios.get(`${API_URL}get-all-active-lifehack?page=${page-1}&size=4`)
  
    return response.data
  }

// Get lifehack by ID
const getLifehackById = async (id) => {
    const response = await axios.get(API_URL + 'get-lifehack/' + id)
  
    return response.data
  }

  
// Add new lifehack
const addNewLifehack = async ({ lifehackData, formData }) => {
  const response = await axios.post(
    `${API_URL}create-new-lifehack-without-video`,
    lifehackData
  )

  const result = await axios.post(
    `${API_URL}create-new-lifehack-video/${response.data}`,
    formData,
    {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    }
  )
  
  return result.data
}

// Edit lifehack
const editLifehack = async ({ lifehackData, formData }) => {
  const response = await axios.put(`${API_URL}update-lifehack-without-video`, lifehackData)
    
  const result = await axios.put(
    `${API_URL}update-lifehack-video/${lifehackData.id}`,
    formData,
    {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    }
  )

  return result.data
}

// Delete lifehack by ID
const deleteLifehackById = async (id) => {

  const response = await axios.delete(`${API_URL}delete-lifehack/${id}`,)

  return response.data
}
  
  const lifehackService = {
    getAllActiveLifehacks,
    getLifehackById,
    addNewLifehack,
    editLifehack,
    deleteLifehackById,
  }
  
  export default lifehackService
  