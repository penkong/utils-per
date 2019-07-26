const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// db
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/loginapp');
const db = mongoose.connection;

const routes = require('./routes/index');
const users = require('./routes/users');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exhbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');


// body parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


//set static folder
app.use(express.static(path.join(__dirname, 'public')));


// express session middleware
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// passport init 
app.use(passport.initialize());
app.use(passport.session());


// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    const namespace = param.split('.');
    const root = namespace.shift();
    const formParam = root;
    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg, 
      value
    };
  }
}));
  

// connect flash middleware
app.use(flash());


// global vars
app.use(function(req,res,next){
  res.locals.success_msg =req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', routes);
app.use('/users', users);


// set port
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
  console.log('server on ' + app.get('port'));
})




