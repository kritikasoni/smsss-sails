// AuthenticationService.js - in api/services
const jwtSecret = sails.config.authentication.secretKey;
module.exports = {

  // patientLogin: function(email, password) {
  //   //TODO: authenticate patient and staff login
  // },
  staffLogin: function(email, password) {
    return new Promise((resolve, reject) => {
      Staff
        .findOne({email: email}).populateAll()
        .then(staff => {
          if(!staff)
            return reject(new Error('No user found'));
          if(staff.verifyPassword(password)){
            jwt.sign(
              {
                email: staff.email,
                role: staff.role
              },
              jwtSecret,
              {subject: staff.id, expiresIn: '24h'}, function (token) {
                return resolve(token);
              }
            );
          }
        })
        .catch(err => reject(err));
    });
  }

};
