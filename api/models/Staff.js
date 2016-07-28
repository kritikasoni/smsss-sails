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
    id: {
      columnName: 'staff_id',
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    firstName: {
      columnName: 'staff_firstName',
      type: 'string',
      required : true ,
      minLength: 3,
      maxLength: 64
    },
    lastName: {
      columnName: 'staff_lastName',
      type: 'string',
      required : true,
      minLength: 3,
      maxLength: 64
    },
    email:{
      columnName: 'staff_email',
      type:'string',
      unique:true,
      required : true,
      email: true
    },
    password:{
      columnName: 'staff_password',
      type:'string',
      required : true,
      minLength: 6,
      maxLength: 20
    },
    position:{
      columnName: 'staff_position',
      type:'string',
      required : true,
      minLength: 3,
      maxLength: 64
    },
    role:{
      columnName: 'staff_role',
      model:'role',
      required : true
    },
    department:{
      columnName: 'staff_department',
      model:'department',
      required : true
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
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
      bcrypt.hash(staff.password, salt, null, function(err, hash) {
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
