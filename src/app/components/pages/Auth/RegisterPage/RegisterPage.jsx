import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './RegisterPage.sass'
import RegisterForm from '../../../Forms/RegisterForm/RegisterForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { reset } from '../../../../redux/auth/authSlice'
import Spinner from '../../../Spinner/Spinner'

const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/login')
      toast.success(
        'You have been successfully signed up! Check your mail for verification.'
      )
    }

    dispatch(reset())
  }, [isError, isSuccess, message, navigate, dispatch])

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
          <Link to='/login'>Login</Link>
          <Link to='/register' className='active_link'>
            Registration
          </Link>
        </div>
        <div className='form-container'>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
