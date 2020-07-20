const express = require('express');
const router = express.Router();
const Callsheet = require('../models/callsheet.js')
const User = require('../models/users.js')

// CREATE //
router.post('/', (req, res) => {
  let mappedAllCalled = []
  req.body.allCalled.map((called) => {
    let newUserCallsheetObject = {
      userId: called.user._id,
      callTime: called.specCallTime,
      location: called.specLocation,
      date: called.date
    }
    mappedAllCalled.push(newUserCallsheetObject)
  })

  req.body.allCalled = mappedAllCalled;
  console.log('req.body');
  console.log(req.body);
  Callsheet.create(req.body, (err, createdCallsheet) => {

    // search for all users on the distribution
    createdCallsheet.allCalled.map((user) => {
      console.log('user');
      console.log(user);
      User.findByIdAndUpdate(user.userId, {callsheet:{
        callTime: user.callTime,
        location: user.location,
        date: createdCallsheet.date
      }}, {new:true}, (err, updatedUser) => {
        console.log('updatedUser');
        console.log(updatedUser);
      })
    })
    res.json({createdCallsheet})
  })
})

// UPDATE //
router.put('/:id', (req, res) => {
  Callsheet.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
    (err, updatedCallsheet) => {
      Callsheet.find({}, (err, foundCallsheet) => {
        res.json({all:foundCallsheet, updated:updatedCallsheet})
      })
    }
  )
})

// DELETE //
router.delete('/:id', (req, res) => {
  Callsheet.findByIdAndRemove(req.params.id, (err, deletedCallsheet) => {
    Callsheet.find({}, (err, foundCallsheet) => {
      res.json({all:foundCallsheet, deleted:deletedCallsheet})
    })
  })
})

// READ //
router.get('/', (req, res) => {
  Callsheet.find({}, (err, foundCallsheet) => {
    res.json(foundCallsheet)
  })
})

module.exports = router;
