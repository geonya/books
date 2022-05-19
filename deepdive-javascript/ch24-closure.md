# Ch.24 클로저 Closure

- 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

```jsx
const x = 1;
function outerFunc() {
	const x = 10;
	function innerFunc() {
		console.log(x);
	}
	innerFunc();
}
outerFunc();
```

- 만약 innerFunc 이 outerFunc 외부에 있다면 x 변수를 사용할 수 없다.
- 자바스크립트가 렉시컬 스코프를 따르는 프로그래밍 언어이기 때문이다.

## 24.1 렉시컬 스코프

- 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디서 정의했는지에 따라 상위스코프를 결정한다. : 렉시컬 스코프(정적 스코프)

## 24.2

- 함수는 자신의 내부 슬록 [[Environment]] 에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.

## 24.3 클로저와 렉시컬 환경

```jsx
const x = 1;

//1
function outer() {
	const x = 10;
	const inner = function () {
		console.log(x);
	};
	return inner;
}

// outer 함수를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
const innerFunc = outer();
// outer 함수가 제거되어 지역 변수 x는 더는 유효하지 않을 것처럼 보이지만 innerFunc 에서는 x가 계속 존재하는 것처럼 보인다.
innerFunc(); // 10
```

- 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다.
- 이러한 중첩 함수를 클로저 라고 부른다.
- 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

  - (그 함수가 선언된 렉시컬 환경)이란 함수가 정의된 위치의 스코프, 즉 상위 스코프를 의미하는 실행 컨텍스트의 렉시컬 환경을 말한다.
  - 자바스크립트의 모든 함수는 자신의 상위 스코프를 기억한다, 어디서 호출하든 상관없이 함수는 언제나 자신이 기억하는 상위 스코프의 식별자를 참조할 수 있으며 식별자에 바인딩된 값을 변경할 수도 있다.
  - 위 예제에서 inner 함수는 자신이 평가될 때 자신이 정의된 위치에 의해 결정된 상위 스코프를 [[Environment]] 내부 슬롯에 저장한다. 이때 저장된 상위 스코프는 함수가 존재하는 한 유지된다.
  - outer 함수의 실행 컨텍스트 스택에서 제거되도 렉시컬 환경까지 소멸하는 것은 아니다.
  - outer 함수의 렉시컬 환경은 inner 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있고 inner 함수는 전역 변수 innerFunc에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않기 때문이다. 가비지 컬렉터는 누군가가 참조하고 있는 메모리 공간은 해제하지 않는다.

- 자바스크립트의 모든 함수는 상위 스코프를 기억하므로 이론적으로 모든 함수는 클로저다.
- 하지만 상위 스코프의 어떤 식별자도 참조하지 않는 함수는 클로저가 아니다.

## 24.4 클로저의 활용

- 클로저는 상태 state 를 안전하게 변경하고 유지하기 위해 사용한다.
- 상태를 안전하게 은닉하고 information hiding 특정함수에게만 상태 변경을 허용한다.

```jsx
let num = 0;
const increase = function () {
	return ++num;
};

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3

// 위 함수는 위험 요소가 있다 다음 전제 조건이 지켜져야 함
// 1. 카운트 상태 (num 변수의 값)는 increase 함수가 호출되기 전에 변경되지 않고 유지되어야 한다.
// 2. 이를 위해 카운트 상태 (num 변수의 값)은 increase 함수만이 변경할 수 있어야 한다.
```

- 의도치 않게 전역 변수 num의 값이 변경되면 오류로 이어진다.
- increase 함수만이 num 변수를 참조하고 변경할 수 있도록 하는 방법

```jsx
const increase = function () {
	let num = 0;
	return ++num;
};

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

- num 전역 변수를 지역 변수로 바꾸면 상태 변경을 방지할 수는 있지만 increase 함수가 새로 호출될 때마다 0으로 초기화된다
- 이전 상태를 유지할 수 있도록 클로저를 사용해보자

```jsx
const increase = (function () {
	// 즉시 실행 함수
	let num = 0;
	// 클로저
	return function () {
		return ++num;
	};
})();

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
```

- 위 코드가 실행되면 즉시 실행 함수가 호출되고 즉시 실행 함수가 반환한 함수가 increase 변수에 할당된다.
- increase 변수에 할당된 함수는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하는 클로저다.
- 즉시 실행 함수는 호출된 이후 소멸되지만 즉시 실행 함수가 반환한 클로저는 increase 변수에 할당되어 호출된다.
- 이때 즉시 실행 함수가 반환한 클로저는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하고 있다.
- 따라서 즉시 실행 함수가 반환한 클로저는 카운트 상태를 유지하기 위한 자유 변수 num 을 언제 어디서 호출하든지 참조하고 변경할 수 있다.
- 즉시 실행 함수는 한 번만 실행되므로 increase가 호출될 대마다 num 변수가 재차 초기화될 일은 없을 것이다.
- 또한 num 변수는 외부에서 직접 접근할 수 없는 은닉된 private 변수이므로 전역 변수를 사용했을 때와 같이 의도되지 않은 변경을 걱정할 필요도 없다.
- 이처럼 클로저는 상태 state 가 의도치 않게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용된다.

```jsx
const counter = (function () {
	let num = 0;
	// Closure인 메서드를 갖는 객체를 반환
	// 객체 리터럴은 스코프를 만들지 않는다.
	// 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
	return {
		increase() {
			return ++num;
		},
		decrease() {
			return num > 0 ? --num : 0;
		},
	};
})();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.increase()); // 3
console.log(counter.decrease()); // 2
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

