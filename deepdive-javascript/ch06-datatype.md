# Ch.06 Data Type

-   데이터 타입은 값의 종류를 말한다.
-   자바스크립트의 모든 값은 데이터 타입을 갖는다.

-   Primitive Type :
    1. number
    2. string
    3. boolean
    4. undefined
    5. null
    6. symbol
-   Object Type :
    -   object, array, function etc...

## 6.1 Number

-   JS는 숫자 타입이 하나만 존재 (int long float double 이런 거 없음)
-   모든 값이 배정밀도 64bit 부동소수점 형식을 따르며 2진수로 메모리에 저장됨. 즉, 모든 수를 실수로 처리함

```javascript
const integer = 10; // 정수
const double = 10.12; // 실수
const negative = -20; // 음의 정수

// 모두 65로 동일한 값
const binary = 0b01000001; // 2진수
const octal = 0o101; // 8진수
const hex = 0x41; // 16진수
```

-   Infinty : 양의 무한대
-   -Infinity : 음의 무한대
-   NaN : 산술 연산 불가 (Not - a - Number)

## 6.2 String

-   자바스크립트 문자열은 원시 타입이며, 변경 불가능한 값 (immutable value) 이다.

## 6.3 Template Literal 템플릿 리터럴

-   ``(백틱) 을 이용해 자유롭게 문자를 표현

```javascript
const template = `<ul>
<li><a href="#">Home</a></li>
</ul>
```

### 6.3.2 표현식 삽입

-   '+' 연산자나 `` 템플릿 리터럴 방법으로 문자열을 연결

```javascript
const first = "Geony";
const last = "Han";
const myName = "my name is" + first + " " + last + ".");
===
const myName = `my name is ${first} ${last}.`
```

## 6.5 undefined

-   자바스크립트 엔진이 변수를 초기화할 때만 사용하는 값이다.

## 6.6 null

-   변수에 값이 없다는 것을 의도적으로 명시한다.
-   변수에 `null` 을 할당하는 것은 이전에 참조하던 값을 더 이상 참조하지 않겠다는 의미
-   이전에 할당되어 있던 값에 대한 참조를 명시적으로 제거하는 것을 의미
-   해당 메모리 공간에 JS엔진이 가비지 콜렉션을 수행할 것

## 6.7 Symbol

-   심벌 값은 다른 값과 중복되지 않는 유일무이한 값이다.
-   주로 객체의 유일한 프로퍼티 키를 만들기 위해 사용
-   외부에 노출되지 않고 다른 값과 중복되지 않음

```javascript
const key = Symbol("key");
console.log(typeof key); // symbol

let obj = {};

obj[key] = "value";
console.log(obj[key]); // value
```

## 6.8 Object

-   자바스크립트를 이루고 있는 거의 모든 것이 객체다.

## 6.9 Why we need Data Type ?

-   값을 저장할 때 확보해야 하는 메모리 공간의 크기를 결정하기 위해
-   값을 참조할 때 한 번에 읽어 들여야 할 메모리 공간의 크기를 결정하기 위해
-   메모리에서 읽어 들인 2진수를 어떻게 해석할지 결정하기 위해

## 6.10 동적 타이핑

-   `동적 타이핑` : 자바스크립트의 변수는 선언이 아닌 할당에 의해 타입이 결정(타입 추론 type inference)된다.
    그리고 재할당에 의해 변수의 타입은 언제든지 동적으로 변할 수 있다.
-   즉, 현재 변수에 할당되어 있는 값에 의해 변수의 타입이 동적으로 결정된다.
-   타입의 변경이나 잘못된 예측으로 인해 오류 발생 확률이 높다.
