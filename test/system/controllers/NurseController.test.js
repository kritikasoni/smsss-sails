var request = require('supertest');

describe('NurseController', function() {
  describe('#find()', function() {
    it('should return list of nurses', function (done) {
      request(sails.hooks.http.app)
        .get('/nurses')
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
  describe('#create nurse()', function() {
    it('should success when data is correct', function (done) {
      const nurse = {
        firstName: 'Sophie',
        lastName: 'Turner',
        email: 'SophieT@gmail.com',
        password: 'nurSophieT',
        position: '19',
        role: '3',
        department:'16'
      };
      request(sails.hooks.http.app)
        .post('/nurses')
        .send(nurse)
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
      const nurse = {
        firstName: 'So',
        lastName: 'Turner',
        email: 'SophieT@gmail.com',
        password: 'nurSophieT',
        position: '',
        role: '3',
        department:'16'
      };
      request(sails.hooks.http.app)
        .post('/nurses')
        .send(nurse)
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
      const nurse = {
        firstName: 'So',
        lastName: 'Turner',
        email: 'SophieT@gmail.com',
        password: 'nurSophieT',
        position: '19',
        role: '3',
        department:'16'
      };
      request(sails.hooks.http.app)
        .post('/nurses')
        .send(nurse)
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
      const nurse = {
        firstName: 'Sophie',
        lastName: 'T',
        email: 'SophieT@gmail.com',
        password: 'nurSophieT',
        position: '19',
        role: '3',
        department:'16'
      };
      request(sails.hooks.http.app)
        .post('/nurses')
        .send(nurse)
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
      const nurse = {
        firstName: 'Sophie',
        lastName: 'Turner',
        email: 'SophieT@hotmail.com',
        password: 'nurSophieT',
        position: '19',
        role: '3',
        department:'16'
      };
      request(sails.hooks.http.app)
        .post('/nurses')
        .send(nurse)
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
      const nurse = {
        firstName: 'Sophie',
        lastName: 'Turner',
        email: 'SophieT@gmail.com',
        password: 'nurS',
        position: '19',
        role: '3',
        department:'16'
      };
      request(sails.hooks.http.app)
        .post('/nurses')
        .send(nurse)
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

  // describe('#update nurse()', function() {
  //   it('should success when data is correct', function (done) {
  //     const nurse = {
  //       firstName: 'Kritika',
  //       lastName: 'Soni',
  //       email: 'ks@hotmail.com',
  //       password: '123456',
  //       position: 'Orthopedics consultant',
  //       role: '1',
  //       department:'1'
  //     };
  //     request(sails.hooks.http.app)
  //       .put('/nurses/'+nurse.id)
  //       .send(nurse)
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
  //     const nurse = {
  //       firstName: 'Kritika',
  //       lastName: 'Soni',
  //       email: 'dt@hotmail.com',
  //       password: '123',
  //       position: 'Orthopedics consultant',
  //       role: '1',
  //       department:'1'
  //     };
  //     request(sails.hooks.http.app)
  //       .post('/nurses')
  //       .send(nurse)
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


