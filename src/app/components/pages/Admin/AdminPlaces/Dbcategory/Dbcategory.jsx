import React from 'react'
import './Dbcategory.sass'
import { Link } from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const Dbcategory = ({ setCategoryId }) => {
  // 6
  function onSummer() {
    setCategoryId(6)
  }

  // 7
  function onFall() {
    setCategoryId(7)
  }

  // 8
  function onWinter() {
    setCategoryId(8)
  }

  // 9
  function onSpring() {
    setCategoryId(9)
  }

  // 13
  function onCafe() {
    setCategoryId(13)
  }

  // 12
  function onFastFood() {
    setCategoryId(12)
  }

  // 16
  function onMuseum() {
    setCategoryId(16)
  }

  // 17
  function onTheatre() {
    setCategoryId(17)
  }

  // 15
  function onHotel() {
    setCategoryId(15)
  }

  // 14
  function onMotel() {
    setCategoryId(14)
  }

  // 10
  function onMall() {
    setCategoryId(10)
  }

  // 11
  function onGrocery() {
    setCategoryId(11)
    console.log('11')
  }

  return (
    <div className='admin-places-items'>
      <div className='admin-places'>
        <div className='admin-places__btn'>
          <p>Travel</p>
          <ArrowDropDownIcon />
        </div>
        <div className='admin-places__content'>
          <Link onClick={onWinter}>Winter</Link>
          <Link onClick={onSummer}>Summer</Link>
          <Link onClick={onSpring}>Spring</Link>
          <Link onClick={onFall}>Fall</Link>
        </div>
      </div>

      <div className='admin-places'>
        <div className='admin-places__btn'>
          <p>Eat</p>
          <ArrowDropDownIcon />
        </div>
        <div className='admin-places__content'>
          <Link onClick={onCafe}>Cafe</Link>
          <Link onClick={onFastFood}>FastFood</Link>
        </div>
      </div>

      <div className='admin-places'>
        <div className='admin-places__btn'>
          <p>Entertainment</p>
          <ArrowDropDownIcon />
        </div>
        <div className='admin-places__content'>
          <Link onClick={onMuseum}>Museum</Link>
          <Link onClick={onTheatre}>Theatre</Link>
        </div>
      </div>

      <div className='admin-places'>
        <div className='admin-places__btn'>
          <p>Sleep</p>
          <ArrowDropDownIcon />
        </div>
        <div className='admin-places__content'>
          <Link onClick={onHotel}>Hotel</Link>
          <Link onClick={onMotel}>Motel</Link>
        </div>
      </div>

      <div className='admin-places'>
        <div className='admin-places__btn'>
          <p>Shop</p>
          <ArrowDropDownIcon />
        </div>
        <div className='admin-places__content'>
          <Link onClick={onMall}>Mall</Link>
          <Link onClick={onGrocery}>Grocery</Link>
        </div>
      </div>
    </div>
  )
}

export default Dbcategory
