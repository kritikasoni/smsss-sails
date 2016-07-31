var request = require('supertest');
const assert = require('chai').assert;
describe('MedicineController', function() {

  describe('#find()', function() {
    it('should return list of medicines', function (done) {
      request(sails.hooks.http.app)
        .get('/medicines')
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
  describe('#create medicine()', function() {
    it('should success when data is correct', function (done) {
      const medicine = {
        scientificName: 'Amoxicillin',
        informalName: 'ยาฆ่าเชื้อ',
        image: 'http://d3atbsy0flqavg.cloudfront.net/v1.13.3/site/uri/msjessica.silk.co/file/id/50cf4f11-cd7c-4836-a164-700e61758af6/',
        detail:'used for killing bacteria'
      };
      request(sails.hooks.http.app)
        .post('/medicines')
        .send(medicine)
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

    it('should fail some information is not filled', function (done) {
      const medicine = {
        scientificName: '',
        informalName: 'ยาฆ่าเชื้อ',
        image: 'https://www.google.co.th/search?q=amoxicillin&espv=2&biw=1366&bih=667&tbm=isch&imgil=UdpaEVG5i7PQwM%253A%253BQHvyE3rbVHydzM%253Bhttp%25253A%25252F%25252Fmsjessica.silk.co%25252Fpage%25252FAmoxicillin&source=iu&pf=m&fir=UdpaEVG5i7PQwM%253A%252CQHvyE3rbVHydzM%252C_&usg=__FPnQuKOqoW5HY2_LiyU3ND1TqK4%3D&ved=0ahUKEwjS_9vn78rNAhWIN48KHSBlAOEQyjcILA&ei=yoFyV9LyKYjvvASgyoGIDg#imgrc=UdpaEVG5i7PQwM%3A',
        detail: 'Used for killing bacteria',
      };
        request(sails.hooks.http.app)
        .post('/medicines')
        .send(medicine)
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

    it('should fail when scientific name format is incorrect', function (done) {
      const medicine = {
        scientificName: 'Am',
        informalName: 'ยาฆ่าเชื้อ',
        image: 'http://d3atbsy0flqavg.cloudfront.net/v1.13.3/site/uri/msjessica.silk.co/file/id/50cf4f11-cd7c-4836-a164-700e61758af6/',
        detail:'used for killing bacteria'
      };
      request(sails.hooks.http.app)
        .post('/medicines')
        .send(medicine)
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
    it('should fail when informal name format is incorrect', function (done) {
      const medicine = {
        scientificName: 'Amoxicillin',
        informalName: 'ยา',
        image: 'http://d3atbsy0flqavg.cloudfront.net/v1.13.3/site/uri/msjessica.silk.co/file/id/50cf4f11-cd7c-4836-a164-700e61758af6/',
        detail:'used for killing bacteria'
      };
      request(sails.hooks.http.app)
        .post('/medicines')
        .send(medicine)
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

    it('should fail when url is invalid', function (done) {
      const medicine = {
        scientificName: 'Amoxicillin',
        informalName: 'ยาฆ่าเชื้อ',
        image: 'fewgtjrjyuddew',
        detail:'used for killing bacteria'
      };
      request(sails.hooks.http.app)
        .post('/medicines')
        .send(medicine)
        .type('json')
        .expect(400)

        .end(function(err, res) {
          if (err) {
            const result = res.body.Errors;
            assert.isOk(result.name);
            console.error('[!] ', err);
            console.error(res.body.invalidAttributes);
            done(err);
          }
          else done(null, res);
        });
    });
    it('should fail when detail format is incorrect', function (done) {
      const medicine = {
        scientificName: 'Amoxicillin',
        informalName: 'ยาฆ่าเชื้อ',
        image: 'http://d3atbsy0flqavg.cloudfront.net/v1.13.3/site/uri/msjessica.silk.co/file/id/50cf4f11-cd7c-4836-a164-700e61758af6/',
        detail:'ba'
      };
      request(sails.hooks.http.app)
        .post('/medicines')
        .send(medicine)
        .type('json')
        .expect(400)
        .end(function(err, res) {
          if (err) {
            const result = res.body.Errors;
            assert.isOk(result.name);
            console.error('[!] ', err);
            console.error(res.body.invalidAttributes);
            done(err);
          }
          else done(null, res);
        });
    });
  });

});



