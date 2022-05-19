# Ch.34 Iterable

## Ch.34.1 이터레이션 프로토콜

- 이터레이션 프로토콜은 순회 가능한 `iterable` 데이터 컬렉션(자료 구조)을 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙이다.
  - **이터레이션 프로토콜** : Well-known Symbol인 Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속 받은 Symbol.iterator 메서드를 /호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이러한 규약을 이터러블 프로토콜이라 하며, 이터러블 프로토콜을 준수한 객체를 이터러블이라 한다. 이터러블은 for ... or 문으로 순회할 수 있으며 스프레드 문법과 디스트럭처링 할당의 대상으로 사용할 수 있다.
  - **이터레이터 프로토콜** : 이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이터레이터는 next 메서드를 소유하며 next 메서드를 호출하면 이터러블을 순회하며 value와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다. 이러한 규약을 이터레이터 프로토콜이라 하며, 이터레이터 프로토콜을 준수한 객체를 이터레이터라 한다. 이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 한다.

### Ch.34.1.1 이터러블

- 이터러블 프로토콜을 준수한 객체를 이터러블이라 한다.

```js
const isIterable = (v) =>
	v !== null && typeof v[Symbol.interator] === "function";

// 배열, 문자열, Map, Set 등은 이터러블 이다.
isIterable([]); // true
isIterable(""); // true
isIterable(new Map()); // true
isIterable(new Set()); // true
isIterable({}); // false
```

- 예를 들어 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
- 이터러블은 for ... of 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링 할당의 대성으로 사용할 수 있다.

```js
const array = [1, 2, 3];

// 배열은 Array.prototype 의 Symbol.iterator 메서드를 상속받는 이터러블이다.

console.log(Symbol.iterator in array); // true

// 이터러블인 배열을 for ... of 문으로 순회 가능하다.
for (const item of array) {
	console.log(item);
}

// 이터러블인 배열은 스프레드 문법의 대상으로 사용할 수 있다.
console.log([...array]);

// 이터러블인 배열은 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
const [a, ...rest] = array;
console.log(a, rest); // 1, [2,3]
```

- `Symbol.iterator` 메서드를 직접 구현하지 않거나 상속받지 않은 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다. 따라서 for 문으로 순회 불가, 스프레드 문법과 디스트럭처링 할당 불가하다.

```js
// 일반 객체는 Symbol.iterator 메서드를 구현하거나 상속받지 않는다.
// 따라서 일반 객체는 이터러블이 아니다.

// 단, 최신 JS 문법에 따라 스프레드 프로퍼티 제안은 일반 객체에 스프레드 문법의 사용을 허용한다.

const obj = { a: 1, b: 2 };
console.log({ ...obj }); //{a : 1, b : 2}
```

### 34.1.2 이터레이터

- 이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다.
- **이터러블의 Symbole.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다.**
- 이터레이터의 next 메서드는 이터러블의 각 요소를 순회하기 위한 포인터의 역할
-

## 34.2 빌트인 이터러블

- 자바스크립트는 이터레이션 프로토콜을 준수한 객체인 빌트인 이터러블을 제공한다.
- `Array`, `String`, `Map`, `Set`, `TypedArray`, `arguments`, `DOM 컬렉션`

## 34.3 for...of 문

- `for ... of` 문은 이터러블을 순회하면서 이터러블의 요소를 변수에 할당
- ```for (변수 선언문 of 이터러블) {...}

  ```

- `for ... of` 문은 내부적으로 이터레이터의 next 메서드를 호출하여 이터러블을 순회하며 `next` 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 `for ... of` 문의 변수에 할당한다.
- 이터레이터 리절트 객체의 `done` 프로퍼티 값이 `false` 이면 순회를 계속하여 true이면 순회를 중단한다.

```js
// 이터러블
const iterable = [1, 2, 3];

// 이터러블 Symbol.iterator 메서드를 호출하여 이터레이터를 생성한다.
const iterator = iterable[Symbole.iterator]();
for (;;) {
	// 이터레이터의 next 메서드를 호출하여 이터러블을 순회한다.
	// 이때 next 메서드는 이터레이터 리절트 객체를 반환한다.
	const res = iterator.next();

	// next 메서드가 반환한 이터레이터 리절트 객체의 done 프로퍼티 값이 true이면 이터러블의 순회를 중단한다.
	if (res.done) break;

	// 이터레이터 리절트 객체의 value 프로퍼티 값을 item 변수에 할당한다.
	const item = res.value;
	console.log(item); // 1 2 3
}
```

## 34.4 이터러블과 유사 배열 객체

- 유사 배열 객체는 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 `length` 프로퍼티를 갖는다.
- `length` 프로퍼티를 갖기 때문에 for 문으로 순회할 수 있고 인덱스로 프로퍼티 값에 접근 가능
- 하지만 유사 배열 객체는 이터러블이 아닌 일반 객체
- `Symbol.iterator` 메서드가 없기 때문에 `for ... of` 문으로 순회할 수 없다.

## 34.5 이터레이션 프로토콜의 필요성

- 데이터 공급자가 다양한 순회 방식을 갖는다면 데이터 소비자는 이 방식을 모두 지원할 수 있어야 하며 이는 비효율적임
- 이터레이션 프로토콜을 준수하도록 규정하면 데이터 소비자는 이터레이션 프로토콜만 지원하도록 구현하면 된다.

## 사용자 정의 이터러블

