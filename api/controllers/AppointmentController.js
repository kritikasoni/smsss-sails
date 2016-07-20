/**
 * AppointmentController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  findAllByPatientId :(req, res) => {
    Appointment
      .find({ patient: req.params.id })
      .then(appointments => res.json(appointments))
      .catch(err => res.ok(err));
  },
  update: function (req, res) {
    Appointment
      .update({id:req.params.id}, req.body, (err, updated) => {
        if(err) return res.badRequest(err);
        return res.ok(updated);
      });
  }
};

