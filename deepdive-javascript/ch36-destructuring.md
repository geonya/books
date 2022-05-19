# Ch.36 Destructuring Assignment

- 구조화된 배열과 같은 이터러블 또는 객체를 비구조화하여 1개 이상의 변수에 개별적으로 할당

```js
const arr = [1, 2, 3];
const [one, two, three] = arr;
console.log(one, two, three); // 1 2 3
```

- 단 우변에 `이터러블`을 할당하지 않으면 에러가 발생한다.
- 변수의 개수와 배열의 개수가 반드시 일치할 필요는 없다.
- 남는 변수는 `undefined` 가 할당된다.

- 배열 `디스트럭처링` 할당을 위한 변수에 기본값을 설정할 수 있다.

```js
const [a, b, c = 3] = [1, 2];
```

- 배열 `디스트럭처링` 할당을 위한 변수에 `Rest` 파라미터와 유사하게 `Rest` 요소를 `...` 을 사용할 수 있다.
- `Rest` 요소는 `Rest` 파라미터와 마찬가지로 반드시 마지막에 위치해야 한다.

```js
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [2, 3]
```

## 36.2 객체 디스트럭처링 할당

- 객체 `디스트러처링 할당`은 객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당한다.

```js
const user = { firstName: "geony", lastName: "han" };
// 이때 프로퍼티 키를 기준으로 드스트럭처링 할당이 이루어진다. 순서는 의미가 없다
const { lastName, firstName } = user;
```

- 객체의 프로퍼티 키와 다른 변수 이름으로 프로퍼티 값을 할당 받을 수 있고 변수에 기본값을 설정할 수도 있다.

```js
const { firstName: fn = "geony", lastName: ln } = { lastName: "han" };
console.log(fn, ln); // geony han
```

- 객체 `디스트러처링` 할당은 객체에서 프로퍼티 키로 필요한 프로퍼티 값만 추출하여 변수에 할당하고 싶을 대 유용하다.

```js
const str = "hello";
// String 래퍼 객체로부터 length 프로퍼티만 추출한다.
const { length } = str;
console.log(length); // 5

const todo = { id: 1, content: "HTML", completed: true };
// todo 객체로부터 id 프로퍼티만 추출한다.
const { id } = todo;
console.log(id); // 1
```

- 객체를 인수로 전달받는 매개변수 todo에 객체 `디스트럭처링` 할당을 사용하면 좀 더 간단하고 가독성 좋게 표현 가능

```js
function printTodo({ content, completed }) {
	console.log(`할일 ${content}은 ${completed ? "완료" : "미완료"}상태입니다.`);
}
printTodo({ id: 1, content: "HTLM", completed: true });
```

- 배열의 요소가 객체인 경우 배열 `디스트럭처링` 할당과 객체 `디스트럭처링` 할당을 혼용할 수 있음

```js
const todos = [
	{ id: 1, content: "html", completed: true },
	{ id: 2, content: "CSS", completed: false },
	{ id: 3, content: "JS", completed: true },
];

// todos 배열의 두 번째 요소인 객체로부터 id 프로퍼티만 추출한다.
const [, { id }] = todos;
console.log(id); // 2
```

- 중첩 객체의 경우는 다음과 같이 사용

```js
const user = {
	name: "lee",
	address: {
		zipCode: "23442",
		city: "Seoul",
	},
};
const {
	address: { city },
} = user;
console.log(city); // Seoul
```

- 객체 `디스트럭처링` 할당을 위한 변수에 `Rest` 파라미터나 `Rest` 요소와 유사하게 `Rest 프로퍼티` `...`을 사용할 수 잇다.
- `Rest` 요소와 마찬가지로 반드시 마지막에 위치 해야함

```js
const { x, ...rest } = { x: 1, y: 2, z: 3 };
console.log(x, rest); // 1 {y:2, z:3}
```

_220502_
