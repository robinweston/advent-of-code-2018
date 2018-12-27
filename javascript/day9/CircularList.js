class CircularList {
  constructor() {
    this.currentItem = null;
  }

  forwardBy(n) {
    for (let i = 0; i < n; i++) {
      this.currentItem = this.currentItem.next;
    }
  }

  backBy(n) {
    for (let i = 0; i < n; i++) {
      this.currentItem = this.currentItem.prev;
    }
  }

  add(newItem) {
    if (!this.currentItem) {
      this.currentItem = newItem;
      this.currentItem.next = newItem;
      this.currentItem.prev = newItem;
    } else {
      this.currentItem.prev.next = newItem;
      newItem.prev = this.currentItem.prev;

      newItem.next = this.currentItem;
      this.currentItem.prev = newItem;

      this.currentItem = newItem;
    }
  }

  remove() {
    const toRemove = this.currentItem;

    toRemove.prev.next = toRemove.next;
    toRemove.next.prev = toRemove.prev;

    this.currentItem = toRemove.next;
  }

  print() {
    const temp = [this.currentItem.value];
    let item = this.currentItem.next;
    while (item !== this.currentItem) {
      temp.push(item.value);
      item = item.next;
    }
    console.log(temp);
  }
}

module.exports = CircularList;
