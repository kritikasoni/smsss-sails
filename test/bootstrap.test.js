var sails = require('sails');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(15000);

  sails.lift({
    log: {
      level: 'error'
    },
    models: {
      connection: 'localMysqlServer',
      migrate: 'drop'
    }
  }, function(err, server) {
    if(err) console.log(err);
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
