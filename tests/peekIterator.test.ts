import PeekIterator from '../src/common/PeekIterator';
import arrayToGenerator from '../src/common/ArrayToGenerator';


import assert from 'power-assert';

test('test_peek', () => {
  const it = new PeekIterator(arrayToGenerator([..."abcdefg"]), null)
  assert(it.next() === 'a');
  assert(it.next() === 'b');
  assert(it.peek() === 'c');
  assert(it.peek() === 'c');
  assert(it.next() === 'c');
  assert(it.next() === 'd');
})

test('test_lookhead2', () => {
  const it = new PeekIterator(arrayToGenerator([..."abcdefg"]), null)
  assert(it.next() === 'a');
  assert(it.peek() === 'b');
  assert(it.peek() === 'b');
  assert(it.next() === 'b');
  assert(it.peek() === 'c');
  assert(it.peek() === 'c');
  assert(it.next() === 'c');
  assert(it.next() === 'd');
  it.putBack();
  it.putBack();
  it.putBack();
  console.log(it.stackPutBacks);
  assert(it.peek() === 'c');
  assert(it.peek() === 'c');
  assert(it.next() === 'c');

})