```jsx
const Counter = (function () {
	let num = 0;
	// 즉시 실행 함수 내에서 선언된 num 변수는 인스턴스를 통해 접근할 수 없으며, 즉시 실행 함수 외부에서도 접근할 수 없는 은닉된 변수다.
	function Counter() {
		// this.num = 0; // 프로퍼티는 public 하므로 은닉되지 않는다.
	}
	// 생성자 함수 Counter는 프로토타입을 통해 increase, decrease 메서드를 상속받는 인스턴스를 생성한다.
	// increase, decrease 메서드는 모두 자신의 함수 정의가 평가되어 함수 객체가 될 때 실행 중인 실행 컨텍스트인 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경을 기억하는 클로저다.
	Counter.prototype.increase = function () {
		return ++num;
	};
	// 따라서 프로토타입을 통해 상속되는 프로토타입 메서드일지라도 즉시 실행함수의 자유 변수 num을 참조할 수 있다. 다시 말해 num 변수의 값은 increase, decrease 메서드 만이 변경할 수 있다.
	Counter.prototype.decrease = function () {
		return num > 0 ? --num : 0;
	};
	return Counter;
})();

const counter = new Counter();
console.log(counter.increase());
console.log(counter.increase());
console.log(counter.increase());
console.log(counter.decrease());
console.log(counter.decrease());
console.log(counter.decrease());

// 변수 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적인 원인이 될 수 있다. 외부 상태 변경이나 가변 mutable 데이터를 피하고 불변성 immutabillity 을 지향하는 함수형 프로그래밍에서 부수 효과를 최대한 억제하여 오류를 피하고 프로그램의 안전성을 높이기 위해 클로저는 적극적으로 사용된다.
```

```jsx
// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter 를 기억하는 클로저를 반환한다.
function makeCounter(aux) {
	// 카운트 상태를 유지하기 위한 자유 변수
	let counter = 0;
	return function () {
		// 인수로 전달받은 보조 함수에 상태 변경을 위임한다.
		counter = aux(counter);
		return counter;
		//makeCounter 함수가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 makeCounter 함수의 스코프에 속한 counter 변수를 기억하는 클로저다.
	};
}

// 보조 함수
function increase(n) {
	return ++n;
}
function decrease(n) {
	return --n;
}
// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다.
const increaser = makeCounter(increase);
const decreaser = makeCounter(decrease);

increaser(); // 1
increaser(); // 2
decreaser(); // -1
decreaser(); // -2
// increaser 와 decreaser 는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동되지 않는다.
```

- makeCounter 함수는 보조 함수를 인자로 전달 받고 함수를 반환하는 고차 함수다. makeCounter 함수가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 makeCounter 함수의 스코프에 속한 counter 변수를 기억하는 클로저다.
- makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다.
- 렉시컬 환경을 공유하는 클로저를 만들기 위해서는 어떻게 해야될까?

```jsx
// 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
const counter = (function () {
	// 카운터 상태를 유지하기 위한 자유 변수
	let counter = 0;
	// 함수를 인수로 전달받는 클로저를 반환
	return function (aux) {
		counter = aux(counter);
		return counter;
	};
})();

// 보조 함수
function increase(n) {
	return ++n;
}
function decrease(n) {
	return --n;
}
// 보조함수를 전달하여 호출
counter(increase); // 1
counter(decrease); // 0
// 자유 변수를 공유함
```

## 24.5 캡슐화와 정보 은닉

- 캡슐화는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶은 것을 말한다.
- 캡슐화는 객체의 특성 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉 information hiding 이라 한다.
- 정보 은닉은 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로부터 객체의 상태가 변경되는 것을 방지해 정보를 보호하고, 객체 간의 상호 의존성, 즉 결합도 coupling 를 낮추는 효과가 있다.

