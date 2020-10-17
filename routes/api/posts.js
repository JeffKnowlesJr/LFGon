// Includes express
const express = require('express');
// Creates variable to use express router
const router = express.Router();

// @route   GET api/posts
// @desc    Test Route
// @access  Public
router.get('/', (req, res) => res.send('Post route'));

// Exports the router
module.exports = router;