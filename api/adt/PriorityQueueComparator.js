const moment = require('moment');
class PriorityQueueComparator {
  constructor(){
    this._strategy = function defaultStrategy(queueA, queueB) {
      const result = queueB.priority - queueA.priority;
      if(result == 0){
        //return time diff in seconds
        sails.log.debug('diff queueA vs queueB in minutes', moment(queueA.time).diff(moment(queueB.time),'minutes'));
        sails.log.debug('diff queueA vs queueB in seconds', moment(queueA.time).diff(moment(queueB.time),'seconds'));
        return moment(queueA.time).diff(moment(queueB.time),'seconds');
      }
      else{
        return result;
      }
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
