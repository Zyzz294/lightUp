import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CreatePostForm from '../../Forms/CreatePostForm/CreatePostForm'
import MyModal from '../../MyModal/MyModal'
import { getAllActivePosts, reset } from '../../../redux/post/postSlice'
import { getUserById } from '../../../redux/user/userSlice'
import './BlogPage.sass'
import PaginationForm from '../../PaginationForm/PaginationForm'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner/Spinner'

const BlogPage = ({ setIsMain }) => {
  const [modalActive, setModalActive] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)

  const userFromLS = JSON.parse(localStorage.getItem('user'))
  const token = userFromLS && userFromLS.token
  const userId = userFromLS && userFromLS.id

  const { allPosts, isLoading, isError, message } = useSelector(
    (state) => state.post
  )

  // Блокировка скролла при открытой модалке
  useEffect(() => {
    modalActive
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'visible')
  }, [modalActive])

  // Удаление фона навбар менюшки
  useEffect(() => {
    modalActive ? setIsMain(false) : setIsMain(true)
    // setIsMain(!modalActive)
  }, [modalActive, setIsMain])

  useEffect(() => {
    dispatch(getUserById(userId))
    dispatch(getAllActivePosts({ page, token }))
    dispatch(reset)
  }, [dispatch, page, token, userId])

  const { name, surname, profileUrl } = useSelector((state) => state.user.user)

  if (isError) {
    toast.error(message)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='blog'>
        <h1 className='blog__title'>Discover new horizons</h1>
        <div className='container'>
          <div className='blog__btn-wrapper'>
            <button className='blog__btn' onClick={() => setModalActive(true)}>
              Create a post
              <img src='assets/icons/plus.png' alt='' />
            </button>
          </div>
          <MyModal active={modalActive} setActive={setModalActive}>
            <div className='create-post'>
              <div className='create-post__header'>
                <h2 className='create-post__title'>Create a post</h2>
              </div>
              <div className='create-post__wrapper'>
                <div className='create-post__upload'>
                  {selectedImage && (
                    <div className='image-display'>
                      <img
                        alt='not fount'
                        width={'500px'}
                        src={URL.createObjectURL(selectedImage)}
                      />
                    </div>
                  )}
                  <br />
                  <input
                    type='file'
                    name='myImage'
                    onChange={(event) => {
                      console.log(event.target.files[0])
                      setSelectedImage(event.target.files[0])
                    }}
                    className='custom-file-input'
                  />
                  <button
                    className='image-remove'
                    onClick={() => setSelectedImage(null)}
                  >
                    Remove
                  </button>
                </div>
                <hr className='hr-line' />
                <div className='create-post__content'>
                  <div className='create-post__user'>
                    <img src={profileUrl} alt='' className='create-post__ava' />
                    <span className='create-post__username'>
                      {name} {surname}
                    </span>
                  </div>
                  <CreatePostForm
                    selectedImage={selectedImage}
                    setModalActive={setModalActive}
                  />
                </div>
              </div>
            </div>
          </MyModal>
          <div className='blog__card-wrapper'>
            {allPosts &&
              allPosts.map((post) => (
                <div key={post.id}>
                  <div className='blog-card'>
                    <div className='blog-card__date'>{post.dateCreated}</div>
                    <img
                      src={post.filePath}
                      alt=''
                      className='blog-card__img'
                    />
                    <div className='blog-card-content'>
                      <h2 className='blog-card-content__title'>{post.title}</h2>
                      <p className='blog-card-content__descr'>
                        {post.description}
                      </p>
                      <Link to={`${post.id}`}>
                        <button className='blog__btn blog-btn_sm'>
                          Read more
                        </button>
                      </Link>
                    </div>
                  </div>
                  <hr className='horizontal'></hr>
                </div>
              ))}
          </div>
        </div>
        <PaginationForm page={page} setPage={setPage} color={'warning'} />
      </section>
    </>
  )
}

export default BlogPage
