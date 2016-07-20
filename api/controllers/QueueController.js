/**
 * QueueController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findAll: (req,res) => {
    Queue
      .find()
      .then(queues => res.ok(queues))
      .catch(err => res.serverError(err));
  },
};
