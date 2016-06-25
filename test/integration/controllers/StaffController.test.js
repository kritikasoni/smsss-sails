var request = require('supertest');

describe('StaffController', function() {

  describe('#create doctor()', function() {
    it('should success when data is correct', function (done) {
      const doctor = {
        firstName: 'Daenerys',
        lastName: 'Targaryen',
        email: 'dt@hotmail.com',
        password: '123456',
        position: 'Orthopedics consultant',
        roleId: '1',
        departmentId:'1'
      };
      request(sails.hooks.http.app)
        .post('/staff')
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
        firstName: 'Daenerys',
        lastName: 'Targaryen',
        email: 'dt@hotmail.com',
        password: '123',
        position: 'Orthopedics consultant',
        roleId: '1',
        departmentId:'1'
      };
      request(sails.hooks.http.app)
        .post('/staff')
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

