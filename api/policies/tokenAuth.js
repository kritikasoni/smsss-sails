'use strict';
const jwt = require('jsonwebtoken');
const jwtSecret = sails.config.authentication.secretKey;
/**
 * tokenAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your action has header 'Authorization':'Bearer __token__'
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  let token, scheme;

  if (req.headers && req.headers.authorization) {
    const authorizationValue = req.headers.authorization.split(' ');
    if (authorizationValue.length === 2) {
      scheme = authorizationValue[0];
      if (/^Bearer$/i.test(scheme)) {
        token = authorizationValue[1];
      }
    } else {
      return res.json(401,{message: 'Format is Authorization: Bearer [token]'});
    }
  }
  else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.json(401, {message: 'No Authorization header was found'});
  }

  jwt.verify(token, jwtSecret, function (err, token) {
    if (err) return res.json(401,{message: 'Invalid Token! Please login again'});
    req.token = token; // This is the decrypted token or the payload you provided
    sails.log.info('user',token.email,' make a request');
    next();
  });

};
