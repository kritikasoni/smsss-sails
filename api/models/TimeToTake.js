/**
 * Symptom.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'TimesToTake',
  attributes: {
    id: {
      columnName: 'timeToTake_id',
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    period: {
      columnName: 'ttt_period',
      type: 'string',
      required : true ,
      minLength: 3,
      maxLength: 64
    },
    
  }
};


