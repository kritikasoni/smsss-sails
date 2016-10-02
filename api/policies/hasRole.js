'use strict';
/**
 * hasRole
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user which has some role
 *                 Assumes that your request has specified role
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = (roles) => {
  return (req, res, next) => {
    if(req.isSocket) {
      next();
    }
    else{
      if(!req.token) return res.serverError({message: 'token attribute in request is not found'});
      if(roles.some(role => req.token.role === role)) {
        console.log('allow user email:',req.token.email,' role ', req.token.role);
        return next();
      }
      else return res.forbidden({message: 'Forbidden'});
    }
  };
};
