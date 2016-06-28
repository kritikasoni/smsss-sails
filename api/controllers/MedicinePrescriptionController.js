'use strict';
/**
 * medicinePrescriptionController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findAll: (req,res) => {
    MedicinePrescription
      .find()
      .populateAll()
      .then(medicinesPrescriptions => res.json(medicinesPrescriptions))
      .catch(err => res.ok(err));
  },
  findById: (req,res) => {
    medicinePrescription
      .findOne({id:req.params.id}).populateAll()
      .then(medicinePrescription => res.json(medicinesPrescriptions))
      .catch(err => res.ok(err));
  },

  create: function (req, res) {
    let medicinePrescription = req.body;
    medicinePrescription
      .create(medicinePrescription)
      .then(medicinePrescription => medicinePrescription.findOne({id:medicinePrescription.id}).populateAll())
      .then(medicinePrescription => res.created(medicinePrescription))
      .catch(err => res.badRequest(err));
  },

  update: function (req, res) {
    medicinePrescription
      .update({id:req.params.id}, req.body, (err, updated) => {
        if(err) return res.json(err);
        return res.ok(updated);
      });
  },
  delete: function (req,res){
    medicinePrescription.destroy({id:req.params.id})
      .then(() => res.json({message:'success'}))
      .catch(err => res.badRequest(err));
  }
};


