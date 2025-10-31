const LOTTO_RESULT_STRING = [
  "3개 일치 (5,000원) - ",
  "4개 일치 (50,000원) - ",
  "5개 일치 (1,500,000원) - ",
  "5개 일치, 보너스 볼 일치 (30,000,000원) - ",
  "6개 일치 (2,000,000,000원) - ",
  "총 수익률은 "
];

export default class ResultString {
  static createStringList(matchResult, earningRate) {
    const stringList = LOTTO_RESULT_STRING.map((string, index) => {
      if (index === LOTTO_RESULT_STRING.length -1) return `${string}${earningRate}%입니다.`;
      return `${string}${[...matchResult.values()][index]}개`
    },[matchResult, earningRate]);
    return stringList;
  }

  static matchString(matchResult, earningRate) {
    const stringList = this.createStringList(matchResult, earningRate);
    stringList.unshift("\n당첨 통계", "---");
    const result = stringList.join("\n");
    return result;
  }
}