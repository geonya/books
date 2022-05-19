# Ch.10 객체 리터럴

-   자바스크립트를 구성하는 거의 `모든 것`이 객체다.
-   원시 타입은 단 하나의 값만 나타내지만 객체 타입은 다양한 타입의 값을 하나의 단위로 구성한 복합적인 자료구조다.
-   원시 타입의 값, 즉 원시 값은 변경 불가능한 값이지만 객체 타입의 값, 즉 객체는 변경 가능한 값이다.
-   객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 `Key`와 `Value`으로 구성된다.
-   자바스크립트 함수는 일급 객체이므로 값으로 취급할 수 있다.
-   프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 `method`라 부른다.

-   이처럼 객체는 프로퍼티와 메서드로 구성된 집합체이다.
    -   프로퍼티 : 객체의 상태를 나타내는 값(data)
    -   메서드 : 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작(behavior)

## 10.2 객체 리터럴에 의한 객체 생성

-   인스턴스 instance

    -   인스턴스란 클래스에 의해 생성되어 메모리에 저장된 실체를 말한다.

-   자바스크립트는 프로토타입 기반 객체지향 언어로서 클래스 기반 객체지향 언어와는 달리 다양한 객체 생성 방법을 지원한다.

    -   객체 리터럴
    -   object 생성자 함수
    -   생성자 함수
    -   Object.create 메서드
    -   클래스(ES6)

-   리터럴 ? literal : 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용하여 값을 생성하는 표기법

```javascript
const person = {
	name: `lee`,
	sayHello: function () {
		console.log(`Hi ${this.name}`);
	},
}; // 객체 리터럴의 중괄호는 코드블록을 의미하지 않는다
// 참고로 코드블록의 중괄호 뒤에는 세미콜론이 붙지 않는다.
```

-   숫자나 문자값을 만드는 것과 유사하게 리터럴로 객체를 생성한다.

## 10.3 프로퍼티

-   객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다.

-   프로퍼티 키 : 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
-   프로퍼티 값: 자바스크립트에서 사용할 수 있는 모든 값

```javascript
const pesrson = {
    firstName : "geony", // 식별자 네이밍 규칙을 준수함
    last-name : "Han" // error
    // "last-name" 으로 써야한다.
}
```

```javascript
const obj = {};
const key = `hello`;

obj[key] = `world`;

{
	hello: `world`;
}
```

-   이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다.
-   그렇다고 에러가 발생하지 않으므로 주의해야한다.

## 10.4 메서드

-   함수는 값으로 취급할 수 있기 때문에 프로퍼티 값으로 사용할 수 있다.
-   프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드 `method`라 부른다.
    (`객체에 묶여 있는 함수`)

```javascript
const circle = {
	radius: 5, // 프로퍼티

	getDiameter: function () {
		// 메서드
		return 2 * this.raidus; // this 는 circle 을 의미함
	},
};
```

-   메서드 내부에 사용한 this 키워드는 객체 자신을 가리키는 참조 변수다.

## 10.5 프로퍼티 접근

-   . 마침표 프로퍼티 접근 연산자를 사용하는 `마침표 표기법` `dot notation`
-   [...] 대괄호 프로퍼티 접근 연산자를 사용하는 `대괄호 표기법` `bracket notation`

```javascript
const person = {
    `last-name` : `lee`,
    1 : 10
}

person.`last-name` // error
person.last-name; // NaN
person[last-name] // error
person[`last-name`] // O

person.1 // erro
person.`1` // error
person[1] // o
person[`1`] // o
```

## 10.6 프로퍼티 값 갱신

-   이미 존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신된다.

```javascript
const person = {
	name: `lee`,
};

person.name = `Kim`;

console.log(person); // {name : `kim`}
```

## 10.7 프로퍼티 동적 생성

-   존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당된다.

```javascript
const person = {
	name: `lee`,
};

person.age = 20;

consol.log(person); // {name:`lee` , age:20};
```

## 10.8 프로퍼티 삭제

-   `delete` 연산자는 객체의 프로퍼티를 삭제한다. 이때 delete 연산자의 피연산자는 프로퍼티 값에 접근할 수 있는 표현식이어야 한다. 만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러 없이 무시된다.

```javascript
const person = {
	name: `han`,
};

person.age = 20;

delete person.age; // 삭제 가능
delete person.adderss; // 삭제할 수는 없지만 에러가 발생하지 않는다.
```

## 10.9 ES6에서 추가된 객체 리터럴의 확장 기능

### 10.9.1 프로퍼티 축약 표현

```javascript
const x = 1 , y = 2;
const obj = {
    x : x,
    y : y,
}

===

const obj = {x, y}
```

-   ES6에서는 프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략할 수 있다.
    이때 프로퍼티 키는 변수 이름으로 자동 생성된다.

### 10.9.2 계산된 프로퍼티 이름

```javascript
const prefix = `prop`;
const i = 0;

const obj = {};

obj[prefix + `-` + ++i] = i;
obj[prefix + `-` + ++i] = i;
obj[prefix + `-` + ++i] = i;

console.log(obj); // {prop-1 : 1, prop-2 : 2, prop-3 : 3};
```

-   ES6 에서 메서드를 정의할 대 function 키워드를 생략한 축약 표현을 사용할 수 있다.

```javascript
const obj = {
	name: `lee`,
	sayHi() {
		console.log(`hi! ` + this.name);
	},
};

obj.sayHi();
```
