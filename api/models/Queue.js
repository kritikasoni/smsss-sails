/**
 * Queue.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'queues',
  attributes: {
    time: {
      type: 'dateTime',
      required : true,
    },
    patient:{
      model:'patient',
      required : true
    },
    room:{
      model:'room',
      required : true
    }
  }
};


