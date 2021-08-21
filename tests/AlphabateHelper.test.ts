import assert from 'power-assert';
import AlphabetHelper from '../src/lexer/AlphabateHelp';

test('char check', function () {
  assert(AlphabetHelper.isLetter('a'));
  assert(AlphabetHelper.isLetter('b'));
  assert(AlphabetHelper.isLetter('A'));
  assert(!AlphabetHelper.isLetter('1'));
  assert(AlphabetHelper.isOperator('*'));
  assert(AlphabetHelper.isOperator('+'));
  assert(AlphabetHelper.isOperator('-'));
  assert(AlphabetHelper.isOperator('/'));
  assert(AlphabetHelper.isOperator('>'));
  assert(AlphabetHelper.isOperator('<'));
  assert(AlphabetHelper.isOperator('='));
  assert(!AlphabetHelper.isOperator(' '));
  assert(AlphabetHelper.isNumber('1'));
  assert(AlphabetHelper.isNumber('9'));
  assert(!AlphabetHelper.isNumber('x'));
  assert(AlphabetHelper.isLiteral('_'));
  assert(AlphabetHelper.isLiteral('x'));
  assert(AlphabetHelper.isLiteral('M'));
  assert(AlphabetHelper.isLiteral('0'));

})