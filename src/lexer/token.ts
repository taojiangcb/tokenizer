import TokenType from './TokenType';
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
}