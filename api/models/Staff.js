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
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email:{
      type:'string',
      unique:true
    },
    password:{
      type:'string'
    },
    position:{
      type:'string'
    },
    roleId:{
      model:'role'
    },
    departmentId:{
      model:'department'
    }
  }
};

