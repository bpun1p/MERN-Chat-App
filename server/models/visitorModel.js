const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitorSchema = new Schema({
  activity: {
    date: String,
    visitorCount: Number,
    users: [{type: String}]
  }
}, { timestamps: true });

module.exports = mongoose.model('visitor', visitorSchema);