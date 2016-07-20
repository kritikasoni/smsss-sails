/**
 * Medicine.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'medicines',
  attributes: {
    scientificName: {
      type: 'string',
      required : true ,
      minLength: 3,
      maxLength: 64
    },
    informalName: {
      type: 'string',
     // required : true,
      minLength: 3,
      maxLength: 64
    },
    image:{
      type:'string',
      required : true,
     
    },
    detail:{
      type:'string',
      required : true,
      minLength: 3,
      maxLength: 256
    },
  
  }
};


