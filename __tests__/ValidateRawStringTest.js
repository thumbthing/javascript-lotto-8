import ValidateRawString from "../src/validate/ValidateRawString";

describe("입력값 테스트", () => {
  test("숫자 형태의 입력값일 경우 에러를 발생시키지 않음", () => {
    // given
    const numberInput = ["1", "1000", "999990", "456"];
    
    // when

    // then
    numberInput.forEach((inputString) => {
      expect(() => ValidateRawString.checkPurchase(inputString))
        .not.toThrow('[ERROR] 입력값이 숫자 형식이 아닙니다. 다시 입력해주세요')
    });
  });

  test.each([
    ["-1000", "음수인 경우"],
    ["9000.1", "소수인 경우"],
    ["8000000+1000", "수식이 포함된 경우"],
    ["8000000-1000", "수식이 포함된 경우"],
    ["8000000*1000", "수식이 포함된 경우"],
    ["8000000/1000", "수식이 포함된 경우"],
    ["(70000-1000)", "수식이 포함된 경우"],
    ["1e+99999", "메모리에 저장될 때 자동 변환되어 안전 범위를 초과하는 경우"],
    ["9천", "텍스트로 수를 지정한 경우"]
  ])("입력값 = %s , 케이스 = %s", (input, inValidCase) => {
    expect(() => ValidateRawString.checkPurchase(input)).toThrow("[ERROR] 입력값이 숫자 형식이 아닙니다. 다시 입력해주세요");
  });
});