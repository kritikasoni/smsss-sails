'use strict';
/**
 * DoctorController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findAll: (req,res) => {
    Role
      .findOne({name:'doctor'})
      .then(role => {
        Staff
          .find({role: role.id})
          .populateAll()
          .then(doctors => res.ok(doctors))
      })
      .catch(err => res.serverError(err));
  },
  findById: (req,res) => {
    Staff
      .findOne({id:req.params.id}).populateAll()
      .then(doctor => res.ok(doctor))
      .catch(err => res.badRequest(err));
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
    const newPassword = req.body.password || undefined;
    let newUser= req.body;
    if(newPassword) {
      newUser.newPassword = newPassword;
    }
    Staff
      .update({id:req.params.id}, newUser, (err, updated) => {
        if(err) return res.badRequest(err);
        Staff
          .findOne({id:req.params.id})
          .populateAll()
          .then(doctor => res.ok(doctor)).catch(error => res.badRequest(error));
      });
  },
  delete: function (req,res){
    Staff.destroy({id:req.params.id})
      .then(() => res.json({message:'success'}))
      .catch(err => res.badRequest(err));
  }
};

