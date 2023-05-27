import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import './ArticlesDetails.sass'
import {
  getAllArticles,
  getArticleById,
} from '../../../redux/article/articleSlice'
import Spinner from '../../Spinner/Spinner'
import { toast } from 'react-toastify'
import { getUserById } from '../../../redux/user/userSlice'

function ArticlesDetails({ setIsMain }) {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user && user.id

  useEffect(() => {
    setIsMain(false)
    dispatch(getUserById(userId))
  }, [])

  useEffect(() => {
    dispatch(getArticleById(id))
    dispatch(getAllArticles())
  }, [id, dispatch])

  const { allArticles, article, isLoading, isError, message } = useSelector(
    (state) => state.article
  )

  const cardArticles = allArticles
    .filter((article) => article.id !== +id)
    .slice(0, 3)

  function onClick(id) {
    navigate(`/articles/${id}`)
  }

  if (isError) {
    toast.error(message)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='container'>
      <div className='details'>
        <h3 className='details_theme'>{article.title}</h3>
        <p className='data'>Date: {article.dateCreated}</p>
        <div className='details_img'>
          <img src={article.filePath} alt='#' />
        </div>

        <div className='details-descr'>
          <em className='details-descr__content'>{article.description}</em>
        </div>

        <h4>{article.subtitle}</h4>
        <p>{article.text}</p>

        <h4 className='others__title'>Other articles</h4>
        <div className='others'>
          {cardArticles &&
            cardArticles.map((article) => (
              <div className='others_items' key={article.id}>
                <img src={article.filePath} alt='' />
                <p onClick={() => onClick(article.id)}>{article.title}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ArticlesDetails
