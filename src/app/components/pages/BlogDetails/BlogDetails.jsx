import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getCommentsByPostId } from '../../../redux/comment/commentSlice'
import {
  getAllActivePosts,
  getPostById,
  likePostById,
} from '../../../redux/post/postSlice'
import { getUserById } from '../../../redux/user/userSlice'
import BlogCommentForm from '../../Forms/BlogCommentForm/BlogCommentForm'
import Spinner from '../../Spinner/Spinner'
import './BlogDetails.sass'

const BlogDetails = ({ setIsMain }) => {
  const dispatch = useDispatch()
  const userFromLS = JSON.parse(localStorage.getItem('user'))
  const token = userFromLS && userFromLS.token
  const userId = userFromLS && userFromLS.id
  const { id } = useParams()
  const navigate = useNavigate()
  const page = 1
  const [isLiked, setIsLiked] = useState(false)
  const commentRef = useRef()

  const { title, dateCreated, description, filePath, user, counter } =
    useSelector((state) => state.post.post)

  const { allPosts, isError, isLoading, message } = useSelector(
    (state) => state.post
  )

  const { allComments } = useSelector((state) => state.comment)

  const postId = id

  useEffect(() => {
    setIsMain(false)
    dispatch(getUserById(userId))
    dispatch(getPostById({ id, token }))
    dispatch(getAllActivePosts({ page, token }))
    dispatch(getCommentsByPostId({ postId }))
  }, [id, dispatch])

  const cardPosts = allPosts.filter((post) => post.id !== +id).slice(0, 4)

  function goToPost(id) {
    navigate(`/blogs/${id}`)
  }

  if (isError) {
    toast.error(message)
  }

  if (isLoading) {
    return <Spinner />
  }

  function likePost() {
    dispatch(likePostById({ postId, token }))
    setIsLiked(true)
  }

  const commentPost = () => {
    commentRef.current.focus()
  }

  return (
    <>
      <section className='blog-details-section'>
        <div className='container'>
          <div className='blog-details__wrapper'>
            <div className='blog-details'>
              <h2 className='blog-details__title'>{title}</h2>
              <span className='blog-details__date'>{dateCreated}</span>
              <img src={filePath} alt='' className='blog-details__img' />
              <div className='blog-details__options'>
                <button className='like' onClick={likePost}>
                  <img
                    src={
                      isLiked
                        ? '/assets/icons/liked.png'
                        : '/assets/icons/like.png'
                    }
                    alt=''
                  />
                </button>
                <button className='comment' onClick={commentPost}>
                  <img src='/assets/icons/comment.png' alt='' />
                </button>
                <h5
                  className={
                    counter > 0 ? 'like-counter' : 'like-counter-disable'
                  }
                >
                  {counter}
                </h5>
              </div>

              <div className='blog-user'>
                <div className='blog-user__ava'>
                  <img src={user && user.fileUrl} alt='' />
                </div>
                <div className='blog-user__content'>
                  <span className='blog-user__name'>
                    {user && user.name} {user && user.surname}
                  </span>
                  <small className='blog-user__role'>Author</small>
                </div>
              </div>

              <div className='blog-details__text'>
                <p>{description}</p>
              </div>
            </div>

            <div className='sidebar-menu'>
              <Link to={'/blogs'} className='sidebar-menu__link'>
                <h3 className='sidebar-menu__title'>Other posts</h3>
              </Link>

              <div className='sidebar-menu__items'>
                {cardPosts &&
                  cardPosts.map((post) => (
                    <div className='post' key={post.id}>
                      <div className='post__num'>
                        <span>{post.id}</span>
                      </div>
                      <div className='post__content'>
                        <h3
                          className='post__title'
                          onClick={() => goToPost(post.id)}
                        >
                          {post.title}
                        </h3>
                        <span className='post__name'>
                          by {post.user.name} {post.user.surname}
                        </span>
                        <span className='post__date'>{dateCreated}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className='blog-comment'>
            <h2 className='blog-comment__title'>Comments</h2>
            <div className='blog-comment__wrapper'>
              {allComments.map((comment) => (
                <div className='comment-card'>
                  <div className='comment-card__header'>
                    <img
                      className='comment-card__ava'
                      src={comment.basicUserDTO?.profileUrl}
                      alt=''
                    />
                    <span className='comment-card__name'>{`${comment.basicUserDTO?.name} ${comment.basicUserDTO?.surname}`}</span>
                    {/* <span className='comment-card__date'>20.10.2022</span> */}
                  </div>
                  <p className='comment-card__text'>{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='leave-comment'>
            <h2 className='leave-comment__title'>Leave a comment</h2>
            <h4 className='leave-comment__subtitle'>Comment</h4>
            <BlogCommentForm commentRef={commentRef} id={id} />
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogDetails
