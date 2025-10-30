export default class InputParser {
  static toNumber(input) {
    const parsedValue = Number(input);
    return parsedValue;
  }

  static divideWithThousand(parsedInput) {
    const dividedValue = parsedInput / 1000;
    return dividedValue;
  }

  static splitWinNumber(input) {
    const numberList = input.split(',');
    const parsedList = numberList.map((num) => this.toNumber(num));
    return parsedList;
  }
}