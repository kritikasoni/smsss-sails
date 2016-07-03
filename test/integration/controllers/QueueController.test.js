var request = require('supertest');

describe('QueueController', function() {

  describe('#create queue()', function() {
    it('should success when data is correct', function (done) {
      const queue = {
        patient: '1' ,
        room: '1',
        time: '2016-06-06'
      };
      request(sails.hooks.http.app)
        .post('/queues')
        .send(queue)
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
      const queue = {
        patient: '' ,
        room: '1',
        time: '2016-006'
      };
      request(sails.hooks.http.app)
        .post('/queues')
        .send(queue)
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



