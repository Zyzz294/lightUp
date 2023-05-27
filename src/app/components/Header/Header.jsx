import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './Header.sass'
import { logout, reset } from '../../redux/auth/authSlice'
import DropdownButton from '../DropdownButton/DropdownButton'

const Header = ({ isMain }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  // change nav color when scrolling
  const [color, setColor] = useState(false)
  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true)
    } else {
      setColor(false)
    }
  }

  window.addEventListener('scroll', changeColor)

  return (
    <div
      className={
        color
          ? 'header header-bg'
          : isMain === false
          ? 'header header-orange'
          : 'header'
      }
    >
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__logo'>
            <Link to='/'>
              <img
                src='./assets/icons/main-logo.png'
                alt='logo'
                className='header__logo-item'
              />
            </Link>
          </div>

          <nav className='header__nav'>
            <ul className='header__nav-list'>
              <li className='header__list-item'>
                <Link to={`articles`} className='header__link'>
                  Articles
                </Link>
              </li>
              <li className='header__list-item'>
                <Link to={`lifehacks`} className='header__link'>
                  Lifehacks
                </Link>
              </li>
              <li className='header__list-item'>
                <Link to='places' className='header__link'>
                  Places
                </Link>
              </li>
              <li className='header__list-item'>
                <Link to='support' className='header__link'>
                  Support
                </Link>
              </li>
              <li className='header__list-item'>
                <Link to='myplans' className='header__link'>
                  My plans
                </Link>
              </li>
              <li className='header__list-item'>
                <Link to='blogs' className='header__link'>
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
          {user ? (
            <>
              <DropdownButton onLogout={onLogout} />
            </>
          ) : (
            <button
              className={
                color
                  ? 'header__btn header__btn_scroll'
                  : isMain === false
                  ? 'header__btn header__btn_orange'
                  : 'header__btn'
              }
            >
              <Link
                to={`/login`}
                className={
                  color
                    ? 'header__btn-link header__btn-link_scroll'
                    : isMain === false
                    ? 'header__btn-link_scroll'
                    : 'header__btn-link'
                }
              >
                Login
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
