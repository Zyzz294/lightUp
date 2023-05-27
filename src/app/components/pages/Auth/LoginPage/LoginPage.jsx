import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import './LoginPage.sass'
import LoginForm from '../../../Forms/LoginForm/LoginForm'
import Spinner from '../../../Spinner/Spinner'
import { reset } from '../../../../redux/auth/authSlice'
import { getUserById } from '../../../../redux/user/userSlice'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/')
      toast.success(
        'You have been successfully signed in!'
      )
      dispatch(getUserById(user.id))
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='auth'>
      <div className='auth__bg'>
        <div className='auth__logo'>
          <Link to='/'>
            <img src='./assets/icons/main-logo.png' alt='' />
          </Link>
        </div>
        <div className='auth__image'></div>
      </div>

      <div className='auth__form-wrapper'>
        <div className='auth__skip'>
          <Link to='/'>Skip</Link>
        </div>
        <div className='auth__link'>
          <Link to='/login' className='active_link'>
            Login
          </Link>
          <Link to='/register'>Registration</Link>
        </div>
        <div className='form-container'>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
