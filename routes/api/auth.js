const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// user Model
const User = require('../../models/User');

// @route     POST api/auth
// @desc      Auth the user
// @access    Public
router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    // Validate pass
    bcrypt.compare(password, user.password).then(ismatch => {
      if (!ismatch) return res.status(400).json({ msg: 'Invalid credentials' });
      jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route     GET api/auth/user
// @desc      Get user data
// @access    Public

router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
