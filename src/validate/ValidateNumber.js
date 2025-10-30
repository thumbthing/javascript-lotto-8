const ERROR_MESSAGE = {
  "isNotSafeInteger": "구매 금액이 유효하지 않습니다.",
  "isTooSmall": "입력하신 금액이 너무 적어서 로또를 구매할 수 없습니다.",
  "isNotDivideEvenly": "구매 금액이 1,000으로 나누어 떨어지지 않습니다."
}

export default class ValidateNumber {
  
  constructor() {
    this.keys = [...Object.keys(ERROR_MESSAGE)];
    this.status = new Map(this.keys.map((key) => [key, false]));
  }

  #updateStatus(parsedPurchase) {
    if (!Number.isSafeInteger(parsedPurchase)) this.status.set("isNotSafeInteger", true);
    if (parsedPurchase < 1000) this.status.set("isTooSmall", true);
    if (parsedPurchase % 1000 !== 0) this.status.set("isNotDivideEvenly", true);
  }

  checkPurchaseAmount(purchaseAmount) {
    this.#updateStatus(purchaseAmount);
    const isError = [...this.status.values()].findIndex((errorStatus) => errorStatus);
    if (isError !== -1) throw new Error(`[ERROR] ${ERROR_MESSAGE[this.keys[isError]]}`);
  }
}