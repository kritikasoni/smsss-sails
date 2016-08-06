var request = require('supertest');
const assert = require('chai').assert;
const moment = require('moment');

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
  describe('#searchByRoom()', function() {
    it('should return all queue in the room', function (done) {
      const roomId = '1';
      const queueList = [
        {
          patient: {id:1} ,
          room: {id:1},
          time: moment('2016-06-06').toString()
        }
      ];
      request(sails.hooks.http.app)
        .get('/queues/searchByRoom/' + roomId)
        .expect(200)
        .end(function(err, res) {
          const result = res.body.map(data => _.omit(data,'id'));
          assert.typeOf(res.body, 'array');
          assert.equal(result[0].room.id, queueList[0].room.id);
          assert.equal(result[0].patient.id, queueList[0].patient.id);
          assert.lengthOf(res.body, 1, 'queue list should have a length of 1');
          if (err) {
            console.error('[!] ', err);
            console.error(res.body.invalidAttributes);
            done(err);
          }
          else done(null, res);
        });
    });

    it('should fail when room is not exist', function (done) {
      const roomId = '1000';
      request(sails.hooks.http.app)
        .get('/queues/searchByRoom/' + roomId)
        .expect(200)
        .end(function(err, res) {
          const result = res.body;
          assert.typeOf(res.body, 'array');
          assert.sameDeepMembers(result, []);
          assert.lengthOf(res.body, 0, 'queue list should have a length of 0');

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


