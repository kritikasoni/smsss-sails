const assert = require('chai').assert;
const PriorityQueueCollection = require('./../../../api/adt/PriorityQueueCollection');
const moment = require('moment');
const QueueStatus = require('./../../../api/adt/QueueStatus');
const Queue = require('./../../../api/adt/Queue');
const PriorityQueueComparator = require('./../../../api/adt/PriorityQueueComparator');

describe('PriorityQueueCollectionTest', function() {

  describe('#clear()', function() {
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
      assert.deepEqual(priorityQueueCollection.getCollection(), collection, `should equal [${collection}]`);

      priorityQueueCollection.clear();
      assert.deepEqual(priorityQueueCollection.getCollection(), [], 'should be cleared');

      done();
    });
  });
  describe('#peek()', function () {
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

      const collectionA = [queue2, queue1];
      const collectionB = [];

      let priorityQueueCollection = new PriorityQueueCollection();

      priorityQueueCollection.setCollection(collectionA);
      assert.equal(priorityQueueCollection.peek(), queue2);

      priorityQueueCollection.setCollection(collectionB);
      assert.equal(priorityQueueCollection.peek(), null);
      done();
    });
  });
  describe('#removeAt(index)', function () {
    it('should pass', function (done) {
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1);
      const queue2 = new Queue(
         moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE,  2);
      const queue3 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(15).second(30),
        2, 15.5, QueueStatus.IN_QUEUE, 3);
      const collectionA = [queue2, queue1];
      const collectionB = [];

      let priorityQueueCollection = new PriorityQueueCollection();

      priorityQueueCollection.setCollection(collectionA);
      assert.deepEqual(priorityQueueCollection.removeAt(1), queue1);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queue2]);

      priorityQueueCollection.setCollection(collectionB);
      assert.equal(priorityQueueCollection.removeAt(1), null);
      assert.deepEqual(priorityQueueCollection.getCollection(),collectionB);
      done();
    });
  });
  describe('#insert(queue,index)', function () {
    it('should pass', function (done) {
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1);
      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE, 2);

      const queueA = new Queue(
        moment().year(2016).month('Aug').date(29).hour(16).minute(15).second(15), 1, 11, QueueStatus.IN_QUEUE, 4);

      const collectionA = [queue2, queue1];
      const collectionB = [];
      let priorityQueueCollection = new PriorityQueueCollection();

      priorityQueueCollection.setCollection(collectionA);
      priorityQueueCollection.insert(queueA, 0);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queueA, queue2, queue1]);

      priorityQueueCollection.setCollection(collectionA);
      priorityQueueCollection.insert(queueA, 1);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queue2, queueA, queue1]);

      priorityQueueCollection.setCollection(collectionB);
      priorityQueueCollection.insert(queueA, 4);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queueA]);

      done();
    })

  });
  describe('#contains(queue)', function () {
    it('should pass', function (done) {
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1,1);
      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE, 2,2);

      const collectionA = [queue2, queue1];
      const collectionB = [];
      let priorityQueueCollection = new PriorityQueueCollection();

      priorityQueueCollection.setCollection(collectionA);
      assert.equal(priorityQueueCollection.contains(queue1),1);
      priorityQueueCollection.setCollection(collectionB);
      assert.equal(priorityQueueCollection.contains(queue1),-1);

      done();
    })

  });
  describe('#sort()', function () {
    it('should pass', function (done) {
      const priorityQueueComparator = new PriorityQueueComparator();
      priorityQueueComparator.setStrategy((a,b) => a.priority - b.priority);
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1);
      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE, 2);

      const collectionA = [queue2, queue1];

      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setComparator(priorityQueueComparator);

      priorityQueueCollection.setCollection(collectionA);
      priorityQueueCollection.sort();
      assert.deepEqual(priorityQueueCollection.getCollection(),[queue1,queue2]);
      done();
    });
  });
  describe('#remove()', function () {
    it('should pass', function (done) {
      const priorityQueueComparator = new PriorityQueueComparator();
      priorityQueueComparator.setStrategy((a, b) => a.priority - b.priority);
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1, 1);
      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE, 2, 2);

      const collectionA = [queue2, queue1];
      const collectionB = [];
      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setComparator(priorityQueueComparator);

      priorityQueueCollection.setCollection(collectionA);
      priorityQueueCollection.remove(queue1);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queue2]);

      priorityQueueCollection.setCollection(collectionB);
      priorityQueueCollection.remove(queue1);
      assert.deepEqual(priorityQueueCollection.getCollection(), []);
      done();
    })
  });
  describe('#insert()', function () {
    it('should pass', function (done) {
      const priorityQueueComparator = new PriorityQueueComparator();
      priorityQueueComparator.setStrategy((a, b) => a.priority - b.priority);
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1, 1);
      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE, 2, 2);
      const queueA = new Queue(
        moment().year(2016).month('Aug').date(29).hour(16).minute(15).second(15), 1, 11, QueueStatus.IN_QUEUE, 4, 4);

      const collectionA = [queue2, queue1];
      const collectionB = [];

      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setComparator(priorityQueueComparator);

      priorityQueueCollection.setCollection(Object.assign([], collectionA));
      priorityQueueCollection.insert(queueA,0);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queueA, queue2, queue1]);

      priorityQueueCollection.setCollection(Object.assign([], collectionA));
      priorityQueueCollection.insert(queueA,1);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queue2, queueA, queue1]);

      priorityQueueCollection.setCollection(Object.assign([], collectionB));
      priorityQueueCollection.insert(queueA,4);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queueA]);
      done();
    });
  });
  describe('#enqueue(queue)', function () {
    it('should pass', function (done) {
      const priorityQueueComparator = new PriorityQueueComparator();
      priorityQueueComparator.setStrategy((a, b) => a.priority - b.priority);
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1, 1);
      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE, 2, 2);

      const queueA = new Queue(
        moment().year(2016).month('Aug').date(29).hour(15).minute(15).second(15), 1, 11, QueueStatus.IN_QUEUE, 4, 4);
      const queueB = new Queue(
        moment().year(2016).month('Aug').date(29).hour(11).minute(11).second(15), 1, 30, QueueStatus.IN_QUEUE, 5, 5);
      const queueC = new Queue(
        moment().year(2016).month('Aug').date(29).hour(23).minute(15).second(30), 1, 2, QueueStatus.IN_QUEUE, 6, 6);
      const queueD = new Queue(
        moment().year(2016).month('Aug').date(30).hour(18).minute(5).second(30), 2, 0, QueueStatus.IN_QUEUE, 7, 7);
      const collectionA = [queue2, queue1];
      const collectionB = [];

      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setComparator(priorityQueueComparator);

      priorityQueueCollection.setCollection(Object.assign([],collectionA));
      assert.equal(priorityQueueCollection.enqueue(queueA), 1);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queue2, queueA, queue1 ]);

      priorityQueueCollection.setCollection(Object.assign([],collectionA));
      assert.equal(priorityQueueCollection.enqueue(queueB), 0);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queueB ,queue2, queue1]);


      priorityQueueCollection.setCollection(Object.assign([],collectionA));
      assert.equal(priorityQueueCollection.enqueue(queueC), 2);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queue2, queue1, queueC]);

      priorityQueueCollection.setCollection(Object.assign([],collectionB));
      assert.equal(priorityQueueCollection.enqueue(queueD), 0);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queueD]);
      done();
    });
  });
  describe('#dequeue()', function () {
    it('should pass', function (done) {
      const priorityQueueComparator = new PriorityQueueComparator();
      priorityQueueComparator.setStrategy((a, b) => a.priority - b.priority);
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1, 1);
      const queue2 = new Queue(
        moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35), 1, 17, QueueStatus.IN_QUEUE, 2, 2);

      const collectionA = [queue2, queue1];
      const collectionB = [];
      let priorityQueueCollection = new PriorityQueueCollection();
      priorityQueueCollection.setComparator(priorityQueueComparator);

      priorityQueueCollection.setCollection(collectionA);
      assert.deepEqual(priorityQueueCollection.dequeue(), queue2);
      assert.deepEqual(priorityQueueCollection.getCollection(), [queue1]);

      priorityQueueCollection.setCollection(collectionB);
      assert.deepEqual(priorityQueueCollection.dequeue(), null);
      assert.deepEqual(priorityQueueCollection.getCollection(), []);
      done();
    });
  });
});

