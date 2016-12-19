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
      maxLength: 20,
      regex: /^[a-zA-Z0-9!@#$%^&*]$/
    },
    position:{
      columnName: 'staff_position',
      required : true,
      model: 'position'
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
  validationMessages: {
    firstName: {
      minLength: 'First name must be longer than 3 characters',
      maxLength: 'First name must be less than 64 characters',
      required: 'First name is required',
    },
    lastName: {
      minLength: 'Last name must be longer than 3 characters',
      maxLength: 'Last name must be less than 64 characters',
      required: 'Last name is required',
    },
    email: {
      unique:'Email is already taken',
      minLength: 'Email must be longer than 3 characters',
      maxLength: 'Email must be less than 64 characters',
      required: 'Email is required',
    },
    password: {
      minLength: 'Password must be longer than 6 characters',
      maxLength: 'Password must be less than 20 characters',
      required: 'Password is required',
      regex: 'Password must consists of a-z,A-Z,0-9 or special character(!@#$%^&*)'
    },
    position: {
      required: 'Position is required',
    },
    role: {
      required: 'Role is required',
    },
    department: {
      required: 'Department is required',
    },
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
        bcrypt.hash(staff.newPassword, salt, null, function(err, hash) {
          if (err) {
            console.error(err);
            cb(err);
          } else {
            staff.password = hash;
            cb();
          }
        });
      });
    }
    else {
      return cb();
    }
  }
};
