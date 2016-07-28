
/**
 * Medicine_prescription.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'medicines_prescriptions',
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
      type: 'float',
      required : true ,

    },
    timeToTake: {
      columnName: 'fk_medPres_timeToTake',
      type: 'string',
      required : true ,
      minLength: 3,
      maxLength: 256

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
  }
};


