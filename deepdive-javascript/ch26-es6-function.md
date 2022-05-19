# Ch.26 ES6 함수의 추가 기능

## 26.1 함수의 구분

- ES6 이전의 모든 함수는 일반 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 있었다.

## 26.2 메서드

- ES6 이전 사양에는 메서드에 대한 명확한 정의가 없었다.
- ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.

```jsx
const obj = {
  x: 1,
  // foo는 메서드다.
  foo() {return this.x;}
  // bar는 메서드가 아니다.
  bar: function() {return this.x}
}
```

- ES6 에서 메서드는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

## 26.3 화살표 함수

- 화살표 함수는 function 키워드 대신 화살표를 사용하여 기존의 함수 정의 방식보다 간략하게 함수를 정의할 수 있다.

### 함수 정의

- 화살표 함수는 함수 선언문으로 정의할 수 없고 함수 표현식으로 정의해야 한다.

```jsx
const multiply = (x, y) => x * y;
multiply(2, 3);
```

- 매개변수가 한 개인 경우 소괄호를 ()를 생략할 수 있다.

```jsx
const arrow = x => {...};
```

### 함수 몸체 정의

- 함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 있다. 이때 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다.

```jsx
// concise body
const power = x => x ** 2;
power(2)l // 4

// 다음과 동일
// block body
const power = x => {return x ** 2};
```

- 함수 몸체를 감싸는 중괄호 {}를 생략한 경우 함수 몸체 내부의 문이 표현식이 아닌 문이라면 에러가 발생한다.

```jsx
const arrow = () => const x = 1; // SyntaxError: Unexpoected token 'const'
// 위 문장은 다음 표현과 같다
const arrow = () => {return const x = 1;}
```

- 함수 몸체가 하나의 문으로 구성된다 해도 함수 몸체의 문이 표현식이 아닌 문이라면 중괄호를 생략할 수 없다.

```jsx
const arrow = () => {
	const x = 1;
};
```

**- 객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호 ()로 감싸 주어야 한다.**

```jsx
const create = (id, content) => ({ id, content });
create(1, "javascript"); // {id:1, content:"javascript"};

// 위 표현은 다음고 동일하다.

const create = (id, content) = {return {id, content};};
```

- **함수 몸체가 여러 개의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 없다.**
- 이때 반환값이 있다면 명시적으로 반환해야 한다.

- 화살표 함수도 즉시 실행 함수 IFE 로 사용할 수 있다.

```jsx
const person = ((name) => ({
	sayHi() {
		return `Hi? My Nmae is ${name}. `;
	},
}))("han");
console.log(person.sayHi()); // Hi? My name is han
```

- 화살표 함수도 일급 객체이므로 Array.prototype.map, Array.prototype.filter, Array.prototype.reduce 같은 고차 함수에 인수로 전달할 수 있다.

```jsx
[1, 2, 3].map((v) => v * 2);
```

- 화살표 함수는 콜백 함수로서 정의할 때 특히 유용하다.

### 26.3.2 화살표 함수와 일반 함수의 차이

1. 화살표 함수는 인스턴스를 생성할 수 없는 non-contructor다.
2. 중복된 매개변수 이름을 선언할 수 없다.
3. 화살표 함수는 함수 자체의 this, arguments, super, new, target 바인딩을 갖지 않는다.

### 26.3.3 this

- this 바인딩은 함수의 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.

```jsx
class Prefixer {
	constructor(prefix) {
		this.prefix = prefix;
	}
	add(arr) {
		return arr.map(function (item) {
			return this.prefix + item;
		});
	}
}
const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"])); // TypeError this === undefined
```

- 모든 함수 내부의 this는 전역 객체를 가리킨다. 그런데 클래스 내부의 모든 코드에는 strict mode가 암묵적으로 적용된다. 따라서 Array.prototype.map 메서드의 콜백 함수에도 strict mode가 적용된다. strict mode에서 일반 함수로서 호출된 모든 함수 내부의 this 에는 전역 객체가 아니라 undefined가 바인딩되므로 일반 함수로서 호출되는 Array.prototype.map 메서드의 콜백 함수 내부의 this에는 undefined가 바인딩된다.
- 이때 발생하는 "콜백 함수 내부의 this 문제" 즉, 콜백 함수의 this와 외부 함수의 this가 서로 다른 값을 가리키고 있기 때문에 TypeError가 발생한 것이다.
- ES6 에서 문제 해결 방법

