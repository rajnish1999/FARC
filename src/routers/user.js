const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        res.status(400).send()
    })
})

router .get('/signUp', (req, res) => {
    res.render("signUp");
})
router.post('/signUp', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

router.patch('/users/:id', (req, res) => {
    
})
module.exports = router;