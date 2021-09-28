const {status200,status400,status401,status404,status500} = require('./responseHandler')
const JWTService = require('../service/authService');

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');


// local JWT check
// usually: "Authorization: Bearer [token]" or "token: [token]"
const JWTcheck = (req, res, next) => {
  let tokenToVerify;

  if (req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ');

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
      }
    } else {
      return res.status(401).json({ msg: 'Format for Authorization: Bearer [token]' });
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return status401(res);
  }

  return JWTService().verify(tokenToVerify, (err, thisToken) => {
    if (err) return res.status(401).json({ err });
    req.token = thisToken;
    return next();
  });
};

// auth0 check
const auth0check = (req, res, next) => {
  jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-zpga14zt.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://www.bloom.com/public/user/login',
    issuer: 'https://dev-zpga14zt.us.auth0.com/',
    algorithms: ['RS256']
  })
}

module.exports = JWTcheck
