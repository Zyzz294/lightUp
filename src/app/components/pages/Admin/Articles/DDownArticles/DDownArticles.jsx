import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteArticleById } from '../../../../../redux/article/articleSlice'

import './DDownArticles.sass'

const DDownArticles = ({ articleId }) => {
  const dispatch = useDispatch()

  function deleteArticle(id) {
    const result = window.confirm('Are you sure you want to delete?')
    if (result) {
      dispatch(deleteArticleById(id))
    }
  }

  return (
    <div className='dropdown_art'>
      <div className='dropdownbtn_art'>
        <>
          <img className='ddimg' src='../assets/icons/dots.svg' alt='' />
        </>
      </div>

      <div className='dropdown-content_art'>
        <Link to={`edit/${articleId}`}>Edit</Link>
        <Link
          onClick={() => {
            deleteArticle(articleId)
          }}
        >
          Delete
        </Link>
      </div>
    </div>
  )
}

export default DDownArticles
