class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    if (numbers.some((num) => !Number.isSafeInteger(num))) throw new Error("[ERROR] 로또 번호가 유효하지 않은 수로 이루어져 있습니다.");
    if (numbers.length !== new Set(numbers).size) throw new Error("[ERROR] 로또 번호는 중복되지 않은 수로 이루어져야합니다.");
    numbers.some((num) => {
      if (num < 1 || num > 45) throw new Error("[ERROR] 로또 번호는 1 ~ 45 사이의 값이어야 합니다");
    });
  }

  get() {
    const lotto = this.#numbers;
    return lotto;
  }

  checkBonusNumber(bonusNumber) {
    if (!Number.isSafeInteger(bonusNumber)) throw new Error("[ERROR] 보너스 번호가 유효하지 않은 수로 이루어져 있습니다.")
    if (bonusNumber < 1 || bonusNumber > 45) throw new Error("[ERROR] 보너스 번호는 1 ~ 45 사이의 값이어야 합니다");
    if (this.#numbers.includes(bonusNumber)) throw new Error("[ERROR] 당첨 번호 중에 보너스 번호가 포함되어 있습니다.");
  }
}

export default Lotto;
