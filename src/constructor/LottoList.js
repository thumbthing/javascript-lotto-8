import { Random } from "@woowacourse/mission-utils";

export default class LottoList {
  constructor(purchaseAmount) {
    this.purchaseAmount = purchaseAmount;
  }

  #getSixRandomNumbers() {
    const number = Random.pickUniqueNumbersInRange(1, 45, 6);
    return number;
  }

  #sortByASC(number) {
    return number.toSorted((a, b) => a - b);
  }

  async createList() {
    const emptyList = Array(this.purchaseAmount).fill();
    const lottoList = await Promise.all(emptyList.map(() => {
      const number =  this.#getSixRandomNumbers();
      return this.#sortByASC(number);
    }));
    return lottoList
  } 
}