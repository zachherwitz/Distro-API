const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// CREATE //
router.post('/', (req, res) => {
  // req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    User.find({}, (err, foundUser) => {
      res.json({all:foundUser, created:createdUser})
    })
  })
})

// UPDATE //
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
    (err, updatedUser) => {
      User.find({}, (err, foundUser) => {
        res.json({all:foundUser, updated:updatedUser})
      })
    }
  )
})


// DELETE //
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    User.find({}, (err, foundUser) => {
      res.json({all:foundUser, deleted:deletedUser})
    })
  })
})

// READ SPECIFIC //
router.get('/user/:email', (req, res) => {
  User.find({email: req.params.email, password: req.query.password}, (error, foundUser) => {
    if(foundUser){
      res.json(foundUser)
    } else {
      res.json('something went wrong')
    }
  })
})

// READ //
router.get('/', (req, res) => {
  User.find({}, (err, foundUser) => {
    res.json(foundUser);
  })
})

module.exports = router;
