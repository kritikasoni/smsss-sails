'use strict';
/**
 * MedicineController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  searchByScientificName: (req, res) => {
    Medicine.find({
      scientificName: {
        'contains': req.params.keyword
      }
    }).then(medicines => {
      return res.ok(medicines);
    })
      .catch(err => res.badRequest(err));
  },
  searchByInformalName: (req, res) => {
    Medicine.find({
      informalName: {
        'contains': req.params.keyword
      }
    }).then(medicines => {
      return res.ok(medicines);
    })
      .catch(err => res.badRequest(err));
  }
};
