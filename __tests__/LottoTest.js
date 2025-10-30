import Lotto from "../src/Lotto";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  // TODO: 추가 기능 구현에 따른 테스트 코드 작성
  test.each([
    { "numbers": [1,2,3,4,5,6,7], "errorMessage": "[ERROR] 로또 번호는 6개여야 합니다." },
    { "numbers": [1,2,3,4,5], "errorMessage": "[ERROR] 로또 번호는 6개여야 합니다." },
    { "numbers": [1], "errorMessage": "[ERROR] 로또 번호는 6개여야 합니다." },
    { "numbers": [1.1,2,3,4,5,6], "errorMessage": "[ERROR] 로또 번호가 유효하지 않은 수로 이루어져 있습니다." },
    { "numbers": [1,NaN,3,4,5,6], "errorMessage": "[ERROR] 로또 번호가 유효하지 않은 수로 이루어져 있습니다." },
    { "numbers": [1,2,3,Infinity,5,6], "errorMessage": "[ERROR] 로또 번호가 유효하지 않은 수로 이루어져 있습니다." },
    { "numbers": [1,2,3,4,Math.pow(2,53),6], "errorMessage": "[ERROR] 로또 번호가 유효하지 않은 수로 이루어져 있습니다." },
    { "numbers": [1,2,3,4, -Math.pow(2,53),6], "errorMessage": "[ERROR] 로또 번호가 유효하지 않은 수로 이루어져 있습니다." },
    { "numbers": [1,1,3,4,5,6], "errorMessage": "[ERROR] 로또 번호는 중복되지 않은 수로 이루어져야합니다." },
    { "numbers": [1,1,3,3,5,6], "errorMessage": "[ERROR] 로또 번호는 중복되지 않은 수로 이루어져야합니다." },
    { "numbers": [1,1,1,1,1,1], "errorMessage": "[ERROR] 로또 번호는 중복되지 않은 수로 이루어져야합니다." },
    { "numbers": [1,2,-3,4,5,6], "errorMessage": "[ERROR] 로또 번호는 1 ~ 45 사이의 값이어야 합니다" },
    { "numbers": [1,2,3,4,5,46], "errorMessage": "[ERROR] 로또 번호는 1 ~ 45 사이의 값이어야 합니다" },
    { "numbers": [1,2,3,4,55,6], "errorMessage": "[ERROR] 로또 번호는 1 ~ 45 사이의 값이어야 합니다" },
    { "numbers": [1,2,3,74,5,6], "errorMessage": "[ERROR] 로또 번호는 1 ~ 45 사이의 값이어야 합니다" },
    { "numbers": [1,2,83,4,5,6], "errorMessage": "[ERROR] 로또 번호는 1 ~ 45 사이의 값이어야 합니다" },
    { "numbers": [1,92,8,4,5,6], "errorMessage": "[ERROR] 로또 번호는 1 ~ 45 사이의 값이어야 합니다" },
    { "numbers": [0,9,8,4,5,6], "errorMessage": "[ERROR] 로또 번호는 1 ~ 45 사이의 값이어야 합니다" }
  ])("변환된 입력값 : $numbers는\n유효성 검사를 통과하지 못한다", ({numbers, errorMessage}) => {
    expect(() => new Lotto(numbers)).toThrow(errorMessage);
  });

  test("유효한 값에 대한 유효성 통과", () => {
    // given
    const validNumbers = [
      [1,2,3,4,5,6],
      [45,44,43,42,41,40],
      [1,45,2,44,3,43]
    ];

    // then
    validNumbers.forEach((numbers) => {
      expect(() => new Lotto(numbers)).not.toThrow();
    })
  });
});
