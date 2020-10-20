// Includes express
const express = require('express');
// Creates variable to use express router
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

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

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  // Destructuring Request dot Body
  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // Return jsonwebtoken
    // Setting up user login 
    const payload = {
      user: {
        id: user.id
      }
    }

    // jetWoken // jwtToken
    // --------
    // jwt signs the token
    // passing in the payload
    // containing the User ID
    // also and also passing
    // in our Secret Key (token)
    // an expirationIn order
    // and a call back function
    // to receive the status
    // that sends in response
    // the signed token


    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        // console.log('X gon give ya Errors')
        if (err) throw err;
        res.json({ token });
      }
    );

    // We're going to taken this
    // and pass it through the headers
    // in access protected routes
    
  } catch(err){
    console.error(err.message);
    res.status(500).send('Sever error');
  }



});

// Exports the router
module.exports = router;
