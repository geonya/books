# Ch.30 Date

- 표준 빌트인 객체인 Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수다.
- UTC(협정 세계시)는 국제 표준시를 말한다.
- KST(한국 표준시)는 UTC에 9시간을 더한 시간이다. 즉, KST는 UTC보다 9시간 빠르다.

## Date 생성자 함수

- Date는 생성자 함수다. Date 생성자 함수로 생성한 Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖는다.
- 이 값은 1970년 1월 1일 00:00:00(UTC)을 기점으로 Date 객체가 나타내는 날짜와 시간까지의 밀리초를 나타낸다.

### new Date()

- Date 생성자 함수를 인수 없이 new 연산자와 함께 호출하면 현재 날자와 시간을 가지는 Date 객체를 반환한다.
- 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖지만 Date 객체를 콘솔에 출력하면 기본적으로 날짜와 시간 정보를 출력한다.

### new Date(milliseconds)

```js
new Data(2399203490); //
```

## Date 메서드

### Date.now

- 1970년 1월 1일 00시(UTC)를 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환

### Date.parse

- 1970년 1월 1일 00시 기점으로 인수로 전달된 지정 시간 (new Date(dateString)의 인수와 동일한 형식)까지의 밀리초를 수자로 반환

### Date.UTC

- 1970년 1월 1일 00시 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환

### Date.prototype.getFullYear

- Date 객체의 연도를 나타내는 정수를 반환

### Date.prototype.setFullYear

- Date 객체의 연도를 나타내는 정수를 설정

### Date.prototype.getMonth

- Date 객체의 월을 나타내는 0~11의 정수를 반환 (1월은 0, 12월 11이다.)

### Date.prototype.setMonth

- Date 객체에 월을 나타내는 0 ~ 11의 정수를 설정

### Date.prototype.getDate

- Date 객체의 날짜(1~31)를 나타내는 정수를 반환

### Date.prototype.setDate

- Date 객체에 날짜(1~31)를 나타내는 정수를 설정

### Date.prototype.getDay

- Date 객체의 요일(0~6)을 나타내는 정수를 반환한다.
  (일 = 0, 월 = 1, 화 = 2.... 토 = 6)

### Date.prototype.getHours

- Date 객체의 시간(0~23)을 나타내는 정수를 반환

### Date.prototype.setHours

- Date 객체에 시간(0~23)을 나타내는 정수를 설정

### Date.prototype.getMinutes

- Date 객체의 분을 나타내는 정수를 반환

### Date.prototype.getSeconds

- Date 객체의 초를 나타내는 정수를 반환

### Date.prototype.getMilliseconds

- Date 객체의 밀리초 (0 ~ 999)를 나타내는 정수를 반환

### Date.prototype.getTime

- 1970년 1월 1일 00시 기점으로 Date 객체의 시간까지 경과된 밀리초를 반환

### Date.prototype.toDateString

- 사람이 읽을 수 있는 형식의 문자열로 Date 객체의 날짜를 반환한다.

### Date.prototype.toTimeString

- 사람이 읽을 수 있는 형식으로 Date 객체의 시간을 표현한 문자열을 반환

### Date.prototype.toISOString

- ISO8601 형식으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환

```js
const today = new Date("2020/7/24/12:30");
today.toString(); // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toISOString(); // -> 2020-07-24TO03;30:300.000Z
today.toISOstring.slice(0, 10); // 2020-07-24
today.toISO.string.slice(0, 10).replace(/-/g, ""); // 20200724
```

### Date.prototype.toLocaleString

- 인수로 전달한 로캘을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다. 인수를 생략한 경우 브라우저가 동작 중인 시스템의 로캘을 적용한다.

```js
const today = new Date("2020/7/24/12:30");
today.toString(); // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toLocaleString(); // -> 2020. 7. 24. 오후 12:30:00
today.toLocaleString("en-US"); // -> 7/24/2020, 12:30:00 PM
```

### Date.prototype.toLocaleTimeString

```js
const today = new Date("2020/7/24/12:30");
today.toString(); // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toLocaleTimeString(); // -> 오후 12:30:00
```
