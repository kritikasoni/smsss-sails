/**
 * Patient.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
    idCardNo:{
      type:'string',
      required : true,
     
      minLength: 13,
      maxLength: 13
    },
    dob:{
      type:'date',
      required : true,
      datetime:true,

    },
    weight:{
      type:'float',
      required : true,
      

      min: 1,
      max: 500
    },
    height:{
      type:'float',
      required : true,
      finite:true,
      min: 1,
      max: 300
    },
    phone:{
      type:'string',
      required : true,
      
      minLength: 9,
      maxLength: 10
    },
  }
};

