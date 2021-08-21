export class Keywords {
  private static keyworkds:Set<string> = new Set([
    'var','if','else','for','while','break','func','return','continue'
  ])

  static isKeyword(word:string):boolean {
    return this.keyworkds.has(word);
  }
}