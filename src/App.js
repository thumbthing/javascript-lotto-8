import { Console } from "@woowacourse/mission-utils";
import UserInput from "./UI/UserInput.js";
import ValidateRawString from "./validate/ValidateRawString.js";
import InputParser from "./parse/InputParser.js";
import ValidateNumber from "./validate/ValidateNumber.js";
import LottoList from "./constructor/LottoList.js";
import PrintResult from "./UI/PrintResult.js";

class App {

  // 에러 발생 이후 callback 처리
  async runCallbackAfterNoticeError(error, callbackName) {
    Console.print(error.message);
    return await this[callbackName]();
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
    ValidateRawString.checkPurchase(purchase);
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

  async run() {
    const purchaseList = await this.purchaseService();
    // 2. 당첨 번호 입력
    // 3. 보너스 번호 입력
    // 4. 당첨 결과 처리
  }
}

export default App;
