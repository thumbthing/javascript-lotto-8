import LottoList from "../src/constructor/LottoList.js";

describe("구매 목록 테스트", () => {
  test.each([
    {purchaseAmount: 3, expectedLength: 3},
    {purchaseAmount: 999, expectedLength: 999},
    {purchaseAmount: 1, expectedLength: 1},
  ])("구매횟수: $purchaseAmount 와 동일한 길이($expectedLength)\n배열내 요소의 길이가 6\n요소들의 중복이 존재하지 않는 요소 생성", ({purchaseAmount, expectedLength}) => {
    // given
    const expectedSingleLottoLength = 6;

    // when
    const lottoList = new LottoList(purchaseAmount);

    // then
    expect(lottoList.length).toBe(expectedLength);
    lottoList.forEach((lotto) => {
      expect(lotto.length).toBe(expectedSingleLottoLength);
      expect(new Set(lotto).size).toBe(expectedSingleLottoLength);
    })
  });
});