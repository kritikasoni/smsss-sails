const PriorityQueueComparator = require('./PriorityQueueComparator');
class PriorityQueueCollection {
  constructor(){
    this._size = 0;
    this._modCount = 0;
    this._comparator = new PriorityQueueComparator();
    this._queueCollection = [];
  }
  enqueue(queue) {
    let targetIndex = this._queueCollection.length;
    for(let i = this._queueCollection.length - 1; i >= 0; i--){
      // sails.log.debug('compare queue in index',i,':',this._queueCollection[i],'and',queue);
      // sails.log.debug('result',this._comparator.compare(this._queueCollection[i],queue));
      if(this._comparator.compare(this._queueCollection[i],queue) > 0){
        // sails.log.debug('index is now',i);
        targetIndex = i;
      }
      else{
        break;
      }
    }
    if(this._queueCollection.length == 0){
      this._queueCollection.push(queue);
      ++targetIndex;
      this._size++;
      return targetIndex;
    }
    else if(targetIndex == 0){
      this.insert(queue,targetIndex + 1);
      return targetIndex + 1;
    }
    else {
      //insert after the higher one
      this.insert(queue,targetIndex);
      return targetIndex;
    }

  }

  dequeue() {
    const dequeued = this._queueCollection.shift();
    this._size--;
    return dequeued ? dequeued : null;
  }
  peek() {
    return this._queueCollection[0];
  }
  remove(queue) {
    const removeIndex = this.contains(queue);
    if(removeIndex > -1){
      this.removeAt(removeIndex);
    }
  }
  removeAt(index) {
    const temp = this._queueCollection[index] ? Object.assign({},this._queueCollection[index]) : null;
    this._queueCollection.splice(index,1);
    this._size--;
    return temp;
  }
  clear () {
    this._queueCollection = [];
    this.size = 0;
  }
  insert(queue, index) {
    this._queueCollection.splice(index,0,queue);
    this._size++;
  }
  contains(queue) {
    return this._queueCollection.findIndex(q => {return q.equals(queue);});
  }
  sort() {
    this._queueCollection = this._queueCollection.sort((queueA,queueB) => this._comparator.compare(queueA,queueB));
  }
  getSize() {
    return this.size;
  }
  getModCount() {
    return this._modCount;
  }
  getComparator(){
    return this._comparator;
  }
  setComparator(comparator){
    this._comparator = comparator;
  }
  getCollection(){
    return this._queueCollection;
  }
  setCollection(collection){
    return this._queueCollection = Object.assign([],collection);
  }
}

module.exports = PriorityQueueCollection;
