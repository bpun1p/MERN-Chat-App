const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '7d'})
}

const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    if (!email || !password) {
      throw Error('All fields must be filled');
    }
    
    const user = await User.findOne({ email })
  
    if (!user) {
      throw Error('Incorrect email')
    }
    const name = user.name
    const passMatch = await bcrypt.compare(password, user.password)
  
    if (!passMatch) {
      throw Error('Incorrect password')
    }

    const token = createToken(user._id)
    res.cookie('token', token, {sameSite:'none', secure:true}).status(200).json({email, name, token})
  } 
  catch(err) {
    res.status(400).json({error: err.message})
  }
}

const registerUser = async (req, res) => {
  const {name, email, password} = req.body;

  try {
    if (!name || !email || ! password) {
      throw Error('All fields must be filled')
    }
    else if (!validator.isEmail(email)) {
      throw Error('Email is not valid')
    }
    else if (!validator.isStrongPassword(password)) {
      throw Error('Password is not strong enough')
    }
  
    const exists = await User.findOne({ email })

    if (exists) {
      throw Error('Email already exists')
    }
  
    const salt = await bcrypt.genSalt(10)          //salt basically adds extra strings to the end of the password before hashing for more pass protection
    const hash = await bcrypt.hash(password, salt)
  
    const user = await User.create({ name, email, password: hash })
    const token = createToken(user._id)
    res.status(200).json({email, name, token})
  } 
  catch(err) {
    res.status(400).json({error: err.message})
  }
}

const logoutUser = async (req, res) => {
  res.clearCookie('token').status(200).json('logged out')
}

const updateUser = async (req, res) => {
  const user_id = req.user._id;
  const {name, email, password} = req.body;
  const user = await User.findOne({ email })
  const passMatch = await bcrypt.compare(password, user.password)

  try {
    if (!name || !email || !password) {
      throw Error('All fields must be filled!')
    }
    else if (!passMatch) {
      throw Error('Cannot use previous password!')
    }
    else if (!validator.isEmail(email)) {
      throw Error('Email is not valid!')
    }
    else if (!validator.isStrongPassword(password)) {
      throw Error('Password is not strong enough! Required: min-characters: 8, min-lowercase: 1, min-uppercase: 1, min-numbers: 1, min-symbols: 1')
    }

    const salt = await bcrypt.genSalt(10)          //salt basically adds extra strings to the end of the password before hashing for more pass protection
    const hash = await bcrypt.hash(password, salt)

    await User.updateOne({_id: user_id}, {$set: {name, email, password: hash, user_id}});
    const token = createToken(user_id)
    res.status(200).json({name, email, token});
  } 
  catch(err) {
    res.status(400).json({error: err.message})
  }
}

module.exports = {
  loginUser,
  registerUser,
  updateUser, 
  logoutUser
}