/**
 * Patient.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');
module.exports = {

  tableName: 'patients',
  attributes: {
    id: {
      columnName: 'patient_id',
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    firstName: {
      columnName: 'patient_firstName',
      type: 'string',
      required : true , //first name should be more than 3 characters and less than 64 characters
      minLength: 3,
      maxLength: 64
    },
    lastName: {
      columnName: 'patient_lastName',
      type: 'string',
      required : true,
      minLength: 3,
      maxLength: 64
    },
    email:{
      columnName: 'patient_email',
      type:'string',
      unique:true,
      required : true,  //sorry, this email is already taken
      email: true
    },
    idCardNo:{
      columnName: 'patient_idCardNo',
      type:'string',
      required : true, //sorry this id is already taken
      unique:true,
      minLength: 13,
      maxLength: 13
    },
    dob:{
      columnName: 'patient_dob',
      type:'date',
      required : true,
      datetime:true,

    },
    weight:{
      columnName: 'patient_weight',
      type:'float',    //weight
      required : true,

      min: 1,
      max: 500
    },
    height:{
      columnName: 'patient_height',
      type:'float',
      required : true,
      finite:true,
      min: 1,
      max: 300
    },
    phone:{
      columnName: 'patient_phone',
      type:'string',
      required : true,
      minLength: 9,
      maxLength: 10
    },
    bloodPressure: {
      columnName: 'patient_bloodPressure',
      type: 'string',
      minLength: 5,
      maxLength: 7,
      regex: /^\d{2,3}\/\d{2,3}$/
    },
    password:{
      columnName: 'patient_password',
      type:'string',
      required : true,
      minLength: 6,
      maxLength: 20
    },
    deviceToken: {
      columnName: 'patient_deviceToken',
      type: 'string',
      required: false,
      defaultsTo: function () {
        return ''; // default to no token
      }
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
      minLength: 'First name should be from 3 to 64 characters',
      maxLength: 'First name should be from 3 to 64 characters',
      required: 'First name is required'
    },
    lastName: {
      minLength: 'Last name should be from 3 to 64 characters',
      maxLength: 'Last name should be from 3 to 64 characters',
      required: 'Last name is required'
    },
    email: {
      unique: 'Sorry, this email is already taken',
      required: 'Email is required'
    },
    idCardNo: {
      unique: 'Sorry, this id card number is already taken',
      minLength: 'Id card number should be 13 characters',
      maxLength: 'Id card number should be 13 characters',
      required: 'Id card number is required'
    },
    dob: {
      required: 'Date of birth is required'
    },
    weight: {
      min: 'Weight should be from 1 kg to 500 kgs',
      max: 'Weight should be from 1 kg to 500 kgs',
      required: 'Weight is required'
    },
    height: {
      min: 'Height should be from 1cm to 300 cm',
      max: 'Height should be from 1cm to 300 cm',
      required: 'Height is required'
    },
    phone: {
      minLength: 'Phone should be from 9 to 10 characters',
      maxLength: 'Phone should be from 9 to 10 characters',
      required: 'Phone is required'
    },
    bloodPressure: {
      minLength: 'Blood pressure should be from 5 to 7 characters for example  120/80',
      maxLength: 'Blood pressure should be from 5 to 7 characters for example  120/80',
      required: 'Blood pressure is required',
      regex: 'Blood pressure must be in format of nnn/nnn. Eg. 120/111'
    },
    password: {
      minLength: 'Password must be longer than 6 characters',
      maxLength: 'Password must be less than 20 characters',
      required: 'Password is required',
    },
  },
  beforeCreate: function(patient, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(patient.password, salt, null, function(err, hash) {
        if (err) {
          console.error(err);
          cb(err);
        } else {
          patient.password = hash;
          cb();
        }
      });
    });
  },
  beforeUpdate: function (patient, cb) {
    if(patient.newPassword){
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return cb(err);
        bcrypt.hash(patient.newPassword, salt, null, function(err, hash) {
          if (err) {
            console.error(err);
            cb(err);
          } else {
            patient.password = hash;
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
