/**
 * SymptomController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  findAllByPatientId :(req, res) => {
    Symptom
      .find({ patient: req.params.id })
      .then(symptoms => res.json(symptoms))
      .catch(err => res.ok(err));
  },
  update: function (req, res) {
    Symptom
      .update({id:req.params.id}, req.body, (err, updated) => {
        if(err) return res.badRequest(err);
        return res.ok(updated);
      });
  }
};

