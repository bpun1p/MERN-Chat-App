const User = require('../models/userModel');
const Message = require('../models/messageModel');
const jwt = require('jsonwebtoken');

const getSelectedUserMessages = async (req, res) => {
  const { userId } = req.params;
  const selectedUserId = userId;

  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  const tokenData = jwt.verify(token, process.env.SECRET);
  const myUserId = tokenData.user_id;

  try {
    const selectedUserData = await User.findOne({ _id: selectedUserId });

    if (!selectedUserData) {
      throw Error('selected user not found');
    }
    const messages = await Message.find({
      sender: { $in: [selectedUserId, myUserId] },
      recipient: { $in: [selectedUserId, myUserId] }
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = { 
  getSelectedUserMessages
};
