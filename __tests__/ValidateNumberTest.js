import ValidateNumber from "../src/validate/ValidateNumber.js";

describe("변환값 테스트", () => {
  test.each([
    [NaN, "구매 금액이 유효하지 않습니다."],
    [Math.pow(2, 53), "구매 금액이 유효하지 않습니다."],
    [1000.1, "구매 금액이 유효하지 않습니다."],
    [999000.0000001, "구매 금액이 유효하지 않습니다."],
    [-6000.0000001, "구매 금액이 유효하지 않습니다."],
    [999, "입력하신 금액이 너무 적어서 로또를 구매할 수 없습니다."],
    [-1000, "입력하신 금액이 너무 적어서 로또를 구매할 수 없습니다."],
    [1999, "구매 금액이 1,000으로 나누어 떨어지지 않습니다."],
  ])("변환값: %d, 생성된 에러: %s", (parsedAmount, errorMessage) => {
    // when
    const validateChecker = new ValidateNumber();

    // then
    expect(() => validateChecker.checkPurchaseAmount(parsedAmount)).toThrow(new Error(`[ERROR] ${errorMessage}`));
  });
})