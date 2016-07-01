/**
 * Appointment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'appointments',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    date: {
      type: 'dateTime',
      required : true ,

    },
    room:{
      model:'room',
      required : true
    },
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

