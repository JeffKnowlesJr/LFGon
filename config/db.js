// Include mongoose
const mongoose = require('mongoose');
// Include config
const config = require('config');
// Set db variable using mongoURI config value
const db = config.get('mongoURI');

// Creates an async arrow function
const connectDB = async () => {
  // try/catch will handle errors if we can't connect
  try {
    // mongoose.connect returns a promise so we wait for it
    await mongoose.connect(db);
    // prints 'mongodb connected' if we connect to database
    console.log('MongoDB Connected...');
  } catch(err) {
    // prings error message property to console
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
}

module.export = connectDB;