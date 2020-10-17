// Includes express
const express = require('express');
const { body } = require('express-validator');
// Creates variable to use express router
const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', (req, res) => {
  console.log(req.body);
  res.send('User route');
});

// Exports the router
module.exports = router;