/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */

const hasRole = require('./../api/policies/hasRole');
module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions (`true` allows public     *
   * access)                                                                  *
   *                                                                          *
   ***************************************************************************/

  // '*': true,

  /***************************************************************************
   *                                                                          *
   * Here's an example of mapping some policies to run before a controller    *
   * and its actions                                                          *
   *                                                                          *
   ***************************************************************************/
  // RabbitController: {

  // Apply the `false` policy as the default for all of RabbitController's actions
  // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
  // '*': false,

  // For the action `nurture`, apply the 'isRabbitMother' policy
  // (this overrides `false` above)
  // nurture	: 'isRabbitMother',

  // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
  // before letting any users feed our rabbits
  // feed : ['isNiceToAnimals', 'hasRabbitFood']
  // }
  // DoctorController : {
  //   '*' : ['tokenAuth', hasRole(['doctor','admin'])]
  // },
  // AppointmentController : {
  //   '*' : ['tokenAuth', hasRole (['doctor'])],
  //   findAllByPatientId : ['tokenAuth', hasRole (['doctor','patient'])],
  //   update : ['tokenAuth', hasRole (['doctor'])]
  // },
  // AuthenticationController :
  // {
  //   '*' : ['tokenAuth', hasRole (['staff'])],
  //   },
  // DepartmentController : {
  //   '*' : ['tokenAuth', hasRole(['admin'])]
  // },
  // ImageController : {
  //   '*' : ['tokenAuth', hasRole(['admin'])]
  // },
  // MedicineController : {
  //   '*' : ['tokenAuth', hasRole(['admin'])]
  // },
  // MedicinePrescriptionController : {
  //   '*' : ['tokenAuth', hasRole(['doctor','admin'])],
  //   findAll : ['tokenAuth', hasRole (['doctor','admin'])],
  //   findById : ['tokenAuth', hasRole (['doctor','admin'])],
  //   create : ['tokenAuth', hasRole (['admin'])],
  //   update : ['tokenAuth', hasRole (['admin'])],
  //   delete : ['tokenAuth', hasRole (['admin'])]
  // },
  // NurseController : {
  //   '*' : ['tokenAuth', hasRole(['doctor','admin'])]
  // },
  // PatientController : {
  //   '*' : ['tokenAuth', hasRole(['admin'])]
  // },
  // PrescriptionController : {
  //   '*' : ['tokenAuth', hasRole(['doctor','admin'])],
  //   findAll : ['tokenAuth', hasRole (['doctor','admin'])],
  //   findById : ['tokenAuth', hasRole (['doctor','admin'])],
  //   findAllByPatientId : ['tokenAuth', hasRole (['doctor','admin'])],
  //   create : ['tokenAuth', hasRole (['admin'])],
  //   update : ['tokenAuth', hasRole (['admin'])],
  //   delete : ['tokenAuth', hasRole (['admin'])]
  // },
  QueueController : {
    '*' : ['tokenAuth', hasRole(['admin','nurse'])],
    'joinCurrentRoom' : ['tokenAuth', hasRole(['patient'])]
  },
  // RoleController : {
  //   '*' : ['tokenAuth', hasRole(['admin'])]
  // },
  // RoomController : {
  //   '*' : ['tokenAuth', hasRole(['admin'])]
  // },
  // SymptomController : {
  //   '*' : ['tokenAuth', hasRole(['admin','doctor'])]
  // },
};
