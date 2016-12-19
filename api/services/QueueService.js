// QueueService.js - in api/services

const moment = require('moment');
const PriorityQueueCollection = require('./../adt/PriorityQueueCollection');
const QueueDTO = require('./../adt/QueueDTO');
const QueueStatus = require('./../adt/QueueStatus');
const QueueRoomDTO = require('./../adt/QueueRoomDTO');
const Queue = require('./../adt/Queue');
const axios = require('axios');
const FCM = axios.create({
  baseURL: 'https://fcm.googleapis.com/fcm/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `key=${sails.config.notification.fcmKey}` //load key from config file
  }
});

const queueService = {
  allRooms: [],
  enqueue: function (queue) {
    let index = -1;
    const roomId = queue.room.id;
    let targetRoom = queueService.allRooms.find(queueRoom => queueRoom.getRoomId() == roomId);
    if(targetRoom){
      sails.log.info('try to enqueue to room id',targetRoom.getRoomId(),targetRoom.getRoomName());
      queueService.addPriority(queue).then(priorityQueue => {
        sails.log.debug('add queue',priorityQueue);
        index = targetRoom.getQueues().enqueue(priorityQueue);
        if(targetRoom.getQueues().peek()){
          targetRoom.getQueues().peek().status = QueueStatus.CURRENT;
        }
        sails.log.info('successfully enqueue to index', index);
        sails.log.info('allRooms',queueService.allRooms);

        const publishData = new QueueDTO(priorityQueue.time,priorityQueue.room,priorityQueue.status,priorityQueue.patientId,priorityQueue.id,index);
        queueService.publish({type: 'queues:created',data: publishData.toJson()});
        queueService.publish({type: 'queues:moving',data: {roomId: queue.room.id}});
        return index;
      });
    }
    else {
      sails.log.info('not found queue room');
      sails.log.info('create queue room:',queue.room.id,':', queue.room.name);
      const queueRoomDTO = new QueueRoomDTO(queue.room.id,queue.room.name);
      queue.status = QueueStatus.CURRENT;
      index = queueRoomDTO.getQueues().enqueue(queue);
      queueService.allRooms.push(queueRoomDTO);
      sails.log.info('enqueue to index',index);
      sails.log.info('allRooms',queueService.allRooms);
      const publishData = new QueueDTO(queue.time,queue.room,queue.status,queue.patientId,queue.id,index);
      queueService.publish({type: 'queues:created',data: publishData.toJson()});
      queueService.publish({type: 'queues:moving',data: {roomId: queue.room.id}});
      return index;
    }
  },
  sortQueueInRoom: function (roomId) {
    queueService.getRoomByRoomId(roomId).then(targetRoom => {
      targetRoom.sort();
    }).catch(err => {
      sails.log.error(err);
    })

  },
  addPriority: function (queue) {
    return new Promise((resolve, reject) => {
      Appointment.findOne({
        patient: queue.patientId,
        date: { '>': moment().startOf('day').toDate(), '<': moment().endOf('day').toDate() }
      }).then((appointment) => {
        if(appointment){
          const queueArriveAt = moment(queue.time);
          sails.log.debug('arrive',moment(queue.time).toISOString());
          sails.log.debug('appoint',moment(appointment.date).toISOString());
          const diff = moment(queueArriveAt).diff(moment(appointment.date),'minutes');
          sails.log.debug('arrival diff', diff);
          if(diff => 0 && diff <= 30){
            const initialPriority = 30;
            queue.priority = initialPriority - diff;
            sails.log.info('add priority = ',queue.priority);
            return resolve(queue);
          }
          else{
            sails.log.info('late priority, doesn\'t count, priority = ',queue.priority);
            return resolve(queue);
          }
        }
        else{
          sails.log.info('no appointment priority = ',queue.priority);
          return resolve(queue);
        }
      });
    })
  },
  clearAll: function () {
    queueService.allRooms = [];
    queueService.publish({type: 'queues:clearAll', data: {}});
    return;
  },
  clearQueueInRoom: function (roomId) {
    queueService.allRooms = queueService.allRooms.map(queueRoom => {
      if(queueRoom.getRoomId() == roomId){
        queueRoom.setQueues(new PriorityQueueCollection());
        queueService.publish({type: 'queues:moving',data: {roomId: roomId}});
        return queueRoom;
      }
      else{
        return queueRoom;
      }
    });
  },
  callQueue: function (roomId, withPatientIndex) {
    return new Promise((resolve, reject) => {
      queueService.getRoomByRoomId(roomId).then(targetRoom => {
        sails.log.info('callQueue: room', targetRoom);
        const firstPatient = targetRoom.getQueues().getCollection()[1];
        const withPatient = withPatientIndex ? targetRoom.getQueues().getCollection()[withPatientIndex] : null;
        const removed = targetRoom.getQueues().dequeue();
        sails.log.debug('remove queue',removed);

        queueService.publish({type: 'queues:moving',data: {roomId: roomId}});
        // if there is next queue, then set status to current
        if(targetRoom.getQueues().peek()){
          targetRoom.getQueues().peek().status = QueueStatus.CURRENT;
        }

        if(firstPatient || withPatient){
          sails.log.debug('has first queue or other queue');
          let notificationList = [queueService.sendNotification(firstPatient)];
          if(withPatient){
            notificationList.push(withPatient);
          }
          sails.log.debug('notification list', notificationList);
          Promise.all(notificationList).then(result => {
            resolve();
          }).catch(err => {
            sails.log.error(err);
            resolve();
          })
        }
        else{
          sails.log.debug('callQueue: no queue to send notification found');
          resolve();
        }
      }).catch(err => {
        sails.log.error(err);
        reject(err);
      });
    });
  },
  updateQueue: function (queue) {
    sails.log.info('updateQueue:', queue);
    queueService.allRooms.forEach(room => {
      let queueIndex = room.getQueues().contains(queue);
      if(queueIndex > -1){
        const newQueue = new Queue(queue.time,queue.room, queue.priority,queue.status, queue.patientId, queue.id);
        sails.log.info('updateQueue: newQueue = ',newQueue);
        if(queue.room.id != room.getRoomId()){
          queueService.deleteQueue(queue.id);
          queueService.enqueue(newQueue);
          queueService.publish({type: 'queues:updated',data: newQueue});
          queueService.publish({type: 'queues:moving',data: {roomId: queue.room.id}});
          return queue;
        }
        else{
          room.getQueues().removeAt(queueIndex);
          room.getQueues().insert(newQueue,queueIndex);
          queueService.publish({type: 'queues:updated',data: newQueue});
          queueService.publish({type: 'queues:moving',data: {roomId: queue.room.id}});
          return queue;
        }
      }
    });
    return null;
  },
  deleteQueue: function (queueId) {
    sails.log.info('QueueService.deleteQueue','queueId:', queueId);
    queueService.allRooms.forEach(room => {
      let queueIndex = room.getQueues().contains({id: queueId});
      if(queueIndex > -1) {
        room.getQueues().remove({id: queueId});
        sails.log.info('QueueService.deleteQueue','remove queue index',queueIndex,'of room id',room.getRoomId());
        if(room.getQueues().peek()){
          room.getQueues().peek().status = QueueStatus.CURRENT;
        }
        queueService.publish({type: 'queues:deleted',data: {roomId: room.getRoomId(), id: queueId}});
        queueService.publish({type: 'queues:moving',data: {roomId: room.getRoomId()}});
        return;
      }
    });
  },
  publish: function (change) {
    sails.log.debug('publish', change.type, change.data);
    if(change.type == 'queues:clearAll'){
      sails.sockets.blast('queues:clearAll',change.data);
    }
    else{
      sails.sockets.broadcast('queues', change.type, change.data);
      if(change.type == 'queues:created'){
        sails.sockets.broadcast('waitingRoom', change.type, change.data);
      }
      if(change.type == 'queues:moving'){
        sails.sockets.broadcast(`room:${change.data.roomId}`, 'queues:moving', change.data);
      }
    }
  },
  findByPatientId: function (patientId) {
    return new Promise((resolve, reject) => {
      let found = false;
      queueService.allRooms.forEach(room => {
        sails.log.info('findByPatientId:','search for patient ID',patientId,' in room', room.getRoomName());
        let queueIndex = room.getQueues().contains({patientId});
        sails.log.info('findByPatientId:','room',room.getRoomName(), 'found patient', queueIndex > -1);
        if(queueIndex > -1){
          const queue = room.getQueues().getCollection()[queueIndex];
          sails.log.info('findByPatientId: found queue', queue);
          const queueDTO = new QueueDTO(queue.time, queue.room, queue.status, queue.patientId, queue.id, queueIndex);
          sails.log.info('findByPatientId: return QueueDTO', queueDTO);
          found = true;
          return resolve(queueDTO);
        }
      });
      if(!found){
        sails.log.info('findByPatientId: Not found');
        return resolve(null);
      }

    });
  },
  insertQueue: function (queue, index) {
    queueService.getRoomByRoomId(queue.room.id).then(targetRoom => {
      if(index == 0){
        index++;
      }
      targetRoom.getQueues().insert(queue,index);
      if(room.getQueues().peek()){
        room.getQueues().peek().status = QueueStatus.CURRENT;
      }
      queueService.publish({type: 'queues:moving',data: {roomId: queue.room.id}});
    }).catch(err => {
      sails.log.error(err);
    });
  },
  findByQueueId: function (queueId) {
    sails.log.info('QueueService.findByQueueId id:',queueId);
    return new Promise((resolve, reject) => {
      let found = false;
      queueService.allRooms.forEach(room => {
        sails.log.info('findByQueueId:','search for queue ID',queueId,' in room', room.getRoomName());
        let queueIndex = room.getQueues().contains({id: queueId});
        sails.log.info('findByQueueId:','room',room.getRoomName(), 'found:', queueIndex > -1);
        if(queueIndex > -1){
          const queue = room.getQueues().getCollection()[queueIndex];
          sails.log.info('findByQueueId: found queue', queue);
          const queueDTO = new QueueDTO(queue.time, queue.room, queue.status, queue.patientId, queue.id, queueIndex);
          sails.log.info('findByQueueId: return QueueDTO', queueDTO);
          found = true;
          return resolve(queueDTO);
        }
      });
      if(!found){
        sails.log.info('findByQueueId: Not found');
        return resolve(null);
      }

    });
  },
  getAllRooms: function () {
    console.log(queueService.allRooms);
    return Object.assign([],queueService.allRooms);
  },
  setAllRooms: function (newAllRooms) {
    queueService.allRooms = newAllRooms;
  },
  getRoomByRoomId: function (roomId){
    return new Promise((resolve, reject) => {
      let targetRoom = queueService.allRooms.find(queueRoom => queueRoom.getRoomId() == roomId);
      if(targetRoom){
        sails.log.info('found queue room id:', roomId);
        return resolve(targetRoom);
      }
      else{
        sails.log.info('not found queue room id', roomId);
        Room.findOne({id: roomId}).then(room => {
          sails.log.info('create queue room:', roomId,':', room.name );
          const queueRoomDTO = new QueueRoomDTO(room.id, room.name);
          queueService.allRooms.push(queueRoomDTO);
          return resolve(queueRoomDTO);
        }).catch(err => {
          sails.log.error(err);
          return reject(err);
        });
      }
    });
  },
  sendNotification: function (queue) {
    return new Promise((resolve, reject) => {
      if(queue){
        sails.log.debug('callQueue: found patient to send notification in queue');
        Patient.findOne({id: queue.patientId}).then(patient => {
          if(patient){
            let message = Object.assign({}, sails.config.notification.defaultMessage);
            if(patient.deviceToken){
              sails.log.debug('callQueue: ready to send to patient',patient.firstName,patient.lastName);
              message.to = patient.deviceToken;
              sails.log.debug('message', message);
              FCM.post('send',message).then(result => {
                sails.log.debug('sent notification to patient',patient.firstName,patient.lastName);
                sails.log.debug(result.data);
                resolve();
              })
                .catch(error => {
                  sails.log.error(error);
                });
            }
            else{
              sails.log.debug('callQueue: no device token, send notification failed');
              resolve();
            }
          }
          else{
            sails.log.info('callQueue: no patient found, not send notification');
            resolve();
          }
        }).catch(err => {
          sails.log.error('callQueue: Can\'t send notification to patient',err);
          resolve();
        });
      }
      else{
        sails.log.info('queue is null, cannot send notification');
        resolve();
      }
    });
  }
};

module.exports = {
  enqueue: queueService.enqueue,
  clearAll: queueService.clearAll,
  clearQueueInRoom: queueService.clearQueueInRoom,
  callQueue: queueService.callQueue,
  updateQueue: queueService.updateQueue,
  deleteQueue: queueService.deleteQueue,
  publish: queueService.publish,
  findByPatientId: queueService.findByPatientId,
  insertQueue: queueService.insertQueue,
  findByQueueId: queueService.findByQueueId,
  getAllRooms: queueService.getAllRooms,
  setAllRooms: queueService.setAllRooms,
  getRoomByRoomId: queueService.getRoomByRoomId
};

