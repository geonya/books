# Ch.09 타입 변환과 단축 평가

## 9.1 타입 변환이란 ?

-   개발자가 의도적으로 값의 타입을 변환하는 것
    1. 명시적 타입 변환 : explicit coercion
    2. 타입 캐스팅 : type casting

```javascript
// 명시적 타입 변환
// 숫자를 문자열로 타입 캐스팅한다.
const x = 10;
const str = x.toStirng();

console.log(typeof str, str);

// x 변수의 값이 변경된 것은 아니다.
console.log(typeof x, x); // number 10
```

-   개발자 의도와 상관없이 표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환
    1. 암묵적 타입 변환 : implicit coercion
    2. 타입 강제 변환 : type coercion

```javascript
const x = 10;

// 암묵적 타입 변환
// 문자열 연결 연산자는 숫자 타입 x 의 값을 바탕으로 새로운 문자열을 생성

const str = 10 + "";

console.log(typeof str, str); // string 10
```

-   타입 변환이란 기존 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것이다.
-   즉, 기존 값은 변경되지 않는다.

## 9.2 암묵적 타입 변환

-   JS 엔진은 가급적 에러를 발생시키지 않도록 암묵적 타입 변환을 통해 표현식을 평가함

```javascript
"10" + 2; // "102"
5 * "10"; // 50
!0; // true
if (1) {
}
```

### 9.2.1 문자열 타입 변환

```javascript
1 + "2"; // "12"
```

-   -   연산자는 하나 이상이 문자열이므로 문자열 연결 연산자로 동작

```javascript
`1 + 1 = ${1 + 1}`; // "1 + 1 = 2"
```

```javascript
0 + "" // "0"
-0 + "" // "0"
1 + "" // "1"
[] + "" // ""
[10,20] + "" // "10,20"

```

### 9.2.2 숫자 타입으로 변환

```javascript
1 - "1"; // 0
1 * "10"; // 10
1 / "one"; // NaN
```

-   위 예제에서 사용한 연산자는 모두 산술 연산자
-   산술 연산자의 역할은 숫자 값을 만드는 것
-   산술 연산자의 모든 피연산자는 코드 문맥상 모두 숫자 타입이어야 한다.

```javascript
"1" > 0; // true
```

-   비교 연산자는 불리언 값을 만드는 것이므로
-   해당 비교 연산자 표현식을 평가하기 위해
-   숫자 타입으로 암묵적 타입 변환한다.

#### 숫자타입으로 암묵적 타입 변환 시키기

```javascript
+`` + // 0
	`2342` + // 2342
	`what?` + // NaN
	true + // 1
	false + // 0
	null + // 0
	undefined + // NaN
	symbol() + // TypeError
	{} + // NaN
	[] + // 0
	[1, 2]; // NaN
```

### 9.2.3 불리언 타입으로 변환

```javascript
if (``) console.log(x);

if (``) console.log(`1`);
if (true) console.log(`2`);
if (0) console.log(`3`);
if (`str`) console.log(`4`);
if (null) console.log(`5`);

// 2 4
```

-   자바스크립트 엔진은 불리언 타입이 아닌 값을 Truty 값 (참으로 평가되는 값) 또는 Falsy 값(거짓으로 평가되는 값)으로 구분

#### Fasly Value

-   false
-   undefined
-   null
-   0 | -0
-   NaN
-   `` 빈문자열

-   Falsy Value 이 외의 모든 값은 모두 true 로 평가되는 Truthy 값

## 9.3 명시적 타입 변환

-   표준 빌트인 생성자 함수와 빌트인 메서드는 자바스크립트에서 기본 제공하는 함수다. 표준 빌트인 생성자 함수는 객체를 생성하기 위한 함수이며 new 연산자와 함께 호출한다.

### 9.3.1 문자열 타입으로 변환

1. String 생성자 함수를 new 연산자 없이 호출하는 방법
2. Object.prototype.toString 메서드를 사용하는 방법
3. 문자열 연결 연산자를 이용하는 방법

```javascript
Stirng(1); // "1"
String(true); // "true"

(1).toString(); // "1"
true.toString(); // "true"

1 + ``; // "1"

true + ``; // "true"
```

### 9.3.2 숫자 타입으로 변환

1. Number 생성자 함수를 new 연산자 없이 호출
2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자타입으로 변환 가능)
3.  - 단항 산술 연산자를 이용하는 방법
4.  - 산술 연산자를 이용하는 방법

```javascript
Number("0"); // 0
Number(true); // 1
Number(false); // 0

parseInt(`0`); // 0
parseFloat(`10.53`) + // 10.53
	`0` + // 0
	true // 1
	`0` *
		1; // 0
`10.53` * 1; // 10.53
true * 1; // 1
false * 1; // 0
```

### 9.3.3 불리언 타입으로 변환

