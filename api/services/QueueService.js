// QueueService.js - in api/services
const moment = require('moment');

let allRooms = [];

// data structure of allRooms are as follow
// {
// id: int,
// queues: [
//  { id: int, room: int, time: DateTime, queueStatus: string, priority: float}
// ]
// }

function alertPatientInWaitingRoom(patientId) {
  sails.sockets.broadcast('waitingRoom', 'addQueue', {userId: patientId});
}
function alertPatientIn() {
  
}
function addQueueToRoom(queue, roomId, priority) {
  const targetRoom = allRooms.find((room) =>  room == roomId);
  queue = addPriority(queue);
  if(targetRoom){
    targetRoom.queues.push(queue);
  }
  else{ // no room found in allRooms, then add
    let newRoom = Object.assign({}, queue.room.id, {queues: []});
    queue = addPriority(queue, priority);
    newRoom.queues.push(queue);
    allRooms.push(newRoom);
  }
  sortQueueInRoom(roomId)
    .then(() => {
      alertPatientInWaitingRoom(queue.patient);
    })
    .catch(e => {
      sails.log.error(e);
    });
}
// sort and return target queues
function sortQueueInRoom(roomId) {
  // rank of each queue is equal
  Array.prototype.equals = function( array ) {
    return this.length == array.length && this.every( function(this_i,i) { return this_i.id == array[i].id } );
  };

  return new Promise((resolve, reject) => {
    const targetRoom = allRooms.find((room) =>  room.id == roomId);

    if(!targetRoom){ // if not found, then throw error
      return reject(new Error("There is no queue in room"));
    }
    else {
        targetRoom.queues.sort(prioritySort);
        return resolve(targetRoom.queues);
    }
  });
}

function prioritySort(a, b) {
  const now = moment();
  const queueAComeBeforeInMinute = now.diff(moment(a.time),'minutes',true);
  const queueBComeBeforeInMinute = now.diff(moment(a.time),'minutes',true);
  return (b.priority + queueBComeBeforeInMinute) - (a.priority + queueAComeBeforeInMinute);
}

function getCurrentQueueInRoom(roomId, queueId) {
  const targetRoom = allRooms.find((room) =>  room == roomId);
  return targetRoom.queues.findIndex((queue => queue.id == queueId)) + 1; // plus 1 because index start from 0
}

function addPriority(queue, val) {
  let startPriority = 0;
  if(val){ startPriority = val}
  Appointment
    .findOne({patient: queue.patient.id})
    .then(appointment => {
      if(appointment){
        const queueTime = moment(queue.time);
        const appointmentTime = moment(appointment.date);
        const timeDiff = queueTime.diff(appointmentTime, 'minutes', true);
        if(timeDiff <= 0){ //come before appointment time, no priority
          return Object.assign({}, queue, {priority: startPriority });
        }
        else{
          //TODO: check logic
          if(timeDiff < 30){ // come withing 30 minutes
            return  Object.assign({}, queue, {priority: startPriority + timeDiff });
          }
        }
      }
      return Object.assign({}, queue, {priority: startPriority });
    })
    .catch(e => sails.log.error(e));
}

module.exports = {
  alertPatientInWaitingRoom: alertPatientInWaitingRoom,
  addQueueToRoom: addQueueToRoom,
  sortQueueInRoom: sortQueueInRoom,
  getCurrentQueueInRoom: getCurrentQueueInRoom
};

