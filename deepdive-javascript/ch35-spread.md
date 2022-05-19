# Ch35. Spread Syntax

- ES6 에서 도입 스프레드 문법 (전개 문법) : Spread Syntax
- `...` 은 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 (전개, 분산하여, spread) 개별적인 값들의 목록으로 만듦
- 사용 가능 대상 : Array, String, Map, Set, DOM 컬렉션(NodeList, HTMLCollection), arguments와 같이 `for...of` 문으로 순회할 수 있는 이터러블에 한정

```js
(...[1,2,3]); // 1 2 3
(..."hello"); // h e l l o
(...new Map([["a", "1"], ["b", "2"]]));// ["a", "1"] ["b", "1"]
(...new Set([1, 2, 3])); // 1 2 3

// 이터러블이 아닌 일반 객체는 스프레드 문법의 대상이 될 수 없다.
(...{a: 1, b:2}); // TypeError

({...{a : 1, b : 2}}) // { a : 1, b : 2} 이렇게는 가능

```

- 이때 나오는 결과는 값이 아니라 목록이다.
- 스프레드 문법 `...` 이 피연산자를 연산하여 값을 생성하는 연산자가 아님 !
- 따라서 스프레드 문법의 결과는 변수에 할당할 수 없음

```js
const list = ...[1,2,3]; // SyntaxError: Unexpected Token
```

- 쉼표로 구분한 값의 목록을 사용하는 문맥에서만 사용 가능
  - 함수 호출문의 인수 목록
  - 배열 리터럴의 요소 목록
  - 객체 리터럴의 프로퍼티 목록

## 35.1 함수 호출문의 인수 목록에서 사용하는 경우

```js
const arr = [1, 2, 3];

const max = Math.max(arr); // NaN
```

- 이전 문법

```js
var arr = [1, 2, 3];
var max = Math.max.apply(null, arr); // 3
```

- 최신 스프레드 문법

```js
const arr = [1, 2, 3];
const max = Math.max(...arr); // 3
```

- 가독성이 훨씬 좋다

- Rest 파라미터와 스프레드 문법은 서로 반대의 개념이므로 주의해야 한다.

```js
// Rest 파라미터는 인수들의 목록을 배열로 전달 받는다.

function foo(...rest) {
	console.log(rest); // 1, 2, 3 -> [1, 2, 3]
}

// 스프레드 문법은 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만든다.
// [1, 2, 3] -> 1, 2, 3

foo(...[1, 2, 3]);
```

## 35.2 배열 리터럴 내부에서 사용하는 경우

- 스프레드 문법을 배열 리터럴에서 사용하면 간결하고 가독성이 좋게 표현 가능

### concat

- 이전 concat 방식

```js
var arr = [1, 2].concat([3, 4]);
console.log(arr); // [1,2,3,4]
```

- 최신 스프레드 문법

```js
const arr = [...[1, 2], ...[3, 4]];
console.log(arr); // [1,2,3,4]
```

## splice

- 기존 splice 방식

```js
var arr1 = [1, 4];
var arr2 = [2, 3];

arr1.splice(1, 0, arr2);
console.log(arr1); // [1, [2,3],4]
// arr2의 배열을 해제하여 전달해야함
```

```js
var arr1 = [1, 4];
var arr2 = [2, 3];
Array.prototype.splice.apply(arr1, [1, 0].concat(arr2));
console.log(arr1); // [1,2,3,4]
```

- 스프레드 문법을 사용하면 더욱 간결하게 표현이 가능하다.

```js
const arr1 = [1, 4];
const arr2 = [2, 3];
arr1.splice(1, 0, ...arr2);
console.log(arr1);
```

### 배열 복사

- ES5 방식

```js
var origin = [1, 2];
var copy = origin.splice();
console.log(copy); //[1, 2];
console.log(copy === origin); // false
```

- 스프레드 문법을 사용하면 다음과 같이 더욱 간결하고 가독성 좋게 표현할 수 있다.

```js
const origin = [1, 2];
const copy = [...origin];
console.log(copy); // [1, 2]
aconsole.log(origin === copy); // false
```

### 이터블을 배열로 변환

- 이전 방식 ES5

```js
function sum() {
	// 이터러블이면서 유사 배열 객체인 arguments를 배열로 변환
	var args = Array.prototype.slice.call(arguments);
	return args.reduce(function (pre, cur) {
		return pre + cur;
	}, 0);
}
console.log(sum(1, 2, 3));
```

- 이 방법은 이터러블뿐만 아니라 이터러블이 아닌 유사 배열 객체로 배열로 변환할 수 있음

```js
const arrayLike = {
	0: 1,
	1: 2,
	2: 3,
	leght: 3,
};

const arr = Array.prototype.slice.call(arrayLike);
console.log(Array.isArray(arr)); // true
```

- 스프레드 문법을 사용

```js
function sum() {
	return [...arguments].reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2, 3));
```

- 위 예제보다 더 나은 방법은 Rest 파라미터를 사용하는 것이다.

```js
const sum (...args) => args.reduce((pre,cur) => pre + cur, 0)
console.log(sum(1,2,3)); // 6
```

- 단 이터러블이 아닌 유사 배열 객체는 스프레드 문법의 대상이 될 수 없다.
- 이터러블이 아닌 유사 배열 객체를 배열로 변경하려면 Array.from 메서드를 사용

```js
Array.from(arrayLike); // [1,2,3]
```

## 35.3 객체 리터럴 내부에서 사용하는 경우

- 최신 개정안에서는 일반 객체도 스프레드 문법의 사용을 허용한다.

```js
const obj = { x: 1, y: 2 };
const copy = { ...obj };
console.log(copy); // {x : 1, y: 2}
console.log(obj === copy); // false

const merged = { x: 1, y: 2, ...{ a: 3, b: 4 } };
```

```js
// 객체 병합, 프로퍼티가 중복되는 경우 뒤에 위치한 프로퍼티가 우선권을 갖음
const merged = { ...{ x: 1, y: 2 }, ...{ y: 10, z: 3 } };
console.log(merged); // {x:1, y:10, z:3}

// 특정 프로퍼티 변경
const changed = { ...{ x: 1, y: 2 }, y: 100 };
console.log(changed); // {x:1, y:100}

// 프로퍼티 추가
const added = { ...{ x: 1, y: 2 }, z: 0 };
console.log(added); // {x : 1 y : 2, z : 0}
```

_220429_
