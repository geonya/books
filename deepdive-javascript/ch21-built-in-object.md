# Ch.21 Built In Objects

## 21.1 자바스크립트 객체의 분류

- 표준 빌트인 객체 standard built-in objects/native objects/global objects
  - 표준 빌트인 객체는 ECMAScript 사양에 정의된 객체로 애플리케이션 전역의 공통 기능을 제공한다. 실행환경과 관계없이 언제나 사용 가능
  - 전역 객체의 프로퍼티로서 제공된다. 따라서 별도의 선언 없이 전역 변수처럼 언제나 참조할 수 있다.
- 호스트 객체 host objects
  - 호스트 객체는 ECMAScript 사양에 정의되어 있지 않지만 자바스크립트 실행환경 (브라우저 환경 or Node.js 환경)에서 추가로 제공하는 객체
- 사용자 정의 객체 user-defined obejcts
  - 사용자 정의 객체는 표준 빌트인 객체와 호스트 객체처럼 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체를 말한다.

## 21.2 표준 빌트인 객체

```jsx
const strObj = new String("lee");
const numObj = new Number(123);
const boolObj = new Boolean(true);
const func = new Function("x", "return x * x");
const arr = new Array(1, 2, 3);
const regExp = new RegExp(/ab+c/i);
const date = new Date();
```

- 생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 prototype 포로퍼티에 바인딩된 객체다.

```jsx
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String("Lee"); // String {"lee"}
// String 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.prototype 이다.
console.log(Object.getPrototypeOf(strObj) === String.prototype);
```

- 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체는 다양한 기능의 빌트인 프로토타입 메서드를 제공한다.
- 표준 빌트인 객체는 인스턴스 없이도 호출 가능한 빌트인 정적 메서드를 제공한다.

```jsx
// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(1.5);

// Number.prototype.toFixed 빌트인 프로토타입
console.log(numObj.toFixed()); // 2

// 빌트인 정적 메서드 호출
console.log(Number.isInteger(0.5)); // false
```

## 21.3 원시값과 래퍼 객체

```jsx
const str = "hello";
//원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작한다.
str.length; // 5
str.toUpperCase(); // HELLO
```

- 원시값을 객체처럼 사용하면 자바스킯트 엔진은 암무적으로 연관된 객체를 생ㅇ성하여 생성된 객체로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌린다.
- 이처럼 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 래퍼 객체라고 한다.
- 래퍼 객체인 ex) String 생성자 함수의 인스턴스는 ex) String.prototype의 메서드를 상속받아 사용할 수 있다.
- 래퍼 객체의 처리가 종료되면 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값으로 원래의 상태, 즉 식별자가 원시값을 갖도록 되돌리고 래퍼 객체는 가비지 컬렉션의 대상이 된다.

```jsx
const str = "hello";
// str은 암무적으로 생성된 래퍼 객체를 가리킴
// 래퍼 객체에 name 프로퍼티가 동적 추가
str.name = "lee";
// 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 받는다.
// 처리 완료 해당 래퍼 객체는 가비지 컬렉션의 대상
// 식별자 str은 새롭게 암무적으로 생성된 (위에 래퍼 객체와는 다른) 래퍼 객체를 가리킴
// 새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않음
str.name; // undefined
// str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 받는다.
// 새롭게 생성된 래퍼객체는 다시 가비리 컬렉션 대상
typeof str; // string
str; // "hello"
```

- 이처럼 문자열 숫자 불리언 심벌은 암묵적으로 생성되는 래퍼 객체에 의해 마치 객체처럼 사용할 수 있으며, 표준 빌트인 객체인 `String`, `Number`, `Boolean`, `Symbol`의 프로토타입 메서드 또는 프로퍼티를 참조할 수 있다. 따라서 String, Number, Boolean 생성자 함수를 new 연산자와 함께 호출하여 문자열, 숫자, 불리언 인스턴스를 굳이 생성할 필요가 없다.
- 이외의 원시값 null, undefined는 래퍼 객체를 생성하지 않는다.

## 21.4 전역 객체

- 전역 객체 global object 는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체이며, 어떤 객체에도 속하지 않은 최상위 객체다.
- 전역 객체는 자바스킬븥 환경에 따라 지칭하는 이름이 제각각이다.
  - 브라우저 환경 : window, self, this, frames
  - Node.js 환경 : global
- globalThis
  : ES11에서 도입, 브라우저 환경과 Node.js 환경에서 전역 객체를 가리키던 다양한 식별자를 통일한 식별자다.

- 전역 객체는 표준 빌트인 객체와 환경에 따른 호스트 객체, 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.
- 전역 객체는 계층적 구조상 어떤 객체에도 속하지 않은 모든 빌트인 객체 (표준 빌트인 객체와 호스트 객체)의 최상위 객체다.
- 전역 객체 자신은 어떤 객체의 프로퍼티도 아니며 객체의 계층적 구조상 표준 빌트인 객체와 호스트 객체를 프로퍼티로 소유한다는 것을 말함.
- 전역 객체의 특징
  - 전역 객체는 개발자가 의도적으로 생성할 수 없다.
  - 전역 객체의 프로퍼티를 참조할 때 window(또는 global)를 생략ㅎㄹ 수 있다.
  - 전역 객체는 모든 표준 빌트인 객체를 프로퍼티로 가지고 있다.
  - 자바스크립트 실행 환경에 따라 추가적인 프로퍼티와 메서드를 갖는다.
  - var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역, 그리고 전역 함수는 전역 객체의 프로퍼티가 된다.

```jsx
var foo = 1;
window.foo; // 1
bar = 2;
window.bar; // 2
function baz() {
	return 3;
}
window.baz(); // 3
```

- let이나 const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.
- let이나 const 로 선언한 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드) 내에 존재하게 된다.

### 21.4.1 빌트인 전역 프로퍼티

- 빌트인 전역 프로퍼티는 전역 객체의 프로퍼티를 의미한다. 주로 애플리케이션 전역에서 사용하는 값을 제공한다.
- Infinity
- NaN
- undefined

### 21.4.2 빌트인 전역 함수

- eval : 주어진 문자열 코드를 런타임에 평가 또는 실행한다.
- isFinite : 전달 받은 인수가 유한수인지 검사
- isNaN : 전달받은 인수가 NaN인지 검사
- parseFloat : 전달받은 문자열 인수를 실수로 해석하여 반환
- parseInt : 전달받은 문자열 인수를 정수로 해석하여 반환
- encodeURI 함수는 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다.
- decodeURI 함수는 인코딩된 URI를 인수로 전달받아 이스케이프 처리 이전으로 디코딩한다.

### 21.4.3 암묵적 전역

```jsx
var x = 10;
function foo () {
  // 선언하지 않은 식별자에 값을 할당
  y = 20; // window.y = 20;
  console.log(x+y);
}
foo() // 30

window.x // 10
window.y // 20
delete x ; 전역 변수는 삭제되지 않는다.
delete y ; 프로퍼티는 삭제된다.
window.x // 10
window.y // 20
```
