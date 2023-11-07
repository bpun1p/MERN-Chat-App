const express = require('express');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const messagesRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const ws = require('ws');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Message = require('./models/messageModel');

// Express app
const app = express();
app.use('/uploads', express.static(__dirname + '/uploads'));
app.set("trust proxy", 1);

// Middleware to read body, parse it, and place results in req.body
app.use(express.urlencoded({ extended: true })); // For application/x-www-form-urlencoded

// Set request size to 50MB
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Middleware to enable requests between multiple browsers
const cors = require('cors');
app.use(cors({ origin: ['http://localhost:5173', 'https://bpun1p-chat-app.onrender.com'], credentials: true }));

// Connect to MongoDB
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase the timeout
    });
    console.log('Connected to the database');
  } catch (err) {
    console.log(err);
  }
}

connectDatabase();

const server = app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));

const wsServer = new ws.WebSocketServer({ server });
wsServer.on('connection', (connection, req) => {
  // Notify about online users when someone connects
  const notifyAboutOnlineUsers = () => {
    [...wsServer.clients].forEach(client => {
      client.send(JSON.stringify(
        {
          online: [...wsServer.clients].map(client => ({
            id: client._id,
            email: client.email,
            name: client.name,
          })),
        }
      ));
    });
  };

  // Checking if the connection is alive
  connection.isAlive = true;
  connection.timer = setInterval(() => {
    connection.ping();
    connection.deathTimer = setTimeout(() => {
      connection.isAlive = false;
      clearInterval(connection.timer);
      connection.terminate();
      notifyAboutOnlineUsers();
    }, 1000);
  }, 30000);
  connection.on('pong', () => {
    clearTimeout(connection.deathTimer);
  });

  // Read user's data from the cookie before handling the connection
  const token = req.headers['sec-websocket-protocol'].split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.SECRET, {}, async (err, userData) => {
      const { user_id, email, name } = userData;
      connection._id = user_id;
      connection.email = email;
      connection.name = name;
    });
  }

  connection.on('message', async (message) => {
    const messageData = JSON.parse(message.toString());
    const { recipient, sender, text, image } = messageData;
    if (sender && recipient && (text || image)) {
      const messageObj = {
        sender: sender,
        recipient: recipient,
      };

      if (image) {
        messageObj.image = image;
      }

      if (text) {
        messageObj.text = text;
      }

      const messageDoc = await Message.create(messageObj);

      [...wsServer.clients]
        .filter(client => client._id === recipient)
        .forEach(client => client.send(JSON.stringify({
          text,
          image,
          sender: sender,
          recipient: recipient,
          _id: messageDoc._id,
        })));
    }
  });
  // Notify about online users when someone connects
  notifyAboutOnlineUsers();
});

// API routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/messages', messagesRoutes);
