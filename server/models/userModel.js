const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)