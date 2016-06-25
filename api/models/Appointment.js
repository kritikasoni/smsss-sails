/**
 * Appointment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'appointments',
  attributes: {
    date: {
      type: 'dateTime',
      required : true ,

    },
    roomId:{
      model:'room',
      required : true
    },
    patientId:{
      model:'patient',
      required : true
    },
    doctorId:{
      model:'staff',
      required : true
    }
  }
};


