/**
 * Queue.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'queues',
  attributes: {
    id: {
      columnName: 'queue_id',
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    time: {
      columnName: 'fk_queue_time',
      type: 'dateTime',
      required : true,
    },
    patient:{
      columnName: 'fk_queue_patient',
      model:'patient',
      required : true
    },
    room:{
      columnName: 'fk_queue_room',
      model:'room',
      required : true
    },
    status: {
      columnName: 'fk_queue_status',
      model: 'queueStatus',
      required: false,
      defaultsTo: function () {
        return 1; // suppose that 1 is waiting status
      }
    }
  },
  validationMessages: {
    time: {
      required: 'Time is required'
    },
    patient: {
      required: 'Patient is required'
    },
    room: {
      required: 'Room is required'
    }

  }
};


