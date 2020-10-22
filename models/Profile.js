const mongoose = require('mongoose');
const {Tag} = require('./Tag');

// create a profile schema

ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  tags: {
    type: [Tag],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);