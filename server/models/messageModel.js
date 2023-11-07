const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: String,
  image: {
    name: String,
    data: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);