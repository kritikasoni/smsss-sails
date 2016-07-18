/**
 * Staff.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');
module.exports = {
  tableName: 'staffs',
  attributes: {
    firstName: {
      type: 'string',
      required : true ,
      minLength: 3,
      maxLength: 64
    },
    lastName: {
      type: 'string',
      required : true,
      minLength: 3,
      maxLength: 64
    },
    email:{
      type:'string',
      unique:true,
      required : true,
      email: true
    },
    password:{
      type:'string',
      required : true,
      minLength: 6,
      maxLength: 20
    },
    position:{
      type:'string',
      required : true,
      minLength: 3,
      maxLength: 64
    },
    role:{
      model:'role',
      required : true
    },
    department:{
      model:'department',
      required : true
    },

    verifyPassword: function (password) {
      return bcrypt.compareSync(password, this.password);
    },

    changePassword: function(newPassword, cb){
      this.newPassword = newPassword;
      this.save(function(err, u) {
        return cb(err,u);
      });
    }
  },
  beforeCreate: function(staff, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(staff.password, salt, function(err, hash) {
        if (err) {
          console.error(err);
          cb(err);
        } else {
          staff.password = hash;
          cb();
        }
      });
    });
  },
  beforeUpdate: function (staff, cb) {
    if(staff.newPassword){
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return cb(err);
        bcrypt.hash(staff.newPassword, salt, function(err, hash) {
          if(err) return cb(err);

          delete staff.newPassword;
          staff.password = hash;
          return cb();
        });
      });
    }
    else {
      return cb();
    }
  }
};
