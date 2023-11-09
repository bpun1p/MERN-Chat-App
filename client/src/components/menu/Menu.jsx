import './Menu.css';
import '../utils/buttons/settingsClass.css';
import { Link } from 'react-router-dom';
import AvatarIcon from '../../assets/images/avatarImage.png';
import ChatIcon from '../../assets/images/bubbleChat.png';
import ChartIcon from '../../assets/images/line-chart.png';
import { useSelector } from 'react-redux';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';
import 'rc-tooltip/assets/bootstrap.css';
import ActiTrack from '../actiTrack/ActiTrack';

export default function Menu(props) {
  const { user } = useSelector((state) => state.auth);
  const renderProfileTooltip = <span>{ user ? 'Select to change personal settings' : 'Login to access personal settings!' }</span>;
  const renderChatTooltip = <span>{ user ? 'Select to view online users!' : 'Login to start chatting!' }</span>;
  const renderLineChart = <ActiTrack/>

  return (
    <div className='menu-body'>
      <div className='menu-header-settings-icon-container'>
      </div>
      <div className='menu-header'>
        <div className='menu-header-user'>
          <Tooltip placement='bottom' overlay={renderProfileTooltip}>
            <Link to={'/profile'}><img id='profile-image' src={AvatarIcon}/></Link>
          </Tooltip>
          {user && <span className='menu-header-user-name'>{user.name}</span>}
        </div>
        <div className='menu-header-settings'>
          <img className='menu-header-settings-btn'/>
        </div>
      </div>
      <nav>
      <Tooltip placement='bottom' overlay={renderChatTooltip}>
        <div className='nav-chat-container'>
          <Link to={ user && '/chats'} className='nav-chats-link' onClick={user && props.chatsClicked}>
            <div className='nav-header-chat-icon-container'>
              <img id='chat-icon' src={ChatIcon}/>
            </div>
            <button type='button' className='nav-chats-text'>Chats</button>
          </Link>
        </div>
        </Tooltip>
        {user ? 
          <Tooltip className='line-chart' placement='TopRight' overlay={renderLineChart}>
            <img id='chart-icon' src={ChartIcon}/>
          </Tooltip>
          : 
          null  
        }
      </nav>
    </div>
  );
}

Menu.propTypes = {
  chatsClicked: PropTypes.func,
};


