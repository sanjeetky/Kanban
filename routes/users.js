var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
const url='mongodb+srv://Sanjeet:Sanjeet@cluster0-5et2v.mongodb.net/test?retryWrites=true&w=majority';
var User = require('../models/user');
/* GET users listing. */
var passport = require('passport');
router.route('/')
.post((req, res, next) => {
  User.find({username:req.body.username})
  .then((item)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(item);
  },err=>console.log(err))
  .catch(err=>console.log(err));
  
});





router.post('/signup', (req, res, next) => {
 // console.log(req.body)
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      //res.json({err: err});
      res.json({status:"err"})
           }
    else   {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
         req.session.username=req.body.username;

        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
          });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.body)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  req.session.username=req.body.username;
  res.json({success: true, status: 'You are successfully logged in!'});

});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
     res.json({status:"hello"});
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.get('/session',(req,res)=>{
  res.send(req.session)
})



module.exports = router;
