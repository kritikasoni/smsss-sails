const assert = require('chai').assert;
const moment = require('moment');
const PriorityQueueComparator = require('./../../../api/adt/PriorityQueueComparator');
const QueueStatus = require('./../../../api/adt/QueueStatus');
const Queue = require('./../../../api/adt/Queue');
describe('PriorityQueueComparatorTest', function() {

  describe('#compare()', function() {
    it('should clear size and collection', function (done) {
      const queue1 = new Queue(moment().year(2016).month('Aug').date(29).hour(21).minute(10).second(25),
        1, 10, QueueStatus.CURRENT, 1);
      const queue2 = {time: moment().year(2016).month('Aug').date(29).hour(21).minute(11).second(35),
        room: 1, priority: 17, status: QueueStatus.IN_QUEUE, patient: 2
      };
      const queue3 = {time: moment().year(2016).month('Aug').date(29).hour(21).minute(15).second(30),
        room: 2, priority: 15.5, status: QueueStatus.IN_QUEUE, patient: 3
      };
      const piorityQueueComparator = new PriorityQueueComparator();
      assert.equal(piorityQueueComparator.compare(queue1, queue2), 7, 'should get positive number of 7')

      done();
    });
  });
});

