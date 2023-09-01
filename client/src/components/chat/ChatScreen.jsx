import './ChatScreen.css'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

export default function ChatScreen () {
  const [ ws, setWs ] = useState(null)
  const [isOnline, setIsOnline] = useState([])
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000')
    setWs(ws)
    ws.addEventListener('message', handleMessage)
  }, [])

  const showOnlineUsers = (usersArr) => {
    const users = {}
    usersArr.forEach(({id, email, name}) => {
      users[id] = name
    })
    setIsOnline(users)
  }

  const handleMessage = async (e) => {
    e.preventDefault()
    const onlineData = JSON.parse(e.data)
    if ('online' in onlineData) {
      console.log(onlineData)
      showOnlineUsers(onlineData.online)
    }
  }

  return (
    <div className='chat-container'>
      <div className='chat-contacts'>
        {isOnline.length !== 0 ? Object.keys(isOnline).map(name => (
          <div key={nanoid()}>{isOnline[name]}</div>
        ))
          :
          null
        }
      </div>
      <div className='chat-body'>
        <div className='chat-message-container'>
          <div className='chat-message-body'>
            <div>Messages with selected person</div>
          </div>
        </div>
        <div className='chat-text-container'>
          <input type='text' placeholder='Type your message here' id='chat-textbox'/>
          <button type='submit' id='textbox-submit'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' color='white' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

