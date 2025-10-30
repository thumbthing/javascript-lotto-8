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

  test.each([
    { "input": "1,2,3,4,5,6", "parsed": [1,2,3,4,5,6]},
    { "input": "01,02,03,04,05,06", "parsed": [1,2,3,4,5,6]},
    { "input": "11,22,33,44,55,66", "parsed": [11,22,33,44,55,66]},
    { "input": "99,1,88,22,77,33", "parsed": [99,1,88,22,77,33]}
  ])("입력값 : $input 의 숫자 배열로 변환 : $parsed", ({input, parsed}) => {
    // when
    const parsedInput = InputParser.splitWinNumber(input);

    // then
    parsedInput.forEach((num, index) => {
      expect(num).toBe(parsed[index])
    }, parsed)
  });
});