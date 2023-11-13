import './ChatScreen.css';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { uniqBy } from 'lodash';
import { useFetchMessagesMutation } from '../../slices/chatsApiSlice';
import { useGetAllUsersMutation } from '../../slices/usersApiSlice';
import imageIcon from '../../assets/images/landscape.png';
import chatIcon from '../../assets/images/chat.png';
import attachFileIcon from '../../assets/images/attach-file.png';
import Avatar from '../utils/Avatar/Avatar';

export default function ChatScreen() {
  const [ws, setWs] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);
  const [isSelectedUser, setIsSelectedUser] = useState({
    userId: '',
    name: ''
  });
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [fetchMessages] = useFetchMessagesMutation();
  const [getAllUsers] = useGetAllUsersMutation();
  const textMessage = useRef();
  const [isTyping, setIsTyping] = useState([]);

  const selectedUserBackgroundColor = '#dbe9f6';
  const myUserMsgBackgroundColor = '#b9bcb9';
  const opposingUserBackgroundColor = '#82baf3'
  const offlineIconColor = '#c0c0c0';
  const onlineIconColor = '#5fec6b';

  const ws_url = import.meta.env.VITE_WS_URL;
  const upload_url = import.meta.env.VITE_UPLOAD_URL;

  useEffect(() => {
    connectToWs();
  }, []);

  useEffect(() => {
    scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (isSelectedUser.userId) {
      setNewMessage('')
      receiveMessages(isSelectedUser.userId);
    }
  }, [isSelectedUser]);

  useEffect(() => {
    fetchOfflineUsers();
  }, [onlineUsers]);

  useEffect(() => {
    sendTypingStatus();
  }, [newMessage])

  useEffect(() => {


  }, [isTyping])

  const handleWsMessage = async (e) => {
    e.preventDefault();
    if (e.data.length > 0) {
      const onlineData = JSON.parse(e.data);
      if ('online' in onlineData) {
        fetchOnlineUsers(onlineData.online);
      } else if ('text' in onlineData) {
          if (onlineData.recipient === user.user_id) {
            setMessages((prev) => [...prev, { ...onlineData }]);
          }
      } else if ('image' in onlineData) {
          if (onlineData.recipient === user.user_id) {
            setMessages((prev) => [...prev, { ...onlineData }]);
          }
      } else if ('file' in onlineData) {
          if (onlineData.recipient === user.user_id) {
            setMessages((prev) => [...prev, { ...onlineData }]);
          }
      } else if ('typingStatus' in onlineData) {
          if (onlineData.recipient === user.user_id) {
              setIsTyping([onlineData])
            }
      }}
  };

  const connectToWs = () => {
    const ws = new WebSocket(ws_url, ['access_token', user.token]);
    setWs(ws);
    ws.addEventListener('message', handleWsMessage);
    ws.addEventListener('close', () => {
      setTimeout(() => {
        console.log('Disconnected; Attempting to reconnect');
        connectToWs();
      }, 1000);
    });
  };

  const fetchOfflineUsers = async () => {
    const offlineUsers = {};
    const myUserId = user.user_id;
    const res = await getAllUsers({ user });

    const allUsersExceptMe = res.data.filter((user) => user._id !== myUserId);
    const offlineUsersArr = allUsersExceptMe.filter(
      (user) => !Object.keys(onlineUsers).includes(user._id)
    );

    offlineUsersArr.forEach((user) => (offlineUsers[user._id] = user.name));

    setOfflineUsers(offlineUsers);
  };

  const fetchOnlineUsers = (usersArr) => {
    const users = {};
    if (usersArr.length > 0) {
      usersArr.forEach(({ id, name }) => {
        users[id] = name;
      });
    }
    setOnlineUsers(users);
  };


  const renderOfflineUsers = () => {
    if (offlineUsers) {
      const offlineUsersJSX = Object.keys(offlineUsers).map((userId) => (
        <div
          className='user-container'
          key={nanoid()}
          onClick={() => setIsSelectedUser({...isSelectedUser, userId: userId, name: offlineUsers[userId]})}
          style={
            userId === isSelectedUser.userId
              ? { backgroundColor: selectedUserBackgroundColor }
              : { backgroundColor: 'none' }
          }
        >
          <div className='user-status-container'>
            <span className='status-icon' style={{ backgroundColor: offlineIconColor }}></span>
            <Avatar username={offlineUsers[userId]} />
          </div>
          <div id='user'>{offlineUsers[userId]}</div>
        </div>
      ));
      return offlineUsersJSX;
    }
  };

  const renderOnlineUsers = () => {
    if (onlineUsers) {
      if ('undefined' in onlineUsers) {
        delete onlineUsers['undefined'];
      }
      const onlineUsersExclMyself = { ...onlineUsers };
      delete onlineUsersExclMyself[user.user_id];
      const onlineUsersJSX = Object.keys(onlineUsersExclMyself).map((userId) => (
        <div
          className='user-container'
          key={nanoid()}
          onClick={() => setIsSelectedUser({...isSelectedUser, userId: userId, name: onlineUsers[userId]})}
          style={
            userId === isSelectedUser.userId
              ? { backgroundColor: selectedUserBackgroundColor }
              : { backgroundColor: 'none' }
          }
        >
          <div className='user-status-container'>
            <span className='status-icon' style={{ backgroundColor: onlineIconColor }}></span>
            <Avatar username={onlineUsers[userId]} />
          </div>
          <div id='user'>{onlineUsers[userId]}</div>
        </div>
      ));
      return onlineUsersJSX;
    }
  };

  const scrollIntoView = () => {
    const divTextMessage = textMessage.current;
    if (divTextMessage) {
      divTextMessage.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayMessages = () => {
    const myId = user.user_id;
    if (isSelectedUser.userId && messages.length > 0) {
      const messagesWithoutDupes = uniqBy(messages, '_id');
      const displayMessagesJSX = messagesWithoutDupes.map((message) => (
        <div key={nanoid()}>
          <div
            className='message-container'
            style={message.sender === myId ? { textAlign: 'right' } : { textAlign: 'left' }}
          >
            {message.text && message.image ? (
              <>
                <img id='imgAndText' src={message?.image?.data} />
                <div style={{ display: 'block' }}>
                  <span
                    className='text'
                    style={{
                      backgroundColor: message.sender === myId ? myUserMsgBackgroundColor : opposingUserBackgroundColor,
                    }}
                  >
                    {message.text}
                  </span>
                </div>
              </>
            ) : (
              message.text || message.image || message.file ? (
                <span
                  id='message'
                  style={
                    message.sender === myId && message.text || message.file
                      ? { backgroundColor: myUserMsgBackgroundColor }
                      : !message.text && message.image
                      ? { backgroundColor: 'none' }
                      : message.sender !== myId
                      ? { backgroundColor: opposingUserBackgroundColor }
                      : null
                  }
                  ref={textMessage}
                >
                {message.file && (
                  <>
                    <img className='attach-file-mini' src={attachFileIcon} alt='attachFile' />
                    <a className='file-attachment' href={`${upload_url}${message.file}`} target="_blank" rel="noreferrer">
                      {message.file}
                    </a>
                    <br/>
                  </>
                )}
                  {message.text ? <span className='text'>{message.text}</span> : null}
                  {message.image && ( <img id='imgFile' src={message?.image?.data}/> )}
                </span>
              ) : null
            )}
          </div>
        </div>
      ));
      return displayMessagesJSX;
    }
  };

  const receiveMessages = async (selectedUserId) => {
    const res = await fetchMessages({ selectedUserId, user });
    setMessages(res.data);
  };

  const sendMessage = (e, readerResult, fileType = null) => {
    if (e) e.preventDefault();
    if (newMessage.trim() !== '' || fileType) {
      const wsData = {
        recipient: isSelectedUser.userId,
        sender: user.user_id,
        type: 'message'
      };

      if (fileType === 'image') {
        wsData.image = readerResult;
      } else if (fileType === 'file') {
        console.log(readerResult)
        wsData.file = readerResult;
      }

      if (newMessage.trim() !== '') {
        wsData.text = newMessage;
      }

      ws.send(JSON.stringify(wsData));

      const newMessageObject = {
        text: newMessage.trim() !== '' ? newMessage : null,
        image: fileType === 'image' ? readerResult : null,
        file: fileType === 'file' ? readerResult.name : null,
        sender: user.user_id,
        recipient: isSelectedUser.userId,
        _id: Date.now(),
      };

      setMessages((prev) => [...prev, newMessageObject]);
      setNewMessage('');
      scrollIntoView();
    } else {
      toast.error('Filled-in field required');
    }
  };

  const sendImage = (e) => {
    e.preventDefault();
    const imageFile = e?.target?.files?.[0];
    if (imageFile.type.startsWith('image/')){
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        sendMessage(null, {
          name: imageFile.name,
          data: reader.result,
        }, 'image');
      }
    } else {
      toast.error('Selected file is not an image.');
    }
  };

  const sendFile = (e) => {
    e.preventDefault();
    const file = e?.target?.files?.[0];

    //create unique name for file
    const parts = file.name.split('.');
    const ext = parts[parts.length -1];
    const fileName = Date.now() + '.' + ext;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      sendMessage(null, {
        name: fileName,
        data: reader.result,
      }, 'file');
    }
  };

  const sendTypingStatus = () => {
    if (ws) {
      const typingStatusData = {
        sender: user.user_id,
        recipient: isSelectedUser.userId,
        type: 'typing',
        status: newMessage.trim() ? 'typing' : 'stopped'
      }
      ws.send(JSON.stringify(typingStatusData))
    }
  }

  return (
    <div className='chat-container'>
      <div className='chat-contacts-container'>
        <div className='header-container'>
          <h3 className='chat-header'>MyChats</h3>
          <img type='image' src={chatIcon} id='header-icon'/>
        </div>
        <div className='chat-contacts-body'>
          {renderOnlineUsers()}
          {renderOfflineUsers()}
        </div>
      </div>
      <div className='chat-body'>
        <div className='chat-message-container'>
          <div className='chat-message-body'>
            {isSelectedUser.userId && messages.length === 0 ? <span id='new-chat-selected-text'>Start Chatting Now!</span> : null}
            {isSelectedUser.userId ? displayMessages() : <span id='no-contacts-selected-text'>Select A User and Start Chatting!</span>}
          </div>
        </div>
        {isTyping.length !== 0 && isTyping[0].typingStatus === true && isSelectedUser.userId === isTyping[0].sender ? <span className='typingStatus-text'>{`${isSelectedUser.name} is typing ...`}</span> : null}
        {!!isSelectedUser.userId && (
          <form className='chat-text-container' onSubmit={sendMessage}>
            <label type='button' className='attach-image-btn'>
              <input type='file' className='hidden' onChange={sendImage} />
              <img className='attach-image' src={imageIcon} alt='imageIcon' />
            </label>
            <label type='button' className='attach-file-btn'>
              <input type='file' className='hidden' onChange={sendFile} />
              <img className='attach-file' src={attachFileIcon} alt='attachFile' />
            </label>
            <input
              type='text'
              placeholder='Type your message here'
              id='chat-textbox'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type='submit' id='textbox-submit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                color='white'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}