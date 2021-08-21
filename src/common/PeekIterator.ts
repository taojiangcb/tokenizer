import { LinkedList } from '../../lib/LinkedList';

/**
  * 缓存队列最多保留记录
  */
const CACHE_SIZE = 10;

type EndToken<T> = T | null;

/**
 * 字符流处理
 *   peek = it -> queueCache -> stackPutBacks
 *   next = 销毁上一次的 peek 存储的 starckPutBacks 的值。
 */
class PeekIterator<T> {
  private it: any;

  /**
   * 在 peek 中取出 queueCache 最后的元素存放到 stackPutBacks
   * stackPutBack 为了实现 peek 方法准的，就是为了存储一次外部调用 next() 的结果
   */
  public stackPutBacks: LinkedList<T>;

  //即将消费掉的缓存，在 peek 中消费掉
  private queueCache: LinkedList<T>;

  //流的结束标记 tokeng
  private endToken: EndToken<T>

  constructor(it: any, endToken: EndToken<T> = null) {
    this.it = it;
    this.stackPutBacks = new LinkedList();
    this.queueCache = new LinkedList();
    this.endToken = endToken;
  }

  /**
   * 查看下一个 next() 返回的结果，然后放入到 putback 缓存中
   *  在下一次 call next 的时候会 remoteList() 销毁上一次 peek 中存入的缓存
   * 大白话就是看一下 下一个 next 是啥
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
  hasNext() {
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