```jsx
function Person(name, age) {
	this.name = name; //public
	let _age = age; // private

	this.sayHi = function () {
		console.log(`Hi!, My name is ${this.name}. I am ${_age}`);
	};
}

const me = new Person("Han", 20);
me.sayHi(); // Hi! My name is Han. I am 20
console.log(me.name); // Han
console.log(me._age); // undefined
```

- name 프로퍼티는 외부에 공개되어 있어 public 하지만
- \_age 변수는 Person 생성자 함수의 지역 변수이므로 Person 생성자 함수 외부에서 참조하거나 변경할 수 없다. 즉 private 하다.
- 하지만 위 예제의 문제는 sayHi 인스턴스 메서드를 Person 객체가 생성될 때마다 중복 생성한다는 것이다.
- sayHi 메서드를 프로토타입 메서드로 변경하여 sayHi 메서드의 중복 생성을 방지해보자.

```jsx
function Person(name, age) {
	this.name = name;
	let _age = age;
}

Person.prototype.sayHi = function () {
	console.log(`Hi!, My name is ${this.name}. I am ${_age}.`);
};
```

- 하지만 이때 문제는 \_age 지역 변수를 참조할 수 없다는 것이다.

```jsx
const Person = (function () {
	let _age = 0; //private
	// 생성자 함수
	function Person(name, age) {
		this.name = name;
		_age = age;
	}

	// 프로토타입 메서드
	Person.prototype.sayHi = function () {
		console.log(`Hi!, My name is ${this.name}. I am ${_age}.`);
	};

	//생성자 함수 반환
	return Person;
})();

const me = new Person("han", 20);
me.sayHi();
console.log(me.name);
console.log(me._age);

const you = new Person("lee", 30);
you.sayHi();
me.sayHi(); // my name is Han I am 30
```

- Person 생성자 함수와 sayHi 메서드는 이미 종료되어 소멸한 즉시 실행 함수의 지역 변수 \_age를 참조할 수 있는 클로저다
- but ! 위 코드의 문제는 \_age 변수 상태가 유지 되지 않는 다는 것이다.
- Person.prototype.sayHi 메서드는 자신의 상위 스코프인 즉시 실행 함수의 실행 컨텍스트의 렉시컬 환경의 참조를 [[Environment]]에 저장하여 기억한다.
- 이 메서드가 프로토타입으로 단 한 번 생성되기 때문에 문제가 발생하는 것이다.
- 다행히 클래스에 private 필드를 정의할 수 있는 새로운 표준 사양이 제안되었다. 25장 참고

## 24.6 자주 발생하는 실수

```jsx
var funcs = [];
for (var i = 0; i < 3; i++) {
	// i 변수는 함수 레벨 스코프를 갖기 때문에 전역 변수다.
	funcs[i] = function () {};
}
for (var j = 0; j < funcs.length; j++) {
	console.log(funcs[j]()); // 3 3 3
}
```

- 바르게 동작하는 코드

```jsx
var funcs = [];
for (var i = 0; i < 3; i++) {
	funcs[i] = (function (id) {
		// 즉시 실행 함수는 전역 변수 i에 현재 할당되어 있는 값을 인수로 전달받아 매개변수 id에 할당한 후 중첩 함수를 반환하고 종료된다.
		// 즉시 실행 함수가 반환한 함수는 funcs 배열에 순차적으로 저장된다.
		// 이때 즉시 실행 함수의 매개변수 id 는 즉시 실행 함수가 반환한 중첩 함수의 상위 스코프에 존재한다.
		// 즉시 실행 함수가 반환한 중첩 함수는 자신의 상위 스코프 (즉시 실행 함수의 렉시컬 환경)를 기억하는 클로저이고, 매개변수 id는 즉시 실행 함수가 반환한 중첩 함수에 묶여 있는 자유 변수가 되어 그 값이 유지된다.

		return function () {
			return id;
		};
	})(i);
}
for (var j = 0; j < funcs.length; j++) {
	console.log(funcs[j]());
}
```

- var 키워드를 사용하여 발생한 문제로 let 키워드를 사용하면 더 깔끔하게 해결이 가능하다.

```jsx
const funcs = [];
for (let i = 0; i < 3; i++) {
	// let 키워드로 서선언한 초기화 변수를 사용한 for 문이 평가되면 먼저 새로운 렉시컬 환경을 생성하고 초기화 변수 식별자와 값을 등록
	// 새롭게 생성된 렉시컬 환경을 현재 실행 중인 실행 컨텍스트의 렉시컬 환경으로 교체
	funcs[i] = function () {
		return i;
	};
}
for (let i = 0; i < funcs.length; i++) {
	console.log(funcs[i]());
}
```

- 함수형 프로그래밍 기법인 고차 함수를 사용하는 방법이 있다.

```jsx
const funcs = Array.from(new Array(3), (_, i) => () => i);
funcs.forEach((f) => console.log(f()));
```
