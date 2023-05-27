import axios from 'axios'

axios.defaults.baseURL = 'https://light-up-travel.herokuapp.com'
const API_URL = '/comment/'


// Comment post by ID
const commentPostById = async ({ postId, comment, token }) => {
  const response = await axios.post(
    API_URL + 'add',
    {postId, comment},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

// Get comments by postId
const getCommentsByPostId = async ({ postId }) => {
  const response = await axios.get(
    API_URL + `all-not-deleted-comments-by-post-id/${postId}`
  )

  return response.data
}

const commentService = {
  commentPostById,
  getCommentsByPostId
}

export default commentService


