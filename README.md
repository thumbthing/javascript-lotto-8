# javascript-lotto-precourse

---

## 검색 및 학습 항목

- [정규식 테스트 사이트](https://regexr.com/)
- [mdn-정규식](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers)
- [mdn-정규식 charactor class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes)
- [RegExp.test()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)

- [test.each(), describe.each()](https://www.daleseo.com/jest-each/)
- [Number.isSafeInteger()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)
- [반복문의 비동기 실행](https://velog.io/@minsangk/2019-09-06-0209-%EC%9E%91%EC%84%B1%EB%90%A8-eik06xy8mm)
- [mdn-Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)

---

## `Lotto` 클래스 - 테스트 코드 분석

### 요구사항

1. `#numbers` 필드 이외의 다른 필드를 추가할 수 없다
2. `#numbers`의 접근 제어자를 변경할 수 없다

### 분석

1. 생성자로 변환된 숫자를 배열로 받는다
2. 유효성 검사를 실시
    - 유효성 검사를 통과하지 못하면 error를 발생 시킨다
3. 유효성 검사를 통과하면 `#numbers` 필드를 초기화한다

### 활용 방안

1. 당첨 번호의 변환 값의 유효성 검사 추가
    - `isSafeInteger`
    - 중복된 번호 존재 유무 판단
    - 1 ~ 45 범위 내의 값
2. getter
3. 보너스 번호 유효성 검사
    - `isSafeInteger`
    - 1 ~ 45 범위 내의 값
    - 당첨 번호의 당첨 번호내의 요소

---

## 기능 목록

### 초안

#### 기능의 흐름

1. **로또 구입 금액**을 입력 받는다
    1. 유효성 검사를 한다
    2. 유효성 검사를 통과하지 못한다면 에러를 발생시킨다
        - 발생한 에러를 화면에 출력한다
        - 로또 구입 금액을 다시 입력 받는다
    3. 입력 값을 변환한다
    4. 변환된 값 만큼 로또(무작위 수 6개)를 생성한다
    5. 생성된 로또를 오름차순으로 정렬한다
2. **당첨 번호**를 입력 받는다
    1. 유효성 검사를 한다
    2. 유효성 검사를 통과하지 못한다면 에러를 발생시킨다
        - 발생한 에러를 화면에 출력한다
        - 당첨 번호를 다시 입력 받는다
    3. 입력 값을 변환한다
3. **보너스 번호**를 입력 받는다
    1. 유효성 검사를 한다
    2. 유효성 검사를 통과하지 못한다면 에러를 발생시킨다
        - 발생한 에러를 화면에 출력한다
        - 당첨 번호를 다시 입력 받는다
    3. 입력 값을 변환한다
4. 당첨 기록을 생성한다
    1. 생성된 로또를 확인한다
      - 3개 일치
      - 4개 일치
      - 5개 일치
      - 5개 일치, 보너스 번호 일치
      - 6개 일치
5. 결과를 출력한다

### 기능 상세 목록

#### App

1. Service
    > 1. 구매금액
    > 2. 당첨 번호
    > 3. 보너스 번호
    > 4. 당첨 결과
    > 5. 에러처리
2. 입력값 유효성 검사-반환
    - 구매금액, 당첨 번호, 보너스 번호의 입력값의 유효성 검사
3. 변환값 유효성 검사-반환
    - 변환된 구매금액, 당첨 번호, 보너스 번호의 유효성 검사
4. 입력-유효성 검사, 변환-유효성 검사 통과한 입력값의 결과 반환
5. 에러처리를 실행 이후 재실행할 기능을 다시 호출

##### `runCallbackAfterNoticeError()` : 에러 처리 이후 기능 재실행

1. 매개 변수: `error, callBackName`
2. 해당하는 에러의 메시지를 화면에 출력한다
3. 실행해야하는 기능을 재실행 시킨다

##### 1. 구매 금액

##### 1. `purchaseService()` : 구매금액 담당 기능

1. 입력
2. 변환
3. 출력
4. 에러처리
    - `runCallbackAfterNoticeError()`를 반환
    - 유저의 입력값을 다시 입력받는다

##### 1-1 `getPurchaseFromUser()`

1. 구매 금액 입력에 대한 안내 문구를 출력하고 입력값을 받는다
2. 입력값의 유효성을 검사한다
3. 유효성을 통과한 입력값을 반환한다

##### 1-2 `getPurchaseAmount()`

1. 유효성을 통과한 입력값을 숫자로 변환한다
2. 변환된 값의 유효성을 검사한다
3. 변환된 값을 계산한다
4. 계산된 값은 반환한다

##### 1-3 `getPurchaseList()`

1. 구매 목록을 생성한다
2. 생성된 구매 목록으로 화면에 출력할 문자열을 생성-출력 한다
3. 구매 목록을 반환한다

##### 2. 당첨 번호

##### 2. `winNumberService()` : 당첨 번호 담당 기능

1. 입력
2. 당첨번호 정보 반환 : `Lotto instance`
3. 에러 처리
    - `runCallbackAfterNoticeError()`를 반환
    - 유저의 입력값을 다시 입력받는다

##### 2-1 `getWinNumberFromUser()`

1. 당첨 번호에 대한 안내 문구를 출력하고 사용자의 입력값을 받는다
2. 입력값의 유효성을 검사한다
3. 유효성을 통과한 입력값을 반환한다

##### 2-2 `getLotto()`

1. 유효성을 통과한 입력값을 숫자로 이루어진 배열로 변환한다
2. 변환된 배열로 `Lotto` 클래스의 인스턴스를 생성한다
    - 생성자로 유효성을 검사한다
3. 유효성을 통과해서 인스턴스화에 성공한 `Lotto`를 반환한다

##### 3. 보너스 번호

##### 3. `bonusNumberService()` : 보너스 번호 담당 기능

1. 입력
2. 유효성 검사
    - `runCallbackAfterNoticeError()`를 반환
    - 유저의 입력값을 다시 입력받는다

##### 3-1 `getBonusNumberFromUser()`

1. 사용자로부터 보너스 번호를 입력 받는다
2. 입력받은 문자열의 유효성을 확인한다
3. 입력값은 반환

##### 3-2 `getBonusNumber()`

1. 입력값을 숫자로 변환
2. 변환된 입력값의 유효성을 확인
3. 유효성을 통과한 변환 값을 반환

##### 4. 당첨 결과

##### 4. `resultService()` : 당첨 결과 담당 기능

1. 입력값들(구매금액, 당첨 번호, 보너스 번호)로 당첨 정보을 생성
2. 당첨 정보
    - 당첨 기록
    - 수익률
3. 당첨 정보(당첨 기록, 수익률)로 문자열을 생성
4. 생성된 문자열을 화면에 출력

---

##### UI

##### `UserInput`

클래스 내 메서드는 전부 정적 메서드`(static)`로 정의

##### 안내 문구

- 구입금액, 당첨 번호, 보너스 번호 입력을 위한 안내 메시지 정보 포함

##### `static #consoleInput()`

- `messageKey`: 안내할 메세지의 키값을 매게변수로 받는다
- 해당하는 안내 메시지 정보를 화면에 출력
- 사용자로부터 입력을 받는다
- 입력받은 값을 반환한다

##### `static getPurchase()`, `static getWinningNumbers()`, `static getBounusNumber()`

|  function   | message key |
|-------------|-------------|
| getPurchase | purchase    |
| getWinningNumbers | winningNumbers    |
| getBounusNumber | bonuseNumber    |

- 각 함수에 해당하는 안내 메시지 key를 전달하여 `#consoleInput()`을 호출
- 함수의 결과 값을 반환

##### `PrintResult`

##### `static purchaseList()`

1. 생성된 구매 목록의 배열내 요소(6개의 무작위 수)를 문자열로 변환
    - `, `로 `join()`
2. 안내 문구와 변환된 문자열 배열로 이루어진 배열을 생성
    - 안내 문구 : `(구매횟수)개를 구매했습니다.`
3. 문자열 배열을 문자열로 변환
4. 생성된 문자열을 화면에 출력

---

#### Validate

입력값의 메모리에 올라간 문자열 값을 검사

##### `ValidateRawString`

##### `static checkPurchase()`

1. 입력값의 유효한 패턴을 정희
    - 숫자를 검증하는 정규식 선언
2. 입력값을 정규식으로 검증하여 `boolean` 값을 생성
3. 생성된 `boolean` 값이 `false` 일 경우 에러를 발생
    - 에러 메시지: `입력값이 숫자 형식이 아닙니다. 다시 입력해주세요`

##### `static checkWinNumber()`

1. 입력값의 유효한 기초 패턴을 선언
    - 최소 1자리, 최대 2자리의 숫자
2. 기초 패턴의 최종 패턴을 생성
    - 6자리의 배열을 생성
    - 생성된 배열을 문자열로 변환
3. 생성된 최종 패턴으로 정규식을 생성
4. 정규식으로 입력값의 `boolean` 값을 생성
5. 생성된 `boolean` 값이 `false`일 경우 에러를 발생
    - 에러 메시지: `입력값이 유효하지 않습니다.`

##### `static checkbonusNumber()`

1. 입력값의 유효성을 판단할 정규식을 선언
    - 최소 1자리, 최대 2자리의 숫자 형태의 문자열
2. 정규식으로 입력값의 유효성의 `boolean`값 생성
3. 생성된 `boolean` 값이 `false`일 경우 에러를 발생
    - 에러 메시지: `입력값이 로또 번호 형식이 아닙니다. 다시 입력해주세요`

##### `ValidateNumber`

##### `ERROR_MESSAGE`

유효하지 않은 입력 값에 해당하는 에러 메세지 정보

##### `ValidateNumber constructor`

1. 에러 메세지의 key 정보를 초기화
2. 에러 상태를 저장할 hash 구조 초기화

##### `#updateStatus()`

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

##### `checkPurchaseAmount()`

1. `#updateStatus()`에 변환된 구매금액을 전달하여 에러 상태를 최신화
2. 에러 상태의 value 값들을 순회
    - value 값이 `true`인 값의 index 값을 반환
3. 반환된 index 값이 -1이 아닌 경우 에러를 throw

---

#### Parse

입력값의 변환

##### `static toNumber()`

1. 입력값(문자열)을 숫자로 변환
2. 변환된 숫자를 반환

##### `static divideWithThousand()`

1. 변환된 유효한 정수를 1000으로 나눈다
2. 계산된 값을 반환

##### `static splitWinNumber()`

1. 입력값을 배열로 변환
2. 변환된 배열의 요소를 숫자로 변환
3. 최종 변환된 배열을 반환

---

#### Constructor

입력값으로 자료구조를 생성

##### `LottoList`

##### `LottoList constructor`

- 구매 갯수로 필드 초기화

##### `#getSixRandomNumbers()`

1. `Random.pickUniqueNumbersInRange`으로 무작위 수를 생성
    - 범위: 1 ~ 45
    - 생성: 6개
2. 생성된 배열을 반환

##### `#sortByASC()`

1. 생성된 배열을 오름차순으로 정렬하여 반환

##### `async createList()`

1. 변환된 값의 길이를 가지는 배열을 생성
2. 생성된 배열을 비동기로 순회한다
    1. `Promise.all()`로 모든 요소를 순회가 완료되기까지 대기한다
    2. `#getSixRandomNumbers()`로 무작위-중복되지 않는 6개의 숫자를 가지는 배열을 생성한다
    3. `#sortByASC()`로 생성된 배열을 오름차순으로 정렬한다
    4. 정렬된 배열을 반환한다
3. 순회가 완료된 배열을 반환한다

#### `Lotto`

#### Lotto `contructor`

- numbers를 오름차순으로 정렬한다

##### `#validate()`

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

##### `get()`

1. 필드값을 변수에 저장한다
2. 변수를 반환한다

##### `checkBonusNumber()`

1. 변환된 보너스 번호의 유효성을 검사 후에 유효하지 않을 경우 해당하는 에러 메시지를 포함한 에러를 발생시킨다
    - 유효하지 않은 케이스
        - `isSafeInteger`의 `false`
        - 1 ~ 45 범위 외의 값
        - 당첨 번호 내의 요소와 중복되는 경우

---

#### LottoResult

##### `LOTTO_WINNING_VALUE`

- 당첨에 해당하는 금액 정보

##### LottoResult `constructor`

- 생성된 구매목록, 당첨번호, 보너스 넘버로 필드 초기화
- 당첨 기록을 저장할 필드 private 메서드로 초기화

##### `#initializeStatus()`

- 출력할 당첨 기록(3 ~ 6개 일치, 5개-보너스 번호 일치) 와 동일한 길이의 배열을 생성
- 생성된 배열로 hash 자료 구조 생성(`Map`)

##### `async #getPromiseAllResult()`

1. param: callback 이름, 매개변수
2. callback 이름으로 메서드 호출, 매개변수 설정
3. 메서드의 결과가 완료-성공하도록 Promise.all에 적용
4. 반환된 promise를 반환

##### 1. `async getMatchList()`

1. callback 이름 : `createMatchList`
2. `getPromiseAllResult()`의 목록의 일치 결과 목록 생성
3. 생성된 목록을 반환

##### 1-1 `async #getSingleMatchResult()`

1. `Set` 자료구조로 당첨 번호와 구매 번호의 중복을 제거
2. 일치한 갯수를 계산
3. 일치하지 않은 요소들을 담은 배열을 생성
4. 일치한 갯수, 생성된 배열을 반환

##### 1-2 `createMatchList()`

1. 구매기록 목록을 순회해서 변환된 배열을 생성한다
    - 변환: 일치한 갯수, 일치하지 않은 요소들
2. 변환된 구매기록을 반환한다

##### 2. `async filterMatchList()`

1. 당첨 목록을 필터링하여 새로운 배열을 생성한다
    - 일치하는 갯수가 3개 이상인 요소
2. 필터링된 배열을 반환한다

##### 3. `async getUpdatedResultStatus()`

1. `getPromiseAllResult()`으로 호출할 함수, 매개변수를 전달한다
    - callbackName: updateStatusByMatchList
    - param: matchList
2. 반환값이 iterable한 객체 (Map)이기 때문에 배열로 풀린 promise의 resolve 값을 Map형태로 변환하여 반환한다

##### 3-1 `declareStatusKey()`

1. 당첨 갯수를 연산하여 status의 키를 생성
    - 5개 일치, 보너스 번호 일치시 키 값 + 1
    - 6개 일치시 키값 + 1
2. 생성된 키를 반환

##### 3-2 `updateStatus()`

1. 생성된 키값으로 기존 당첨 기록에 해당하는 당첨 기록을 가져온다
2. 당첨 기록에 기존 당첨 기록을 1 상승 시켜서 최신화한다

##### 3-3 `async updateStatusByMatchList()`

1. 필터링 된 당첨 목록을 순회한다
    1. `declareStatusKey()`로 status의 key를 구한다
    2. `updateStatus()`로 status를 최신화한다
2. 순회가 완료되면 최신화가 끝난 status를 반환한다

##### 4. `async getEarningRate()`

1. 누산할 변수를 선언
2. 당첨 기록을 순회
    - 누산값에 전역 상수 `LOTTO_WINNING_VALUE`의 값과 당첨 기록 횟수를 곱한 값을 더한다
3. 누산된 값의 수익률을 계산한다
4. 계산된 수익률을 반환한다

##### 5. `async getMatchResult()`

1. `getMatchList`로 당첨 목록 생성
2. `filterMatchList`로 최신화할 당첨 목록 필터링
3. `getUpdatedResultStatus`로 당첨 기록 최신화
4. `getEarningRate`로 수익률을 생성
5. 최신화된 당첨 기록, 수익률을 반환

#### `ResultString`

##### `LOTTO_RESULT_STRING`

- 출력 형식의 문자열 기본 정보

##### 1. `static createStringList()`

1. 매개변수
    - matchResult, earningRate
2. 출력 형식의 기본정보를 담은 전역 상수를 순회
    - 마지막 요소 일 경우 수익률 정보를 추가
    - 일치 갯수가 추가된 문자열로 변환
3. 생성된 문자열 배열을 반환

##### 2. `static matchString`

1. 매개변수
    - matchResult, earningRate
2. 당첨 기록의 정보다 담긴 문자열 배열을 생성
3. 문자열 배열의 출력 형식에 부합하는 문자열을 앞쪽에 추가
4. 문자열 배열을 문자열로 변환
5. 생성된 문자열을 반환
