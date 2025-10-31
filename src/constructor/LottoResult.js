const LOTTO_WINNING_VALUE = new Map([
  [3, 5000],
  [4, 50000],
  [5, 1500000],
  [6, 30000000],
  [7, 2000000000],
]);

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

  // 비동기로 실행할 순회 기능 처리
  async #getPromiseAllResult(callbackName, parameter) {
    const promise = await Promise.all(await this[callbackName](parameter));
    return promise;
  }

  // 1. 당첨 목록 생성
  async getMatchList() {
    const matchList = await this.#getPromiseAllResult("createMatchList");
    return matchList;
  }

  // 1-1 구매 목록의 요소의 단일 변환
  async #getSingleMatchResult(singlePurchase) {
    const combinedSet = new Set([...this.lotto, ...singlePurchase]);
    const matchCount = 6 - (combinedSet.size - 6);
    const unMatchedNumber = [...combinedSet.values()].reduce((prevValue, currentValue) => {
      if (!this.lotto.includes(currentValue)) prevValue.push(currentValue);
      return prevValue;
    }, []);
    return { matchCount, unMatchedNumber }
  }

  // 1-2 구매 목록 => 당첨 목록 변환
  createMatchList() {
    const matchList = this.purchaseList.map((purchase) => {
      return this.#getSingleMatchResult(purchase);
    });
    return matchList;
  }

  // 2 기록할 필요 없는 당첨 목록 필터링
  async filterMatchList(matchList) {
    const filterdList = matchList.filter((match) => {
      return match.matchCount >= 3;
    });
    return filterdList;
  }
  
    // 3. 당첨 목록으로 당첨 기록 최신화
  async getUpdatedResultStatus(matchList) {
    const matchStatus = await this.#getPromiseAllResult("updateStatusByMatchList", matchList);
    return new Map(matchStatus);
  }

  // 3-1 당첨 기록의 key를 생성
  declareStatusKey(match) {
    let statusKey = match.matchCount;
    if (match.matchCount === 5 && match.unMatchedNumber[0] === this.bonusNumber) statusKey += 1;
    if (match.matchCount === 6) statusKey += 1;
    return statusKey;
  }

  // 3-2 생성된 key로 당첨 결과 최신화
  updateStatus(statusKey) {
    const currentResultSum = this.status.get(statusKey);
    this.status.set(statusKey, currentResultSum + 1);
  }

  // 3-3 필터링 된 당첨 기록을 순회
  async updateStatusByMatchList(matchList) {
    matchList.forEach((match) => {
      const statusKey = this.declareStatusKey(match);
      this.updateStatus(statusKey);
    });
    return this.status;
  }

  // 4. 당첨 수익률 계산
  async getEarningRate(matchResult, matchList) {
    let totalPrice = 0;
    matchResult.forEach((value, key) => {
      totalPrice += (LOTTO_WINNING_VALUE.get(key) * value);
    });
    const earningRate = Number.parseFloat(totalPrice / matchList.length).toFixed(2);
    return earningRate;
  }

  // 5. 당첨 결과 반환
  async getMatchResult() {
    const matchList = await this.getMatchList();
    const filteredMatchList = await this.filterMatchList(matchList);
    const matchResult = await this.getUpdatedResultStatus(filteredMatchList);
    const earningRate = await this.getEarningRate(matchResult, matchList);
    return { matchResult, earningRate };
  }
}