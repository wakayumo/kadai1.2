var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const connection = require('../db');
const authCheck = require('../authCheck');
const getConnection = require('typeorm');
const Users = require('../entity/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', authCheck,function(req,res,next){
  res.render('users/create',{error: ''});
});

router.get('/update',authCheck, function(req,res,next){
  res.render('users/update',{error: ''});
});

router.get('/delete',authCheck, function(req,res,next){
  res.render('users/delete',{error: ''});
});

router.post('/create',authCheck,async function(req,res,next){
  const newUser = {
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
    mailaddress: req.body.mailaddress,
  };
  console.log(newUser);
  (await connection)
    .getRepository('users')
    .save(newUser)
    .then((savedUser) => {
      console.log(savedUser);
      res.redirect('/');
    })
    .catch(error => {
      console.log(error)
      res.render('users/create',{error});
    });
})

router.post('/update',authCheck,async function(req,res,next){
  const newUser = {
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('hex'),
    mailaddress: req.body.mailaddress,
  };
  console.log(newUser);
  (await connection)
    .getRepository('users')
    .update
    /*(
      {username:() => req.body.username},
      {mailaddress:() => req.body.mailaddress},
      {password:() => crypto.createHash('sha256').update(req.body.password).digest('hex')}
    )*/
    (
      {username: req.body.username},
      {mailaddress: req.body.mailaddress},
      {password: crypto.createHash('sha256').update(req.body.password).digest('hex')}
    )
    .then((savedUser) => {
      console.log(savedUser);
      res.redirect('/');
    })
    //.update({username:'hoge'},{mailaddress:'ddddd'})
    /*.then((savedUser) => {
      console.log(savedUser);
      res.redirect('/');
    })*/
    /*(
      {username:() => req.user.username},
      {mailaddress:() => req.body.mailaddress},
      {password:() => crypto.createHash('sha256').update(req.body.password).digest('hex')}
    )*/
    /*.getRepository('users')
    .save(newUser)
    .then((savedUser) => {
      console.log(savedUser);
      res.redirect('/');
    })*/
    .catch(error => {
      console.log(error)
      res.render('users/update',{error});
    });
})

router.post('/delete',authCheck,async function(req,res,next){
  //console.log(newUser);
  (await connection)
  .getRepository('users')
  .delete({username: req.user.username})
    /*.then((savedUser) => {
      console.log(savedUser);
      res.redirect('/');
    })*/
    /*(
      {username:() => req.user.username},
      {mailaddress:() => req.body.mailaddress},
      {password:() => crypto.createHash('sha256').update(req.body.password).digest('hex')}
    )*/
    .then((savedUser) => {
      console.log(savedUser);
      res.redirect('/');
    })
    .catch(error => {
      console.log(error)
      res.render('users/delete',{error});
    })
    req.user.username <= null;
})

module.exports = router;