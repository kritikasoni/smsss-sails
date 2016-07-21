'use strict';
/**
 * isDoctor
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user which has doctor role
 *                 Assumes that your request has doctor role
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  if(!req.token) return res.serverError({message: 'token attribute in request is not found'});
  if(req.token.role != 'doctor') return res.forbidden({message: 'Forbidden'});
  else return next();
};
