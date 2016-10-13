const QueueStatus = require('./QueueStatus');
class Queue {
  constructor(time, room, priority, status, patient){
    this.patientId = patient;
    this.priority = priority;
    this.time = time;
    this.room = room;
    this.status = status;
  }
}
module.exports = Queue;
