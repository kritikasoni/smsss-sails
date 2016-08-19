/**
 * Medicine.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'medicines',
  attributes: {
    id: {
      columnName: 'med_id',
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true

    },
    scientificName: {
      columnName: 'med_scientificName',
      type: 'string',
      required : true ,
      unique: true,
      minLength: 3,
      maxLength: 64
    },
    informalName: {
      columnName: 'med_informalName',
      type: 'string',
      // required : true,
      minLength: 3,
      maxLength: 64
    },
    image:{
      columnName: 'med_image',
      type:'string',
      required : true,
      url: true
    },
    detail:{
      columnName: 'med_detail',
      type:'string',
      required : true,
      minLength: 3,
      maxLength: 256
    },

  },
  validationMessages: {
    scientificName: {
      unique: 'Sorry, this medicine is already taken',
      minLength: 'Scientific name should be from 3 to 64 characters',
      maxLength: 'Scientific name should be from 3 to 64 characters',
      required: 'Scientific name is required'
    },
    informalName: {
      minLength: 'Informal name should be from 3 to 64 characters',
      maxLength: 'Informal name should be from 3 to 64 characters',

    },
    image: {
      url: "Image should be a valid url",
      required: 'Image is required'
    },
    detail: {
      minLength: 'Detail name should should be from 3 to 256 characters',
      maxLength: 'Detail name should should be from 3 to 256 characters',
      required: 'Detail name is required'
    }
  }
};

