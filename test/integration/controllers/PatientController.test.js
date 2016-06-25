var request = require('supertest');

describe('PatientController', function() {

  describe('#create patient()', function() {
    it('should success when data is correct', function (done) {
      const patient = {
        firstName: 'Drogo',
        lastName: 'Khal',
        email: 'dk@hotmail.com',
        password: '123456',
        idCardNo: '1234567890123',
        dob: '2016-06-25T18:44:01.111Z',
        height: '160',
        weight:'56',
        phone:'053112445'
      };
      request(sails.hooks.http.app)
        .post('/patient')
        .send(patient)
        .type('json')
        .expect(201)
        .end(function(err, res) {
          if (err) {
            console.error('[!] ', err);
            console.error(res.body.invalidAttributes);
            
            done(err);
          }
          else done(null, res);
        });
    });

    it('should fail when data is incorrect', function (done) {
      const patient = {
        firstName: 'Drogo',
        lastName: 'Khal',
        email: 'dk@hotmail.com',
        password: '12345',
        dob: '2016-06-26T18:44:01.111Z',
        idCardNo: '123456780123',
        height: '160',
        weight:'56',
        phone:'053112445'
      };
      request(sails.hooks.http.app)
        .post('/patient')
        .send(patient)
        .type('json')
        .expect(400)
        .end(function(err, res) {
          if (err) {
            console.error('[!] ', err);
            console.error(res.body.invalidAttributes);
            done(err);
          }
          else done(null, res);
        });
    });
  });

});


