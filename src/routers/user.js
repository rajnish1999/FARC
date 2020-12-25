const express = require('express');
const passport = require('../authentication/setupPassport');
const User = require('../models/user');
const router = new express.Router();

router.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        res.status(400).send()
    })
})

router.get('/signUp', (req, res) => {
    res.render('signUp');
})

router.post('/signUp', (req, res) => {
    // const user = new User(req.body);
    const {name, email, password, confirmPass, age, contactNo} = req.body;
    let errors = [];
    if(!name || ! email || !password || !confirmPass || !confirmPass || !age || !contactNo){
        errors.push({msg : "Please enter all the fields"})
    }

    if(password.length < 6){
        errors.push({msg : "password should be atleast 6 in length"})
    }

    if(password != confirmPass){
        errors.push({msg : 'Passwords do not match'})
    }

    if(errors.length > 0){
        res.render('signUp',{
            errors,
            name,
            email,
            password,
            confirmPass, 
            age, 
            contactNo
        })
    }else{
        User.findOne({email : email}).then((user) => {
            if(!user){
                const user = new User(req.body);
                user.save().then(() => {
                    req.flash('success_msg', 'You are now registered and can log in');
                    res.redirect('/login')
                }).catch((err) => {
                    res.status(400).send(err);
                })
            }else{
                errors.push({msg : "email iD already exist"});
                res.render('signUp',{
                    errors, name, email, password, confirmPass, age, contactNo
                })
            }
        }).catch((e) => {
            errors.push(e);
            res.render('signUp',{
                errors, name, email, password, confirmPass, age, contactNo
            })
        })
    }
    
})
router.get('/login',(req, res) => {
    res.render('login');
})

router.post('/login', passport.authenticate('local',{
        successReturnToOrRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true // this is to set flash message
    })
)

router.get('/editUser/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        res.render('editUser',{
            user
        });
    })
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});

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