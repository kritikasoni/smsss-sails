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
      .catch(err => res.serverError(err));
  },
  findById: (req,res) => {
    MedicinePrescription
      .findOne({id:req.params.id}).populateAll()
      .then(medicinePrescription => res.json(medicinePrescription))
      .catch(err => res.badRequest(err));
  },
  findAllByPrescriptionId : (req, res) => {
    MedicinePrescription
      .find({prescription: req.params.id})
      .then(medicinesPrescriptions => res.json(medicinesPrescriptions))
      .catch(err => res.badRequest(err));
  },
  create: function (req, res) {
    let medicinePrescription = req.body;
    MedicinePrescription
      .create(medicinePrescription)
      .then(medicinePrescription => MedicinePrescription.findOne({id:medicinePrescription.id}).populateAll())
      .then(medicinePrescription => res.created(medicinePrescription))
      .catch(err => res.badRequest(err));
  },

  update: function (req, res) {
    MedicinePrescription
      .update({id:req.params.id}, req.body, (err, updated) => {
        if(err) return res.badRequest(err);
        return res.ok(updated);
      });
  },
  delete: function (req,res){
    MedicinePrescription.destroy({id:req.params.id})
      .then(() => res.json({message:'success'}))
      .catch(err => res.badRequest(err));
  }
};

