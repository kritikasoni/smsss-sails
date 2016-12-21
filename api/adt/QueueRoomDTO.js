const PriorityQueueCollection = require('./PriorityQueueCollection');
const QueueDTO = require('./QueueDTO');
class QueueRoomDTO {
  constructor(roomId, roomName, queues){
    this._roomId = roomId;
    this._roomName = roomName;
    this._queues = queues ? queues : new PriorityQueueCollection();
    this.equals = this.equals.bind(this);
    this.toJson = this.toJson.bind(this);
  }
  getRoomId(){
    return this._roomId;
  }
  setRoomId(roomId){
    this._roomId = roomId;
  }
  getRoomName(){
    return this._roomName;
  }
  setRoomName(roomName){
    this._roomName = roomName;
  }
  getQueues(){
    return this._queues;
  }
  setQueues(queues){
    return this._queues = queues;
  }
  equals(queueRoomDTO){
    return this.roomId == queueRoomDTO.roomId;
  }
  toJson(){
    const queues = this._queues
      .getCollection()
      .map((queue, index) => new QueueDTO(queue.time, queue.room, queue.status, queue.patientId, queue.id, index))
      .map(queue => queue.toJson());
    return {id: this._roomId, name: this._roomName, queues: queues};
  }
}
module.exports = QueueRoomDTO;
