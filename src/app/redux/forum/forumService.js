import axios from 'axios'

axios.defaults.baseURL = 'https://light-up-travel.herokuapp.com'
const API_URL = '/forum/'

// Add new forum
const addNewForum = async ({ descr, token }) => {
  const response = await axios.post(
    API_URL + 'add/' + descr,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

// Get all forums
const getAllForums = async () => {
  const response = await axios.get(API_URL + 'all')

  return response.data
}

// Get all approved forums
const getAllApprovedForums = async () => {
  const response = await axios.get(API_URL + 'all-not-deleted')

  return response.data
}

// Get all disapproved forums
const getAllRejectedForums = async () => {
  const response = await axios.get(API_URL + 'all-deleted')

  return response.data
}

// Get all pending forums
const getAllPendingForums = async () => {
  const response = await axios.get(API_URL + 'all-pending')

  return response.data
}

// Verify forum by ID
const verifyForumById = async ({ id, token }) => {
  const response = await axios.post(
    API_URL + 'verify/' + id,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

// Delete forum by ID
const deleteForumById = async (id) => {
  const response = await axios.delete(API_URL + 'delete/' + id)

  return response.data
}

const forumService = {
  addNewForum,
  getAllForums,
  verifyForumById,
  deleteForumById,
  getAllApprovedForums,
  getAllRejectedForums,
  getAllPendingForums,
}

export default forumService
