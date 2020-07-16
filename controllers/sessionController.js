const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');


router.post('/', (req, res) => {
    console.log(req.body)
    User.findOne({ email:req.body.email }, (error, foundUser) => {
        if(foundUser === null){
            console.log(error)
            res.json({
                error :'Email and password combination does not match.'
            });
        } else {
            if(req.body.password = foundUser.password){
                req.session.user = foundUser;
                res.json(foundUser)
            } else {
                console.log(error)
                res.json({
                    error :'Email and password combination does not match.'
                });
            }
        }
    });
});

router.get('/', (req, res) => {
    console.log(req.session)
    res.json("hello!");
});

router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.json({
            destroyed:true
        });
    })
});

module.exports = router;
