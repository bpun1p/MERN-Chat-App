import './menu.css'
import '../utils/buttons/settingsClass.css'
import { Link } from 'react-router-dom'
import AvatarIcon from '../../assets/images/avatarImage.png'
import SettingsIcon from '../../assets/images/setting.png'
import ChatIcon from '../../assets/images/bubbleChat.png'

export default function Menu() {
  return (
    <div className='menu-body'>
      <div className='menu-header-settings-icon-container'>
        <Link to={'/settings'} className='nav-settings-link'><button id='settings-btn'><img id='settings-icon' src={SettingsIcon}/></button></Link>
      </div>
      <div className='menu-header'>
        <div className='menu-header-user'>
          <img id='profile-image' src={AvatarIcon}/>
          <span className='menu-header-user-name'>User</span>
        </div>
        <div className='menu-header-settings'>
          <img className='menu-header-settings-btn'/>
        </div>
      </div>
      <nav>
        <div className='nav-header'>
          <Link to={'/chats'} className='nav-chats-link'>
            <div className='nav-header-chat-icon-container'>
              <img id='chat-icon' src={ChatIcon}/>
            </div>
            <button type="button" className="nav-chats-text">Chats</button>
          </Link>
        </div>
        <div className='nav-footer'>
          <Link to={'/settings'} className='nav-settings-link'>
            <button type="button" className="nav-settings-text">Settings</button>
            <div className='nav-settings-icon-container'>
              <img id='settings-icon' src={SettingsIcon}/>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
}