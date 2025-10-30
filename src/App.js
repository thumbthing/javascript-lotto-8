import { Console } from "@woowacourse/mission-utils";
import UserInput from "./UI/UserInput.js";
import ValidateRawString from "./validate/ValidateRawString.js";
import InputParser from "./parse/InputParser.js";
import ValidateNumber from "./validate/ValidateNumber.js";

class App {

  // 에러 발생 이후 callback 처리
  async runCallbackAfterNoticeError(error, callbackName) {
    Console.print(error.message);
    return await this[callbackName]();
  }

  // 1 구매금액
  async purchaseService() {
    const userInput = await this.getPurchaseFromUser();
    const purchaseAmount = await this.getPurchaseAmount(userInput);
    return purchaseAmount;
  }

  // 1-1 구매금액 입력
  async getPurchaseFromUser() {
    try {
      const purchase = await UserInput.getPurchase();
      ValidateRawString.checkPurchase(purchase);
      return purchase
    } catch (error) {
      return await this.runCallbackAfterNoticeError(error, "purchaseService");
    }
  }

  // 1-2 입력값 변환
  async getPurchaseAmount(purchaseInput) {
    try {
      const purchaseNumber = InputParser.toNumber(purchaseInput);
      new ValidateNumber().checkPurchaseAmount(purchaseNumber);
      const purchaseAmount = InputParser.divideWithThousand(purchaseNumber);
      return purchaseAmount;
    } catch (error) {
      return await this.runCallbackAfterNoticeError(error, "purchaseService");
    }
  }

  async run() {
    const purchaseAmount = await this.purchaseService();
    // 2. 당첨 번호 입력
    // 3. 보너스 번호 입력
    // 4. 당첨 결과 처리
  }
}

export default App;
