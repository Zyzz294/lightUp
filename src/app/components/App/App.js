import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.sass'
import { Routes, Route, useLocation } from 'react-router-dom'

import { useExcept } from '../../utils/headerFooterExceptions'

import Homepage from '../pages/HomePage/HomePage'
import ArticlesPage from '../pages/ArticlesPage/ArticlesPage'
import LifehacksPage from '../pages/LifehacksPage/LifehacksPage'
import PlacesPage from '../pages/PlacesPage/PlacesPage'
import SupportPage from '../pages/SupportPage/SupportPage'
import Myplans from '../pages/MyplansPage/MyplansPage'
import BlogPage from '../pages/BlogPage/BlogPage'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ArticlesDetails from '../pages/ArticlesDetails/ArticlesDetails'
import LoginPage from '../pages/Auth/LoginPage/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage/RegisterPage'
import ForgotPassPage from '../pages/Auth/ForgotPassPage/ForgotPassPage'
import ConfirmCodePage from '../pages/Auth/ConfirmCodePage/ConfirmCodePage'
import ChangePassPage from '../pages/Auth/ChangePassPage/ChangePassPage'
import PlacesDetails from '../pages/PlacesDetails/PlacesDetails'
// import PlansDetails from '../pages/PlansDetails/PlansDetails'
import BlogDetails from '../pages/BlogDetails/BlogDetails'
import NotFoundPage from '../pages/Page404/Page404'
import AdminHome from '../pages/Admin/AdminHome/AdminHome'
import WithAdmin from '../../HOC/WithAdmin'
import Profile from '../pages/Profile/Profile'

function App() {
  const [isMain, setIsMain] = useState(false)
  const location = useLocation()
  const isExcept = useExcept(location.pathname)
  const AdminComponent = WithAdmin(AdminHome) //HOC withAdmin

  return (
    <div className='App'>
      {isExcept && <Header isMain={isMain} />}
      <Routes>
        <Route path='/' element={<Homepage setIsMain={setIsMain} />} />
        <Route
          path='articles'
          element={<ArticlesPage setIsMain={setIsMain} />}
        />
        <Route
          path='lifehacks'
          element={<LifehacksPage setIsMain={setIsMain} />}
        />
        <Route path='places' element={<PlacesPage setIsMain={setIsMain} />} />
        <Route path='support' element={<SupportPage setIsMain={setIsMain} />} />
        <Route path='myplans' element={<Myplans setIsMain={setIsMain} />} />
        <Route path='blogs' element={<BlogPage setIsMain={setIsMain} />} />
        <Route
          path={`blogs/:id`}
          element={<BlogDetails setIsMain={setIsMain} />}
        />
        <Route
          path={`articles/:id`}
          element={<ArticlesDetails setIsMain={setIsMain} />}
        />
        <Route
          path='places/placesdetails'
          element={<PlacesDetails setIsMain={setIsMain} />}
        />

        <Route
          path='myplans/placedetails'
          element={<PlacesDetails setIsMain={setIsMain} />}
        />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='forgot-password' element={<ForgotPassPage />} />
        <Route path='confirm-code' element={<ConfirmCodePage />} />
        <Route path='change-password' element={<ChangePassPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='admin/*' element={<AdminComponent />} />
        <Route path='profile' element={<Profile setIsMain={setIsMain} />} />

      </Routes>
      {isExcept && <Footer />}
      <ToastContainer autoClose={2000}/>
    </div>
  )
}

export default App
