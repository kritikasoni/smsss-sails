var request = require('supertest');

describe('SymptomController', function() {

  describe('#find()', function() {
    it('should return 2 roles', function (done) {
      request(sails.hooks.http.app)
        .get('/symptoms')
        .expect(200)
        .end(function(err, res) {
          // console.log(res.body);
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