```jsx
// 1. add 메서드를 호출한 prefixer 객체를 가리키는 this를 일단 회피시킨 후에 콜백 함수 내부에서 사용
...
add(arr) {
  const that = this;
  return arr.map(function(item) {
    // this 대신 that을 참조
    return that.prefix + item;
  })
}
// 2. Array.prototype.map 의 두 번째 인수로 add 메서드를 호출한 prefixer 객체를 가리키는 this를 전달한다.
add(arr) {
  return arr.map(function(item) {
    return this.prefix + item;
  }, this) // this에 바인딩된 값이 콜백 함수 내부의 this에 바인딩된다.
}

// 3. function.prototype.bind 메서드를 사용하여 add 메서드를 호출한 prefixer 객체를 가리키는 this를 바인딩 한다.
add(arr) {
  return arr.map(function (item) {
    return this.prefix + item;
  }.bind(this)) // this에 바인딩된 값이 콜백 함수 내부의 this에 바인딩 된다.
}
// 4. ES6에서는 화살표 함수를 사용하여 "콜백 함수 내부의 this 문제"를 해결할 수 있다.
...
add(arr) {
  return arr.map(item => this.prefix + item);
}
```

- 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 **화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.** 이를 lexical this라 한다. 이는 마치 렉시컬 스코프와 같이 화살표 함수의 this가 함수가 정의된 위치에 의해 결정된다는 것을 의미한다.

- 화살표 함수를 Function.prototype.bind 를 사용하여 표현하면 다음과 같다.

```jsx
// 화살표 함수는 상위 스코프의 this 를 참조한다.
() => this.x;
// 익명 함수에 상위 스코프의 this를 주입한다. 위 화살표 함수와 동일하게 동작한다.
(function () {
	return this.x;
}.bind(this));
```

- 만약 화살표 함수와 화살표 함수가 중첩되어 있다면 상위 함수에도 this 바인딩이 없으므로 스코프 체인 상에서 가장 가까운 상위 함수 중에서 *화살표 함수가 아닌 함수의 this를 참조*한다.

```jsx
// 중첩 함수 foo의 상위 스코프는 IFE다.
// 따라서 화살표 함수 foo의 this는 상위 스코프인 즉시 실행 함수의 this를 가리킨다.

(function () {
	const foo = () => console.log(this);
	foo();
}.call({ a: 1 })); // { a : 1}

// bar 함수는 화살표 함수를 반환한다.
// bar 함수가 반환한 화살표 함수의 상위 스코프는 화살표 함수 bar다.
// 하지만 화살표 함수는 함수 자체의 this 바인딩을 갖지 않으므로 bar 함수가 반환한
// 화살표 함수 내부에서 참조하는 this는 화살표 함수가 아닌 즉시 실행 함수의 this를 가리킨다.

(function () {
	const bar = () => () => console.log(this);
	bar()();
}.call({ a: 1 }));
```

- 만약 화살표 함수가 전역 함수라면 화살표 함수의 this는 전역 객체를 가리킨다. 전역 함수의 상위 스코프는 전역이고 전역에서 this는 전역 객체를 가리키기 때문이다.

```jsx
// 전역 함수 foo의 상위 스코프는 전역이므로 화살표 함수 foo의 this는 전역 객체를 가리킨다.
const foo = () => console.log(this);
foo(); // winodw
```

- 프로퍼티에 할당한 화살표 함수도 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조한다.

```jsx
// increase 프로퍼티에 할당한 화살표 함수의 상위 스코프는 전역이다.
// 따라서 increase 프로퍼티에 할당한 화살표 함수의 this는 전역 객체를 가리킨다.
const counter = {
	num: 1,
	increase: () => ++this.num,
};
console.log(counter.increase()); // NaN
```

- 화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에 Function.prototype.call/apply/bind 메서드를 사용해도 화살표 함수 내부의 this 를 교체할 수 없다.

```jsx
window.x = 1;
const normal = function () {
	return this.x;
};
const arrow = () => this.x;

normal.call({ x: 10 }); //10
arrow.call({ x: 10 }); // 1
```

- 따라서 메서드를 화살표 함수로 정의하는 것은 피해야 한다.
- _메서드를 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋다._

```jsx
const person = {
	name: "Lee",
	sayHi() {
		console.log(`Hi ${this.name}`);
	},
};
person.sayHi(); // Hi Lee
```

- 프로토타입에 프로퍼티를 동적 추가할 때는 ES6 메서드 정의를 사용할 수 없으므로 일반 함수를 할당한다.

```jsx
function Person(name) {
	this.name = name;
}
Person.prototype.sayHi = function () {
	console.log(`Hi ${this.name}`);
};
const person = new Person("Han");
person.sayHi(); // Hi Han
```

