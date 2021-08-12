/**
 * 双向链
 */
export class DoubleNode<E> {
  constructor(
    public item: E,                               // 当前节点
    public previous: DoubleNode<E> | null,        // 上个节点
    public next: DoubleNode<E> | null             // 下个节点
  ) {}
}

/** 双向链表 */
export class LinkedList<E> {
  private _size = 0                               //size
  private _first: DoubleNode<E> | null = null     //第一个节点
  private _last: DoubleNode<E> | null = null      //最后一个节点

  isEmpty() {
    return this._size === 0
  }

  size() {
    return this._size
  }

  first(): E | null {
    return this._first?.item ?? null
  }

  firstNode(): DoubleNode<E> | null {
    return this._first
  }

  last(): E | null {
    return this._last?.item ?? null
  }

  lastNode(): DoubleNode<E> | null {
    return this._last
  }

  get(index: number): E | null {
    if (this.isEmpty()) return null

    if (index < 0 || index >= this._size) {
      throw new Error('Index must be between 0 and ' + (this._size - 1))
    }

    let current = this._first
    let count = 0

    while (count !== index) {
      current = current!.next
      count++
    }

    return current!.item
  }

  addFirst(item: E) {
    const oldFirst = this._first

    const doubleNode = new DoubleNode<E>(item, null, null)
    this._first = doubleNode
    this._first.next = oldFirst

    if (!this.isEmpty()) {
      this._first.previous = oldFirst!.previous
      oldFirst!.previous = this._first
    } else {
      this._last = this._first
      this._first.previous = this._last
    }

    this._last!.next = this._first
    this._size++
  }

  addLast(item: E) {
    const oldLast = this._last

    this._last = new DoubleNode(item, oldLast, null)

    if (!this.isEmpty()) {
      this._last.next = oldLast!.next
      oldLast!.next = this._last
    } else {
      this._first = this._last
      this._last.next = this._first
    }

    this._first!.previous = this._last
    this._size++
  }

  removeFirst(): E | null {
    if (this.isEmpty()) return null

    const item = this._first!.item

    if (this._size > 1) {
      this._first!.next!.previous = this._first!.previous
      this._first!.previous!.next = this._first!.next
      this._first = this._first!.next
    } else {
      this._first = null
      this._last = null
    }

    this._size--

    return item
  }

  removeLast(): E | null {
    if (this.isEmpty()) return null

    const item = this._last!.item

    if (this._size > 1) {
      this._last!.previous!.next = this._last!.next
      this._last!.next!.previous = this._last!.previous
      this._last = this._last!.previous
    } else {
      this._first = null
      this._last = null
    }

    this._size--
    return item
  }

  removeAtIndex(nodeIndex: number): E | null {
    if (this.isEmpty()) return null

    if (nodeIndex < 0 || nodeIndex >= this._size) {
      throw new Error('Index must be between 0 and ' + (this._size - 1))
    }

    const startFromTheBeginning = nodeIndex <= this._size / 2

    let index = startFromTheBeginning ? 0 : this._size - 1

    let currentNode = startFromTheBeginning ? this._first : this._last

    while (true) {
      if (nodeIndex === index) {
        break
      }

      if (startFromTheBeginning) index++
      else index--

      currentNode = startFromTheBeginning
        ? currentNode!.next
        : currentNode!.previous
    }

    const item = currentNode!.item
    this.removeItemWithNode(currentNode!)

    return item
  }

  insertBeforeItem(beforeItem: DoubleNode<E>, item: E) {
    if (this.isEmpty()) return

    const node = new DoubleNode<E>(item, beforeItem.previous, beforeItem)
    beforeItem.previous!.next = node
    beforeItem.previous = node
  }

  addAtIndex(nodeIndex: number, item: E) {
    if (nodeIndex < 0 || nodeIndex > this._size) {
      throw new Error('Index must be between 0 and ' + (this._size - 1))
    }
    if (this.isEmpty()) {
      this.addFirst(item)
      return
    }
    if (nodeIndex === this._size) {
      this.addLast(item)
      return
    }

    const startFromTheBeginning = nodeIndex <= this._size / 2

    let index = startFromTheBeginning ? 0 : this._size - 1

    let currentNode = startFromTheBeginning ? this._first : this._last

    while (true) {
      if (nodeIndex === index) {
        break
      }

      if (startFromTheBeginning) index++
      else index--

      currentNode = startFromTheBeginning
        ? currentNode!.next
        : currentNode!.previous
    }

    this.insertBeforeItem(currentNode!, item)
    this._size++
  }

  removeItemWithNode(doubleNode: DoubleNode<E>) {
    if (!doubleNode) {
      throw new Error('Node cannot be null')
    }

    if (this.isEmpty()) return

    if (doubleNode === this._first && this._first === this._last) {
      this._first = null
      this._last = null
      this._size--
      return
    }

    const previousNode = doubleNode!.previous
    const nextNode = doubleNode!.next

    previousNode!.next = nextNode
    nextNode!.previous = previousNode

    if (doubleNode === this._first) {
      this._first = nextNode
    }

    if (doubleNode === this._last) {
      this._last = previousNode
    }

    this._size--
  }

  removeItem(item: E) {
    if (this.isEmpty()) return

    let currentNode = this._first!

    while (currentNode !== this._last) {
      if (currentNode.item === item) {
        this.removeItemWithNode(currentNode)
        return
      }

      currentNode = currentNode.next!
    }

    if (currentNode.item === item) {
      this.removeLast()
    }
  }

  contains(item: E) {
    if (this.isEmpty()) return false
    let currentNode = this._first

    for (let i = 0; i < this._size; i++) {
      if (currentNode?.item === item) return true
      currentNode = currentNode!.next
    }

    return false
  }

  /** 实现遍历迭代器 */
  *[Symbol.iterator]() {
    let currentNode = this._first
    for (let i = 0; i < this._size; i++) {
      yield currentNode?.item
      currentNode = currentNode!.next
    }
  }

  toString() {
    const ret = []

    for (const node of this) {
      ret.push(node)
    }

    return ret.join('->')
  }
}
