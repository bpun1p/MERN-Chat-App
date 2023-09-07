const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const tokenValidator = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    res.status(401).json({error: 'require authorization token'})
    return
  };
 
  try {
    const {_id} = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({_id}).select('_id')
    next()
  }
  catch(err) {
    console.log(error);
    res.status(401).json({error: 'request is not authorized'})
  }
}

module.exports = tokenValidator; 