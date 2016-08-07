var request = require('supertest');
const mock = require('sails-mock-models');
const assert = require('chai').assert;
const jwtSecret = 'EJPenPee';
const jwt = require('jsonwebtoken');

describe('AuthenticationService', function() {

  describe('#staffLogin()', function() {
    it('should success when data is correct', function (done) {
      const doctor = {
        firstName: 'Kritika',
        lastName: 'Soni',
        email: 'ks@hotmail.com',
        password: '123456',
        position: 'Orthopeadics consultant',
        role: '1',
        department: '1',
        verifyPassword: (password) => true
      };
      mock.mockModel(Staff, 'findOne', doctor);
      AuthenticationService
        .staffLogin(doctor.email,doctor.password)
        .then((result) => {
          assert.notDeepEqual(doctor, result.user);
          jwt.verify(result.token, jwtSecret, function (err, token) {
            if (err) return done(err,result);
            assert.isOk(token);
            done(null, result);
          });

        })
        .catch(err => console.error(err));
    });
  });
});

