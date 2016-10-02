var request = require('supertest');
const assert = require('chai').assert;
describe('DoctorController', function() {
  describe('#find()', function() {
    it('should return list of doctors', function (done) {
      request(sails.hooks.http.app)
        .get('/doctors')
        .expect(200)
        .end(function (err, res) {
          console.log(res.body);
          //assert
          if (err) {
            console.error('[!] ', err);
            console.error(res.body.invalidAttributes);
            done(err);
          }
          else done(null, res);
        });
    });
  });
  describe('#create doctor()', function() {
    it('should success when data is correct', function (done) {
      const doctor = {
        firstName: 'Kritika',
        lastName: 'Soni',
        email: 'kittysn94@gmail.com',
        password: 'docKritikaS',
        position: '14',
        role: '2',
        department:'16'
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

    it('should fail when some information is not filled', function (done) {
      const doctor = {
        firstName: 'Kritika',
        lastName: 'Soni',
        email: 'kittysn94@gmail.com',
        password: '',
        position: 'Orthopeadics consultant',
        role: '2',
        department:'16'
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
    it('should fail when first name format is incorrect', function (done) {
      const doctor = {
        firstName: 'Ks',
        lastName: 'Soni',
        email: 'kittysn94@gmail.com',
        password: 'docKritikaS',
        position: 'Orthopeadics consultant',
        role: '2',
        department:'16'
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
    it('should fail when last name format is incorrect', function (done) {
      const doctor = {
        firstName: 'Kritika',
        lastName: 'S',
        email: 'kittysn94@gmail.com',
        password: 'docKritikaS',
        position: 'Orthopeadics consultant',
        role: '2',
        department:'16'
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
    it('should fail when email is already taken', function (done) {
      const doctor = {
        firstName: 'Kritika',
        lastName: 'Soni',
        email: 'kittysn94@gmail.com',
        password: 'docKritikaS',
        position: 'Orthopeadics consultant',
        role: '2',
        department:'16'
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
    it('should fail when password format is incorrect', function (done) {
      const doctor = {
        firstName: 'Kritika',
        lastName: 'Soni',
        email: 'kittysn94@gmail.com',
        password: 'docK',
        position: 'Orthopeadics consultant',
        role: '2',
        department:'16'
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

  // describe('#update doctor()', function() {
  //   it('should success when data is correct', function (done) {
  //     const doctor = {
  //       firstName: 'Kritika',
  //       lastName: 'Soni',
  //       email: 'ks@hotmail.com',
  //       password: '123456',
  //       position: 'Orthopedics consultant',
  //       role: '1',
  //       department:'1'
  //     };
  //     request(sails.hooks.http.app)
  //       .put('/doctors/'+doctor.id)
  //       .send(doctor)
  //       .type('json')
  //       .expect(201)
  //       .end(function(err, res) {
  //         if (err) {
  //           console.error('[!] ', err);
  //           console.error(res.body.invalidAttributes);
  //           done(err);
  //         }
  //         else done(null, res);
  //       });
  //   });
  //
  //   it('should fail when data is incorrect', function (done) {
  //     const doctor = {
  //       firstName: 'Kritika',
  //       lastName: 'Soni',
  //       email: 'dt@hotmail.com',
  //       password: '123',
  //       position: 'Orthopedics consultant',
  //       role: '1',
  //       department:'1'
  //     };
  //     request(sails.hooks.http.app)
  //       .post('/doctors')
  //       .send(doctor)
  //       .type('json')
  //       .expect(400)
  //       .end(function(err, res) {
  //         if (err) {
  //           console.error('[!] ', err);
  //           console.error(res.body.invalidAttributes);
  //           done(err);
  //         }
  //         else done(null, res);
  //       });
  //   });
  // });

});


