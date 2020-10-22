const mongoose = require('mongoose');
const Profile = require('./Profile');

const TagSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile'
  },
  usertag: {
    type: String,
    required: true
  },
  value: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tag = mongoose.model('tag', TagSchema);