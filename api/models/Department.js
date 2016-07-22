/**
 * Department.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'departments',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK:false,
  attributes: {
    id: {
      columnName: 'dep_id',
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    name:{
      columnName: 'dep_name',
      type:'string',
      required : true,
      minLength: 2,
      maxLength: 128,
      size: 52
    }
  }
};

