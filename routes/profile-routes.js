const router = require('express').Router();
const authCheck = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}
router.get('/', authCheck, (req, res) => {
    res.send('This is your profile - ', req.user.username);
});
module.exports = router;