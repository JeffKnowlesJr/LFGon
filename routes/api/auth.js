// Includes express
const express = require('express');
// Creates variable to use express router
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test Route
// @access  Protected
router.get('/', auth, async (req, res) => {
  // Instead of doing a res.send directly
  // We're going to use a try catch b/c
  // We're going to make a call to our 
  // Database. We'll also need async await
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// Exports the router
module.exports = router;
