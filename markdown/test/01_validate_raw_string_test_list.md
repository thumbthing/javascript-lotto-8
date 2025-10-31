# `ValidateRawString`

---

## `checkPurchase()`

### checkPurchase 유효한 케이스

- 숫자 형태로 구성된 입력값일 경우 유효성 통과

### checkPurchase 유효하지 않은 케이스

- 음수
- 소수
- 수식 포함 (+, -, *, /)
- 메모리에 저장시 값이 자동으로 변할 수 있는 경우
- 텍스트로 작성된 숫자

---

## `checkWinNumber()`

### checkWinNumber 유효한 케이스

- 1자리 수 , 2자리 (00 ~ 99) 사이의 입력값

### checkWinNumber 유효하지 않은 케이스

- 부족한 입력값
- 2자리 초과의 입력값
- 음수
- 소수
- NaN
- Infinity
- escape

---

## `checkBonusNumber()`

### checkBonusNumber 유효한 케이스

- 0 ~ 99 사이의 입력값

### checkBonusNumber 유효하지 않은 케이스

- 3자리 이상의 숫자형 문자열
- 음수
- 소수
- escape extension
