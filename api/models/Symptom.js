/**
 * Symptom.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'symptoms',
  attributes: {
    id: {
      columnName: 'symptom_id',
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    detail: {
      columnName: 'symptom_detail',
      type: 'string',
      required : true ,
      minLength: 3,
      maxLength: 512
    },

    patient:{
      columnName: 'fk_symptom_patient',
      model:'patient',
      required : true
    }
  },

  validationMessages: {
    detail: {
      minLength: 'Detail should be from 3 to 512 characters',
      maxLength: 'Detail should be from 3 to 512 characters',
      required: 'Detail is required',
    },
    patient: {
      required: 'Patient is required',
    },
  }
};


