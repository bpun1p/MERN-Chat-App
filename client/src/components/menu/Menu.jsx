import './Menu.css'
import '../utils/buttons/settingsClass.css'
import { Link } from 'react-router-dom'
import AvatarIcon from '../../assets/images/avatarImage.png'
import ChatIcon from '../../assets/images/bubbleChat.png'
import { useSelector } from 'react-redux'
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';
import 'rc-tooltip/assets/bootstrap.css';

export default function Menu(props) {
  const { user } = useSelector((state) => state.auth)
  const renderTooltip = <span>Select to change your user info</span>;

  return (
    <div className='menu-body'>
      <div className='menu-header-settings-icon-container'>
      </div>
      <div className='menu-header'>
        <div className='menu-header-user'>
          <Tooltip placement='bottom' overlay={renderTooltip}>
            <Link to={'/profile'}><img id='profile-image' src={AvatarIcon}/></Link>
          </Tooltip>
          {user && <span className='menu-header-user-name'>{user.name}</span>}
        </div>
        <div className='menu-header-settings'>
          <img className='menu-header-settings-btn'/>
        </div>
      </div>
      <nav>
        <div className='nav-header'>
          <Link to={'/chats'} className='nav-chats-link' onClick={props.chatsClicked}>
            <div className='nav-header-chat-icon-container'>
              <img id='chat-icon' src={ChatIcon}/>
            </div>
            <button type='button' className='nav-chats-text' >Chats</button>
          </Link>
        </div>
      </nav>
    </div>
  )
}

Menu.propTypes = {
  chatsClicked: PropTypes.func
}

