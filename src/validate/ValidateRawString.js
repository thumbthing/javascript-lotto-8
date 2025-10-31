export default class ValidateRawString {
  static checkPurchaseInput(purchaseInput) {
    const purchaseRegExp = /^\d+$/g;
    const isValid = purchaseRegExp.test(purchaseInput);
    if (!isValid) throw new Error('[ERROR] 입력값이 숫자 형식이 아닙니다. 다시 입력해주세요');
  }

  static checkWinNumberInput(winNumberInput) {
    const pattern = '(?:\\d{0,1})(?:\\d{1,1})';
    const patternList = `^${Array(6).fill(pattern).join(',')}$`
    const winNumberRegExp = new RegExp(patternList);
    const isValid = winNumberRegExp.test(winNumberInput);
    if (!isValid) throw new Error('[ERROR] 입력값이 유효하지 않습니다.');
  }

  static checkBonusNumberInput(bonusNumberInput) {
    const bonusNumberRegExp = /^(?:\d{0,1})(?:\d{1,1})$/g;
    const isValid = bonusNumberRegExp.test(bonusNumberInput);
    if (!isValid) throw new Error('[ERROR] 입력값이 로또 번호 형식이 아닙니다. 다시 입력해주세요');
  }
}