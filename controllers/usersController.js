const express = require('express');
const router = express.Router();
const User = require('../models/users.js');


// CREATE //
router.post('/', (req, res) => {
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

// READ //
router.get('/', (req, res) => {
  User.find({}, (err, foundUser) => {
    res.json(foundUser);
  })
})

module.exports = router;
