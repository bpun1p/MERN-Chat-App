const express = require('express')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config()
const ws = require('ws')
const jwt = require('jsonwebtoken')
const User = require('./models/userModel');

//express app
const app = express()
//middleweare to read body, parse it and place results in req.bdoy
app.use(express.urlencoded({extended: true}))       // for application/x-www-form-urlencoded

//set requesst size to 50mb
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: "50mb" }))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//middleware to enable requests between multiple browsers 
const cors = require('cors')
app.use(cors({origin: 'http://localhost:5173', credentials: true}))

//connect to mongodb
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const server = app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`))

const wsServer = new ws.WebSocketServer({server})
wsServer.on('connection', (connection, req) => {
  const cookies = req.headers.cookie
  if (cookies) {
    const cookieString = cookies.split(';').find(string => string.startsWith('token='))
    if (cookieString) {
      const token = cookieString.split('=')[1]
      if (token) {
        jwt.verify(token, process.env.SECRET, {}, async (err, userData) => {
          if (err) {
            throw err
          }
          console.log(userData)
          const { _id, email, name } = userData
          connection._id = _id
          connection.email = email
          connection.name = name
        })
      }
    }
  }
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
})  

//Api routes
app.use('/auth', userRoutes)