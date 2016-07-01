/**
 * Symptom.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'symptoms',
  attributes: {
    detail: {
      type: 'string',
      required : true ,
      minLength: 3,
      maxLength: 512
    },

    patient:{
      model:'patient',
      required : true
    }
  }
};


