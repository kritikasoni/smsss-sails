'use strict';
/**
 * AuthenticationController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  staffLogin: (req,res) => {
    AuthenticationService
      .staffLogin(req.body.email, req.body.password)
      .then(token => {
        return res.ok(token);
      })
      .catch(err => res.serverError(err));
  }
};