- 일반 함수가 아닌 ES6 메서드를 동적 추가하고 싶다면 다음과 같이 *객체 리터럴을 바인딩하고 프로토타입의 constructor 프로퍼티와 생성자 함수 간의 연결을 재설정*한다.

```jsx
function Person(name) {
	this.name = name;
}
Person.prototype.sayHi = {
	constructor: Person,
	sayHi() {
		console.log(`Hi ${this.name}`);
	},
};
const person = new Person("Han");
person.sayHi(); // Hi Han
```

- 클래스 필드 정의 제안을 사용하여 클래스 필드에 화살표 함수를 할당할 수도 있지만 함수 내부의 this가 클래스가 생성한 인스턴스를 가리키게 되므로
- 프로토타입 메서드가 아니라 인스턴스 메서드가 된다. 따라서 메서드를 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용하는 것이 좋다.

```jsx
class Person {
  name = "Han";
  sayHi() {
		console.log(`Hi ${this.name}`);
	},
}
const person = new Person("Han");
person.sayHi(); // Hi Han
```

### 26.3.4 super

- 화살표 함수는 함수 자체의 super 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 상위 스코프의 super를 참조한다.

```jsx
class Base {
	constructor(name) {
		this.name = name;
	}
	sayHi() {
		return `Hi! ${this.name}`;
	}
}
class Derived extends Base {
	// 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킨다.
	sayHi = () => `${super.sayHi()} how are you doing?`;
}
const derived = new Derived("Han");
console.log(derived.sayHi()); // Hi! Han how are you doing?
```

### 26.3.5 arguments

- 화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 arguments를 참조하면 this와 마찬가지로 상위 스코프의 arguments를 참조한다.

```jsx
(function () {
	const foo = () => console.log(arguments); // [Arguments] { "0" : 1, "1" : 2}
	foo(3, 4);
})(1, 2);

// 화살표 함수 foo의 arguments는 상위 스코프인 전역의 arguments를 가리킨다.
// 하지만 전역에는 arguments 객체가 존재하지 않는다. arguments 객체는 함수 내부에서만 유효하다.

const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError : arguments is not defined
```

- 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 한다.

## 26.4 Rest 파라미터

### 26.4.1 기본 문법

- Rest 파라미터(나머지 매개변수)는 매개변수 이름 앞에 세개의 점 ... 을 붙여서 정의한 매개변수를 의미한다. Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달 받는다.

```jsx
function foo(...rest) {
	// 매개변수 resst는 인수들의 목록을 배열로 전달 받는 Rest 파라미터다.
	console.log(rest); // [1,2,3,4,5]
}
foo(1, 2, 3, 4, 5;);
```

- 일반 매개변수와 Rest 파라미터는 함께 사용할 수 있다. 이때 함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당된다.

```jsx
function foo(param, ...rest) {
	console.log(param); // 1
	console.log(rest); // [2,3,4,5]
}

foo(1, 2, 3, 4, 5);
```

### 26.4.2 Rest 파라미터와 arguments 객체

- ES6에서는 rest 파라미터를 사용하여 가변 인자 함수의 인수 목록을 배열로 직접 전달받을 수 있다.

```jsx
function sum(...args) {
	// Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]가 할당된다.
	return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

- 화살표 함수는 함수 자체의 arguments 객체를 갖지 않으므로 가변 인자 함수를 구현할 때 반드시 Rest 파라미터를 사용해야 한다.

## 26.5 매개변수 기본값

- 자바스크립트 엔진은 매개변수의 개수와 인수의 개수를 체크하지 않는다.
- 따라서 의도치 않은 결과가 나올 수 있으므로 기본값을 할당하는 방어 코드 작업이 필요하다.

```jsx
function sum(x, y) {
	x = x || 0;
	y = y || 0;
	return x + y;
}
console.log(sum(1, 2)); // 3
console.log(sum(1)); //1
```

- _ES6에서 도입된 매개변수 기본값을 사용하면 함수 내에서 수행하던 인수 체크 및 초기화를 간소화할 수 있다._

```jsx
function sum(x = 0, y = 0) {
	return x + y;
}

console.log(sum(1, 2));
console.log(sum(1));
```

- 매개변수 기본값은 매개변수에 인수를 전달하지 않은 경우와 `undefined`를 전달한 경우에만 유효하다.

```jsx
function logName(name = "Han") {
	console.log(name);
}

logName(); // Han
logName(undefined); // Han
logName(null); // null
```

- 앞서 살펴본 Rest 파라미터에는 기본값을 지정할 수 없다.
- 매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티와 arguments 객체이는 아무런 영향을 주지 않는다.

_220413_
