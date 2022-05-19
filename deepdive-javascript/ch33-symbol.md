_220427_

# Ch.33 Symbol

## 33.1 What is Symbol ?

- 심벌 값은 다른 값과 중복되지 않는 유일무이한 원시 타입의 값이다.
- 주로 이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용한다.

## 33.2 심벌 값의 생성

### Symbol 함수

- 심벌 값은 `Symbol` 함수로만 생성할 수 있다.
- 생성된 심벌 값은 외부로 노출되지 않아 확인할 수 없으며, 다른 값과 절대 중복되지 않은 유일무이한 값이다.

```js
const mySymbol = Symbol();
console.log(typeof mySymbol); // symbol

// 심벌 값은 외부로 노출되지 않아 확인할 수 없다.
console.log(mySymbol); // Symbol()
```

- `Symbol` 함수는 `String`, `Number`, `Boolean` 생성자 함수와는 달리 `new` 연산자와 함께 호출하지 않는다.
- new 연산자와 함께 생성자 함수 또는 클래스를 호출하면 객체(인스턴스)가 생성되지만 심벌 값은 변경 불가능한 원시값이다.

- `string`, `number` 타입으로 암묵적으로 변환되지 않는다.
- 단, `boolean` 타입으로는 암묵적으로 타입 변환이 가능하다. (if 문 등에서 존재 확인 가능)

### Symbole.for / Symbole.keyFor 메서드

- `Symbol.for` 메서드는 인수로 전달받은 문자열을 키로 사용하여 키와 심벌 값의 쌍들이 저장되어 있는 전역 심벌 레지스트리에서 해당 키와 일치하는 심벌 값을 검색한다.
  - 검색에 성공하면 새로운 심벌 값을 생성하지 않고 검색된 심벌 값을 반환
  - 검색에 실패하면 새로운 심벌 값을 생성하여 `Symbol.for` 메서드의 인수로 전달된 키로 전역 심벌 레지스트리에 저장한 후, 생성된 심벌 값을 반환한다.

```js
const s1 = Symbol.for("mySymbol");
const s2 = Symbol.for("mySymbol");
console.log(s1 === s2); // true
```

- `Symbol` 함수는 호출될 때마다 유일무이한 심벌 값을 생성한다.
- 자바스크립트 엔진이 관리하는 심벌 값 저장소 : 심벌 레지스트리에서 심벌 값을 검색할 수 있는 키를 지정할 수 없으므로 전역 심벌 레지스트리에서 관리하지 못한다.
- 하지만 `Symbol.for`를 사용하면 애플리케이션 전역에서 중복되지 않는 유일무이한 상수인 심벌 값을 단 하나만 생성하여 전역 심벌 레지스트리를 통해 공유할 수 있다.

- `Symbol.keyFor` 메서드를 사용하면 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.

```js
// 전역 심벌 레지스트리에 mySymbol 이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성한다.
const s1 = Symbol.for("mySymbol");

// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(s1);

// Symbol 함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
const s2 = Symbol("foo");

// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(s2); // undefined
```

## 33.3 심벌과 상수

```js
const Direction = {
	UP: 1,
	DOWN: 2,
	LEFT: 3,
	RIGHT: 4,
};

// 변수에 상수를 할당
const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
	console.log("You are going up");
}
```

- 위 예제와 같이 값에는 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우가 있다.
- 이때 문제는 상수 값 1,2,3,4가 변경될 수 있으며, 다른 변수 값과 중복될 수도 있다는 것이다.
- 이러한 경우 변경/중복될 가능성이 있는 무의미한 상수 대신 중복될 가능성이 없는 유일무이한 심벌 값을 사용할 수 있다

```js
const Direction = {
	UP: Symbol("up"),
	DOWN: Symbol("down"),
	LEFT: Symbol("left"),
	RIGHT: Symbol("right"),
};

const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
	console.log("You are going up");
}
```

> enum
> `enum`은 명명된 상수의 집합으로 열거형이라고 부른다.
> 자바스크립트에서는 `enum을` 지원하지 않아 사용하려면 다음과 같이 객체의 변경을 방지하기 위해 객체를 동결하는 Object.freeze메서드와 심벌 값을 사용한다.

```js
const Direction = Object.freeze({
	UP: Symbol("up"),
	DOWN: Symbol("down"),
	LEFT: Symbol("left"),
	RIGHT: Symbol("right"),
});
```

## 33.4 심벌과 프로퍼티 키

- 객체의 프로퍼티 키는 빈 문자열을 포함하여 모든 문자열 또는 심벌 값으로 만들 수 있으며
- 동적으로 생성할 수도 있다.
- 심벌 값으로 프로퍼티 키를 동적 생성하여 프로퍼티를 만들 수 있다.

```js
const obj = {
	[Symbol.for("mySymbol")]: 1,
};

obj[Symbol.for("mySymbol")]; // 1
```

- 심벌 값은 유일무이한 값이므로 심벌 값으로 프로퍼티 키를 만들면 다른 프로퍼티 키와 절대 충돌하지 않는다.

## 33.5 심벌과 프로퍼티 은닉

- 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 `for ... in` 문이나 `Object.keys`, `Object.getOwnPropertyNames` 메서드로 찾을 수 없다.
- 이처럼 심벌 값을 프로퍼티 키로 사용하여 프로퍼티를 생성하면 외부에 노출할 필요가 없는 프로퍼티를 은닉할 수 있다

```js
const obj = {
	[Symbol("mySymbol")]: 1,
};

for (const key in obj) {
	console.log(key); // 아무것도 출력되지 않음
}

console.log(Object.keys(obj)); //[]
console.log(Object.getOwnPropertyNames(obj)); // []
```

- 하지만 `Object.getOwnPropertySymbols` 메서드를 이용하면 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티를 찾을 수 있다.

```js
Object.getOwnPropertySymbols(obj)[0];
//Symbol(mySymbol)
const symbolKey1 = Object.getOwnPropertySymbols(obj)[0];
obj[symbolKey1]; // 1
```

## 33.6 심벌과 표준 빌트인 객체 확장

- 중복된 가능성이 전혀 없는 심벌 값으로 프로퍼티 키를 생성하여 표준 빌트인 객체를 확장하면 표준 빌트인 객체의 기존 프로퍼티 키와 충돌하지 않는 것은 물론,
- 표준 사양의 버전이 올라감에 따라 추가될지 모르는 어떤 프로퍼티 키와도 충돌할 위험이 없어 안전하게 표준 빌트인 객체를 확장할 수 있다.

```js
Array.prototype[Symbol.for("sum")] = function () {
	return this.reduce((acc, cur) => acc + cur, 0);
};
[1, 2][Symbol.for("sum")](); // 3
```

## 33.7 Well-known Symbol

- 자바스크립트가 기본 제공하는 빌트인 심벌
