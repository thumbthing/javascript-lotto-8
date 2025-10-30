export default class ValidateRawString {
  static checkPurchase(purchaseInput) {
    const purchaseRegExp = /^\d+$/g
    const isValid = purchaseRegExp.test(purchaseInput);
    if (!isValid) throw new Error('[ERROR] 입력값이 숫자 형식이 아닙니다. 다시 입력해주세요')
  }
}