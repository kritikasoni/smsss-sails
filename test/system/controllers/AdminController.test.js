var request = require('supertest');

describe('AdminController', function() {

  describe('#create admin()', function() {
    it('should success when data is correct', function (done) {
      const admin = {
        firstName: 'Daenerys',
        lastName: 'Targaryen',
        email: 'dt@hotmail.com',
        password: '123456',
        role: '1',
      };
      request(sails.hooks.http.app)
        .post('/admins')
        .send(admin)
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
      const admin = {
        firstName: 'Daenerys',
        lastName: 'Targaryen',
        email: 'dt@hotmail.com',
        password: '123',
        position: 'Orthopedics consultant',
        role: '1',
        department:'1'
      };
      request(sails.hooks.http.app)
        .post('/admins')
        .send(admin)
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

