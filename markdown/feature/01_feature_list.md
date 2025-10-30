# 기능 상세 목록

---

## App

### `runCallbackAfterNoticeError()`

1. 매개 변수: `error, callBackName`
2. 해당하는 에러의 메시지를 화면에 출력한다
3. 실행해야하는 기능을 재실행 시킨다

### 1. `getPurchaseFromUser()`

1. 구매 금액 입력에 대한 안내 문구를 출력하고 입력값을 받는다
2. 입력값의 유효성을 검사한다
    - 유효성을 통과하지 못한 경우
      - 에러와 재실행할 기능을 에러 처리 함수`runCallbackAfterNoticeError`에 전달후 실행한다
3. 유효성을 통과한 입력값을 반환한다


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

---

## Parse

입력값의 변환

### `static toNumber()`

1. 입력값(문자열)을 숫자로 변환
2. 변환된 숫자를 반환
