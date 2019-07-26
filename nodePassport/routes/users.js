const express = require('express');
const router = express.Router();

//register route

router.get('/register', function(req, res){
  res.render('register');
});

// login
router.get('/login', function(req, res){
  res.render('register');
});

module.exports = router;