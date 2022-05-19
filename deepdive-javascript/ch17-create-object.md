_2022.03.27_

# Ch.17 생성자 함수에 의한 객체 생성

- 객체 생성 생성 방식 중에서 생성자 함수를 사용하여 객체를 생성하는 방식

## 17.1 Object 생성자 함수

- new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환

```jsx
const person = new Object();

## 프로퍼티 추가
person.name = "Lee";
person.sayHello = function () {
    console.log("Hi My name is ", this.name);
};
console.log(person);
person.sayHello();
```

- 생성자 함수란 new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말한다.
- 생성자 함수에 의해 생성된 객체를 인스턴스 instance 라고 한ㄴ다.
- 자바스크립트는 Object 생성자 함수 이외에도 String, Number, Boolean, Function, Array, Date, RegExp, Promise 등의 빌트인 생성자 함수를 제공한다.
- 반드시 생성자 함수를 사용해 빈 객체를 생성해야 하는 것은 아니다. 객체를 생성하는 방법은 객체 리터럴을 사용하는 것이 더 간편한다.

## 17.2 생성자 함수

- 객체 리터럴에 의해 객체 생성 방식은 직관적이고 간편하다. 하지만 객체 리터럴에 의한 객체 생성 방식은 단 하나의 객체만 생성한다. 따라서 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율적이다.

### 17.2.2 생성자 함수에 의한 객체 생성 방식의 장점

- 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

```jsx
function Circle(radius) {
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * this.radius;
	};
}
const circle1 = new Circle(5);
const circle2 = new Circle(10);
console.log(circle1.getDiameter());
console.log(circle2.getDiameter());
```

### this

this는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수 self referencing variable이다.

| 함수 호출 방식       | this가 가리키는 값(this 바인딩)        |
| -------------------- | -------------------------------------- |
| 일반 함수로서 호출   | 전역 객체                              |
| 메서드로서 호출      | 메서드를 호출한 객체(마침표 앞의 객체) |
| 생성자 함수로서 호출 | 생성자 함수가 (미래에) 생성할 인스턴스 |

- 생성자 함수는 이름 그대로 객체(인스턴스)를 생성하는 함수다. 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다.

### 17.2.3 생성자 함수의 인스턴스 생성 과정

- 생성자 함수의 역할은 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로서 동작하여 인스턴스를 생성하는 것과 생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)하는 것이다.

```jsx
function Circle(radius) {
	// 인스턴스 초기화
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * this.radius;
	};
	// 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환됨
	//return 100 -> 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 this가 반환된다.
}
// 인스턴스 생성
const circle1 = new Circle(5);
```

### 바인딩

- 바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 예를 들어, 변수 선언은 변수 이름(식별자)과 확보된 메모리 공간의 주소를 바인딩하는 것이다. this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다)와 this가 가리킬 객체를 바인딩하는 것이다.

### 17.2.5 constructor 와 non-constructor 의 구분

- constructor : 함수 선언문, 함수 표현식, 클래스(클래스도 함수다.)
- non-constructor : 메서드(ES6 메서드 축약 표현), 화살표 함수

```jsx
function foo() {
	// 일반 함수로서 호추
	// [[Call]]이 호출된다. 모든 함수 객체는 [[Call]]이 구현되어 있다.
	foo();

	// 생성자 함수로서 호출
	// [[Contruct]]가 호출된다. 이때 [[Construct]]를 갖지 않는다면 에러가 발생한다.
	new foo();
}
```

### 17.2.6 new 연산자

- new 연산자와 함께 함수를 호출하면 해당 함수는 생성자 함수로 동작한다.
- 함수 객체의 내부 메서드 [[Contruct]]가 호출된다.
- 단, new 연산자와 함께 호출하는 함수는 contructor 함수여야 한다.

```jsx
function Circle(radius) {
	this.radius = radius;
	this.getDiameter = function () {
		return 2 * this.radius;
	};
}
const circle = Circle(5);
console.log(circle); // undefined

// 일반 함수 내부의 this는 전역 객체 window를 가리킨다.
console.log(radius); //5
console.log(getDiameter()); //10

circle.getDiameter();
// TypeError: Cannot read property 'getDiameter' of undefined
```

- Circle 함수를 new 연산자와 함께 생성자 함수로서 호출하면 함수 내부의 this는 Circle 생성자 함수가 생성할 인스턴스를 가리킨다. 하지만 Circle 함수를 일반적으로 함수로서 호출하면 함수 내부의 this는 전역 객체 window를 가리킨다.
- 따라서 radius와 getDiameter 메서드는 전역 객체의 프로퍼티와 메서드가 된다.

### 17.2.7 new.target

- new.target은 this와 유사하게 constructor인 모든 함수 내부에서 암무적인 지역 변수와 같이 사용되면 메타 프로퍼티라고 부른다.
- new 연산자와 함께 생성자 함수로서 호출되면 함수 내부의 new.target은 함수 자신을 가리킨다. new 연산자 없이 일반 함수로서 호출된 함수 내부의 new.target은 undefined다.

```jsx
// 생성자 함수
function Circle(radius) {
	// 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined 다.
	if (!new.target) {
		// new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환한다.
		return new Circle(radius);
	}
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    }
}
// new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출된다.
const circle - Circle(5);
console.log(circle.getDiameter());
```
