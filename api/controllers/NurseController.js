'use strict';
/**
 * NurseController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findAll: (req,res) => {
    Staff
      .find()
      .populate('role',{where: { name:'nurse'} })
      .then(nurses => res.json(nurses))
      .catch(err => res.ok(err));
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
    Staff
      .update({id:req.params.id}, req.body, (err, updated) => {
        if(err) return res.badRequest(err);
        return res.ok(updated);
      });
  },
  delete: function (req,res){
    Staff.destroy({id:req.params.id})
      .then(() => res.ok({message:'success'}))
      .catch(err => res.badRequest(err));
  }
};


