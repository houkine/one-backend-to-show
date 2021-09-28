
var express = require('express');
var router = express.Router();
const {
    Test,
    User
} = require("../controllers");

// test
router.route('/test').get(Test.TestPublic);

// user
router.route('/user/RegistToLocal').post(User.RegistToLocal);
router.route('/user/RegistToAuth0').post(User.RegistToAuth0);
router.route('/user/EmailLogin').post(User.EmailLogin);


module.exports = router;
