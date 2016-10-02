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
      .populateAll()
      .then(appointments => res.json(appointments))
      .catch(err => res.ok(err));
  },
  create: function (req, res) {
    Appointment
      .create(req.body)
      .then(created => {
        return Appointment.findOne({id:created.id}).populateAll();
      })
      .then(created => res.created(created))
      .catch(err => res.badRequest(err));
  },
  update: function (req, res) {
    Appointment
      .update({id:req.params.id}, req.body, (err, updated) => {
        if(err) return res.badRequest(err);
        Appointment
          .findOne({id:req.params.id})
          .populateAll()
          .then(populatedAppointment => {
            return res.ok(populatedAppointment);
          })
          .catch(err => req.serverError(err));
      });
  }
};
