/**
 * TimeToTakeController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  findAll :(req, res) => {
    TimeToTake
      .find({})
      .then(timeToTakes => res.ok(timeToTakes))
      .catch(err => res.serverError(err));
  }
};
