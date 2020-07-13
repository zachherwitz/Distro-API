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

// SEED //
router.get('/seed', (req, res) => {
  User.create([
    {
      callsheet: {
        callTime: "",
        location: ""
      },
      department: "Art",
      distros: ["Night Notes", "Produciton Reports", "Director Notes"],
      email: "juniper@juniper.com",
      name: "Juniper Jones",
      phone: "3033034499",
      projectId: "1",
      role: "user"
    },
    {
      callsheet: {
        callTime: "",
        location: ""
      },
      department: "Art",
      distros: ["Night Notes", "Produciton Reports", "Director Notes"],
      email: "aggie@aggie.com",
      name: "Aggie Herwitz",
      phone: "3033034499",
      projectId: "1",
      role: "user"
    },
    {
      callsheet: {
        callTime: "",
        location: ""
      },
      department: "Production",
      distros: ["Tech Scout Itinerary", "Night Notes", "Director Notes"],
      email: "juniper@juniper.com",
      name: "Griffin Herwitz",
      phone: "3033034499",
      projectId: "1",
      role: "user"
    },
    {
      callsheet: {
        callTime: "",
        location: ""
      },
      department: "Locations",
      distros: ["Tech Scout Itinerary", "Production Reports", "Director Notes"],
      email: "juniper@juniper.com",
      name: "Zach Herwitz",
      phone: "3013679821",
      projectId: "1",
      role: "user"
    }
  ])
})


module.exports = router;
