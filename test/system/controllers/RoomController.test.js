var request = require('supertest');
const assert = require('chai').assert;
describe('RoomController', function() {

  describe('#find()', function() {
    it('should return rooms', function (done) {
      const roomlist = [
        {name: 'OPD1'},
        {name: 'OPD2'},
        {name: 'OPD3'},
        {name: 'OPD4'},
        {name: 'OPD5'},
        {name: 'OPD6'},
        {name: 'OPD7'},
        {name: 'OPD8'},
        {name: 'OPD9'},
        {name: 'OPD10'},
        {name: 'OPD11'},
        {name: 'OPD12'}
      ]
      request(sails.hooks.http.app)
        .get('/rooms')
        .expect(200)
        .end(function (err, res) {
          const result = res.body.map(data => _.omit(data, 'id'));
          assert.typeOf(res.body, 'array');
          assert.sameDeepMembers(result, roomList);
          assert.lengthOf(res.body, 12, 'room should have a length of 12');
          if (err) {
            console.error('[!] ', err);
            console.error(res.body.invalidAttributes);
            done(err);
          }
          else done(null, res);
        });
    });
  });
      describe('#create()', function () {
        it('should create a room', function (done) {
          const room = {name: 'OPD13'};
          request(sails.hooks.http.app)
            .post('/rooms')
            .send(room)
            .type('json')
            .expect(201)
            .end(function (err, res) {
              const result = _.omit(res.body, 'id');
              assert.typeOf(result, 'object');
              assert.deepEqual(result, room);
              if (err) {
                console.error('[!] ', err);
                console.error(res.body.invalidAttributes);
                done(err);
              }
              else done(null, res);
            });
        });

        it('should not create a room if name length is less than 2', function (done) {
          const room = {name: 'o'};
          request(sails.hooks.http.app)
            .post('/rooms')
            .send(room)
            .type('json')
            .expect(400)
            .end(function (err, res) {
              const result = res.body.Errors;
              assert.isOk(result.name);
              if (err) {
                console.error('[!] ', err);
                console.error(res.body.invalidAttributes);
                done(err);
              }
              else done(null, res);
            });
        });
        it('should not create a room if name length is more than 32', function (done) {
          const room = {name: 'Pain management room for orthopaedics'};
          request(sails.hooks.http.app)
            .post('/rooms')
            .send(room)
            .type('json')
            .expect(400)
            .end(function (err, res) {
              const result = res.body.Errors;
              assert.isOk(result.name);
              if (err) {
                console.error('[!] ', err);
                console.error(res.body.invalidAttributes);
                done(err);
              }
              else done(null, res);
            });
        });
        it('should not create a room if room name is not filled', function (done) {
          const room = {name: ''};
          request(sails.hooks.http.app)
            .post('/rooms')
            .send(room)
            .type('json')
            .expect(400)
            .end(function (err, res) {
              const result = res.body.Errors;
              assert.isOk(result.name);
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