1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
2. ! 부정 논리 연산자를 두 번 사용하는 방법

```javascript
Boolean(`x`); // true
Boolean(``); // false
Boolean(0); // false
Boolean(NaN); // false
Boolean(Infinity); // true
Boolean(null); // false
Boolean(undefined); // false
Boolean({}); // true
Boolean([]); // true

!!`x`; // true
!!``; // false
!!0; // false
!!1; // true
!!NaN; // false
!!null; // false
!!undefined; // false
!!{}; // true
!![]; // true
```

## 9.4 단축 평가

```javascript
`Cat` && `Dog`; // `Dog`
```

-   논리곱 연산자는 두 개의 피연산자가 모두 true 로 평가될 때 true를 반환한다. 논리곱 연산자는 좌항에서 우항으로 평가가 진행된다.
-   `Cat` 피연산자는 Truthy 값이므로 true 로 평가 -> 두 번째 평가식이 true일 경우 두번째 피연산자, 즉 문자열 `Dog`를 그대로 반환

````javascript
`Cat` || `Dog` // `Cat`

- 논리합 연산자는 두 개의 피연산자 중 하나만 `true` 로 평가되어도 true를 반환 / 좌 -> 우 로 평가 진행
- 논리 연산의 결과를 결정한 첫 번째 피연산자를 그대로 반환 (`Cat`)
- 단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것
```javascript
true || anything  // true
false || anything // anything
true && anything // anything
false && anything // false
````

-   단축 평가는 if 문을 대체할 수 있음

```javascript
const done = true;
let message = ``;

if (done) message = `complete`;
===
message = done && `complete`;
```

```javascript
const done = false;
let message = ``;

message = done || `fail`;
```

```javascript
const done = true;
let message = ``;

if (done) message = `complete`;
else 	meesage = `fail`;

===

message = done ? `complete` : `fail`;
```

#### 객체를 가리키기를 기대하는 변수가 null 또는 undefined 가 아닌지 확인하고 프로퍼티를 참조할 때

-   변수의 값이 객체가 아니라 null 또는 undefined인 경우 객체의 프로퍼티를 참조하면 타입 에러가 발생하고 프로그램이 강제 종료된다.
-   이때 단축 평가를 사용하면 에러를 발생시키지 않는다.

```javascript
const elem = null;
const value = elem && elem.value; // null
```

#### 함수 매개변수에 기본값을 설정할 때

-   함수를 호출할 때 인수를 전달하지 않으면 매개변수에는 undefined가 할당된다. 이때 단축 평가를 사용해 매개변수의 기본값을 설정하면
    undefined 로 인해 발생할 수 있는 에러를 방지할 수 있다.

```javascript
function getStringLength(str) {
	str = str || ``;
	return str.length;
}

getStringLength(); // 0
getStringLength(`hi`); // 2

// ES6의 매개변수의 기본값 설정

function getStringLength(str = ``) {
	return str.length;
}
```

### 9.4.2 옵셔널 체이닝 연산자

```javascript
const elem = null;

const value = elem?.value;
console.log(value); // undefined
```

-   옵셔널 체이닝 연산자 `?.` 는 객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때 유용
-   옵셔널 체이닝 연산자 `?.`가 도입되기 이전에는 논리 연산자 `&&` 를 사용한 단축 평가를 통해 변수가 `null` 또는 `undefined` 가 아닌지 확인했다.

```javascript
const elem = null;

const value = elem && elem.value;
console.log(value); // null;
```

-   논리 연산자 `&&` 는 좌항 피연사자가 `false`로 평가되는 `Falsy`값이면 좌항 피연산자를 그대로 반환한다.

`Falsy`값 :: false, undefined, null, 0, -0, NaN, ``

-   하지만 0이나 ``은 객체로 평가될 때도 있다 .

```javascript
const str = ``;
const length = str && str.length;

console.log(length); // ``;
```

하지만 옵셔널 체이닝 연산자 `?.` 는 좌항 피연산자가 false로 평가되는 Falsy 값이라도 null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.

```javascript
const str = ``;

const length = str?.length;

console.log(length); // 0
```

### 9.4.3 null 병합 연산자

-   null 병합 연산자 `??` 는 좌항의 피연산자가 `null` 또는 `undefined` 인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환
-   null 병합 연산자는 ??는 변수에 기본값을 설정할 때 유용하다.

```javascript
const foo = null ? "default string";
console.log(foo); // default string
```

```javascript
const foo = `` || `default string`;
foo; // default string
```

-   하지만 null 병합 연산자 `??` 는 좌항의 피연산자가 false로 평가되는 Falsy 값이라도 `null` 또는 `undefined`가 아니면 좌항의 피연산자를 그대로 반환

```javascript
const foo = `` ?? `default string`;
foo; // ``
```

2022.03.05
