
var request = require('supertest');
const assert = require('chai').assert;
describe('PositionController', function() {
let positionId;
  describe('#find()', function () {
    it('should return positions', function (done) {
      const positionList = [
        //DOCTOR 15
        {name: 'Accidents and Emergency consultant'},
        {name: 'Anesthesia consultant'},
        {name: 'Cardiology consultant'},
        {name: 'Ear nose and throat consultant'},
        {name: 'Gastroenterology consultant'},
        {name: 'General surgery consultant'},
        {name: 'Genitourinary consultant'},
        {name: 'Gynaecology consultant'},
        {name: 'Haematology consultant'},
        {name: 'Microbiology consultant'},
        {name: 'Nephrology consultant'},
        {name: 'Neurology consultant'},
        {name: 'Nutrition and dietetics consultant'},
        {name: 'Orthopaedics consultant'},
        {name: 'Radiotherapy consultant'},
        //NURSE 9
        {name: 'Case Manager'},
        {name: 'Certified Nurse Midwife'},
        {name: 'Clinical Nurse Specialist'},
        {name: 'Director/CEO'},
        {name: 'Manager/Administrator'},
        {name: 'Nurse Anesthetist'},
        {name: 'Nurse Educator'},
        {name: 'Nurse Practitioner'},
        {name: 'Staff Nurse'}
      ];
      request(sails.hooks.http.app)
        .get('/positions')
        .expect(200)
        .end(function (err, res) {
          const result = res.body.map(data => _.omit(data, 'id'));
          assert.typeOf(res.body, 'array');
          assert.sameDeepMembers(result, positionList);
          assert.lengthOf(res.body, 24, 'position should have a length of 24');
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
    it('should create a position', function (done) {
      const position = {name: 'Pulmonology consultant'};
      request(sails.hooks.http.app)
        .post('/positions')
        .send(position)
        .type('json')
        .expect(201)
        .end(function (err, res) {
          positionId = res.body.id;
          const result = _.omit(res.body, 'id');
          assert.typeOf(result, 'object');
          assert.deepEqual(result, position);

          if (err) {
            console.error('[!] ', err);
            console.error(res.body.invalidAttributes);
            done(err);
          }
          else done(null, res);
        });
    });

    it('should not create a position if name length is less than 3', function (done) {
      const position = {name: 'Ac'};
      request(sails.hooks.http.app)
        .post('/positions')
        .send(position)
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
    it('should not create a position if name length is more than 64', function (done) {
      const position = {name: 'Accidents and Emergency clinical nurse specialist and practitioner'};
      request(sails.hooks.http.app)
        .post('/positions')
        .send(position)
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
    it('should not create a position if position name is not filled', function (done) {
      const position = {name: ''};
      request(sails.hooks.http.app)
        .post('/positions')
        .send(position)
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
  describe('#update()', function () {
    it('should update if input is valid', function (done) {
      const position = {id: positionId, name: 'Neurology specialist'};
      request(sails.hooks.http.app)
        .put('/positions/' + position.id)
        .send(position)
        .type('json')
        .expect(200)
        .end(function (err, res) {
          const result = res.body;
          assert.deepEqual(result, position);

          if (err) {
            console.error('[!] ', err);
            console.error(res.body.invalidAttributes);
            done(err);
          }
          else done(null, res);
        });
    });
  });
  describe('#delete()', function () {
    it('should delete if input is valid', function (done) {
      const positionId = 1;
      request(sails.hooks.http.app)
        .delete('/positions/' + positionId)
        .expect(200)
        .end(function (err, res) {
          const result = res.body;
          assert.isOk(result);
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


