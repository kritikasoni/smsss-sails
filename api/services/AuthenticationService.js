// AuthenticationService.js - in api/services
const jwtSecret = sails.config.authentication.secretKey;
const jwt = require('jsonwebtoken');
module.exports = {

  patientLogin: function(email, password) {
    return new Promise((resolve, reject) => {
      Patient
        .findOne({email: email}).populateAll()
        .then(patient => {
          if(!patient) return reject(new Error('No user found'));
          if(patient.verifyPassword(password)){
            jwt.sign(
              {
                email: patient.email,
                role: 'patient',
                roleId: null
              },
              jwtSecret,
              {subject: patient.id + '', expiresIn: '24h'}, function (error, token) {
                if(error) return reject(error);
                return resolve({token: token, user: _.omit(patient,'password')});
              }
            );
          }
          else{
            return reject(new Error("Credential(s) is invalid"));
          }
        })
        .catch(err => reject(err));
    });
  },
  staffLogin: function(email, password) {
    return new Promise((resolve, reject) => {
      Staff
        .findOne({email: email}).populateAll()
        .then(staff => {
          if(!staff) return reject(new Error('No user found'));
          if(staff.verifyPassword(password)){
            jwt.sign(
              {
                email: staff.email,
                role: staff.role.name,
                roleId: staff.role.id
              },
              jwtSecret,
              {subject: staff.id + '', expiresIn: '24h'}, function (error, token) {
                if(error) return reject(error);
                return resolve({token: token, user: _.omit(staff,'password')});
              }
            );
          }
          else{
            return reject(new Error("Credential(s) is invalid"));
          }
        })
        .catch(err => reject(err));
    });
  },
  allowId: (req, res, id) => {
    if(!req.token) return res.serverError({message: 'token attribute in request is not found'});
    if(req.token.sub != parseInt(id) ) return res.forbidden({message: 'Forbidden'});
    else return true;
  }

};
