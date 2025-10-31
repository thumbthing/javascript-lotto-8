# 기능 상세 목록

---

## App

### 구매 금액

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

### 당첨 번호

#### `winNumberService()`

1. 입력
2. 당첨번호 정보 반환 : `Lotto instance`
3. 에러 처리
    - `runCallbackAfterNoticeError()`를 반환
    - 유저의 입력값을 다시 입력받는다

#### 1. `getWinNumberFromUser()`

1. 당첨 번호에 대한 안내 문구를 출력하고 사용자의 입력값을 받는다
2. 입력값의 유효성을 검사한다
3. 유효성을 통과한 입력값을 반환한다

#### 2. `getLotto()`

1. 유효성을 통과한 입력값을 숫자로 이루어진 배열로 변환한다
2. 변환된 배열로 `Lotto` 클래스의 인스턴스를 생성한다
    - 생성자로 유효성을 검사한다
3. 유효성을 통과해서 인스턴스화에 성공한 `Lotto`를 반환한다

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

#### `static checkWinNumber()`

1. 입력값의 유효한 기초 패턴을 선언
    - 최소 1자리, 최대 2자리의 숫자
2. 기초 패턴의 최종 패턴을 생성
    - 6자리의 배열을 생성
    - 생성된 배열을 문자열로 변환
3. 생성된 최종 패턴으로 정규식을 생성
4. 정규식으로 입력값의 `boolean` 값을 생성
5. 생성된 `boolean` 값이 `false`일 경우 에러를 발생
    - 에러 메시지: `입력값이 유효하지 않습니다.`

#### `static checkbonusNumber()`

1. 입력값의 유효성을 판단할 정규식을 선언
    - 최소 1자리, 최대 2자리의 숫자 형태의 문자열
2. 정규식으로 입력값의 유효성의 `boolean`값 생성
3. 생성된 `boolean` 값이 `false`일 경우 에러를 발생
    - 에러 메시지: `입력값이 로또 번호 형식이 아닙니다. 다시 입력해주세요`

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

### `static splitWinNumber()`

1. 입력값을 배열로 변환
2. 변환된 배열의 요소를 숫자로 변환
3. 최종 변환된 배열을 반환

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

## `Lotto`

## Lotto `contructor`

- numbers를 오름차순으로 정렬한다

### `#validate()`

1. 유효성을 검사한다
    - 유효하지 않은 케이스
        1. 번호의 갯수가 6을 초과하는 경우
        2. 유효하지 않은 숫자일 경우
            - NaN
            - Infinity
            - 소수
            - Number가 아닌 경우
            - Math.pow(2, 53)을 넘는 수
        3. 중복될 숫자가 존재하는 경우
        4. 1 이상, 45 이하의 범위 외의 수
2. 유효하지 않을 경우 해당하는 메세지를 담은 에러를 발생시킨다

### `get()`

1. 필드값을 변수에 저장한다
2. 변수를 반환한다

### `checkBonusNumber()`

1. 변환된 보너스 번호의 유효성을 검사 후에 유효하지 않을 경우 해당하는 에러 메시지를 포함한 에러를 발생시킨다
    - 유효하지 않은 케이스
        - `isSafeInteger`의 `false`
        - 1 ~ 45 범위 외의 값
        - 당첨 번호 내의 요소와 중복되는 경우

---

## LottoResult

### LottoResult `constructor`

- 생성된 구매목록, 당첨번호, 보너스 넘버로 필드 초기화
- 당첨 기록을 저장할 필드 private 메서드로 초기화

### `#initializeStatus()`

- 출력할 당첨 기록(3 ~ 6개 일치, 5개-보너스 번호 일치) 와 동일한 길이의 배열을 생성
- 생성된 배열로 hash 자료 구조 생성(`Map`)

### `async #getSingleMatchResult()`

1. `Set` 자료구조로 당첨 번호와 구매 번호의 중복을 제거
2. 일치한 갯수를 계산
3. 일치하지 않은 요소들을 담은 배열을 생성
4. 일치한 갯수, 생성된 배열을 반환

### `createMatchList()`

1. 구매기록 목록을 순회해서 변환된 배열을 생성한다
    - 변환: 일치한 갯수, 일치하지 않은 요소들
2. 변환된 구매기록을 반환한다

### `async #getPromiseAllResult()`

1. param: callback 이름
2. callback 이름으로 메서드 호출
3. 메서드의 결과가 완료-성공하도록 Promise.all에 적용
4. 반환된 promise를 반환 

### `async getMatchList()`

1. callback 이름 : `createMatchList`
2. `getPromiseAllResult()`의 목록의 일치 결과 목록 생성
3. 생성된 목록을 반환

