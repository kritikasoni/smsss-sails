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
      const targetRoom = allRooms.find((room) =>  room.id == roomId);

      if(!targetRoom){ // if not found, then throw error
        return reject(new Error("There is no queue in room"));
      }
      else {
        targetRoom.queues;
      }
    });
  },
  broadcastQueueInRoom: (roomId) => {
    const targetRoom = allRooms.find((room) =>  room.id == roomId);
    sails.sockets.broadcast(`roomId:${roomId}`, 'changeInQueue', targetRoom.queues);
  }

};
