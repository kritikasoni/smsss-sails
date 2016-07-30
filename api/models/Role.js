/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'roles',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      columnName: 'role_id',
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    name:{
      columnName: 'role_name',
      type:'string',
      required : true,
      unique: true,
    }
  }
};

