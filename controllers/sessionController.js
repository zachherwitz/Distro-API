const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  User.findOne({email:req.body.email}, (err, foundUser) => {
    console.log('found user: ', foundUser);
    if(foundUser === null){
      res.json({
        message: 'Email and password combination does not match'
      })
    } else {
        const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
        console.log("does  password match:", doesPasswordMatch);
         //if it does, set that to session
        if(doesPasswordMatch){
          console.log('password matches');
          req.session.user = foundUser;
          res.json(foundUser)
        } else {
          //otherwise, error message
          res.json({
            message: 'Email and password combination does not match'
          });
        }
    }
  });
});

router.get('/', (req, res) => {
    res.json(req.session.user);
    console.log('hello!');
});

router.delete('/', (req, res) => {
    console.log('goodbye!');
    req.session.destroy(() => {
        res.json({
            destroyed:true
        });
    })
});

module.exports = router;
