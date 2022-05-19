# DeepDive JS Ch.46 async/await

## 46.1 제러네이터란?

- **코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수 함수**
  1. 제러네이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
  - 함수의 제어권을 함수가 독점하는 것이 아니라 함수 호출자에게 양도 `yield` 할 수 있다는 것
  2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
  - 제너레이터 함수는 함수 호출자에게 전달할 수 있고 함수 호출자로부터 상태를 전달받을 수도 있다.
  3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
  - 제러네이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 `이터러블`이면서 동시에 `이터레이터인` 제너레이터 객체를 반환

## 46.2 제너레이터 함수의 정의

- 제너레이터 함수는 `function*` 키워드로 선언
- 하나 이상의 `yield` 표현식을 포함

```js
// 제너레이터 함수 선언문
function* genDecFunc() {
	yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
	yield 1;
};

// 제너레이터 메서드

const obj = {
	*genObjMethod() {
		yield 1;
	},
};

// 제너레이터 클래스 메서드

class MyClass {
	*genClsMethod() {
		yield 1;
	}
}
```

- `애스터리스크(*)`의 위치는 function 키워드와 함수 이름 사이라면 어디든지 상관 없음
- 일관성 유지를 위해 function 키워드 바로 뒤에 붙이는 것을 권장 ✅
- 화살표 함수로 정의 불가 ❌
- new 연산자와 함께 생성자 함수로 호출 불가 ❌

## 46.3 제너레이터 객체

- 제너레이터 함수를 호출하면 일반 함수처럼 코드 블록을 실행하는 것이 아니라 제너레이터 객체를 생성해 반환
- 제너레이터 객체는 이터러블이면서 동시에 이터레이터 이다.

## 46.4 제너레이터의 일시 중지와 재개

- 제너레이터는 yield 키워드와 next 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있음
- yield 키워드는 제너레이터 함수의 실행을 일시 중지시키거나 yield 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환
- 제너레이터 객체의 next 메서드를 호출하면 yield 표현식까지 실행되고 일시 중지 suspend 된다.
- _제너레이터 객체의 next 메서드는 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환_
- value 는 yield 표현식에서 yield 된 값 (yield 키워드 뒤의 값)이 할당
- done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 불리언 값이 할당
- `generator.next() -> yield -> generator.next() -> yield -> ... generator.next() -> return`

```js
function* genFunc() {
	const x = yield 1;

	const y = yield x + 10;

	return x + y;
}

const generator = genFunc(0);

let res = generator.next();
console.log(res); // {value : 1, done:false}

res = generator.next(10); // 10은 x 에 할당
console.log(res); // {value:20, done:false}

res = generator.next(20); // 20은 y 에 할당
console.log(res); // {value : 30, done:true}
```

- 이처럼 제너레이터 함수는 next 메서드와 yield 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있음
- next 메서드에 인수를 전달해서 제너레이터 객체에 상태(yield 표현식을 할당받는 변수)를 밀어넣을 수 있다.
- 이처럼 제너레이터의 특성을 활용하면 비동기 처리를 **동기 처리처럼 구현할 수 있다.**

## 46.6 async / await

- 제너레이터를 사용해서 비동기 처리를 동기 처리처럼 구현하는 건 복잡하다.
- ES8부터 도입된 `asyn/await` 을 이용하면 가독성 좋게 구현이 가능하다.
- **`asyn/await` 은 프로미스를 기반으로 동작한다.**

## async 함수

- **await 키워드는 반드시 async 함수 내부에서만 사용해야한다.**
- **async 함수는 언제나 프로미스를 반환한다.** 명시적으로 프로미스를 반환하지 않더라도 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.

## await 키워드

- await 키워드는 프로미스가 settled 상태 (비동기 처리가 수행된 상태)가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다.
- await 키워드는 반드시 프로미스 앞에서 사용해야 한다.

```js
const fetch = require("node-fetch");

const getGithubUserName = async (id) => {
	const res = await fetch(`https://api.github.com/users/${id}`);
	const { name } = await res.json();
	//- Response.promise.json 메서드는 Response 객체에서 HTTP 응답 몸체 (response body) 를 취득하여 역직렬화 (parse) 한다.
	console.log(name); // geonya
};
getGithubUserName("geonya");
```

1. fetch 함수가 수행한 HTTP 요청에 대한 서버의 응답이 도착 -> fetch 함수가 반환한 프로미스가 settled 상태가 될 때까지 await fetch 함수 대기
2. 프로미스가 settled 상태가 되면 프로미스가 resolve 한 처리 결과가 res 변수에 할당

- 이처럼 await 키워드는 실행을 일시 중지시켰다가 프로미스가 settled 상태가 되면 다시 재개한다.

- 순서에 상관없이 개별적으로 수행되는 비동기 처리는 이렇게 표현하는 것이 좋다.

```js
async function foo() {
	const res = await Promise.all([
		new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
		new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
		new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
	]);

	console.log(res); // [1,2,3]
}
foo(); // 약 3초 소요
```

- 순서가 보장되어야 하는 비동기 처리는 모든 프로미스에 await 키워드를 써서 순차적으로 처리한다.

```js
async function bar(n) {
	const a = await new Promise((resolve) => setTimeout(() => resolve(n), 3000));
	const b = await new Promise((resolve) =>
		setTimeout(() => resolve(a + 1), 2000)
	);
	const c = await new Promise((resolve) =>
		setTimeout(() => resolve(b + 1), 1000)
	);

	console.log([a, b, c]); // [1,2,3]
}

bar(1); // 약 6초 소요
```

## 에러 처리

- `async/await` 에서 에러 처리는 `try...catch` 문으로 쉽게 사용할 수 있다.

```js
const fetch = require("node-fetch");

const foo = async () => {
	try {
		const wrongUrul = "ABADF.com";
		const response = await fetch(wrongUrul);
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.error(err); // TypeError: Failed to fetch
	}
};
```

- _async 함수 내에서 catch 문을 사용해서 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject하는 프로미스를 반환한다._
- 따라서 async 함수를 호출하고 Promise.prototype.catch 후속 처리 메서드를 사용해 에러를 캐치할 수도 있다.

```js
const fetch = require("node-fetch");

const foo = async () => {
	const wrongUrul = "ABADF.com";
	const response = await fetch(wrongUrul);
	const data = await response.json();
	console.log(data);
};

foo().then(console.log).catch(console.error);
```

_220518_
