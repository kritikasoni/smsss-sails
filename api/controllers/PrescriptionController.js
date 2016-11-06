'use strict';
/**
 * PrescriptionController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/* global Prescription */
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
      .then(prescriptions => {
        const promises = prescriptions.map(prescription => {
          return new Promise((resolve, reject) => {
            MedicinePrescription
              .find({prescription: prescription.id})
              .populateAll()
              .then(medPres => {
                let newPrescription = Object.assign({},prescription, {medicinePrescription: medPres} );
                return resolve(newPrescription);
              })
              .catch(err => {
                sails.log.error(err);
                let newPrescription = Object.assign({},prescription, {medicinePrescription: []} );
                return resolve(newPrescription);
              })
          })
        });
        return Promise.all(promises)
      })
      .then(prescriptions => {
        prescriptions.sort((prescription1, prescription2) =>
          new Date(prescription2.createdAt) - new Date(prescription1.createdAt)
        );
        return res.ok(prescriptions)
      })
      .catch(err => {
        return res.badRequest(err)
      });
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
      .then(() => {
        return MedicinePrescription.destroy({prescription: req.params.id})
      })
      .then(() => {
        return res.ok({message:'success'});
      })
      .catch(err => res.badRequest(err));
  }
};

