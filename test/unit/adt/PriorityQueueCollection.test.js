const assert = require('chai').assert;
const PriorityQueueCollection = require('./../../../api/adt/PriorityQueueCollection');
const moment = require('moment');
const QueueStatus = require('./../../../api/adt/QueueStatus');
const Queue = require('./../../../api/adt/Queue');

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
  })
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
  })
});

