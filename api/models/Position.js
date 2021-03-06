/**
 * Position.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'positions',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK:false,
  attributes: {
    id: {
      columnName: 'pos_id',
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    name:{
      columnName: 'pos_name',
      type:'string',
      required : true,
      unique: true,
      minLength: 3,
      maxLength: 64,

    }
  },
  validationMessages: {
    name: {
      unique:'Sorry,this position is already taken',
      minLength: 'Position should be from 3 to 64 characters',
      maxLength: 'Position should be from 3 to 64 characters',
      required: 'Position is required'
    },
  }
};

