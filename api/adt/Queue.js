const QueueStatus = require('./QueueStatus');
class Queue {
  constructor(time, room, priority, status, patientId, id){

    this.status = status ? status : QueueStatus.IN_QUEUE;
    this.equals = this.equals.bind(this);
    this.time = time;
    this.room = room;
    this.priority = priority;
    this.status = status;
    this.patientId = patientId;
    this.id = id;

  }

  equals(queue){
    return this.patientId == queue.patientId || this.id == queue.id;
  }

}
module.exports = Queue;
