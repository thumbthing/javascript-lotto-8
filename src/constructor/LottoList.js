import { Random } from "@woowacourse/mission-utils";

export default class LottoList {
  constructor(purchaseAmount) {
    this.lotto = this.#createList(purchaseAmount);
    return this.lotto;
  }

  #getSixRandomNumbers() {
    const number = Random.pickUniqueNumbersInRange(1, 45, 6);
    return number;
  }

  #createList(purchaseAmount) {
    const lotto = Array(purchaseAmount).map(() => {
      const number = this.#getSixRandomNumbers()
      return number;
    });
    return lotto;
  }
}