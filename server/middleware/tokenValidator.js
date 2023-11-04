const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const tokenValidator = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  try {
    if (!token) {
      throw Error('Require authorization token');
    }

    const tokenData = jwt.verify(token, process.env.SECRET);
    const userData = await User.findOne({ _id: tokenData.user_id });
    if (!userData) {
      throw Error('User not found');
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: err });
  }
};

module.exports = tokenValidator;
