/**
 * Patient.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
      //เพิ่ม password ไหม
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
      columnName: 'patient_bloodpressure',
      type: 'string',
      minLength: 5,
      maxLength: 7
    },
  }
};

