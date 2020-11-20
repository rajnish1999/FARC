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

router.get('/signUp', (req, res) => {
    res.render("signUp",{
        errors:undefined // here i am sending error as a parameter even though it is not needed there, because we have used error in the ejs file to print the error
    });
})
router.post('/signUp', (req, res) => {
    // const user = new User(req.body);
    const {name, email, password, confirmPass, age, contactNo} = req.body;
    let errors = [];
    if(!name || ! email || !password || !confirmPass || !confirmPass || !age || !contactNo){
        errors.push("Please enter all the fields")
    }

    if(password.length < 6){
        errors.push("password should be atleast 6 in length")
    }
    if(errors.length > 0){
        res.render('signUp',{
            errors : errors,
            name, email, password, confirmPass, age, contactNo
        })
    }
    User.findOne({email : email}).then((user) => {
        if(!user){
            const user = new User(req.body);
            user.save().then(() => {
                res.redirect('/')
            }).catch((error) => {
                res.status(400).send(error);
            })
        }else{
            errors.push("email iD already exist");
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

})
router.get('/login',(req, res) => {
    res.render('login',{
        error : ""
    })
})

router.post('/login',(req,res) => {
    const {email, password} = req.body;
    User.findOne({email : email}).then((user) => {
        if(!user){
            res.render('login',{
                error : "user not found"
            });
        }else{
            if(user.password != password){
                res.render('login', {
                    error : "wrong password"
                })
            }else{
                res.render('login', {
                    error : "user found"
                })
            }
        }
    }).catch((e) => {
        res.send(e);
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