'use strict';
/**
 * MedicineController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const path = require('path');
const fs = require('fs');
module.exports = {
  searchByName: (req, res) => {
    const scientificName = req.param('scientificName');
    const informalName = req.param('informalName');
    Medicine.find({
      or: [
        {
          scientificName: {
            'contains': scientificName
          }
        },
        {
          informalName: {
            'contains': informalName
          }
        }
      ]
    }).then(medicines => {
      return res.ok(medicines);
    })
      .catch(err => res.badRequest(err));
  },
  delete: function (req,res){
    let imagePath = '';
    const medicineImagePath = 'assets/images/medicines';
    Medicine
      .findOne({id:req.params.id})
      .then(medicine => {
        imagePath = medicine.image;
        return Medicine.destroy({id:req.params.id});
      })
      .then(() => {
        const imageName = imagePath.split("/").pop();
        //If image is uploaded here, then delete its image
        if(imagePath.includes(sails.getBaseURL())){
          fs.stat(path.resolve(medicineImagePath,imageName),(err, isFileExist) => {
            if(err) return res.badRequest(err);
            if(isFileExist.isFile()){
              fs.unlink(path.resolve(medicineImagePath,imageName),function(error){
                if(error) return res.badRequest(error);
                else return res.json({message:'success'});
              });
            }
            else {
              return res.json({message:'success'});
            }
          });

        }
        else return res.json({message:'success'});
      })
      .catch(err => res.badRequest(err));
  }
};
