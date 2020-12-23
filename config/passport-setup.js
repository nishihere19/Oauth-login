const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })

});

passport.use(new googleStrategy({
    //google strategy options
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    //callback 229210129807-nnp0n917c5qs4spmt8u7vnhl0sm0tj1q.apps.googleusercontent.com
    //BT0UU_5QJV87PhSmiQtgunhP
    console.log('callback info');
    console.log(profile);
    User.findOne({ googleID: profile.id }).then((currentUser) => {
        if (!currentUser) {
            new User({
                username: profile.displayName,
                googleID: profile.id
            }).save().then((newUser) => {
                console.log('new user created!', newUser)
                done(null, newUser);
            })
        } else {
            console.log('user already exists!');
            done(null, currentUser);
        }
    })

}))