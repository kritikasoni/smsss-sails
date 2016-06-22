/**
 * Staff.js
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
    roleId:{
      model:'role',
      required : true
    },
    departmentId:{
      model:'department',
      required : true
    }
  }
};

