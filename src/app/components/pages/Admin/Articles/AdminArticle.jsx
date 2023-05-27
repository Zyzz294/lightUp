import React, { useEffect, useState } from 'react'
import './AdminArticles.sass'
import DDownArticles from './DDownArticles/DDownArticles'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllArticles, reset } from '../../../../redux/article/articleSlice'
import { toast } from 'react-toastify'
import AdminSpinner from '../../../AdminSpinner/AdminSpinner'
import PaginationForm from '../../../PaginationForm/PaginationForm'

const AdminArticle = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)

  const { allArticles, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.article
  )

  useEffect(() => {
    dispatch(getAllArticles({page}))
  }, [dispatch, page])

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }

    if (isSuccess) {
      dispatch(reset())
    }
  }, [dispatch, isSuccess, isError, message])

  if (isLoading) {
    return <AdminSpinner />
  }

  return (
    <div className='db-articles'>
      <div className='db-articles_theme'>
        <h2>Articles</h2>
        <Link to='create'>
          <button>add new article</button>
        </Link>
      </div>
      <div className='db-articles_cards'>
        {allArticles &&
          allArticles.map((article) => (
            <div key={article.id} className='db-articles_cards-item'>
              <DDownArticles articleId={article.id} />
              <img
                className='db-articles_cards-item_img'
                src={article.filePath}
                alt='article-img'
              />
              <h4>{article.title}</h4>
              <p>{article.text}</p>
            </div>
          ))}
      </div>
      <PaginationForm page={page} setPage={setPage} color={'primary'} />
    </div>
  )
}
export default AdminArticle
