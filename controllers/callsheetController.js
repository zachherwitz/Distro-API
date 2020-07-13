const express = require('express');
const router = express.Router();
const Callsheet = require('../models/callsheet.js')
const User = require('../models/users.js')

// CREATE //
router.post('/', (req, res) => {
  Callsheet.create(req.body, (err, createdCallsheet) => {
    // search for all users on the distribution
    createdCallsheet.allCalled.map((user) => {
      User.findOneAndUpdate({name:user}, {callsheet:{
        callTime: createdCallsheet.generalCallTime,
        location: createdCallsheet.generalLocation
      }}, {new:true}, (err, updatedUser) => {
        console.log(updatedUser);
      })
    })
    // search for individual time/location changes and update
    createdCallsheet.singles.map((singles) => {
      User.findOneAndUpdate({name:singles.name}, {callsheet:{
        callTime: singles.callTime,
        location: singles.location
      }}, {new:true}, (err, updatedUser) => {
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

// TEST CALLSHEET //

// Callsheet.create({
//   projectId: "1",
//   date: "July 12th 2020",
//   episode: "101",
//   day: "1",
//   scriptDraft: "white",
//   generalCallTime: "10:00AM",
//   generalLocation: "Union Square",
//   nearestHospital: "1045 7th Avenue, New York, NY 10009",
//   singles: [
//     {
//       name: "Zach Herwitz",
//       callTime: "10:45AM",
//       location: "Near Union Square"
//     },
//     {
//       name: "Griffin Herwitz",
//       callTime: "11:45AM",
//       location: "By Union Square"
//     }
//   ],
//   // distros: [
//   //   {
//   //     distroName: "Stunt Team",
//   //     callTime: "8:00AM",
//   //     location: "Near Union Square"
//   //   }
//   // ]
// })

// let id = "5f0a9dd149abffc59b16b1ab"
// User.findByIdAndUpdate(id, {name:"NOT ZACH HERWITZ"}, {new:true}, (err, updatedUser) => {
//
// })


module.exports = router;
