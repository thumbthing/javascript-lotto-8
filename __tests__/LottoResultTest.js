import LottoResult from "../src/constructor/LottoResult";
import Lotto from "../src/Lotto.js";

describe("당첨 기록", () => {
  test("구매목록의 일치된 기록 생성", async () => {
    // given
    const purchaseList = [
      [1,2,3,4,5,6],
      [1,2,3,4,5,7],
      [1,2,3,4,5,8],
      [1,2,3,4,7,8],
      [1,2,3,7,8,9],
      [1,2,7,8,9,10],
      [1,7,8,9,10,11],
      [7,8,9,10,11,12]
    ];
    const lotto = new Lotto([1,2,3,4,5,6]);
    const bonusNumber = 7;
    const lottoResult = new LottoResult(purchaseList, lotto, bonusNumber);
    const expectedList = [
      {"matchCount": 6,"unMatchedNumber": []},
      {"matchCount": 5,"unMatchedNumber": [7]},
      {"matchCount": 5,"unMatchedNumber": [8]},
      {"matchCount": 4,"unMatchedNumber": [7,8]},
      {"matchCount": 3,"unMatchedNumber": [7,8,9]},
      {"matchCount": 2,"unMatchedNumber": [7,8,9,10]},
      {"matchCount": 1,"unMatchedNumber": [7,8,9,10,11]},
      {"matchCount": 0,"unMatchedNumber": [7,8,9,10,11,12]},
    ]
    
    // when
    const matchResult = await lottoResult.getMatchList();

    // then
    matchResult.forEach((result, index) => {
      expect(result.matchCount).toBe(expectedList[index].matchCount);
      expect(result.unMatchedNumber).toEqual(expectedList[index].unMatchedNumber);
    });
  });

  test("3개 이상 일치하는 당첨 목록 생성", async () => {
    // given
    const purchaseList = [
      [1,2,3,4,5,6],
      [1,2,3,4,5,7],
      [1,2,3,4,5,8],
      [1,2,3,4,7,8],
      [1,2,3,7,8,9],
      [1,2,7,8,9,10],
      [1,7,8,9,10,11],
      [7,8,9,10,11,12]
    ];
    const lotto = new Lotto([1,2,3,4,5,6]);
    const bonusNumber = 7;
    const lottoResult = new LottoResult(purchaseList, lotto, bonusNumber);
    const expectedList = [
      {"matchCount": 6,"unMatchedNumber": []},
      {"matchCount": 5,"unMatchedNumber": [7]},
      {"matchCount": 5,"unMatchedNumber": [8]},
      {"matchCount": 4,"unMatchedNumber": [7,8]},
      {"matchCount": 3,"unMatchedNumber": [7,8,9]},
    ]
    
    // when
    const matchResult = await lottoResult.getMatchList();
    const filterdResult = await lottoResult.filterMatchList(matchResult);
    // then
    expect(filterdResult.length).toBe(expectedList.length);
  });

    test("최신화된 당첨 기록 생성", async () => {
    // given
    const purchaseList = [
      [1,2,3,4,5,6],
      [1,2,3,4,5,6],
      [1,2,3,4,5,6],
      [1,2,3,4,5,7],
      [1,2,3,4,5,8],
      [1,2,3,4,7,8],
      [1,2,3,7,8,9],
      [1,2,7,8,9,10],
      [1,7,8,9,10,11],
      [7,8,9,10,11,12]
    ];
    const lotto = new Lotto([1,2,3,4,5,6]);
    const bonusNumber = 7;
    const lottoResult = new LottoResult(purchaseList, lotto, bonusNumber);
    const expectedStatus = new Map([
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 3],
    ])
    
    // when
    const matchResult = await lottoResult.getMatchList();
    const matchList = await lottoResult.filterMatchList(matchResult);
    
    const matchStatus = await lottoResult.getUpdatedResultStatus(matchList);
    // then
    
    matchStatus.forEach((sum, key) => {
      expect(sum).toBe(expectedStatus.get(key));
    });
  });

  test("최신화된 당첨 기록 생성", async () => {
    // given
    const purchaseList = [
      [1,2,3,4,5,6],
      [1,2,3,4,5,6],
      [1,2,3,4,5,6],
      [1,2,3,4,5,7],
      [1,2,3,4,5,8],
      [1,2,3,4,7,8],
      [1,2,3,7,8,9],
      [1,2,7,8,9,10],
      [1,7,8,9,10,11],
      [7,8,9,10,11,12]
    ];
    const lotto = new Lotto([1,2,3,4,5,6]);
    const bonusNumber = 7;
    const lottoResult = new LottoResult(purchaseList, lotto, bonusNumber);
    const expectedStatus = new Map([
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 3],
    ])
    
    // when
    const matchList = await lottoResult.getMatchList();
    const filterdList = await lottoResult.filterMatchList(matchList);
    
    const matchResult = await lottoResult.getUpdatedResultStatus(filterdList);

    // then
    
    matchResult.forEach((sum, key) => {
      expect(sum).toBe(expectedStatus.get(key));
    });
  });

  test("로또 수익률 생성", async () => {
    // given
    const purchaseList = [
      [1,2,3,4,5,6],
      [1,2,3,4,5,7],
      [1,2,3,4,5,8],
      [1,2,3,4,7,8],
      [1,2,3,7,8,9],
      [1,2,7,8,9,10],
      [1,7,8,9,10,11],
      [7,8,9,10,11,12]
    ];
    const lotto = new Lotto([1,2,3,4,5,6]);
    const bonusNumber = 7;
    const lottoResult = new LottoResult(purchaseList, lotto, bonusNumber);
    const expectedStatus = new Map([
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
    ])
    const expectedSum = 2031555000;
    const expectedRate = Number.parseFloat(expectedSum / (purchaseList.length * 1000) * 100).toFixed(1);
    
    // when
    const matchList = await lottoResult.getMatchList();
    const filterdList = await lottoResult.filterMatchList(matchList);
    const matchResult = await lottoResult.getUpdatedResultStatus(filterdList);
    const earningRate = await lottoResult.getEarningRate(matchResult, matchList);

    // then
    expect(earningRate).toBe(expectedRate);
  });
});