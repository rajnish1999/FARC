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
        res.redirect('/')
    }).catch((error) => {
        res.status(400).send(error);
    })
})

router.get('/editUser/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        res.render('editUser',{
            user
        });
    })
})

router.post('/editUser/:id', (req, res) => {
    const updates = Object.keys(req.body);
    console.log(updates);
    User.findById(req.params.id).then((user) => {
        updates.forEach((update) => {
            //here updates contains the keys in the form of string, and also req.body is an object, hence to access the value corresponding to given key, we have applied square bracket because the key is string and to access this keys value , i have to access usin sq. brac., if it would have been normal key, not string one, then simple dot operator would have worked
            user[update] = req.body[update];
        })
        user.save().then(() => {
            res.redirect('/');
        }).catch((e) => {
            console.log(e);
        })
    }).catch((e) => {
        console.log(e);
    })
})

module.exports = router;