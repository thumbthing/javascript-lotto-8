import ValidateRawString from "../src/validate/ValidateRawString";

describe("입력값 테스트", () => {
  test("숫자 형태의 입력값일 경우 에러를 발생시키지 않음", () => {
    // given
    const numberInput = ["1", "1000", "999990", "456"];
    
    // when

    // then
    numberInput.forEach((inputString) => {
      expect(() => ValidateRawString.checkPurchaseInput(inputString))
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
    expect(() => ValidateRawString.checkPurchaseInput(input)).toThrow("[ERROR] 입력값이 숫자 형식이 아닙니다. 다시 입력해주세요");
  });

  test.each([
    ["1,2,3,4,5,6", "1자리"],
    ["10,11,13,14,15,16", "2자리-10이상 20미만"],
    ["21,24,26,29,28,29", "2자리-20이상 30미만"],
    ["30,30,30,30,30,30", "2자리-중복 숫자"],
    ["44,99,1,9,50,68", "2자리-45 이상의 값"],
    ["01,02,03,04,05,06", "앞에 0이 존재하는 값"]
  ])("입력값: %s\n%s들로 이루어진 입력값의 유효성 통과", (input, validCase) => {
    expect(() => ValidateRawString.checkWinNumberInput(input)).not.toThrow("[ERROR] 입력값이 유효하지 않습니다.");
  });

  test.each([
    ["45", "1"],
    ["45,34", "2"],
    ["1,2,3", "3"],
    ["14,15,16,17", "4"],
    ["28,29,30,41,44", "5"],
  ])("부족한 입력값 = %s\n %s개 입력시 에러 발생", (input, errorCase) => {
    expect(() => ValidateRawString.checkWinNumberInput(input)).toThrow("[ERROR] 입력값이 유효하지 않습니다.");
  });

  test.each([
    ["100,28,29,30,41,44", "1"],
    ["10,281,29,30,41,44", "2"],
    ["10,28,293,30,41,44", "3"],
    ["10,28,29,304,41,44", "4"],
    ["10,28,29,30,415,44", "5"],
    ["10,28,29,30,41,446", "6"],
    ["1001,28,29,30,41,44", "1"],
    ["10,2821,29,30,41,44", "2"],
    ["10,28,2393,30,41,44", "3"],
    ["10,28,29,4304,41,44", "4"],
    ["10,28,29,30,6415,44", "5"],
    ["10,28,29,30,41,7446", "6"],
    ["-10,28,29,30,41,44", "1"],
    ["10,28.1,29,30,41,44", "2"],
    ["10,28,27-1,30,41,44", "3"],
    ["10,28,29,NaN,41,44", "4"],
    ["10,28,29,30,Infinity,44", "5"],
    ["10,28,29,30,41,\"44\"", "6"],
  ])("2자리 수 이상의 입력값 존재 = %s\n %s번째 요소: 유효하지 않은 케이스", (input, errorCase) => {
    expect(() => ValidateRawString.checkWinNumberInput(input)).toThrow("[ERROR] 입력값이 유효하지 않습니다.");
  });

  test.each([
    ["111", "2자리수 이상"],
    ["3333", "2자리수 이상"],
    ["-1", "음수"],
    ["44.1", "소수"],
    ["44.0000001", "소수"],
    ["\0", "escape extension"],
    ["1.1", "범위내의 소수"]
  ])("입력값: %s 예외 케이스: %s 의 예외처리", (rawString, errorCase) =>{
    expect(() => ValidateRawString.checkBonusNumberInput(rawString)).toThrow("[ERROR] 입력값이 로또 번호 형식이 아닙니다. 다시 입력해주세요");
  });

  test("0 ~ 99 사이의 입력값의 유효성 검사 통과", () => {
    // given
    const validInput = ["1", "2", "0", "99", "45", "87"];

    // then
    validInput.forEach((input) => {
      expect(() => ValidateRawString.checkBonusNumberInput(input)).not.toThrow();
    });
  });
});