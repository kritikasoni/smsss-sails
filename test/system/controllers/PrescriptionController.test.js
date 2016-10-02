var request = require('supertest');

describe('PrescriptionController', function() {

  describe('#create prescription()', function() {
    it('should success when data is correct', function (done) {
      const prescription = {
       patient: '1' ,
       doctor: '1'
      };
      request(sails.hooks.http.app)
        .post('/prescriptions')
        .send(prescription)
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
      const prescription = {
        patient: '2' ,
        doctor: '5'
      };
      request(sails.hooks.http.app)
        .post('/prescriptions')
        .send(prescription)
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



