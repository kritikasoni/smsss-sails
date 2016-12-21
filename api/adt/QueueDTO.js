const QueueStatus = require('./QueueStatus');
class QueueDTO {
  constructor(time, room, status, patientId, id, currentIndex){
    this.equals = this.equals.bind(this);
    this._time = time;
    this._room = room;
    this._status = status;
    this._patientId = patientId;
    this._id = id;
    this._currentIndex = currentIndex;
  }
  get time() {
    return this._time;
  }

  set time(value) {
    this._time = value;
  }

  get room() {
    return this._room;
  }

  set room(value) {
    this._room = value;
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    this._priority = value;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get patientId() {
    return this._patientId;
  }

  set patientId(value) {
    this._patientId = value;
  }


  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  set currentIndex(value) {
    this._currentIndex = value;
  }

  equals(queue){
    return this.patientId == queue.patientId || this.id == queue.id;
  }

  toJson() {
    return {id: this._id, patientId: this._patientId, time: this._time, currentIndex: this._currentIndex,
      room: this._room, status: this._status};
  }

}
module.exports = QueueDTO;
