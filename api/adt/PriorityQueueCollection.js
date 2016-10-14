const PriorityQueueComparator = require('./PriorityQueueComparator');
class PriorityQueueCollection {
  constructor(){
    this._size = 0;
    this._modCount = 0;
    this._comparator = new PriorityQueueComparator();
    this._queueCollection = [];
  }
  enqueue(queue) {
    const index = this._queueCollection.findIndex(q => this._comparator.compare(q,queue) >= 0);
    if(!index) this._queueCollection.push(queue);
    else{
      //insert after the higher one
      this.insert(queue,index + 1);
    }
  }

  dequeue() {
    const dequeued = this._queueCollection.shift();
    return dequeued ? dequeued : null;
  }
  peek() {
    return this._queueCollection[0];
  }
  remove(queue) {
    if(this.contains(queue)){
      this.removeAt(this.contains(queue));
    }
  }
  removeAt(index) {
    const temp = this._queueCollection[index] ? Object.assign({},this._queueCollection[index]) : null;
    this._queueCollection.splice(index,1);
    return temp;
  }
  clear () {
    this._queueCollection = [];
    this.size = 0;
  }
  insert(queue, index) {
    this._queueCollection.splice(index,0,queue);
  }
  contains(queue) {
    return this._queueCollection.findIndex(queue.equals);
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
