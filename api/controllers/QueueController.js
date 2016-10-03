/**
 * QueueController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findAll: (req,res) => {
    Queue
      .find({}).populateAll()
      .then(queues => {
        if (req.isSocket) {
          Queue.watch(req);
          Queue.subscribe(req,queues);
        }
        if (req.wantsJSON) {
          return res.ok(queues)
        }
      })
      .catch(err => res.serverError(err));
  },
  findById: (req,res) => {
    Queue
      .findOne({id:req.params.id}).populateAll()
      .then(queue => res.ok(queue))
      .catch(err => res.badRequest(err));
  },

  create: function (req, res) {
    const queue = req.body;
    Queue
      .create(queue)
      .then(queue => Queue.findOne({id: queue.id}).populateAll())
      .then(queue => {
        Queue.publishCreate(queue, req);
        sails.sockets.broadcast('waitingRoom', 'addQueue', {userId: queue.user});
        return res.created(queue);
      })
      .catch(err => res.badRequest(err));
  },

  update: function (req, res) {
    Queue
      .update({id:req.params.id}, req.body, (err, updated) => {
        if(err) return res.badRequest(err);
        Queue
          .findOne(updated[0].id)
          .populateAll()
          .then((queue) => {
            Queue.publishUpdate(queue.id, queue,req);
            return res.ok(queue);
          })
          .catch(err => res.badRequest(err));
      });
  },
  delete: function (req,res){
    Queue.destroy({id:req.params.id})
      .then(() => {
        Queue.publishDestroy(req.params.id, undefined);
        return res.ok({message:'success'})
      })
      .catch(err => res.badRequest(err));
  },
  searchByRoom: function(req,res){
    Queue
      .find({room:req.params.id}).populateAll()
      .then(queues => {
        if (req.isSocket) {
          Queue.watch(req);
          Queue.subscribe(req,queues);
        }
        if (req.wantsJSON) {
          return res.ok(queues)
        }
      })
      .catch(err => res.serverError(err));
  },
  joinCurrentRoom: function(req, res) {
    const patientId = req.token.sub;
    if(!req.isSocket){
      return res.json(400,{message: 'Request is not web socket!'})
    }
    Queue
      .findOne({patient: patientId})
      .then(queue => {
        if(!queue){
          return res.json(404,{message: 'No queue found'});
        }
        const roomId = queue.id;
        sails.sockets.join(req, `room:${roomId}`, function(err) {
          if(err) {
            return res.serverError(err);
          }
          sails.sockets.broadcast(`room:${roomId}`, 'patient joined');
          return res.ok(queue);
        });
      })
      .catch(err => res.serverError(err));
  },
  joinWaitingRoom: (req, res, next) => {
    if(!req.isSocket){
      return res.json(400,{message: 'Request is not web socket!'})
    }
    sails.sockets.join(req, 'waitingRoom', function(err) {
      if(err) {
        return res.serverError(err);
      }
      return res.ok('success');
    });
  }
};

