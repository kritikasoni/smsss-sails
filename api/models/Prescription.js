
/**
 * Prescription.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'prescriptions',
  autoUpdatedAt: false,
  attributes:
  {
    id: {
      columnName: 'pres_id',
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    patient:{
      columnName: 'fk_pres_patient',
      model:'patient',
      required : true
    },
    doctor:{
      columnName: 'fk_pres_doctor',
      model:'staff',
      required : true
    }
  }
};

