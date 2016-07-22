/**
 * AppointmentController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = { //auto extend มาจาก sails ซึ่งมีcrud อยู่แล้ว
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

