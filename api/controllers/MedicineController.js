'use strict';
/**
 * MedicineController
 * @description :: Server-side logic for managing doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  searchByName: (req, res) => {
    const scientificName = req.param('scientificName');
    const informalName = req.param('informalName');
    Medicine.find({
      or: [
        {
          scientificName: {
            'contains': scientificName
          }
        },
        {
          informalName: {
            'contains': informalName
          }
        }
      ]
    }).then(medicines => {
      return res.ok(medicines);
    })
      .catch(err => res.badRequest(err));
  }
};
