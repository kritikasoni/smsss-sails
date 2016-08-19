/**
 * Room.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'rooms',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      columnName: 'room_id',
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    name: {
      columnName: 'room_name',
      type: 'string',
      required: true,
      unique: true,
      minLength: 2,
      maxLength: 32
    }

  },
  validationMessages: {
    name: {
      unique: 'Sorry,this room is already taken',
      minLength: 'Name should be from 2 to 32 characters',
      maxLength: 'Name should be from 2 to 32 characters',
      required: 'Name is required'
    },
  }
};
