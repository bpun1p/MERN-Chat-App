const User = require('../models/userModel')

const getAllUsers = async (req, res) => {
  const users = await User.find({}, {'_id': true, name: true})
  res.status(200).json(users)
}

module.exports = {
  getAllUsers
}