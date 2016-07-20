
/**
 * Prescription.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'prescriptions',
  autoUpdatedAt: false,
  attributes: {
    patient:{
      model:'patient',
      required : true
    },
    doctor:{
      model:'staff',
      required : true
    }
  }
};

