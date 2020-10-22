// Includes express
const express = require('express');
// Creates variable to use express router
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Tag = require('../../models/Tag');
const { check, validationResult} = require('express-validator/')
 
// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Protected
router.get('/me', auth, async (req, res) => {
  try {
    
    const profile = await Profile.find({ user: req.user.id}).populate('user', ['name', 'avatar']);

    if(!profile) {
       return res.status(400).json({ msg: 'You have no profiles'})
    }

    res.json(profile);

  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile/
// @desc    Create or update user profile
// @access  Protected
router.post(
  '/', 
  [ 
    auth, 
    [
  check('title', 'Title is required')
  .not()
  .isEmpty()
]],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title
  } = req.body;

  // build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if(title) profileFields.title = title;


  try {
    // Find
    let profile = await Profile.findOne({user: req.user.id, title: title});

    if(profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id, title: title },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile);

  } catch {
    return res.status(400).json({ errors: errors.array("test") });
  }
});

// Exports the router
module.exports = router;