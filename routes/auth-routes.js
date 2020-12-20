const router = require('express').Router();
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/logout', (req, res) => {
    res.send('logging out!');
});
router.get('/google', (req, res) => {

    res.send('Logging in with GOOGLE.');
});
module.exports = router;