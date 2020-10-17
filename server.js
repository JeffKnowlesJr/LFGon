// Include express
const express = require('express');
// Includes connectDB function from db file
const connectDB = require('./config/db');

// Initialize our app variable with express
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Creating an end point to test out that will send back data with 'API Running' message
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Set port to look for env variable or fallback to 5000
const PORT = process.env.PORT || 5000;

// listen on a port and include callback to log 'Server start..' message
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));