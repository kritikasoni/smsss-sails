// QueueService.js - in api/services
let allRooms = [];
// data structure of allRooms are as follow
// {id: int, queues: [] }
module.exports = {
  alertPatientInWaitingRoom: function(patientId) {
    sails.sockets.broadcast('waitingRoom', 'addQueue', {userId: patientId});
  },
  sortQueueInRoom: function(roomId) {
    return new Promise((resolve, reject) => {
      allQueues.find((queue) => {
        return room
      })
    });
  },
  getQueueInRoom: (req, res, id) => {
    if(!req.token) return res.serverError({message: 'token attribute in request is not found'});
    if(req.token.sub != parseInt(id) ) return res.forbidden({message: 'Forbidden'});
    else return true;
  }

};
