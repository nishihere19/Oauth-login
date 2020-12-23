const express = require("express");
const app = express();
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
var mongoose = require('mongoose');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

mongoose.connect('mongodb://localhost/Oauth-login', function(err) {
    var db = mongoose.connection;
    if (err) {
        db.on('error', console.error.bind(console, "MongoDB connection failed"));
    }

    return console.log("Connected to DB");
});
app.set('view engine', 'ejs');
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookie]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home');
});
app.listen(3000, () => {
    console.log("app listening on port 3000!");
});