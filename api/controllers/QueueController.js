/**
 * QueueController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let sequence = 1;
const Queue = require('./../adt/Queue');
const QueueStatus = require('./../adt/QueueStatus');
const moment =require('moment');

/* global QueueService */
module.exports = {
  findAll: (req,res) => {
    sails.log.info('getAllRooms',QueueService.getAllRooms());
    const allRoom = QueueService.getAllRooms().map(room => room.toJson());
    if(req.isSocket){
      sails.sockets.join(req, 'queues', function(err) {
        if(err) {
          return res.serverError(err);
        }
        return res.ok(allRoom);
      });
    }
    else{
      return res.ok(allRoom);
    }

  },
  allQueueInRoom: (req,res) => {
    const roomId = req.params.roomId;
    if(req.isSocket) {
      sails.sockets.join(req, 'queues', function (err) {
        if (err) {
          return res.serverError(err);
        }
      });
    }
    QueueService
      .getRoomByRoomId(roomId)
      .then(queueRoom => {
        sails.log.info('return allQueueInRoom',queueRoom);
        return res.ok(queueRoom.toJson());
      })
      .catch(err => res.json(500, err));

  },
  create: (req,res) => {
    const time = req.body.time;
    const room = req.body.room;
    const patientId = req.body.patientId;
    const status = QueueStatus.IN_QUEUE;
    const priority = req.body.priority ? req.body.priority : 0;
    //validate
    //validate time
    if(!time){
      return res.json(400,{message:'Time of queue is require'});
    }
    const today = moment();
    if(today.diff(moment(time),'days') > 0){
      return res.json(400,{message:'Cannot set time to yesterday'});
    }
    //validate patientId
    if(!patientId){
      return res.json(400,{message:'Patient Id is required'});
    }
    if(!Number.isInteger(patientId)){
      return res.json(400,{message:'Patient Id must be an integer'});
    }
    //validate room id
    if(!room.id){
      return res.json(400,{message:'Room Id is required'});
    }
    if(!Number.isInteger(patientId)){
      return res.json(400,{message:'Room Id must be an integer'});
    }

    const queue = new Queue(time,room, priority,status, patientId, sequence++);
    QueueService.enqueue(queue);
    sails.log.info('queue created', queue);
    return res.ok(queue);
  },
  update: function (req, res) {
    const id = req.body.id;
    const time = req.body.time;
    const room = req.body.room;
    const patientId = req.body.patientId;
    const status = req.body.status ? req.body.status : QueueStatus.IN_QUEUE;
    const priority = req.body.priority ? req.body.priority : 0;
    //validate
    //validate id
    if(!Number.isInteger(id)){
      return res.json(400,{message:'Id is require! and must be integer'});
    }
    //validate time
    if(!time){
      return res.json(400,{message:'Time of queue is require'});
    }
    const today = moment();
    if(today.diff(moment(time),'days') > 0){
      return res.json(400,{message:'Cannot set time to yesterday'});
    }
    //validate patientId
    if(!patientId){
      return res.json(400,{message:'Patient Id is required'});
    }
    if(!Number.isInteger(patientId)){
      return res.json(400,{message:'Patient Id must be an integer'});
    }
    //validate room id
    if(!room.id){
      return res.json(400,{message:'Room Id is required'});
    }
    if(!Number.isInteger(patientId)){
      return res.json(400,{message:'Room Id must be an integer'});
    }

    let queue = req.body;

    // const patientId = req.params.patientId;
    const updatedQueue = QueueService.updateQueue(queue);
    res.ok(updatedQueue);
  },
  delete: function (req,res){
    sails.log.info('delete: queue id', req.params.id);
    QueueService.deleteQueue(req.params.id);
    return res.ok({message:'Deleted'});

  },
  callQueue: (req,res) => {
    const roomId = req.params.roomId;
    let patientIndex = req.query.patientIndex || null;
    if(patientIndex) { //if want to call first queue, then ignore because call queue call first queue by default
      patientIndex = patientIndex <= 1 ? null : patientIndex;
    }
    QueueService.callQueue(roomId, patientIndex).then(result => {
      return res.ok({message:'Call success!'});
    })
      .catch(err => {
        sails.log.error(err);
        return res.serverError(err);
      });
  },
  joinCurrentRoom: function(req, res) {
    const patientId = req.token.sub;
    if(!req.isSocket){
      return res.json(400,{message: 'Request is not web socket!'})
    }
    sails.log.info('join current room of patient id ', patientId);
    QueueService
      .findByPatientId(patientId)
      .then(queueDTO => {
        if(queueDTO){
          sails.log.info('joinCurrentRoom: patient has queueDTO', queueDTO.toJson());
          sails.sockets.join(req, `room:${queueDTO.room.id}`, function(err) {
            if(err) {
              return res.serverError(err);
            }
            sails.log.info('patient',patientId,'joined room:',queueDTO.room.name);
            return res.ok(queueDTO.toJson());
          });
        }else{
          sails.log.info('queueDTO not found, NO queue for this patient');
          return res.notFound({message: 'No queue found'});
        }
      })
      .catch(err => {
        sails.log.error(err);
        return res.serverError({message: 'Internal server error, please contact Admin'});
      });
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
  },
  findByPatientId: (req,res) => {
    const patientId = req.params.id;
    QueueService
      .findByPatientId(patientId)
      .then(queueDTO => {
        if(queueDTO){
          sails.log.info('joinCurrentRoom: patient has queueDTO', queueDTO.toJson());
          if(req.isSocket){
            sails.sockets.join(req, `room:${queueDTO.room.id}`, function(err) {
              if(err) {
                return res.serverError(err);
              }
              sails.log.info('patient',patientId,'joined room:',queueDTO.room.name);
              return res.ok(queueDTO.toJson());
            });
          }
          else{
            return res.ok(queueDTO.toJson());
          }
        }else{
          sails.log.info('queueDTO not found, NO queue for this patient');
          return res.notFound({message: 'No queue found'});
        }
      })
      .catch(err => {
        sails.log.error(err);
        return res.serverError({message: 'Internal server error, please contact Admin'});
      });
  },
  insertQueue: (req,res) => {
    const time = req.body.time;
    const room = req.body.room;
    const patientId = req.body.patientId;
    const status = QueueStatus.IN_QUEUE;
    const priority = req.body.priority ? req.body.priority : 0;
    //validate
    //validate time
    if(!time){
      return res.json(400,{message:'Time of queue is require'});
    }
    const today = moment();
    if(today.diff(moment(time),'days') > 0){
      return res.json(400,{message:'Cannot set time to yesterday'});
    }
    //validate patientId
    if(!patientId){
      return res.json(400,{message:'Patient Id is required'});
    }
    if(!Number.isInteger(patientId)){
      return res.json(400,{message:'Patient Id must be an integer'});
    }
    //validate room id
    if(!room.id){
      return res.json(400,{message:'Room Id is required'});
    }
    if(!Number.isInteger(patientId)){
      return res.json(400,{message:'Room Id must be an integer'});
    }

    const queue = new Queue(time,room, priority,status, patientId, sequence++);
    const index = req.params.queueIndex;
    QueueService.insertQueue(queue,index);
    return res.ok({message:'success'});
  },
  findByQueueId: (req,res) => {
    const queueId = req.params.id;
    QueueService
      .findByQueueId(queueId)
      .then(queueDTO => {
        if(queueDTO){
          sails.log.info('joinCurrentRoom: patient has queueDTO', queueDTO.toJson());
          return res.ok(queueDTO.toJson());
        }else{
          sails.log.info('queueDTO not found, NO queue for this patient');
          return res.notFound({message: 'No queue found'});
        }
      })
      .catch(err => {
        sails.log.error(err);
        return res.serverError({message: 'Internal server error, please contact Admin'});
      });
  },
  clearAllQueuesInRoom: (req,res) => {
    sails.log.info('clearAllQueuesInRoom: queues in room id', req.params.id);
    QueueService.clearQueueInRoom(req.params.id);
    sails.log.info('clearAllQueuesInRoom: room is now', QueueService.getAllRooms());
    return res.ok({message:'Cleared'});
  },
  clearAllQueues: (req,res) => {
    sails.log.info('clearAllQueues: clear all');
    QueueService.clearAll();
    sequence = 1;
    return res.ok({message:'Cleared'});
  }
};

