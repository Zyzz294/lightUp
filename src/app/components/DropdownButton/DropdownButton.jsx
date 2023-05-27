import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './DropdownButton.sass'

const DropdownButton = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { profileUrl, name } = useSelector((state) => state.user.user)
  const [admin] = useSelector((state) => state.auth.user.roles)

  function handleOpen() {
    setIsOpen(!isOpen)
  }

  return (
    <div className={isOpen ? 'dropdown-active' : 'dropdown'}>
      <div className='dropbtn'>
        <img src={profileUrl} alt='' onClick={handleOpen} />
        <small>Hello, {name}</small>
      </div>
      <div className='dropdown-content'>
        <Link to='/profile'>Profile</Link>
        {admin === 'ROLE_ADMIN' && <Link to='admin'>Admin</Link>}
        <Link onClick={onLogout}>Logout</Link>
      </div>
    </div>
  )
}

export default DropdownButton
