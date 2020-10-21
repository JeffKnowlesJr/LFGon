// Includes express
const express = require('express');
// Creates variable to use express router
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../Profile');
const User = require('../../User');
const Tag = require('../../Tag');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Protected
router.get('/', auth, async (req, res) => {
  try {
    
    const profile = await Profile.findOne({ user: req.user.id});


  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
}

// Exports the router
// module.exports = router;