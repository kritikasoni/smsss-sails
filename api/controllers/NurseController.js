'use strict';
/**
 * NurseController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findAll: (req,res) => {
    Role
      .findOne({name:'nurse'})
      .then(role => {
        Staff
          .find({role: role.id})
          .populateAll()
          .then(nurses => res.json(nurses))
      })
      .catch(err => res.serverError(err));
  },
  findById: (req,res) => {
    Staff
      .findOne({id:req.params.id}).populateAll()
      .then(nurse => res.json(nurse))
      .catch(err => res.ok(err));
  },

  create: function (req, res) {
    Role
      .findOne({name:'nurse'})
      .then(role => {
        let nurse = req.body;
        nurse.role = role.id;
        return Staff.create(nurse)
      })
      .then(nurse => Staff.findOne({id:nurse.id}).populateAll())
      .then(nurse => res.created(nurse))
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
          .then(nurse => res.ok(nurse)).catch(error => res.badRequest(error));
      });
  },
  delete: function (req,res){
    Staff.destroy({id:req.params.id})
      .then(() => res.ok({message:'success'}))
      .catch(err => res.badRequest(err));
  }
};


