const User = require('../models/userModel')
const Message = require('../models/messageModel')
const jwt = require('jsonwebtoken')

const getSelectedUserMessages = async (req, res) => {
  const { userId } = req.params
  const selectedUserId = userId

  const { token } = req.cookies
  const tokenData = jwt.verify(token, process.env.SECRET)
  const myUserId = tokenData.user_id

  const selectedUserData = await User.findOne({ _id: userId })

  try {
    if(!selectedUserData) {
      throw Error('selected user not found')
    }

    const messages = await Message.find({
      sender: {$in: [selectedUserId, myUserId]},
      receiver: {$in: [selectedUserId, myUserId]}
    }).sort({createdAt: -1})
    
    console.log(messages)
  } 
  catch(err) {
    res.json({message: 'err'})
  }

  
}

module.exports = {
  getSelectedUserMessages
}