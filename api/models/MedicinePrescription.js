
/**
 * Medicine_prescription.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'medicines_prescriptions',
  autoCreatedAt: false,
  attributes: {
    id: {
      columnName: 'medPres_id',
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    dosage: {
      columnName: 'medPres_dosage',
      type: 'integer',
      required : true ,
    },
    amount: {
      columnName: 'medPres_amount',
      type: 'integer',
      required : false,
      defaultsTo: function () {
        return null;
      }
    },
    isTaking: {
      columnName: 'medPres_is_taking',
      type: 'boolean',
      defaultsTo: function () {
        return true;
      }
    },
    timeToTake: {
      columnName: 'fk_medPres_timeToTake',
      model: 'timeToTake',
      required : true ,
    },
    remark: {
      columnName: 'medPres_remark',
      type: 'string',
      minLength: 3,
      maxLength: 256
      //required : true ,

    },
    medicine:{
      columnName: 'fk_medPres_medicine',
      model:'medicine',
      required : true
    },
    prescription:{
      columnName: 'fk_medPres_prescription',
      model:'prescription',
      required : true
    }
  },
  validationMessages: {
    dosage: {
      required: 'Dosage is required'
    },
    timeToTake: {
      required: 'Time to take is required'
    },
    remark: {
      minLength: 'Remark should be from 3 to 256 characters',
      maxLength: 'Remark should be from 3 to 256 characters'
    },
    medicine: {
      required: 'Medicine name is required'
    },
    prescription: {
      required: 'Prescription is required'
    },
  }
};

