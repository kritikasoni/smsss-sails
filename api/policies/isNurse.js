'use strict';
/**
 * isNurse
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user which has nurse role
 *                 Assumes that your request has nurse role
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  if(!req.token) return res.serverError({message: 'token attribute in request is not found'});
  if(req.token.role != 'nurse') return res.forbidden({message: 'Forbidden'});
  else return next();
};
