const PriorityQueueComparator = require('./PriorityQueueComparator');
class PriorityQueueCollection {
  constructor(){
    this._size = 0;
    this._modCount = 0;
    this._comparator = new PriorityQueueComparator();
    this._queueCollection = [];
  }
  enqueue(queue) {

  }
  dequeue() {

  }
  peek() {
    return this._queueCollection[0];
  }
  remove(queue) {

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

  }
  contains(queue) {

  }
  sort() {

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
    return this._queueCollection = collection;
  }
}

module.exports = PriorityQueueCollection;
