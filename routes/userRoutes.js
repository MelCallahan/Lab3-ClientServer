const express = require('express');
const router = express.Router();

// Render Registration Page
router.get('/register', (req, res) => {
  res.render('register'); // Renders the 'register.ejs' view
});

// Handle Registration Form Submission
router.post('/register', (req, res) => {
  const { username, email, password, day, month, year } = req.body;
  console.log({ username, email, password, day, month, year });
  res.redirect('/welcome');
});

module.exports = router;
