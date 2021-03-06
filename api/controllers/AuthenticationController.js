'use strict';
/**
 * AuthenticationController
 * @description :: Server-side logic for authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  staffLogin: (req,res) => {
    if(!req.body.email || !req.body.password)
      return res.badRequest({message:'email and password are required'});
    AuthenticationService
      .staffLogin(req.body.email, req.body.password)
      .then(result => {
        return res.ok(result);
      })
      .catch(err => {
        return res.badRequest({message:err.message});
      });
  },
  patientLogin: (req,res) => {
    sails.log.info('user', req.body.email,'is logging in');
    if(!req.body.email || !req.body.password)
      return res.badRequest({message:'email and password are required'});
    AuthenticationService
      .patientLogin(req.body.email, req.body.password)
      .then(result => {
        return res.ok(result);
      })
      .catch(err => {
        return res.badRequest({message:err.message});
      });
  }
};
