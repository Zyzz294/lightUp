import axios from 'axios'

axios.defaults.baseURL = 'https://light-up-travel.herokuapp.com'
const API_URL = '/user/'

// Reset Password
const resetPassword = async (userData) => {
  const response = await axios.post(API_URL + 'reset-password/' + userData)

  return response.data
}

// Verify Reset Password Code
const verifyResetPassCode = async (userData) => {
  const response = await axios.post(
    API_URL + 'verify-reset-password/' + userData
  )

  return response.data
}

// Change password (set new password)
const changePassword = async (userData) => {
  const response = await axios.post(API_URL + 'change-password/' + userData)

  return response.data
}

// Get all users
const getAllUsers = async () => {
  const response = await axios.get(API_URL + 'all-users')

  return response.data
}

// Get user by Id
const getUserById = async (id) => {
  const response = await axios.get(API_URL + id)

  return response.data
}

// Get all moderator
const getAllModerators = async () => {
  const response = await axios.get(API_URL + 'all-moderators')

  return response.data
}

// Add new user
const addNewUser = async (userData) => {
  const response = await axios.post(API_URL + 'add', userData)

  return response.data
}

// Edit user
const editUser = async (userData) => {
  const response = await axios.put(`${API_URL}update/${userData.id}`, userData)

  return response.data
}

// Delete user
const deleteUserById = async (id) => {
  const response = await axios.delete(`${API_URL}delete/${id}`)

  return response.data
}

// Edit profile
const editProfile = async ({ id, token, profileData }) => {
  const response = await axios.put(
    `${API_URL}update-profile/${id}`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

// Update avatar
const updateAvatar = async ({ id, token, formData }) => {
  const response = await axios.put(
    `${API_URL}update-profile-pic/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/form-data`,
      },
    }
  )

  return response.data
}

const userService = {
  resetPassword,
  verifyResetPassCode,
  changePassword,
  getAllUsers,
  getUserById,
  getAllModerators,
  addNewUser,
  editUser,
  deleteUserById,
  editProfile,
  updateAvatar,
}

export default userService
