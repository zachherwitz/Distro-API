const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');


// CREATE //
router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    User.find({}, (err, foundUser) => {
      foundUser.password = null;
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
        foundUser.password = null;
        res.json({all:foundUser, updated:updatedUser})
      })
    }
  )
})


// DELETE //
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    User.find({}, (err, foundUser) => {
      foundUser.password = null;
      res.json({all:foundUser, deleted:deletedUser})
    })
  })
})

// READ SPECIFIC BY EMAIL //
router.get('/user/:email', (req, res) => {
  User.find({email: req.params.email}, (error, foundUser) => {
    if(foundUser){
      foundUser.password = null;
      res.json(foundUser)
    } else {
      res.json('something went wrong')
    }
  })
})

// READ SPECIFIC BY NAME //
router.get('/findbyname/:name', (req, res) => {
  User.find({name: req.params.name}, (error, foundUser) => {
    if(foundUser){
      foundUser.password = null;
      res.json(foundUser)
    } else {
      res.json('something went wrong')
    }
  })
})

// READ SPECIFIC BY DEPARTMENT //
router.get('/findbydepartment/:department', (req, res) => {
  User.find({department: req.params.department}, (error, foundUser) => {
    if(foundUser){
      foundUser.password = null;
      res.json(foundUser)
    } else {
      res.json('something went wrong')
    }
  })
})

// READ SPECIFIC BY DISTRO //
router.get('/findbydistro/:distro', (req, res) => {
  User.find({distros: req.params.distro}, (error, foundUser) => {
    if(foundUser){
      foundUser.password = null;
      res.json(foundUser)
    } else {
      res.json('something went wrong')
    }
  })
})

// READ //
router.get('/', (req, res) => {
  User.find({}, (err, foundUser) => {
    foundUser.password = null;
    res.json(foundUser);
  })
})

module.exports = router;
