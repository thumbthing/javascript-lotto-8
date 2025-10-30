import { Console } from "@woowacourse/mission-utils";
import UserInput from "./UI/UserInput.js";
import ValidateRawString from "./validate/ValidateRawString.js";

class App {

  // 에러 발생 이후 callback 처리
  async runCallbackAfterNoticeError(error, callbackName) {
    Console.print(error.message);
    return await this[callbackName]();
  }

  // 1. 구매금액 입력
  async getPurchaseFromUser() {
    try {
      const purchase = await UserInput.getPurchase();
      ValidateRawString.checkPurchase(purchase);
      return purchase
    } catch (error) {
      return await this.runCallbackAfterNoticeError(error, "getPurchaseFromUser");
    }
  }

  async run() {
    const purchase = await this.getPurchaseFromUser();
    // 2. 당첨 번호 입력
    // 3. 보너스 번호 입력
    // 4. 당첨 결과 처리
  }
}

export default App;
