var request = require('supertest');
const assert = require('chai').assert;
describe('DepartmentController', function() {

  describe('#find()', function() {
    it('should return list of departments', function (done) {
      const departmentList = [
        { name: 'Accidents and Emergency' },
        { name: 'Anesthesia' },
        { name: 'Cardiology' },
        { name: 'Ear nose and throat' },
        { name: 'Gastroenterology' },
        { name: 'General surgery' },
        { name: 'Genitourinary' },
        { name: 'Gynaecology' },
        { name: 'Gastroenterology' },
        { name: 'Haematology' },
        { name: 'Microbiology' },
        { name: 'Nephrology' },
        { name: 'Neurology' },
        { name: 'Nutrition and dietetics' },
        { name: 'Orthopaedics' },
        { name: 'Radiotherapy' },
        { name: 'Urology' }
      ];
      request(sails.hooks.http.app)
        .get('/departments')
        .expect(200)
        .end(function(err, res) {
          const result = res.body.map(data => _.omit(data,'id'));
          assert.typeOf(res.body, 'array');
          assert.sameDeepMembers(result, departmentList);
          assert.lengthOf(res.body, 17, 'department should have a length of 17');
          if (err) {
            console.error('[!] ', err);
            console.error(res.body.invalidAttributes);
            done(err);
          }
          else done(null, res);
        });
    });
  });

  describe('#create()', function() {
    it('should create a department', function (done) {
      const department = { name: 'Occupational therapy' };
      request(sails.hooks.http.app)
        .post('/departments')
        .send(department)
        .type('json')
        .expect(201)
        .end(function(err, res) {
          const result = _.omit(res.body, 'id');
          assert.typeOf(result, 'object');
          assert.deepEqual(result, department);
          if (err) {
            console.error('[!] ', err);
            console.error(res.body.invalidAttributes);
            done(err);
          }
          else done(null, res);
        });
    });

    
      it('should not create a department if department name is not filled', function (done) {
        const department = { name: '' };
        request(sails.hooks.http.app)
          .post('/departments')
          .send(department)
          .type('json')
          .expect(201)
          .end(function(err, res) {
            const result = _.omit(res.body, 'id');
            assert.typeOf(result, 'object');
            assert.deepEqual(result, department);
            if (err) {
              console.error('[!] ', err);
              console.error(res.body.invalidAttributes);
              done(err);
            }
            else done(null, res);
          });
      });
    it('should not create a department if name length is less than 2', function (done) {
      const department = { name: 'O' };
      request(sails.hooks.http.app)
        .post('/departments')
        .send(department)
        .type('json')
        .expect(400)
        .end(function(err, res) {
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
    it('should not create a department if name length is more than 64', function (done) {
      const department = { name: 'Obstetrics and gynaecology units for antenatal and postnatal care' };
      request(sails.hooks.http.app)
        .post('/departments')
        .send(department)
        .type('json')
        .expect(400)
        .end(function(err, res) {
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

