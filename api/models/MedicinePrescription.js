
/**
 * Medicine_prescription.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'medicines_prescriptions',
  attributes: {
    dosage: {
      type: 'float',
      required : true ,

    },
    timeToTake: {
      type: 'string',
      required : true ,
      minLength: 3,
      maxLength: 256

    },
    remark: {
      type: 'string',
      minLength: 3,
      maxLength: 256
      //required : true ,

    },
    medicine:{
      model:'medicine',
      required : true
    },
    prescription:{
      model:'prescription',
      required : true
    }
  }
};


