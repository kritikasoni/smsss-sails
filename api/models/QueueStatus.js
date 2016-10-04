/**
 * QueueStatus.js
 *
 * @description :: Static status of queue
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'queue_status',
  attributes: {
    id: {
      columnName: 'qs_id',
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    name: {
      columnName: 'qs_name',
      type: 'string',
      required: true ,
      unique: true,
      size: 8
    }
  }
};


