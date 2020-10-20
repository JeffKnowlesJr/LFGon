// Includes express
const express = require('express');
// Creates variable to use express router
const router = express.Router();
const auth = require('../../middleware/auth')

// @route   GET api/auth
// @desc    Test Route
// @access  Protected
router.get('/', auth, (req, res) => res.send('Auth route'));

// Exports the router
module.exports = router;
