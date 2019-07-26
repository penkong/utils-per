const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();

app.get('/api', (req,res) => {
  res.json({
    message: 'welcome to api'
  });
});

app.post('/api/posts', (req,res)=> {
  res.json({
    message: 'post created'
  })
});

app.post('/api/login', (req, res))



app.listen(5000, () => console.log('sever start at 5000'));