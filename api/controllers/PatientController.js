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
  },
  searchByIdCardNoAndNotInQueue: (req,res) => {
    let query = {
      idCardNo: {
        'contains' : req.params.idCardNo
      }
    };
    if(!req.params.idCardNo){
      query = {}
    }
    Patient.find(query)
      .then(patients => { // filter patient that has queue out
        const promises = patients.map( patient => {
          return QueueService
            .findByPatientId(patient.id)
            .then(queue => {
              if(!queue){
                return patient
              }
              else{
                return null;
              }
            })
            .catch(err => {
              sails.log.error(err);
              return null;
            })
        });
        Promise.all(promises).then(patientWithNoQueue => {
          Promise.all(patientWithNoQueue.filter(patient => patient)).then(notNullPatient => {
            return res.ok(notNullPatient);
          });
        });
      })
      .catch(err => res.badRequest(err));
  }
};
