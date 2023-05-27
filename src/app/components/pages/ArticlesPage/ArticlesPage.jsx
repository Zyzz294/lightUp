import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ArticlesPage.sass'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

import PaginationForm from '../../PaginationForm/PaginationForm'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllArticles } from '../../../redux/article/articleSlice'
import Spinner from '../../Spinner/Spinner'
import { getUserById } from '../../../redux/user/userSlice'

function ArticlesPage({ setIsMain }) {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user && user.id

  useEffect(() => {
    setIsMain(false)
    dispatch(getUserById(userId))
  }, [])

  useEffect(() => {
    dispatch(getAllArticles({page}))
  }, [dispatch, page])

  const { allArticles, isLoading, isError, message } = useSelector(
    (state) => state.article
  )

  if (isError) {
    toast.error(message)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='container'>
      <div className='main'>
        <h2 className='main-title'>Articles</h2>

        <div className='main_cards'>
          {allArticles &&
            allArticles.map((article) => (
              <Card
                key={article.id}
                sx={{ width: 360, marginBottom: 4, borderRadius: 10 }}
              >
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='400'
                    src={article.filePath}
                    alt='green iguana'
                  />
                  <CardContent className='main_cards_content'>
                    <Typography variant='body2'>
                      {article.title}
                    </Typography>
                    <Link className='link-arrow' to={`${article.id}`}>
                      <ArrowRightAltIcon fontSize='large' />
                    </Link>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </div>
      </div>
      <PaginationForm page={page} setPage={setPage} color={'warning'} />
    </div>
  )
}

export default ArticlesPage
