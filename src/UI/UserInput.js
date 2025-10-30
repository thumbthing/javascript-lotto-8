import { Console } from "@woowacourse/mission-utils";

const NOTICE_MESSAGE = {
  'purchase': '구입금액을 입력해 주세요.\n',
  'winningNumbers': '당첨 번호를 입력해 주세요.\n',
  'bonusNumber': '보너스 번호를 입력해 주세요.\n'
}

export default class UserInput {
  static async #consoleInput(messageKey) {
    const input = await Console.readLineAsync(NOTICE_MESSAGE[messageKey]);
    return input;
  }

  static async getPurchase() {
    const purchaseInput = await this.#consoleInput('purchase');
    return purchaseInput;
  }

  static async getWinningNumbers() {
    const winningNumbersInput = await this.#consoleInput('winningNumbers');
    return winningNumbersInput;
  }

  static async getBonusNumber() {
    const bonusNumberInput = await this.#consoleInput('bonuseNumber');
    return bonusNumberInput;
  }
}