// Includes express
const express = require('express');
// Creates variable to use express router
const router = express.Router();
// Includes express-validator/check
// Includes express-validator because check was deprecated
const { check, validationResult } = require('express-validator');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name must be at least 4 characters').isLength({min:4}),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min:6})
],(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }
  res.send('User route');
});
// Includes a second parameter as Middleware to check validation

// Exports the router
module.exports = router;