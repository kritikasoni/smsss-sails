var request = require('supertest');

describe('SymptomController', function() {
  describe('#create symptom()', function() {
    it('should success when data is correct', function (done) {
      const symptom = {
        detail: 'has problem with the arms',
        patient: '1',
      };
      request(sails.hooks.http.app)
        .post('/symptoms')
        .send(symptom)
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

  });

});


