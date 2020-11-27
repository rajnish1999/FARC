const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user');

passport.use(
    new LocalStrategy({ usernameField: 'email' },(email, password, done) => {
        User.findOne({email: email}).then((user) =>{
            if(!user){
                return done(null, false,{message: 'Email not registered'})
            }
            if(user.password!=password){
                return done(null,false,{message: 'Wrong Password'})
            }
            done(null,user)

        }).catch((err)=>{
            done(err)
        })
    })
)

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user, done)=>{
        done(err, user);  
})

module.exports=passport