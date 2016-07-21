'use strict';
/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user which has admin role
 *                 Assumes that your request has admin role
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  if(!req.token) return res.serverError({message: 'token attribute in request is not found'});
  if(req.token.role != 'admin') return res.forbidden({message: 'Forbidden'});
  else return next();
};
