import { LinkedList } from '../../lib/LinkedList';

/**
  * 缓存队列最多保留记录
  */
const CACHE_SIZE = 10;

type EndToken<T> = T | null;

class PeekIterator<T> {
  private it: any;

  //当前回退记录
  private stackPutBacks: LinkedList<T>;

  //即将消费掉的缓存，在 peek 中消费掉
  private queueCache: LinkedList<T>;

  //流的结束标记 tokeng
  private endToken: EndToken<T>

  constructor(it: any, endToken: EndToken<T>) {
    this.it = it;
    this.stackPutBacks = new LinkedList();
    this.queueCache = new LinkedList();
    this.endToken = endToken;
  }

  /**
   * 消费掉一个
   * @returns 
   */
  peek():T | null {

    if (!this.stackPutBacks.isEmpty()) {
      return this.stackPutBacks.first();
    }

    // 从 it 中消费一个并且放入 queueCache 中
    const val = this.next();
    this.putBack();
    return val;
  }

  //从 queueCache 放入到 stackPutBacks 回退记录中
  putBack() {
    if (!this.queueCache.isEmpty()) {
      this.stackPutBacks.addLast(this.queueCache.removeLast());
    }
  }

  /** 是否有下一个 */
  hashNext() {
    return !!this.endToken || !!this.peek();
  }

  /** 获取下一个 */
  next() {
    let val = null;
    // 如果回退列表有记录从回退列表中消费
    if (!this.stackPutBacks.isEmpty()) {
      val = this.stackPutBacks.removeLast();
    } else {
      //从 iterator 中消费下一个，将会放到缓存中。
      val = this.it.next().value;

      // 如果没有了
      if (val === undefined) {
        const tmp = this.endToken;
        this.endToken = null;
        return tmp;

      }
    }

    // 缓存中移除最老的 
    while (this.queueCache.size() > CACHE_SIZE - 1) {
      this.queueCache.removeFirst();
    }

    //添加到缓存
    this.queueCache.addLast(val);

    return val;
  }
}

export default PeekIterator;