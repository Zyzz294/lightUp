import './Footer.sass'

import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='footer__wrapper'>
          <div className='footer__left'>
            <div className='footer__logo'>
              <img src='./assets/icons/main-logo.png' alt='' />
              <h4>
                Light Up
                <br />
                Travel
              </h4>
            </div>

            <div className='footer__social'>
              <a href='/'>
                <TwitterIcon />
              </a>
              <a href='/'>
                <InstagramIcon />
              </a>
              <a href='/'>
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div className='footer__right'>
            <div className='footer__contacts'>
              <h4>Contacts</h4>
              <ul>
                <li>+996 777 777 777</li>
                <li>info@gmail.com</li>
                <li>Bishkek/Kyrgyzstan</li>
                <li>Toktogul street 123</li>
              </ul>
            </div>

            <div className='footer__company'>
              <h4 className='footer__company-title'>Company</h4>
              <div className='footer__company-wrapper'>
                <ul className='footer__company-wrapper-left'>
                  <Link to={'/places'}>
                    <li>Places</li>
                  </Link>
                  <Link to={'/articles'}>
                    <li>Articles</li>
                  </Link>
                  <Link to={'/lifehacks'}>
                    <li>Life Hacks</li>
                  </Link>
                  <Link to={'/support'}>
                    <li>Support</li>
                  </Link>
                </ul>

                <ul className='footer__company-wrapper-right'>
                  <Link to={'/myplans'}>
                    <li>My Plans</li>
                  </Link>
                  <Link to={'/blogs'}>
                    <li>BLog</li>
                  </Link>
                  <Link to={'/'}>
                    <li>Privacy & Policy</li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
