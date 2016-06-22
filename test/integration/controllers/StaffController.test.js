var request = require('supertest');

describe('StaffController', function() {

  describe('#create doctor()', function() {
    it('should success when data is correct', function (done) {
      const doctor = {
        firstName: 'Dynaris',
        lastName: 'Tygarion',
        email: 'dt@hotmail.com',
        password: '1234',
        position: 'Orthopedics consultant',
        roleId: '1',
        departmentId:'1'
      };
      try{
        request(sails.hooks.http.app)
          .post('/staff')
          .send(doctor)
          .expect(201,done);
      }
      catch(e){
        console.log(e);
      }
    });
  });

});

