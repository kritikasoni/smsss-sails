class PriorityQueueComparator {
  constructor(){
  }
  compare(queueA, queueB){
    return queueB.priority - queueA.priority;
  }
}
module.exports = PriorityQueueComparator;
