var request = require('supertest');

describe('PatientController', function() {
  describe('#find()', function() {
    it('should return list of patients', function (done) {
      request(sails.hooks.http.app)
        .get('/patients')
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

  describe('#create patient()', function() {
    it('should success when all information is correct', function (done) {
      const patient = {
        firstName: 'Chanwit',
        lastName: 'Pingmuang',
        email: 'Chanwit.got7@gmail.com',
        password: 'ilovegot7',
        idCardNo: '3421100456782',
        dob: '1994-08-27T18:44:01.111Z',
        height: '48',
        weight:'175',
        phone:'053445661'
      };
      request(sails.hooks.http.app)
        .post('/patients')
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
    it('should fail when some information is not filled', function (done) {
      const patient = {
        firstName: 'Chanwit',
        lastName: '',
        email: 'Chanwit.got7@hotmail.com',
        password: 'ilovegot7',
        idCardNo: '3421111456782',
        dob: '1994-08-27T18:44:01.111Z',
        height: '48',
        weight:'175',
        phone:'05341'
      };
      request(sails.hooks.http.app)
        .post('/patients')
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
    it('should fail when first name format is incorrect', function (done) {
      const patient = {
        firstName: 'Ca',
        lastName: 'Pingmuang',
        email: 'Chanwit.got7@gmail.com',
        password: 'ilovegot7',
        idCardNo: '3421100456782',
        dob: '1994-08-27T18:44:01.111Z',
        height: '48',
        weight:'175',
        phone:'053445661'
      };
      request(sails.hooks.http.app)
        .post('/patients')
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
    it('should fail when last name format is incorrect', function (done) {
      const patient = {
        firstName: 'Chanwit',
        lastName: 'Pi',
        email: 'Chanwit.got7@gmail.com',
        password: 'ilovegot7',
        idCardNo: '3421100456782',
        dob: '1994-08-27T18:44:01.111Z',
        height: '48',
        weight:'175',
        phone:'053445661'
      };
      request(sails.hooks.http.app)
        .post('/patients')
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
    it('should fail when email is already taken', function (done) {
      const patient = {
        firstName: 'Chanwit',
        lastName: 'Pingmuang',
        email: 'Chanwit.got7@hotmail.com',
        password: 'ilovegot7',
        idCardNo: '3421100456782',
        dob: '1994-08-27T18:44:01.111Z',
        height: '48',
        weight:'175',
        phone:'053445661'
      };
      request(sails.hooks.http.app)
        .post('/patients')
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
    it('should fail when id card number is already taken', function (done) {
      const patient = {
        firstName: 'Chanwit',
        lastName: 'Pingmuang',
        email: 'Chanwit.got7@hotmail.com',
        password: 'ilovegot7',
        idCardNo: '3421111456782',
        dob: '1994-08-27T18:44:01.111Z',
        height: '48',
        weight:'175',
        phone:'053445661'
      };
      request(sails.hooks.http.app)
        .post('/patients')
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
    it('should fail when height format is incorrect', function (done) {
      const patient = {
        firstName: 'Chanwit',
        lastName: 'Pingmuang',
        email: 'Chanwit.got7@hotmail.com',
        password: 'ilovegot7',
        idCardNo: '3421111456782',
        dob: '1994-08-27T18:44:01.111Z',
        height: '0',
        weight:'175',
        phone:'053445661'
      };
      request(sails.hooks.http.app)
        .post('/patients')
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
    it('should fail when weight format is incorrect', function (done) {
      const patient = {
        firstName: 'Chanwit',
        lastName: 'Pingmuang',
        email: 'Chanwit.got7@hotmail.com',
        password: 'ilovegot7',
        idCardNo: '3421111456782',
        dob: '1994-08-27T18:44:01.111Z',
        height: '48',
        weight:'501',
        phone:'053445661'
      };
      request(sails.hooks.http.app)
        .post('/patients')
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
  it('should fail when phone format is incorrect', function (done) {
    const patient = {
      firstName: 'Chanwit',
      lastName: 'Pingmuang',
      email: 'Chanwit.got7@hotmail.com',
      password: 'ilovegot7',
      idCardNo: '3421111456782',
      dob: '1994-08-27T18:44:01.111Z',
      height: '48',
      weight:'175',
      phone:'05341'
    };
    request(sails.hooks.http.app)
      .post('/patients')
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


