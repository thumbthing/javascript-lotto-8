# 기능 상세 목록

---

## App

### 구매금액

#### `purchaseService()`

구매금액 담당 기능

1. 입력
2. 변환
3. 출력
4. 에러처리
    - `runCallbackAfterNoticeError()`를 반환
    - 유저의 입력값을 다시 입력받는다

#### `runCallbackAfterNoticeError()`

1. 매개 변수: `error, callBackName`
2. 해당하는 에러의 메시지를 화면에 출력한다
3. 실행해야하는 기능을 재실행 시킨다

#### 1. `getPurchaseFromUser()`

1. 구매 금액 입력에 대한 안내 문구를 출력하고 입력값을 받는다
2. 입력값의 유효성을 검사한다
3. 유효성을 통과한 입력값을 반환한다

#### 2. `getPurchaseAmount()`

1. 유효성을 통과한 입력값을 숫자로 변환한다
2. 변환된 값의 유효성을 검사한다
3. 변환된 값을 계산한다
4. 계산된 값은 반환한다

#### 3. `getPurchaseList()`

1. 구매 목록을 생성한다
2. 생성된 구매 목록으로 화면에 출력할 문자열을 생성-출력 한다
3. 구매 목록을 반환한다

---

## UI

### `UserInput`

클래스 내 메서드는 전부 정적 메서드`(static)`로 정의

#### 안내 문구

- 구입금액, 당첨 번호, 보너스 번호 입력을 위한 안내 메시지 정보 포함

#### `static #consoleInput()`

- `messageKey`: 안내할 메세지의 키값을 매게변수로 받는다
- 해당하는 안내 메시지 정보를 화면에 출력
- 사용자로부터 입력을 받는다
- 입력받은 값을 반환한다

#### `static getPurchase()`, `static getWinningNumbers()`, `static getBounusNumber()`

|  function   | message key |
|-------------|-------------|
| getPurchase | purchase    |
| getWinningNumbers | winningNumbers    |
| getBounusNumber | bonuseNumber    |

- 각 함수에 해당하는 안내 메시지 key를 전달하여 `#consoleInput()`을 호출
- 함수의 결과 값을 반환

### `PrintResult`

#### `static purchaseList()`

1. 생성된 구매 목록의 배열내 요소(6개의 무작위 수)를 문자열로 변환
    - `, `로 `join()`
2. 안내 문구와 변환된 문자열 배열로 이루어진 배열을 생성
    - 안내 문구 : `(구매횟수)개를 구매했습니다.`
3. 문자열 배열을 문자열로 변환
4. 생성된 문자열을 화면에 출력

---

## Validate

입력값의 메모리에 올라간 문자열 값을 검사

### `ValidateRawString`

#### `static checkPurchase()`

1. 입력값의 유효한 패턴을 정희
    - 숫자를 검증하는 정규식 선언
2. 입력값을 정규식으로 검증하여 `boolean` 값을 생성
3. 생성된 `boolean` 값이 `false` 일 경우 에러를 발생
    - 에러 메시지: `입력값이 숫자 형식이 아닙니다. 다시 입력해주세요`

### `ValidateNumber`

#### `ERROR_MESSAGE`

유효하지 않은 입력 값에 해당하는 에러 메세지 정보

#### `ValidateNumber constructor`

1. 에러 메세지의 key 정보를 초기화
2. 에러 상태를 저장할 hash 구조 초기화

#### `#updateStatus()`

조건문에 해당하는 에러 상태를 최신화

1. isSafeInteger
    - NaN
    - 소수
    - Number Type이 아닌 케이스
    - Infinity
    - BigInt
    - 안전한 정수값 이외의 값
      - `-(2^53 -1) ~ 2^53 -1`
2. 1000 미만
3. 1000 으로 나누어떨어지지 않는 경우

#### `checkPurchaseAmount()`

1. `#updateStatus()`에 변환된 구매금액을 전달하여 에러 상태를 최신화
2. 에러 상태의 value 값들을 순회
    - value 값이 `true`인 값의 index 값을 반환
3. 반환된 index 값이 -1이 아닌 경우 에러를 throw

---

## Parse

입력값의 변환

### `static toNumber()`

1. 입력값(문자열)을 숫자로 변환
2. 변환된 숫자를 반환

### `static divideWithThousand()`

1. 변환된 유효한 정수를 1000으로 나눈다
2. 계산된 값을 반환

---

## Constructor

입력값으로 자료구조를 생성

### `LottoList`

#### `LottoList constructor`

- 구매 갯수로 필드 초기화

#### `#getSixRandomNumbers()`

1. `Random.pickUniqueNumbersInRange`으로 무작위 수를 생성
    - 범위: 1 ~ 45
    - 생성: 6개
2. 생성된 배열을 반환

#### `#sortByASC()`

1. 생성된 배열을 오름차순으로 정렬하여 반환

#### `async createList()`

1. 변환된 값의 길이를 가지는 배열을 생성
2. 생성된 배열을 비동기로 순회한다
    1. `Promise.all()`로 모든 요소를 순회가 완료되기까지 대기한다
    2. `#getSixRandomNumbers()`로 무작위-중복되지 않는 6개의 숫자를 가지는 배열을 생성한다
    3. `#sortByASC()`로 생성된 배열을 오름차순으로 정렬한다
    4. 정렬된 배열을 반환한다
3. 순회가 완료된 배열을 반환한다