import './ChatScreen.css'
import { useEffect, useState, useRef } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useFetchMessagesMutation } from '../../slices/chatsApiSlice'
import { uniqBy } from 'lodash'
import { useGetAllUsersMutation } from '../../slices/usersApiSlice'

export default function ChatScreen () {
  const [ ws, setWs ] = useState(null)
  const [ onlineUsers, setOnlineUsers ] = useState({})
  const [ offlineUsers, setOfflineUsers ] = useState({})
  const [ isSelectedUser, setIsSelectedUser ] = useState('')
  const [ newMessage, setNewMessage ] = useState('')
  const [ messages, setMessages ] = useState([])
  const { user } = useSelector((state) => state.auth)
  const [ fetchMessages ] = useFetchMessagesMutation()
  const [ getAllUsers ] = useGetAllUsersMutation()
  const textMessage = useRef()

  const ws_url = import.meta.env.VITE_WS_URL
  // const ws_url = 'wss://bpun1p-chat-app-api.onrender.com'

  useEffect(() => {
    connectToWs()
  }, [])

  useEffect(() => {
    scrollIntoView()
  }, [messages])

  useEffect(() => { 
    if (isSelectedUser) {
      receiveMessages(isSelectedUser)
    }
  }, [isSelectedUser])

  useEffect(() => {
    fetchOfflineUsers()
  }, [onlineUsers])

  const fetchOfflineUsers = async () => {
    const offlineUsers = {}
    const myUserId = user.user_id
    const res = await getAllUsers({user})

    const allUsersExceptMe = res.data.filter(user => user._id !== myUserId)
    const offlineUsersArr = allUsersExceptMe.filter(user => !Object.keys(onlineUsers).includes(user._id))
    offlineUsersArr.forEach(user => offlineUsers[user._id] = user.name) 

    setOfflineUsers(offlineUsers)
  }

  const fetchOnlineUsers = (usersArr) => {
    const users = {}
    if (usersArr.length > 0) { 
      usersArr.forEach(({id, name}) => {
        users[id] = name
      })
    }
    setOnlineUsers(users)
  }

  const connectToWs = () => {
    const ws = new WebSocket(ws_url, ['access_token', user.token])
    setWs(ws)
    ws.addEventListener('message', handleWsMessage)
    ws.addEventListener('close', () => {
      setTimeout(() => {
        console.log('Disconnected; Attempting to reconnect')
        connectToWs()
      }, 1000)
    })
  }

  const receiveMessages = async (selectedUserId) => {
    const res = await fetchMessages({selectedUserId, user})
    setMessages(res.data)
  }

  const displayMessages = () => {
    const myId = user.user_id
    if (isSelectedUser && messages.length > 0) {
      const messagesWithoutDupes = uniqBy(messages, '_id')
      const displayMessagesJSX = messagesWithoutDupes.map(message => (
        <div key={nanoid()}>
          <div
            className='message-container'
            style={(message.sender === myId ? {textAlign: 'right'} : {textAlign: 'left'})}
          >
            <span id='message'
              style={(message.sender === myId ? {backgroundColor: '#b9bcb9'} : {backgroundColor: '#82baf3'})}
              ref={textMessage}
            >
              {message.text}
            </span>
          </div>
        </div>
      ))
      return(displayMessagesJSX)
    }
  }
  
  const displayOfflineUsers = () => {
    if (offlineUsers) {
      const offlineUsersJSX = Object.keys(offlineUsers).map(userId => (
        <div 
          className='user-container' 
          key={nanoid()}
          onClick={() => setIsSelectedUser(userId)}
          style={(userId === isSelectedUser ? {backgroundColor : 'rgb(219,233,246)'}: {backgroundColor : ''})}
        >
          <div id='user'>{offlineUsers[userId]}</div>
          <span className='dot' style={{backgroundColor: 'rgb(192,192,192)'}} ></span>
        </div>
      ))
      return offlineUsersJSX
    }
  }

  const displayOnlineUsers = () => {
    if (onlineUsers) {
      if ('undefined' in onlineUsers) {
        delete onlineUsers['undefined']
      }
      const onlineUsersExclMyself = {...onlineUsers}
      delete onlineUsersExclMyself[user.user_id]
      const onlineUsersJSX = Object.keys(onlineUsersExclMyself).map(userId => (
        <div 
          className='user-container' 
          key={nanoid()}
          onClick={() => setIsSelectedUser(userId)}
          style={(userId === isSelectedUser ? {backgroundColor : 'rgb(219,233,246)'}: {backgroundColor : ''})}
        >
          <div id='user'>{onlineUsers[userId]}</div>
          <span className='dot' style={{backgroundColor: 'rgb(95, 236, 107)'}}></span>
        </div>
      ))
      return onlineUsersJSX 
    }
  }

  const handleWsMessage = async (e) => {
    e.preventDefault()
    if (e.data.length > 0) {
      const onlineData = JSON.parse(e.data)
      console.log('Connected')
      if ('online' in onlineData) {
        fetchOnlineUsers(onlineData.online)
      } 
      else if ('text' in onlineData)(
        setMessages(prev => ([...prev, {...onlineData}]))
      )
    }
  }

  const scrollIntoView = () => {
    const divTextMessage = textMessage.current
    if (divTextMessage) {
      divTextMessage.scrollIntoView({behaviour: 'smooth'})
    }
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (newMessage !== '') {
      ws.send(JSON.stringify({
        recipient: isSelectedUser,
        sender: user.user_id,
        text: newMessage
      }))
      setMessages(prev => ([...prev, {
        text: newMessage, 
        sender: user.user_id,
        recipient: isSelectedUser,
        _id: Date.now()
      }]))
      setNewMessage('')
      scrollIntoView()
    } else {
      toast.error('Filled in field required')
    }
  }

  return (
    <div className='chat-container'>
      <div className='chat-contacts-container'>
        <h3 className='chat-header'>Chats</h3>
        <div className='chat-contacts-body'>
          {displayOnlineUsers()}
          {displayOfflineUsers()}
        </div>
      </div>
      <div className='chat-body'>
        <div className='chat-message-container'>
          <div className='chat-message-body'>
            {!isSelectedUser ? <span id='no-contacts-selected'>Start Chating Now!</span> : null}
            {displayMessages()}
          </div>
        </div>
        {!!isSelectedUser && 
          <form className='chat-text-container' onSubmit={sendMessage}>
            <input type='text' 
            placeholder='Type your message here' 
            id='chat-textbox'
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            />
            <button type='submit' id='textbox-submit'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' color='white' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5' />
              </svg>
            </button>
          </form>
        }
      </div>
    </div>
  )
}

