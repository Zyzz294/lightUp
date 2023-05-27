import axios from 'axios'

axios.defaults.baseURL = 'https://light-up-travel.herokuapp.com'
const API_URL = '/post/'

// Get all active posts
const getAllActivePosts = async ({ page, token }) => {
  const response = await axios.get(
    `${API_URL}list-of-approved-posts?page=${page - 1}&size=9`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

// Get post by ID
const getPostById = async ({ id, token }) => {
  const response = await axios.get(`${API_URL}get-by-id/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

// Add new post
const addNewPost = async ({ postData, formData, token }) => {
  const response = await axios.post(`${API_URL}create/new-post`, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const result = await axios.post(
    `${API_URL}create/new-post-image/${response.data}`,
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

// Get all pending posts
const getAllPendingPosts = async (token) => {
  const response = await axios.get(API_URL + 'list-of-pending-posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

// Get all approved posts
// const getAllApprovedPosts = async (token) => {
//   const response = await axios.get(
//     API_URL + 'list-of-approved-posts',
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )

//   return response.data
// }

// Get all disapproved posts
const getAllDisapprovedPosts = async ({ page, token }) => {
  const response = await axios.get(
    API_URL + `list-of-disapproved-posts?page=${page - 1}&size=9`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

// Approve post by ID
const approvePostById = async (postId) => {
  const response = await axios.post(API_URL + `approve-post/${postId}`)

  return response.data
}

// Disapprove post by ID
const disapprovePostById = async (postId) => {
  const response = await axios.post(API_URL + `disapprove-post/${postId}`)

  return response.data
}

// Like post by ID
const likePostById = async ({ postId, token }) => {
  const response = await axios.post(
    API_URL + `like/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

const postService = {
  getAllActivePosts,
  getPostById,
  addNewPost,
  getAllPendingPosts,
  // getAllApprovedPosts,
  getAllDisapprovedPosts,
  approvePostById,
  disapprovePostById,
  likePostById,
}

export default postService
