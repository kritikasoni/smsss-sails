
class PriorityQueueComparator {
  constructor(){
    this._strategy = function defaultStrategy(queueA, queueB) {
      return queueB.priority - queueA.priority;
    };
  }
  compare(queueA, queueB){
    return this._strategy(queueA,queueB);
  }
  setStrategy(strategy){
    this._strategy = strategy.bind(this);
  }
}
module.exports = PriorityQueueComparator;
