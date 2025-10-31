export default class LottoResult {
  constructor(purchaseList, lotto, bonusNumber) {
    this.purchaseList = purchaseList;
    this.lotto = lotto.get();
    this.bonusNumber = bonusNumber;
    this.status = this.#initializeStatus();
  }

  // 당첨 기록 초기화
  #initializeStatus() {
    const status = Array(5).fill([]).map((stat, index) => [index + 3, 0]);
    return new Map(status);
  }

  // 구매 목록의 요소의 단일 변환
  async #getSingleMatchResult(singlePurchase) {
    const combinedSet = new Set([...this.lotto, ...singlePurchase]);
    const matchCount = 6 - (combinedSet.size - 6);
    const unMatchedNumber = [...combinedSet.values()].reduce((prevValue, currentValue) => {
      if (!this.lotto.includes(currentValue)) prevValue.push(currentValue);
      return prevValue;
    }, []);
    return { matchCount, unMatchedNumber }
  }

  // 구매 목록 => 당첨 기록 변환
  getMatchResult() {
    const purchaseResult = this.purchaseList.map((purchase) => {
      return this.#getSingleMatchResult(purchase);
    });
    return purchaseResult;
  }

  // 비동기로 실행할 순회 기능 처리
  async #getPromiseAllResult(callbackName) {
    const promise = await Promise.all(this[callbackName]());
    return promise;
  }

  // 당첨 기록 생성
  async getPurchaseResult() {
    const purchaseResult = await this.#getPromiseAllResult("getMatchResult");
    return purchaseResult;
  }
}

