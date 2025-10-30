export default class InputParser {
  static toNumber(input) {
    const parsedValue = Number(input);
    return parsedValue;
  }

  static divideWithThousand(parsedInput) {
    const dividedValue = parsedInput / 1000;
    return dividedValue;
  }
}