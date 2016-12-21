const assert = require('chai').assert;
const PriorityQueueCollection = require('./../../../api/adt/PriorityQueueCollection');
const moment = require('moment');
const QueueStatus = require('./../../../api/adt/QueueStatus');
const Queue = require('./../../../api/adt/Queue');
const PriorityQueueComparator = require('./../../../api/adt/PriorityQueueComparator');
const QueueRoomDTO = require('./../../../api/adt/QueueRoomDTO');
/* global QueueService */
describe('PriorityQueueCollectionTest', function() {

  describe('#enqueue()', function() {
    it('should clear size and collection', function (done) {
      const queue1 = {time: moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        room: 1, priority: 10, status: QueueStatus.CURRENT, patient: 1
      };
      const queue2 = {time: moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35),
        room: 1, priority: 17, status: QueueStatus.IN_QUEUE, patient: 2
      };
      const queue3 = {time: moment().year(2016).month('Aug').date(29).hour(21).minute(15).second(30),
        room: 2, priority: 15.5, status: QueueStatus.IN_QUEUE, patient: 3
      };
      let collection = [queue2,queue1];
      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collection);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      QueueService.enqueue(queue3);
      assert.deepEqual(QueueService.getAllRooms()[0].getQueues(), [queue2,queue3,queue1], `should equal [${[queue2,queue3,queue1]}]`);

      done();
    });
  });
  describe('#sortQueueInRoom(roomId)', function () {
    it('should pass', function (done) {
      const queue1 = {
        time: moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        room: 1, priority: 10, status: QueueStatus.CURRENT, patient: 1
      };
      const queue2 = {
        time: moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35),
        room: 1, priority: 17, status: QueueStatus.IN_QUEUE, patient: 2
      };
      const queue3 = {
        time: moment().year(2016).month('Aug').date(29).hour(21).minute(15).second(30),
        room: 2, priority: 15.5, status: QueueStatus.IN_QUEUE, patient: 3
      };

      let collection = [queue1,queue2];
      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collection);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      QueueService.sortQueueInRoom(queue3);
      assert.deepEqual(QueueService.getAllRooms()[0].getQueues(), [queue2,queue1], `should equal [${[queue2,queue1]}]`);
      done();
    });
  });
  describe('#clearAll()', function () {
    it('should pass', function (done) {
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1, 1);

      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE,  2, 2);

      const queue3 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(15).second(30),
        2, 15.5, QueueStatus.IN_QUEUE, 3, 3);

      const collectionA = [queue2, queue1];
      const collectionB = [queue3];

      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collectionA);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      let priorityQueueCollectionB = new PriorityQueueCollection();
      priorityQueueCollectionB.setCollection(collectionB);
      let queueRoomDTOB = new QueueRoomDTO(2,'OPD2', priorityQueueCollectionB);
      QueueService.allRooms.push(queueRoomDTOB);
      QueueService.clearAll();
      const result = QueueService.getAllRooms();
      assert.deepEqual([result[0].getQueues(),result[1].getQueues()], [[],[]], `should equal [$[[],[]]}]`);
      done();
    });
  });
  describe('#clearQueueInRoom(roomId)', function () {
    it('should pass', function (done) {
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1);
      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE, 2);
      const queue3 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(15).second(30),
        2, 15.5, QueueStatus.IN_QUEUE, 3, 3);
      const queueA = new Queue(
        moment().year(2016).month('Aug').date(29).hour(16).minute(15).second(15), 1, 11, QueueStatus.IN_QUEUE, 4);

      const collectionA = [queue1, queue2];
      const collectionB = [queue3];
      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collectionA);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      let priorityQueueCollectionB = new PriorityQueueCollection();
      priorityQueueCollectionB.setCollection(collectionB);
      let queueRoomDTOB = new QueueRoomDTO(2,'OPD2', priorityQueueCollectionB);
      QueueService.allRooms.push(queueRoomDTOB);
      QueueService.clearQueueInRoom(1);
      const result = QueueService.getAllRooms();
      assert.deepEqual([result[0].getQueues(),result[1].getQueues()], [[],[queue3]], `should equal [${[[],[queue3]]}]`);
      done();
    })

  });
  describe('#callQueue(queue)', function () {
    it('should pass', function (done) {
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1);
      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE, 2);
      const queue3 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(15).second(30),
        2, 15.5, QueueStatus.IN_QUEUE, 3, 3);
      const queueA = new Queue(
        moment().year(2016).month('Aug').date(29).hour(16).minute(15).second(15), 1, 11, QueueStatus.IN_QUEUE, 4);

      const collectionA = [queue2, queue1];
      const collectionB = [queue3];
      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collectionA);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      let priorityQueueCollectionB = new PriorityQueueCollection();
      priorityQueueCollectionB.setCollection(collectionB);
      let queueRoomDTOB = new QueueRoomDTO(2,'OPD2', priorityQueueCollectionB);
      QueueService.allRooms.push(queueRoomDTOB);
      QueueService.callQueue(1);
      const result = QueueService.getAllRooms();
      assert.deepEqual([result[0].getQueues(),result[1].getQueues()], [[queue1],[queue3]], `should equal [${[[queue1],[queue3]]}]`);
      done();
    })

  });
  describe('#updateQueue()', function () {
    const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
      1, 10, QueueStatus.CURRENT, 1);
    const queue2 = new Queue(
      moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE, 2);
    const queue3 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(15).second(30),
      2, 15.5, QueueStatus.IN_QUEUE, 3, 3);
    const queueA = new Queue(
      moment().year(2016).month('Aug').date(29).hour(16).minute(15).second(15), 1, 11, QueueStatus.IN_QUEUE, 4);

    //test data
    const testData1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
      2, 10, QueueStatus.IN_QUEUE, 1);
    const testData2 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
      1, 10, QueueStatus.CURRENT, 1);
    const testData3 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
      2, 20, QueueStatus.IN_QUEUE, 1);
    const testData4 = new Queue(moment().year(2016).month('Aug').date(29).hour(22).minute(30).second(0),
      1, 10, QueueStatus.IN_QUEUE, 1);

    it('Should remove from old room and enqueue to new room', function (done) {
      const collectionA = [queue2, queue1];
      const collectionB = [queue3];
      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collectionA);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      let priorityQueueCollectionB = new PriorityQueueCollection();
      priorityQueueCollectionB.setCollection(collectionB);
      let queueRoomDTOB = new QueueRoomDTO(2,'OPD2', priorityQueueCollectionB);
      QueueService.allRooms.push(queueRoomDTOB);
      QueueService.updateQueue(testData1);
      const result = QueueService.getAllRooms();
      assert.deepEqual([result[0].getQueues(),result[1].getQueues()], [[queue2,queue3],[queue1]], `should equal [${[[queue2,queue3],[queue1]]}]`);
      done();
    });

    it('Should change status', function (done) {
      const collectionA = [queue2, queue1];
      const collectionB = [queue3];
      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collectionA);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      let priorityQueueCollectionB = new PriorityQueueCollection();
      priorityQueueCollectionB.setCollection(collectionB);
      let queueRoomDTOB = new QueueRoomDTO(2,'OPD2', priorityQueueCollectionB);
      QueueService.allRooms.push(queueRoomDTOB);
      QueueService.updateQueue(testData2);
      const result = QueueService.getAllRooms();
      assert.deepEqual([result[0].getQueues(),result[1].getQueues()], [[queue2,testData2],[queue3]], `should equal [${[[queue2,queue1Updated],[queue3]]}]`);
      done();
    });

    it('Should be able to change priority value (but not sort)', function (done) {
      const collectionA = [queue2, queue1];
      const collectionB = [queue3];
      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collectionA);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      let priorityQueueCollectionB = new PriorityQueueCollection();
      priorityQueueCollectionB.setCollection(collectionB);
      let queueRoomDTOB = new QueueRoomDTO(2,'OPD2', priorityQueueCollectionB);
      QueueService.allRooms.push(queueRoomDTOB);
      QueueService.updateQueue(testData3);
      const result = QueueService.getAllRooms();
      assert.deepEqual([result[0].getQueues(),result[1].getQueues()], [[queue2,testData3],[queue3]], `should equal [${[[queue2,queue1Updated],[queue3]]}]`);
      done();
    });

    it('Should be able to change time', function (done) {
      const collectionA = [queue2, queue1];
      const collectionB = [queue3];
      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collectionA);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      let priorityQueueCollectionB = new PriorityQueueCollection();
      priorityQueueCollectionB.setCollection(collectionB);
      let queueRoomDTOB = new QueueRoomDTO(2,'OPD2', priorityQueueCollectionB);
      QueueService.allRooms.push(queueRoomDTOB);
      QueueService.updateQueue(testData4);
      const result = QueueService.getAllRooms();
      assert.deepEqual([result[0].getQueues(),result[1].getQueues()], [[queue2,testData4],[queue3]], `should equal [${[[queue2,queue1Updated],[queue3]]}]`);
      done();
    });
  });
  describe('#deleteQueue()', function () {
    it('should pass', function (done) {
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1, 1);

      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE,  2, 2);

      const queue3 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(15).second(30),
        2, 15.5, QueueStatus.IN_QUEUE, 3, 3);

      const collectionA = [queue2, queue1];
      const collectionB = [queue3];

      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collectionA);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      let priorityQueueCollectionB = new PriorityQueueCollection();
      priorityQueueCollectionB.setCollection(collectionB);
      let queueRoomDTOB = new QueueRoomDTO(2,'OPD2', priorityQueueCollectionB);
      QueueService.allRooms.push(queueRoomDTOB);
      QueueService.deleteQueue(1);
      const result = QueueService.getAllRooms();
      assert.deepEqual([result[0].getQueues(),result[1].getQueues()], [[queue2],[queue3]], `should equal [${[[queue2],[queue3]]}]`);

      done();
    })
  });
  describe('#findByPatientId()', function () {
    it('should pass', function (done) {
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1, 1);

      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE,  2, 2);

      const queue3 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(15).second(30),
        2, 15.5, QueueStatus.IN_QUEUE, 3, 3);

      const collectionA = [queue2, queue1];
      const collectionB = [queue3];

      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collectionA);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      let priorityQueueCollectionB = new PriorityQueueCollection();
      priorityQueueCollectionB.setCollection(collectionB);
      let queueRoomDTOB = new QueueRoomDTO(2,'OPD2', priorityQueueCollectionB);
      QueueService.allRooms.push(queueRoomDTOB);
      let queueOfPatient1 = QueueService.findByPatientId(1);
      assert.deepEqual(queueOfPatient1, Object.assign({},queue1,{currentIndex: 1}));

      let queueOfPatient6 = QueueService.findByPatientId(6);
      assert.deepEqual(queueOfPatient6, null);
      done();
    });
  });
  describe('#insertQueue(queue)', function () {
    it('should pass', function (done) {
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1, 1);

      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE,  2, 2);

      const testData3 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(15).second(30),
        2, 15.5, QueueStatus.IN_QUEUE, 3, 3);

      const collectionA = [queue2, queue1];
      const collectionB = [];

      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setCollection(collectionA);
      let queueRoomDTO = new QueueRoomDTO(1,'OPD1', priorityQueueCollection);
      QueueService.allRooms.push(queueRoomDTO);
      let priorityQueueCollectionB = new PriorityQueueCollection();
      priorityQueueCollectionB.setCollection(collectionB);
      let queueRoomDTOB = new QueueRoomDTO(2,'OPD2', priorityQueueCollectionB);
      QueueService.allRooms.push(queueRoomDTOB);
      let queueOfPatient1 = QueueService.insertQueue(testData3, 1);
      const result = QueueService.getAllRooms();
      assert.deepEqual([result[0].getQueues(),result[1].getQueues()], [[queue2,testData3, queue1], []], `should equal [${[[queue2,testData3, queue1], []]}]`);

      done();
    });

  });
});

