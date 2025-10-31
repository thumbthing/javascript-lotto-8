import { Console } from "@woowacourse/mission-utils";

export default class PrintResult {
  static purchaseList(purchaseAmount, purchaseList) {
    const purchaseStringList = purchaseList.map((number) => `[${number.join(', ')}]`);
    const stringList = [`${purchaseAmount}개를 구매했습니다.`, ...purchaseStringList];
    const purchaseString = `\n${stringList.join("\n")}\n`;
    Console.print(purchaseString);
  }

  static lottoResult(lottoResult) {
    Console.print(lottoResult);
  }
}