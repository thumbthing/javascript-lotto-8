export default class LottoResult {
  constructor(purchaseList, lotto, bonusNumber) {
    this.purchaseList = purchaseList;
    this.lotto = lotto.get();
    this.bonusNumber = bonusNumber;
    this.status = this.#initializeStatus();
  }

  #initializeStatus() {
    const status = Array(5).fill([]).map((stat, index) => [index + 3, 0]);
    return new Map(status);
  }

  async #getSingleMatchResult(singlePurchase) {
    const combinedSet = new Set([...this.lotto, ...singlePurchase]);
    const matchCount = 6 - (combinedSet.size - 6);
    const unMatchedNumber = [...combinedSet.values()].reduce((prevValue, currentValue) => {
      if (!this.lotto.includes(currentValue)) prevValue.push(currentValue);
      return prevValue;
    }, []);
    return { matchCount, unMatchedNumber }
  }

  getMatchResult() {
    const purchaseResult = this.purchaseList.map((purchase) => {
      return this.#getSingleMatchResult(purchase);
    });
    return purchaseResult;
  }

  async #getPromiseAllResult(callbackName) {
    const promise = await Promise.all(this[callbackName]());
    return promise;
  }

  async getPurchaseResult() {
    const purchaseResult = await this.#getPromiseAllResult("getMatchResult");
    return purchaseResult;
  }
}

