# 기능 상세 목록

---

## UI

### `UserInput`

클래스 내 메서드는 전부 정적 메서드`(static)`로 정의

#### 안내 문구

- 구입금액, 당첨 번호, 보너스 번호 입력을 위한 안내 메시지 정보 포함

#### `#consoleInput()`

- `messageKey`: 안내할 메세지의 키값을 매게변수로 받는다
- 해당하는 안내 메시지 정보를 화면에 출력
- 사용자로부터 입력을 받는다
- 입력받은 값을 반환한다

#### `getPurchase()`, `getWinningNumbers()`, `getBounusNumber()`

|  function   | message key |
|-------------|-------------|
| getPurchase | purchase    |
| getWinningNumbers | winningNumbers    |
| getBounusNumber | bonuseNumber    |

- 각 함수에 해당하는 안내 메시지 key를 전달하여 `#consoleInput()`을 호출
- 함수의 결과 값을 반환

---
