import axios from 'axios'

axios.defaults.baseURL = 'https://light-up-travel.herokuapp.com'
const API_URL = '/article/'

// Get all active articles
const getAllActiveArticles = async ({ page }) => {
  const response = await axios.get(
    `${API_URL}get-all-active-article?page=${page - 1}&size=9`
  )

  return response.data
}

// Get article by ID
const getArticleById = async (id) => {
  const response = await axios.get(API_URL + 'get-article/' + id)
  return response.data
}

// Add new article
const addNewArticle = async ({ articleData, formData }) => {
  const response = await axios.post(
    `${API_URL}create-new-article-without-photo`,
    articleData
  )

  const result = await axios.post(
    `${API_URL}create-new-article-photo/${response.data}`,
    formData,
    {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    }
  )

  return result.data
}

// Edit article
const editArticle = async ({ articleData, formData }) => {
  const response = await axios.put(`${API_URL}update-article`, articleData)

  const result = await axios.put(
    `${API_URL}update-article-photo/${articleData.id}`,
    formData,
    {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    }
  )

  return result.data
}

// Delete article by ID
const deleteArticleById = async (id) => {
  const response = await axios.delete(`${API_URL}delete-article/${id}`)

  return response.data
}

const articleService = {
  getAllActiveArticles,
  getArticleById,
  addNewArticle,
  editArticle,
  deleteArticleById,
}

export default articleService
