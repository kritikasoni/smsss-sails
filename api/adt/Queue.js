const QueueStatus = require('./QueueStatus');
class Queue {
  constructor(time, room, priority, status, patient){
    this.patientId = patient;
    this.priority = priority;
    this.time = time;
    this.room = room;
    this.status = status;
    this.equals = this.equals.bind(this);
  }
  equals(queue){
    return this.patientId == queue.patientId;
  }
}
module.exports = Queue;
