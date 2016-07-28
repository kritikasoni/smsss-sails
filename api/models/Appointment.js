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
    id: {
      columnName: 'app_id',
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    date: {
      columnName: 'app_date',
      type: 'dateTime',
      required : true ,

    },
    room:{
      columnName: 'fk_app_room',
      model:'room',
      required : true
    },
    patient:{
      columnName: 'fk_app_patient',
      model:'patient',
      required : true
    },
    doctor:{
      columnName: 'fk_app_doctor',
      model:'staff',
      required : true
    }
  }
};


