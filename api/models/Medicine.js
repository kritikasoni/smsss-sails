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
      unique: true,
      primaryKey: true
    },
    scientificName: {
      columnName: 'med_scientificName',
      type: 'string',
      required : true ,
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

    },
    detail:{
      columnName: 'med_detail',
      type:'string',
      required : true,
      minLength: 3,
      maxLength: 256
    },

  }
};


