const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const tokenValidator = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    res.status(401).json({error: 'require authorization token'})
    return
  };
 
  try {
    const tokenData = jwt.verify(token, process.env.SECRET)
    const userData = await User.findOne({_id: tokenData.user_id})
    if (!userData) {
      res.status(401).json({error: 'user not found'})
    }

    next()
  }
  catch(err) {
    console.log(err);
    res.status(401).json({error: 'request is not authorized'})
  }
}

module.exports = tokenValidator; 