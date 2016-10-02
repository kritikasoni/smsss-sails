/**
 * PatientController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  searchByIdCardNo: (req,res) => {
    Patient.find({
      idCardNo: {
        'contains' : req.params.idCardNo
      }
    }).then(patients => {
      return res.ok(patients);
    })
      .catch(err => res.badRequest(err));
  }
};