- 이터레이션 프로토콜을 준수하지 않는 일반 객체도 이터레이션 프로토콜을 준수하도록 구현하면 사용자 정의 이터러블이 된다.

- 예제) 피보나치 수열 만들어보기

```js
// 피보나치 수열을 구현한 사용자 정의 이터러블을 반환하는 함수,
// 수열의 최대값을 인수로 전달 받는다.
const fibonacciFunc = function (max) {
	let [pre, cur] = [0, 1];

	// Symbol.iterator 메서드를 구현한 이터러블을 반환한다.

	return {
		[Symbol.iterator]() {
			return {
				next() {
					[pre, cur] = [cur, pre + cur];
					return { value: cur, done: cur >= max };
				},
			};
		},
	};
};
for (const num of fibonacciFunc(10)) {
	console.log(num); // 1 2 3 5 8
}
```

### 34.6.3 이터러블이면서 이터레이터인 객체를 생성하는 함수

- 위 예제 함수는 이터러블을 반환하고 있는데 이터레이터를 생성하려면 이터러블인 Symbol.iterator 메서드를 호출해야 한다.

```js
const iterable = fibonacciFunc(5);
const iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: 5, done: true}
```

- 이터러블이면서 이터레이터인 객체를 생성하면 Symbol.iterator 메서드를 호출하지 않아도 된다.

```js
// 이터러블이면서 이터레이터인 객체
// 이터레이터를 반환하는 Symbol.iterator 메서드와 이터레이션 리절트 객체를 반환하는 next 메서드를 소유한다.
{
  [Symbol.iterator]() {return : this;},
  next() {
    return { value : any, done: boolean}
  }
}
```

- fibonacciFunc 함수를 이터러블이면서 이터레이터인 객체를 생성하여 반환하는 함수로 변경해보자.

```js
const fibonacciFunc = function (max) {
	let [pre, cur] = [0, 1];

	// Symbol.iterator 메서드를 구현한 이터러블을 반환한다.

	return {
		[Symbol.iterator]() {
			return this;
		},

		// next 메서드는 이터레이터 리절트 객체를 반환
		next() {
			[pre, cur] = [cur, pre + cur];
			return { value: cur, done: cur >= max };
		},
	};
};
// iter는 이터러블이면서 이터레이터다.
let iter = fibonacciFunc(10);

// iter 는 이터러블이므로 for...of 문으로 순회할 수 있다.
for (const num of iter) {
	console.log(num);
}
// iter는 이터러블이면서 이터레이터다.
iter = fibonacciFunc(10);

// iter는 이터레이터이므로 이터레이션 리절트 객체를 반환하는 next 메서드를 소유한다.
console.log(iter.next()); //{value: 1, done: false}
console.log(iter.next()); //{value: 2, done: false}
console.log(iter.next()); //{value: 3, done: false}
console.log(iter.next()); //{value: 5, done: false}
console.log(iter.next()); //{value: 8, done: false}
console.log(iter.next()); //{value: 13, done: true}
```

### 34.6.4 무한 이터러블과 지연 평가

- 무한 이터러블을 생성하는 함수를 정의해보자, 이를 통해 무한 수열을 간단히 구현할 수 있다.

```js
const fibonacciFunc = function () {
	let [pre, cur] = [0, 1];

	// Symbol.iterator 메서드를 구현한 이터러블을 반환한다.

	return {
		[Symbol.iterator]() {
			return this;
		},

		// next 메서드는 이터레이터 리절트 객체를 반환
		next() {
			[pre, cur] = [cur, pre + cur];
			// 무한을 구현해야 하므로 done 프롶티를 생략한다.
			return { value: cur };
		},
	};
};

for (const num of fibonacciFunc()) {
	if (num > 10000) break;
	console.log(num); // 1, 2, 3, 5, ...4181, 6765
}

// 배열 디스트럭처링 할당을 통해 무한 이터러블에서 3개의 요소만 취득한다.
const [f1, f2, f3] = fibonacciFunc();
console.log(f1, f2, f3); // 1, 2, 3
```

- 이터러블은 데이터 공급자의 역할을 함
- 배열이나 문자열 등은 모든 데이터를 메모리에 미리 확보한 다음 데이터를 공급함
- 이터러블은 지연평가(lazy evaluation) 를 통해 데이터를 생성
- 지연 평가는 데이터가 필요한 시점 이전까지는 미리 데이터를 생성하지 않다가 데이터가 필요한 시점이 되면 그때야 비로서 데이터를 생성하는 기법
- 즉, 결과가 필요할 때까지 평가를 늦추는 기법
- `fibonacciFunc` 함수가 생성한 무한 이터러블은 데이터 공급하는 메커니즘을 구현
- 데이터 소비자인 `for ... of` 문이나 배열 디스트럭처링 할당 등이 실행되기 이전가지 데이터를 생성하지 않음
- `for ... of` 문의 경우 이터러블을 순회할 때 내부에서 `next` 메서드를 호출하는데 이때 데이터가 생성됨
- `next` 메서드를 호출하기 이전까지는 데이터를 생성하지 않음
- **데이터가 필요할 때까지는 데이터 생성을 지연하다가 데이터가 필요한 순간 데이터를 생성**
- 지연 평가를 이용하면 불필요한 데이터를 미리 생성하지 않고 필요한 순간에 생성하면 되므로 빠른 실행 속도를 기대할 수 있고 불필요한 메모리를 소비하지 않으며, 무한도 표현할 수 있다는 장점이 있음

_220428_
