import { Link, useNavigate } from 'react-router-dom'
import './ForgotPassPage.sass'
import ForgotPassForm from '../../../Forms/ForgotPassForm/ForgotPassForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { reset } from '../../../../redux/user/userSlice'
import Spinner from '../../../Spinner/Spinner'

const ForgotPassPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/confirm-code')
      toast.success('A confirmation code has been sent to your email.')
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
          <Link to='/login' className='active_link'>
            Login
          </Link>
          <Link to='/register'>Registration</Link>
        </div>
        <div className='form-container'>
          <ForgotPassForm />
        </div>
      </div>
    </div>
  )
}

export default ForgotPassPage
