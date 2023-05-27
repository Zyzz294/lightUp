import axios from 'axios'

axios.defaults.baseURL = 'https://light-up-travel.herokuapp.com'
const API_URL = '/api/auth/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'signup', userData)

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'signin', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('isSent')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
