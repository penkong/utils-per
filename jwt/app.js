const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();

app.get('/api', (req,res) => {
  res.json({
    message: 'welcome to api'
  });
});


// protected route
app.post('/api/posts', verifyRoute,  (req,res)=> {
  jwt.verify(req.token, 'secretKEy=', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'post created',
        authData
      });
    };
  });
});

app.post('/api/login', (req, res)=> {
  // user  => req to login and send pass auth stuff to db form server
  // and get user back
  const user = {
    id: 1,
    userName: 'mk',
    email: 'mk@gmail.com',
  }
  // payload
  jwt.sign({ user }, 'secretKEy=', { expiresIn: '60000s'}, (err, token) => {
    res.json({
      token
    });
  });
})

//  format token = authorization : Bearer <access_TOKEN>
// we go to put it out from header

//verify token  middleware
function verifyRoute(req,res,next) {
  // get auth header value
  // for send token in header
  const bearerHeader = req.headers['authorization'];
  // check
  if(typeof bearerHeader !== 'undefined') {
    // split at space'
    const bearer = bearerHeader.split(' ');
    // get token 
    const bearerToken = bearer[1];
    // set token
    req.token = bearerToken;
    // call next();
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }

} 

app.listen(5000, () => console.log('sever start at 5000'));