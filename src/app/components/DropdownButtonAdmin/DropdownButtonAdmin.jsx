import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './DropdownButtonAdmin.sass'
import { BiUserCircle } from 'react-icons/bi'

const DropdownButtonAdmin = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className='dropdown-admin'>
      <button className='dropbtn-admin'>
        <>
          <BiUserCircle size={20} />
          {user.username}
        </>
      </button>
      <div className='dropdown-content-admin'>
        <Link to='/'>Profile</Link>
        <Link to='/'>Client Home</Link>
      </div>
    </div>
  )
}

export default DropdownButtonAdmin
