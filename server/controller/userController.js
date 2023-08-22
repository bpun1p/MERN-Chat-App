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
    const match = await bcrypt.compare(password, user.password)
  
    if (!match) {
      throw Error('Incorrect password')
    }

    const token = createToken(user._id)
    res.status(200).json({
      email, 
      name, 
      token
    })
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
    if (!validator.isEmail(email)) {
      throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
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

module.exports = {
  loginUser,
  registerUser,
}