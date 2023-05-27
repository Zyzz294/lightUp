import './BurgerMenu.sass'
import { nanoid } from 'nanoid'
import { Link } from 'react-router-dom'

const BurgerMenu = ({ header, items, menuActive, setMenuActive }) => {
  return (
    <div
      className={menuActive ? 'my-menu active' : 'my-menu'}
      onClick={() => setMenuActive(false)}
    >
      <div className='my-blur' />
      <div className='my-menu__content' onClick={(e) => e.stopPropagation()}>
        <div className='my-menu__header'>{header}</div>
        <ul className='my-ul'>
          {items.map((item) => (
            <li className='my-li' key={nanoid()}>
              <Link
                onClick={() => setMenuActive(false)}
                to={item.to}
                className='my-link'
              >
                {item.value}
              </Link>
              <span className='material-icons'>{item.icon}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default BurgerMenu
