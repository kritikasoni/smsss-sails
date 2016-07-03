'use strict';
/**
 * MedicineController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findAll: (req,res) => {
    Medicine
      .find()
      .populateAll()
      .then(medicines => res.json(medicines))
      .catch(err => res.ok(err));
  },
  findById: (req,res) => {
    Medicine
      .findOne({id:req.params.id}).populateAll()
      .then(medicine => res.json(medicine))
      .catch(err => res.ok(err));
  },

  create: function (req, res) {
    let medicine = req.body;
    Medicine
      .create(medicine)
      .then(medicine => Medicine.findOne({id:medicine.id}).populateAll())
      .then(medicine => res.created(medicine))
      .catch(err => res.badRequest(err));
  },

  update: function (req, res) {
    Medicine
      .update({id:req.params.id}, req.body, (err, updated) => {
        if(err) return res.json(err);
        return res.ok(updated);
      });
  },
  delete: function (req,res){
    Medicine.destroy({id:req.params.id})
      .then(() => res.json({message:'success'}))
      .catch(err => res.badRequest(err));
  }
};

