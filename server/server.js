const express = require('express')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const messagesRoutes = require('./routes/messageRoutes')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config()
const ws = require('ws')
const jwt = require('jsonwebtoken')
const Message = require('./models/messageModel')
const { tokenValidtor } = require('./middleware/tokenValidator')

//express app
const app = express()
app.set("trust proxy", 1);
//middleweare to read body, parse it and place results in req.bdoy
app.use(express.urlencoded({extended: true}))       // for application/x-www-form-urlencoded

//set requesst size to 50mb
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: "50mb" }))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//middleware to enable requests between multiple browsers 
const cors = require('cors')
app.use(cors({origin: ['http://localhost:5173', 'https://bpun1p-chat-app.onrender.com'], credentials: true}))


//connect to mongodb
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const server = app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`))

const wsServer = new ws.WebSocketServer({server})
wsServer.on('connection', (connection, req) => {
  // notify about online users when someone connects
  const notifyAboutOnlineUsers = () => {
    [...wsServer.clients].forEach(client => {
      client.send(JSON.stringify(
        {
          online: [...wsServer.clients].map(client => ({
            id: client._id, 
            email: client.email,
            name: client.name
          }))
        }
      ))
    })
  }

  //checking if the connection is alive
  connection.isAlive = true
  connection.timer = setInterval(() => {
    connection.ping()
    console.log('ping')
    connection.deathTimer = setTimeout(() => {
      connection.isAlive = false
      connection.terminate()
      notifyAboutOnlineUsers()
      console.log('dead')
    }, 1000)
  }, 5000)
  connection.on('pong', () => {
    clearTimeout(connection.deathTimer)
  })

  // read user's data from the cookie before handling connection
  const token = req.headers['sec-websocket-protocol'].split(' ')[1]
  if (token) {
    jwt.verify(token, process.env.SECRET, {}, async (err, userData) => {
      const { user_id, email, name } = userData
      connection._id = user_id
      connection.email = email
      connection.name = name
    })
  }

  connection.on('message', async (message) => {
    const messageData = JSON.parse(message.toString())
    const { recipient, sender, text } = messageData
    if (sender && recipient && text) {
      const messageDoc = await Message.create({
        sender: sender,
        recipient: recipient,
        text
      });
      [...wsServer.clients]
        .filter(client => client._id === recipient)
        .forEach(client => client.send(JSON.stringify({
          text, 
          sender: sender,
          recipient: recipient,
          _id: messageDoc._id
        })))
    }
  });
  // notify about online users when someone connects
  notifyAboutOnlineUsers()
})

//Api routes
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/messages', messagesRoutes)