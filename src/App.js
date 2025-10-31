import { Console } from "@woowacourse/mission-utils";
import UserInput from "./UI/UserInput.js";
import ValidateRawString from "./validate/ValidateRawString.js";
import InputParser from "./parse/InputParser.js";
import ValidateNumber from "./validate/ValidateNumber.js";
import LottoList from "./constructor/LottoList.js";
import PrintResult from "./UI/PrintResult.js";
import Lotto from "./Lotto.js";

class App {

  // 에러 발생 이후 callback 처리
  async runCallbackAfterNoticeError(error, callbackName, parameter) {
    Console.print(error.message);
    return await this[callbackName](parameter);
  }

  // 1 구매금액
  async purchaseService() {
    try {
      const userInput = await this.getPurchaseFromUser();
      const purchaseAmount = await this.getPurchaseAmount(userInput);
      const purchaseList = await this.getPurchaseList(purchaseAmount);
      return purchaseList;
    } catch (error) {
      return await this.runCallbackAfterNoticeError(error, "purchaseService")
    }
  }

  // 1-1 구매금액 입력
  async getPurchaseFromUser() {
    const purchase = await UserInput.getPurchase();
    ValidateRawString.checkPurchaseInput(purchase);
    return purchase
    
  }

  // 1-2 입력값 변환
  async getPurchaseAmount(purchaseInput) {
    const purchaseNumber = InputParser.toNumber(purchaseInput);
    new ValidateNumber().checkPurchaseAmount(purchaseNumber);
    const purchaseAmount = InputParser.divideWithThousand(purchaseNumber);
    return purchaseAmount;
  }

  // 1-3 구매 목록 생성-출력
  async getPurchaseList(purchaseAmount) {
    const purchaseList = await new LottoList(purchaseAmount).createList();
    PrintResult.purchaseList(purchaseAmount, purchaseList);
    return purchaseList;
  }

  // 2 당첨 번호
  async winNumberService() {
    try {
      const winNumber = await this.getWinNumberFromUser();
      const lotto = await this.getLotto(winNumber);
      return lotto;
    } catch (error) {
      return await this.runCallbackAfterNoticeError(error, "winNumberService");
    }
  }

  // 2-1 당첨 번호 입력
  async getWinNumberFromUser() {
    const winNumber = await UserInput.getWinningNumbers();
    ValidateRawString.checkWinNumberInput(winNumber);
    return winNumber;
  }

  // 2-2 입력값 변환
  async getLotto(winNumberInput) {
    const winNumber = InputParser.splitWinNumber(winNumberInput);
    const lotto = new Lotto(winNumber);
    return lotto;
  }

  // 3 보너스 번호

  async bonusNumberService(lotto) {
    try {
      const userInput = await this.getBonusNumberFromUser();
      const bonusNumber = await this.getBonusNumber(userInput, lotto);
      return bonusNumber;
    } catch (error) {
      return await this.runCallbackAfterNoticeError(error, "bonusNumberService", lotto);
    }
  }

  // 3-1 보너스 번호 입력-유효성 판단
  async getBonusNumberFromUser() {
    const userInput = await UserInput.getBonusNumber();
    ValidateRawString.checkBonusNumberInput(userInput);
    return userInput;
  }

  // 3-2 변환된 보너스 번호의 유효성 판단
  async getBonusNumber(bonusNumberInput, lotto) {
    const bonusNumber = InputParser.toNumber(bonusNumberInput);
    lotto.checkBonusNumber(bonusNumber);
    return bonusNumber;
  }

  async run() {
    const purchaseList = await this.purchaseService();
    const lotto = await this.winNumberService();
    const bonusNumber = await this.bonusNumberService(lotto);
    // 4. 당첨 결과 처리
  }
}

export default App;
