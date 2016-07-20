var request = require('supertest');

describe('DoctorController', function() {

  describe('#create doctor()', function() {
    it('should success when data is correct', function (done) {
      const doctor = {
        firstName: 'Kritika',
        lastName: 'Soni',
        email: 'ks@hotmail.com',
        password: '123456',
        position: 'Orthopedics consultant',
        role: '1',
        department:'1'
      };
      request(sails.hooks.http.app)
        .post('/doctors')
        .send(doctor)
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
      const doctor = {
        firstName: 'Kritika',
        lastName: 'Soni',
        email: 'dt@hotmail.com',
        password: '123',
        position: 'Orthopedics consultant',
        role: '1',
        department:'1'
      };
      request(sails.hooks.http.app)
        .post('/doctors')
        .send(doctor)
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


