import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset } from '../../../redux/forum/forumSlice'
import SupportForm from '../../Forms/SupportForm/SupportForm'
import './SupportPage.sass'
import Spinner from '../../Spinner/Spinner'
import { getUserById } from '../../../redux/user/userSlice'

const SupportPage = ({ setIsMain }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    setIsMain(false)
    dispatch(getUserById(userId))
  }, [])

  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user && user.id
  const isSent = JSON.parse(localStorage.getItem('isSent'))

  const { isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.forum
  )

  const {name} = useSelector((state) => state.user.user)

  useEffect(() => {
    if (isSuccess) {
      toast.success('Your request has been accepted.')
      localStorage.setItem('isSent', JSON.stringify(true))
    }

    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
  }, [isSuccess, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='support'>
        <div className='container'>
          <div className='support__wrapper'>
            <div className='support-nums'>
              <h2 className='support-nums__title'>Main emergency numbers</h2>
              <div className='num'>
                <div className='num__icon'>101</div>
                <div className='num__title'>Fire Department</div>
              </div>
              <div className='num'>
                <div className='num__icon'>102</div>
                <div className='num__title'>Police</div>
              </div>
              <div className='num'>
                <div className='num__icon'>103</div>
                <div className='num__title'>Emergency</div>
              </div>
              <div className='num'>
                <div className='num__icon'>4444</div>
                <div className='num__title'>Unified Help Desk</div>
              </div>
            </div>
            <div className='support-form'>
              <h2 className='support-form__title'>Get Mentor</h2>
              {user && isSent ? (
                <p className='sent'>
                  Your request has been accepted! Please wait, we will send
                  further instructions to your email.
                </p>
              ) : user ? (
                <div className='support-form__wrapper'>
                  <div className='support-form__content'>
                    <h4 className='support-form__subtitle'>
                      Hello, dear&nbsp; 
                      <span className='CTA-data'>{name}</span>
                    </h4>
                    <p className='support-form__text'>
                      1. If you want to have a safer trip you can request for a
                      personal mentor. A mentor will guide you and help if you
                      struggle.
                      <br />
                      <br />
                      2. You can fill out the mesage box describing why and for
                      what purpose you need a mentor.
                      <br />
                      <br />
                      3. After submitting your request, we will contact you via
                      &nbsp;<span className='CTA-data'>{user.email}</span>
                    </p>
                  </div>
                  <SupportForm token={user.token} />
                </div>
              ) : (
                <p className='go-to-login'>
                  To apply for a personal mentor, please&nbsp;
                  <Link className='support__CTA' to={'/login'}>
                    login
                  </Link>{' '}
                  into your account. <br />
                  Don't have an account yet?&nbsp;
                  <Link className='support__CTA' to={'/register'}>
                    sign up now
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SupportPage
