var express = require('express');
const {status200,status400} = require('../utils/responseHandler')
var router = express.Router();
require('../service/init')

const privateRoutes = require('./privateRoutes')
const publicRoutes = require('./publicRoutes')

router.use('/private', privateRoutes)
router.use('/public', publicRoutes)

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success', function(req, res, next) {
  return status200(res)
});

router.get('/failed', function(req, res, next) {
  return status400(res)
});

module.exports = router;
