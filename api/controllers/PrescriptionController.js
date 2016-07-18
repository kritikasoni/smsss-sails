'use strict';
/**
 * PrescriptionController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findAll: (req,res) => {
    Prescription
      .find()
      .populateAll()
      .then(prescriptions => res.json(prescriptions))
      .catch(err => res.serverError(err));
  },
  findById: (req,res) => {
    Prescription
      .findOne({id:req.params.id}).populateAll()
      .then(prescription => res.json(prescription))
      .catch(err => res.badRequest(err));
  },
  findAllByPatientId :(req, res) => {
    Prescription
      .find({ patient: req.params.id })
      .populateAll()
      .then(prescriptions => res.json(prescriptions))
      .catch(err => res.badRequest(err));
  },
  create: function (req, res) {
    let prescription = req.body;
    Staff
      .findOne({id:req.body.doctor})
      .then(doctor => {
        if(!doctor) throw new Error('Doctor not found');
        return doctor;
      })
      .then(() => {
        Patient.findOne({id:req.body.patient}).then(patient => {
          if(!patient) throw new Error('Patient not found');
          return patient;
        })
      })
      .then(() => Prescription.create(prescription))
      .then(prescription => Prescription.findOne({id:prescription.id}).populateAll())
      .then(prescription => res.created(prescription))
      .catch(err => res.badRequest(err));
  },

  update: function (req, res) {
    Prescription
      .update({id:req.params.id}, req.body, (err, updated) => {
        if(err) return res.json(err);
        return res.ok(updated);
      });
  },
  delete: function (req,res){
    Prescription.destroy({id:req.params.id})
      .then(() => res.json({message:'success'}))
      .catch(err => res.badRequest(err));
  }
};


