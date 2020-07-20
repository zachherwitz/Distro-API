const express = require('express');
const router = express.Router();
const Callsheet = require('../models/callsheet.js')
const User = require('../models/users.js')

// CREATE //
router.post('/', (req, res) => {
  let mappedAllCalled = []
  req.body.callsheet.allCalled.map((called) => {
    let newUserCallsheetObject = {
      userId: called.user._id,
      callTime: called.specCallTime,
      location: called.specLocation
    }
    mappedAllCalled.push(newUserCallsheetObject)
  })

  req.body.callsheet.allCalled = mappedAllCalled;

  Callsheet.create(req.body.callsheet, (err, createdCallsheet) => {
    req.body.allusers.map((user) => {
      User.findByIdAndUpdate(user.userId, {callsheet:{
        callTime: 'Not Called',
        location: 'Not Called'
      }}, {new:true}, (err, updatedUser) => {
        // console.log(updatedUser);
      })
    })
    // search for all users on the distribution
    createdCallsheet.allCalled.map((user) => {
      User.findByIdAndUpdate(user.userId, {callsheet:{
        callTime: user.callTime,
        location: user.location
      }}, {new:true}, (err, updatedUser) => {
        // console.log(updatedUser);
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
