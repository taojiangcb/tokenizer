import TokenType from './TokenType';
import PeekIterator from '../common/PeekIterator';
import AlphabetHelper from './AlphabateHelp';
import { Keywords } from './Keywords';
import LexicalException from './LexicalException';



export default class Token {
  private type: TokenType;
  private value: string;
  constructor(type: TokenType, value: string) {
    this.type = type;
    this.value = value;
  }

  getType(): TokenType {
    return this.type;
  }

  isVariable(): boolean {
    return this.type === TokenType.VARIABLE;
  }

  isScalar(): boolean {
    return this.type === TokenType.FLOAT
      || this.type === TokenType.INTEGER
      || this.type === TokenType.BOOLEAN
      || this.type === TokenType.STRING
  }

  toString() {
    return `type:${this.type},value:${this.value}`;
  }

  /**
   * 匹配关键字或者变量
   * @param it 
   * @returns 
   */
  static makeVarOrKeyword(it: PeekIterator<string>): Token {
    let s = '';
    // 字面量，字符收集过程
    while (it.hasNext()) {
      const lookhead = it.peek();
      if (AlphabetHelper.isLiteral(lookhead)) {
        s += lookhead;
      } else break;
    }

    // 关键字
    if (Keywords.isKeyword(s)) {
      return new Token(TokenType.KEYWORD, s);
    }

    // boolean 值
    if (s === 'true' || s === 'false') {
      return new Token(TokenType.BOOLEAN, s);
    }

    // 变量名称
    return new Token(TokenType.VARIABLE, s);
  }

  /**
   * 匹配字符
   * @param it 
   * @returns 
   */
  static makeString(it: PeekIterator<string>): Token {
    let s = '';
    let state = 0;
    while (it.hasNext()) {
      const char = it.next();
      switch (state) {
        case 0:
          if (char === '"') state = 1;
          else state = 2;
          s += char;
          break;
        case 1:
          if (char === '"') {
            return new Token(TokenType.STRING, s);
          } else {
            s += char;
          }
          break;
        case 2:
          if (char === "'") {
            return new Token(TokenType.STRING, s);
          } else {
            s += char;
          }
          break;
      }

      throw new LexicalException('Unexpected error');
    }
  }

  static makeOp(it: PeekIterator<string>): Token {
    let state = 0;
    while (it.hasNext()) {
      const lookahead = it.next();
      switch (state) {
        case 0:
          switch (lookahead) {
            case '+':
              state = 1
              break
            case '-':
              state = 2
              break
            case '*':
              state = 3
              break
            case '/':
              state = 4
              break
            case '>':
              state = 5
              break
            case '<':
              state = 6
              break
            case '=':
              state = 7
              break
            case '!':
              state = 8
              break
            case '&':
              state = 9
              break
            case '|':
              state = 10
              break
            case '^':
              state = 11
              break
            case '%':
              state = 12
              break
            case ',':
              return new Token(TokenType.OPERATOR, ',')
            case ';':
              return new Token(TokenType.OPERATOR, ';')
          }
          break;
        case 1:
          if (lookahead === '+') {
            return new Token(TokenType.OPERATOR, '++')
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '+=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '+')
          }
        case 2:
          if (lookahead === '-') {
            return new Token(TokenType.OPERATOR, '--')
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '-=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '-')
          }
        case 3:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '*=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '*')
          }
        case 4:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '/=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '/')
          }
        case 5:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '>=')
          } else if (lookahead === '>') {
            return new Token(TokenType.OPERATOR, '>>')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '>')
          }
        case 6:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '<=')
          } else if (lookahead === '<') {
            return new Token(TokenType.OPERATOR, '<<')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '<')
          }
        case 7:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '==')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '=')
          }
        case 8:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '!=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '!')
          }
        case 9:
          if (lookahead === '&') {
            return new Token(TokenType.OPERATOR, '&&')
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '&=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '&')
          }
        case 10:
          if (lookahead === '|') {
            return new Token(TokenType.OPERATOR, '||')
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '|=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '|')
          }
        case 11:
          if (lookahead === '^') {
            return new Token(TokenType.OPERATOR, '^^')
          } else if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '^=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '^')
          }
        case 12:
          if (lookahead === '=') {
            return new Token(TokenType.OPERATOR, '%=')
          } else {
            it.putBack()
            return new Token(TokenType.OPERATOR, '%')
          }
      }
    }

    throw new LexicalException('Unexpected error');
  }
}
