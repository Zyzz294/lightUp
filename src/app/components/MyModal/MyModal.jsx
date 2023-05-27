import React from 'react'
import './MyModal.sass'

const MyModal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? 'mymodal active' : 'mymodal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'mymodal__content active' : 'mymodal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default MyModal
