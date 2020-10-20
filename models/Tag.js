const mongoose = require('mongoose');

const Tag = new mongoose.Schema({
  usertag: {
    type: String,
    required: true
  },
  value: {
    type: String,
    require: true
  }
});

module.exports = Tag = mongoose.model.('tag', TagSchema);