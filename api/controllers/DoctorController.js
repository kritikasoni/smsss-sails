'use strict';
/**
 * DoctorController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findAll: (req,res) => {
    Staff
      .find()
      .populateAll()
      .then(doctors => res.json(doctors))
      .catch(err => res.ok(err));
  },
  findById: (req,res) => {
    Staff
      .findOne({id:req.params.id}).populateAll()
      .then(doctor => res.json(doctor))
      .catch(err => res.ok(err));
  },

  create: function (req, res) {
    Role
      .findOne({name:'doctor'})
      .then(role => {
        let doctor = req.body;
        doctor.role = role.id;
        return Staff.create(doctor)
      })
      .then(doctor => Staff.findOne({id:doctor.id}).populateAll())
      .then(doctor => res.created(doctor))
      .catch(err => res.badRequest(err));
  },

  update: function (req, res) {
    Staff
      .update({id:req.params.id}, req.body, (err, updated) => {
        if(err) return res.badRequest(err);
        return res.ok(updated);
    });
  },
  delete: function (req,res){
    Staff.destroy({id:req.params.id})
      .then(() => res.json({message:'success'}))
      .catch(err => res.badRequest(err));
  }
};

