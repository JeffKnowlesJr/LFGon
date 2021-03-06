// Includes express
const express = require('express');
// Creates variable to use express router
const router = express.Router();
// Includes express-validator/check
// Includes express-validator because check was deprecated
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// Including user model

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name must be at least 4 characters').isLength({min:4}),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min:6})
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

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
 
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    user = new User({
      name,
      email,
      avatar,
      password
    });

    // Encript password

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
// Includes a second parameter as Middleware to check validation

// @route   POST api/users/me
// @desc    Update User
// @access  Protected
router.post('/me', [ auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name must be at least 4 characters').isLength({min:4}),
  check('password', 'Please enter a password with 6 or more characters').isLength({min:6})
]],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  // Destructuring Request dot Body
  const { name, password } = req.body;

  // build user object
  const userFields = {};
  if(name) userFields.name = name;

  try {
    // See if user exists
    let user = await User.findOne({ _id: req.user.id });
    console.log(user);

    if(user) {
      user = await User.findOneAndUpdate(
        { _id: req.user.id},
        { $set: userFields },
        { new: true }
      );
      return res.json(user);
    }
    
  } catch(err){
    console.error(err.message);
    res.status(500).send('Sever error');
  }


});


// Exports the router
module.exports = router;
