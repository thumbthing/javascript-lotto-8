import InputParser from "../src/parse/InputParser";

describe("변환 테스트", () => {
  test.each([
    ["1", 1],
    ["1000", 1000],
    ["999999999999999", 999999999999999],
    ["3001", 3001],
    ["삼천", NaN],
    ["-1000", -1000],
  ])("문자열 \"%s\" => 숫자 %d 로 변환", (userInput, expected) => {
    // when
    const result = InputParser.toNumber(userInput);

    // then
    expect(result).toBe(expected);
  });
});