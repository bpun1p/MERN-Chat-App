import './menu.css'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div className='menu-container'>
      <div className='menu-header'>
        <div className='menu-header-user'>
          <img className='menu-header-user-image'/>
          <span className='menu-header-user-name'>User</span>
        </div>
        <div className='menu-header-settings'>
          <img className='menu-header-settings-btn'/>
        </div>
      </div>
      <nav>
        <div className='nav-header'>
          <Link to={'/chats'} className='nav-chats-link'>
            <button type="button" className="nav-chats-btn">Chats</button>
          </Link>
        </div>
        <div className='nav-footer'>
          <Link to={'/settings'} className='nav-settings-link'>
            <button type="button" className="nav-settings-btn">Settings</button>
          </Link>
        </div>
      </nav>
    </div>
  )
}