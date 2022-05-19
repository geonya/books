# DeepDive JS Ch.45 Promise

- 자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용한다.
- 하지만 전통적인 콜백 패턴은 콜백 헬을 유발해 가독성이 나쁘고 비동기 처리 중 발생한 에러의 처리가 곤란하며 여러 개의 비동기 처리를 한 번에 처리하는데도 한계가 있다.
- ES6에서는 비동기 처리를 위한 또 다른 패턴으로 프로미스 `Promise` 를 도입했다.
- **프로미스는 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다.**

## 45.1 비동기 처리를 위한 콜백 패턴의 단점

### 45.1.1 콜백 헬

```js

const get = url => {
  // XMLHttpRequest 객체 생성
  const xhr = new XMLHttpRequest();

  // HTTP 요청 초기화
  xhr.open(“GET, url);

  // HTTP 요청 전송
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버의 응답을 기록
      console.log(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  }
}

// id가 1인 POST 를 취득

get("https://jsonplaceholder.typicode.com/posts/1");

```

- get 함수는 서버의 응답 결과를 콘솔에 출력함
- get 함수가 서버의 응답 결과를 반환하게 하려면 ?
- get 함수는 비동기 함수임 (비동기 함수 : 함수 내부에 비동기로 동작하는 코드를 포함한 함수)
- 비동기 함수를 호출하면 함수 내부의 비동기로 동작하는 코드가 완료되지 않았다 해도 기다리지 않고 즉시 종료된다.
- 따라서 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.

- 비동기 함수는 setTimeout 함수의 콜백 함수에서 상위 스코프의 변수에 값을 할당해보자.

```js
let g = 0;
// 비동기 함수인 setTimeout 함수는 콜백 함수의 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하지 못한다.
setTimeout(() => {
	g = 100;
}, 0);

console.log(g); // 0
```

- get 함수도 비동기 함수다. (onload 이벤트 핸들러가 비동기로 동작하기 때문)
- get 함수를 호출하면 GET 요청을 전송하고 onload 이벤트 핸들러를 등록한 다음 undefined를 반환하고 즉시 종료된다.
- 따라서 get 함수의 onload 이벤트 핸들러에서 서버의 응답 결과를 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.

- get 함수가 서버의 응답 결과를 반환하도록 수정

```js
const get = (url) => {
	// XMLHttpRequest 객체 생성
	const xhr = new XMLHttpRequest();

	// HTTP 요청 초기화
	xhr.open("GET", url);

	// HTTP 요청 전송
	xhr.send();

	xhr.onload = () => {
		if (xhr.status === 200) {
			// 서버의 응답을 기록
			return JSON.parse(xhr.response);
		} else {
			console.error(`${xhr.status} ${xhr.statusText}`);
		}
	};
};

// id가 1인 POST 를 취득

const response = get("https://jsonplaceholder.typicode.com/posts/1");
console.log(response); // undefined
```

- get 함수가 호출되면 XMLHttpRequest 객체를 생성하고, HTTP 요청을 초기화한 후, HTTP 요청을 전송한다.
- 그리고 xhr.onload 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩하고 종료
- get 함수에 명시적인 반환문이 없으므로 get 함수는 undefined 를 반환한다.
- onload 이벤트 핸들러 프로퍼티에 바인딩한 이벤트 핸들러의 반환문은 get 함수의 반환문이 아니기 때문에 반환값을 캐치할 수 없다.

- 비동기 함수 get 이 호출되면 함수 코드를 평가하는 과정에서 get 함수의 실행 컨텍스트가 생성되고 실행 컨텍스트 스택(콜 스택)에 푸시된다. 이후 함수 코드 실행 과정에서 xhr.onload 이벤트 핸들러 프로퍼티에 이벤트 핸들러가 바인딩된다.
- get 함수가 종료되면 get 함수의 실행 컨텍스트가 콜 스택에서 팝되고, 곧 바로 console.log가 호출된다.
- console.log 의 실행 컨텍스트가 생성되어 실행 컨텍스트 스택에 푸시된다. 만약 console.log 가 호출되기 이전에 load 이벤트가 발생했더라도 xhr.onload 이벤트 핸들러 프로퍼티에 바인딩한 이벤트 핸들러는 결코 console.log 보다 먼저 실행되지 않는다.
- 서버로부터 응답이 도착하면 xhr 객체에서 load 이벤트가 발생한다.
- 이때 xhr.onload 핸들러 프로퍼티에 바인딩한 이벤트 핸들러가 즉시 실행되는 것이 아니다. xhr.onload 이벤트 핸들러는 load 이벤트가 발생하면 일단 태스크 큐에 저장되어 대기하다가, 콜 스택이 비면 이벤트 루프에 의해 콜 스팩으로 푸시되어 실행된다.
- 이벤트 핸들러도 함수이므로 이벤트 핸들러의 평가 -> 이벤트 핸들러의 실행 컨텍스트 생성 -> 콜 스팩에 푸시 -> 이벤트 핸들러 실행 과정을 거친다.
- 이처럼 비동기 함수는 비동기 처리 결과를 외부에 반환할 수 없고, 상위 스코프의 변수에 할당할 수도 없다.
- 따라서 비동기 함수의 처리 결과(서버의 응답 등)에 대한 후속 처리는 비동기 함수 내부에서 수행해야 한다.
- 이때 비동기 함수를 범용적으로 사용하기 위해 비동기 함수에 비동기 처리 결과에 대한 후속 처리를 수행하는 콜백 함수를 전달하는 것이 일반적이다.
- 필요에 따라 비동기 처리가 성공하면 호출될 콜백 함수와 비동기 처리가 실패하면 호출될 콜백 함수를 전달할 수 있다.

```js
const get = (url) => {
	// XMLHttpRequest 객체 생성
	const xhr = new XMLHttpRequest();

	// HTTP 요청 초기화
	xhr.open("GET", url);

	// HTTP 요청 전송
	xhr.send();

	xhr.onload = () => {
		if (xhr.status === 200) {
			// 서버의 응답을 기록
			successCallback(JSON.parse(xhr.response));
		} else {
			failureCallback(xhr.status);
		}
	};
};

// id가 1인 POST 를 취득

get("https://jsonplaceholder.typicode.com/posts/1", console.log, console.error);
```

- 콜백 헬 : 콜백 함수를 통해 비동기 처리에 대한 후속 처리를 수행하는 비동기 함수가 비동기 처리 결과를 가지고 또다시 비동기 함수를 호출해야 한다면 콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상이 발생하는 것

```js
const get = (url) => {
	// XMLHttpRequest 객체 생성
	const xhr = new XMLHttpRequest();

	// HTTP 요청 초기화
	xhr.open("GET", url);

	// HTTP 요청 전송
	xhr.send();

	xhr.onload = () => {
		if (xhr.status === 200) {
			// 서버의 응답을 기록
			callback(JSON.parse(xhr.response));
		} else {
			console.error(`${xhr.status} ${xhr.statusText}`);
		}
	};
};

const url = "https://jsonplaceholder.typicode.com/posts/1";

// id가 1인 post의 userId를 취득
get(`${url}/posts/1`, ({ userId }) => {
	console.log(userId); // 1
	get(`${url}/uesrs/${userId}`, (userInfo) => {
		console.log(userInfo);
	});
});
```

- 위 예제를 보면 GET 요청을 통해 서버로부터 응답(id가 1인 post)을 취득하고 이 데이터를 사용하여 또다시 GET 요청을 한다.

```js
get("/step1", a => {
  get(`/step2/${a}`, b=> {
    get(`/step3/${b}`. c => {
      get(`/step4/${c}`, d => {
        console.log(d);
      })
    })
  })
})
```

### 에러처리의 한계

- 비동기 처리를 위한 콜백 패턴의 문제점 중에서 가장 심각한 것은 에러 처리가 곤란하다는 것이다.

```js
tyr {
  setTimeout(() => {throw new Error("Error!");}, 1000);
} catch (e) {
  // 에러를 캐치하지 못한다
  console.error("캐치한 에러", e)
}
```

- setTimeout은 비동기 함수이므로 콜백 함수가 호출되는 것을 기다리지 않고 즉시 종료되어 콜 스택에서 제거
- 이후 타이머가 만료되면 setTimeout 함수의 콜백함수는 태스크 큐로 푸시되고 콜 스택이 비어졌을 때 이벤트 루프에 의해 콜 스택으로 푸시되어 실행
- setTimeout 함수의 콜백 함수가 실행될 때 setTimeout 함수는 이미 콜 스택에서 제거된 상태
- setTimeout의 콜백 함수를 호출한 것은 setTimeout이 아니라는 것을 의미
- _에러는 호출자(caller) 방향으로 전파_ 되기 때문에 setTimeout 콜백 함수를 호출한 것은 setTimeout 함수가 아니기 때문에 catch 블록에서 에러가 캐치되지 않음
- **비동기 처리를 위한 콜백 패턴은 콜백 헬을 유발하고 에러 처리가 곤란하다는 문제가 있음**

## 45.2 프로미스의 생성

- `Promise` 생성자 함수를 new 연산자와 함께 호출하면 프로미스(Promise 객체)를 생성한다.
- `Promise` 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받는데 이 콜백 함수는 `resolve`와 `reject` 함수를 인수로 전달받는다.

```js
const promise = new Promise((resolve, reject) => {
  // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행
  if (/* 비동기 처리 성공 */) {
    resolve("result");
  } else { /* 비동기 처리 실패 */
    reject("failure reason");
  }
})
```

- `Promise` 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 비동기 처리를 수행한다.
- 비동기 처리가 성공하면 콜백 함수의 인수로 전달받은 `resolve` 함수를 호출
- 비동기 처리가 실패하면 `reject` 함수를 호출

```js
const promiseGet = (url) => {
	return new Promise((resolve, reject) => {
		// XMLHttpRequest 객체 생성
		const xhr = new XMLHttpRequest();

		// HTTP 요청 초기화
		xhr.open("GET", url);

		// HTTP 요청 전송
		xhr.send();

		xhr.onload = () => {
			if (xhr.status === 200) {
				// 서버의 응답을 기록
				resolve(JSON.parse(xhr.response));
			} else {
				reject(new Error(xhr.status));
			}
		};
	});
};

// id가 1인 POST 를 취득

promiseGet("https://jsonplaceholder.typicode.com/posts/1");
```

- 비동기 함수인 `promiseGet`은 함수 내부에서 프로미스를 생성하고 반환한다
- 비동기 처리는 `Promise` 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 수행한다.
- 만약 비동기 처리가 성공하면 -> `resolve` 함수에 인수로 전달하면서 호출
- 비동기 처리가 실패하면 에러를 `reject` 함수에 인수로 전달하면서 호출

#### 프로미스의 상태

- `pending` : 비동기 처리가 아직 수행되지 않은 상태 (프로미스가 생성된 직후 기본 상태)
- `fulfilled` : 비동기 처리가 수행된 상태 (성공 - resolve 호출)
- `rejected` : 비동기 처리가 수행된 상태 (실패 - reject 호출)

- 프로미스는 기본적으로 `pending` 상태
- **즉 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체이다.**

## 45.3 프로미스 후속 처리 메서드

- 프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출된다.
- 이때 후속 처리 메서드의 콜백 함수에 프로미스의 처리 결과가 인수로 전달된다.
- _모든 후속 처리 메서드는 프로미스를 반환하며, 비동기로 동작한다_

### Promise.prototype.then

- `then` 메서드는 두 개의 콜백 함수를 인수로 전달 받음
  1. 첫 번째 콜백 함수는 프로미스가 `fulfilled` 상태(`resolve` 함수가 호출된 상태)가 되면 호출된다. 이때 콜백 함수는 프로미스의 비동기 처리 결과를 인수로 전달 받음
  2. 두 번째 콜백 함수는 프로미스가 `rejected` 상태(`reject` 함수가 호출된 상태)가 되면 호출된다. 이때 콜백 함수는 프로미스의 에러를 인수로 전달받는다.

```js
// fulfilled
new Promise((resolve) => resolve("fulfilled")).then(
	(v) => console.log(v),
	(e) => console.log(e)
); // fullfilled

// rejected
new Promise((_, reject) => reject(new Error("rejected"))).then(
	(v) => console.log(v),
	(e) => console.error(e)
); // Error: rejected
```

- `then` 메서드는 언제나 프로미스를 반환한다.
- 만약 `then` 메서드의 콜백 함수가 프로미스를 반환하면 그 프로미스를 그대로 반환
- 콜백 함수가 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로 `resolve` 또는 `reject` 하여 프로미스를 생성해 반환

### Promise.prototype.catch

- `catch` 메서드의 콜백 함수는 프로미스가 `rejected` 상태인 경우만 호출

```js
// rejected
new Promise((_, reject) => reject(new Error("rejected"))).catch((e) =>
	console.error(e)
); // Error : rejected
```

- `catch` 메서드는 `then(undefined, onRejected)`과 동일하게 동작한다. 따라서 `then` 메서드와 마찬가지로 언제나 프로미스를 반환한다.

```js
// rejected
new Promise((_, reject) => reject(new Error("rejected"))).then(undefined, (e) =>
	console.error(e)
); // Error: rejected
```

### Promise.prototype.finally

- `finally` 메서드의 콜백 함수는 프로미스의 성공 또는 실패와 상관없이 무조건 한 번 호출된다.
- `finally` 메서드는 프로미스의 상태와 상관없이 공통적으로 수행해야 할 처리 내용이 있을 때 유용하다.
- 언제나 프로미스를 반환한다.

```js
new Promise(() => {}).finally(() => console.log("finally")); // finally
```

- 프로미스로 구현한 비동기 함수 get 을 사용해 후속 처리를 구현해보자

```js
promiseGet("https://jsonplaceholder.typicode.com/posts/1")
	.then((res) => console.log(res))
	.catch((err) => console.error(err))
	.finally(() => console.log("bye!"));
```

## 45.4 프로미스의 에러 처리

- 비동기 처리에서 발생한 에러는 then 메서드의 두 번째 콜백 함수로 처리할 수 있다.
- _단, then 메서드의 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못하고 코드가 복잡해져 가독성이 좋지 않다._

```js
promiseGet(wrongUrl).then(
	((res) => console.log(res), (err) => console.error(err))
); // Error: 404
```

- `cache` 메서드를 사용해 처리

```js
promiseGet(wrongUrl)
	.then((res) => console.log(res))
	.catch((err) => console.error(err)); // Error: 404
```

- `then` 메서드에 두 번째 콜백 함수를 전달하는 것보다 _`catch` 메서드를 사용하는 것이 가독성이 좋고 명확하다._

## 45.5 프로미스 체이닝

```js
const url = "https://jsonplaceholder.typicode.com/posts/1";

// id가 1인 post의 userId를 취득
promiseGet(`${url}/posts/1`)
.then(({userId}) => promiseGet(`${url}/users/${userId}`))
.then(userInfo => console.log(userInfo);)
.catch(err => console.error(err));
```

- 이처럼 `then` / `catch` / `finally` 후속 처리 메서드는 콜백 함수가 반환한 프로미스를 반환한다.
- 만약 후속 처리 메서드의 콜백 함수가 프로미스가 아닌 값을 반환하더라도 그 값을 암묵적으로 `resolve` / `reject` 하여 프로미스를 생성해 반환

- 프로미스는 프로미스 체이닝을 통해 비동기 처리 결과를 전달받아 후속 처리를 하므로 비동기 처리를 위한 콜백 패턴에서 발생하던 콜백 헬이 발생하지 않는다.
- 다만 콜백 패턴은 가독성이 좋지 않으므로 ES8에서 도입된 `async/await` 을 통해 해결할 수 있음
- _`async/await` 을 사용하면 프로미스의 후속 처리 메서드 없이 마치 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현 가능_

```js

const url = "https://jsonplaceholder.typicode.com/posts/1";

(async () => {
  const {userId} = await promiseGet(`${url}/posts/1`);
  const userInfo = await promiseGet(`${url}/users/${userId}`));
  console.log(userInfo);
})();
```

- **`async/await` 도 프로미스를 기반으로 동작하므로 프로미스에 대한 이해가 필요하다.**

_220516_

## 45.6 프로미스의 정적 메서드

- Promise 는 주로 생성자 함수로 사용되지만 함수도 객체이므로 메서드를 가질 수 있음

### Promise.resolve / Promise.reject

- 이미 존재하는 값을 래핑하여 프로미스를 생성하기 위해 사용

```js
const resolvedPromise = Promise.resolve([1, 2, 3]);
resolvedPromise.then(console.log); // [1,2,3]
```

- 위 예제는 아래 예제와 동일하다

```js
const resolvedPromise = new Promise((resolve) => resolve([1, 2, 3]));
resolvedPromise.then(console.log); // [1,2,3]
```

```js
// 에러 객체를 reject하는 프로미스르 생성
const resolvedPromise = Promise.reject(new Error("Error!"));
resolvedPromise.catch(console.log); // Error : Error!
```

- 위 예제는 아래 예제와 동일하다

```js
const resolvedPromise = new Promise((_, reject) => reject(new Error("Error!")));
resolvedPromise.catch(console.log); // [1,2,3]
```

### Promise.all

- **여러 개의 비동기 처리를 모두 병렬 처리할 때 사용**

```js
const requestData1 = () =>
	new Promise((resolve) => setTimeout(() => resolve(1), 3000));
const requestData2 = () =>
	new Promise((resolve) => setTimeout(() => resolve(2), 2000));
const requestData3 = () =>
	new Promise((resolve) => setTimeout(() => resolve(3), 1000));

// 세 개의 비동기 처리를 순차적으로 처리

const res = [];
requestData1()
	.then((data) => {
		res.push(data);
		return requestData2();
	})
	.then((data) => {
		res.push(data);
		return requestData3();
	})
	.then((data) => {
		res.push(data);
		console.log(res); // [1,2,3]
	})
	.catch(console.error);
```

- 세 개의 비동기 처리를 서로 의존하지 않고 개별적으로 수행됨
- 따라서 위 예제의 경우 세 개의 비동기 처리를 위 방식처럼 순차적으로 처리할 필요가 없다.

- `Promise.all` 메서드는 여러 개의 비동기 처리를 모두 병렬 처리할 때 사용한다.

```js
Promise.all([requestData1(), requestData2(), requestData3()])
	.then(console.log)
	.catch(console.error);
```

- `Promise.all` 메서드는 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달 받음
- 전달 받은 모든 프로미스가 모두 fulfilled 상태가 되면 모든 처리 결과를 배열에 저장해 새로운 프로미스를 반환
- `Promise.all` 메서드는 인수로 전달받은 배열의 모든 프로미스가 모두 fulfilled 상태가 되면 종료
- 따라서 `Promise.all` 메서드가 종료하는 데 걸리는 시간은 가장 늦게 fulfilled 상태가 되는 프로미스의 처리 시간보다 조금 더 길다.

- 모든 프로미스가 fulfilled 상태가 되면 resolve된 처리 결과를 모두 배열에 저장해 새로운 프로미스를 반환
- 이때 첫 번째 프로미스가 가장 나중에 fulfilled 상태가 되어도 `Promise.all` 메서드는 첫 번째 프로미스가 resolve 한 처리 결과부터 차례대로 배열에 저장
- **즉, 처리 순서가 보장된다.**

- `Promise.all` 메서드는 인수로 전달받은 배열의 프로미스 중 하나라도 rejected 상태가 되면 나머지 프로미스가 fulfilled 상태가 되는 것을 기다리지 않고 즉시 종료

- 인수로 전달받은 이터러블 요소는 프로미스가 아닌 경우 resolve 메서드를 통해 프로미스로 래핑된다.

### 45.6.3 Promise.race

- `Promise.race` 메서드는 이터러블을 인수로 전달 받음
- 가장 먼저 fulfilled 상태가 된 프로미스의 처리 결과를 resolve하는 새로운 프로미스를 반환
- 에러 처리는 `Promise.all` 과 동일 하다.

### Promise.allSettled

- `Promise.allSettled` 메서드는 프로미스를 요소로 갖는 이터러블을 인수로 전달 받음
- 전달받은 프로미스가 모두 settled 상태(비동기 처리가 수행된 상태, 즉 fulfilled 또는 rejected 상태)가 되면 처리 결과는 배열로 반환

```js
Promise.allSettled([
	new Promise((resolve) => setTimeout(() => resolve(1), 2000)),
	new Promise((_, reject) =>
		setTimeout(() => reject(new Error("Error!")), 1000)
	),
]).then(console.log);

// 0: {status: 'fulfilled', value: 1}
// 1: {status: 'rejected', reason: Error: Error! at <anonymous>:4:27}
// length: 2
// [[Prototype]]: Array(0)
```

- `Promise.allSettled` 메서드가 반환한 배열에는 fulfilled 또는 rejected 상태와는 상관없이 Promise.allSettled 메서드가 인수로 전달받은 모든 프로미스들의 처리 결과가 모두 담겨 있다.

## 45.7 마이크로태스크 큐 microtask queue / job queue

```js
setTimeout(() => console.log(1), 0);

Promise.resolve()
	.then(() => console.log(2))
	.then(() => console.log(3));
```

- 1 -> 2 -> 3 순서대로 동작할 것처럼 보이지만 사실 2 -> 3 -> 1 순으로 처리 된다.
- 그 이유는 프로미스의 후속 처리 메서드의 콜백 함수는 태스크 큐가 아니라 마이크로태스크 큐에 저장되기 때문이다.
- 마이크로태스크 큐는 태스크 큐 보다 우선 순위가 높다.
- 이벤트 루프는 콜 스택이 비면 먼저 마이크로태스크 큐에서 대기하고 있는 함수를 가져와 실행한다. 이후 마이크로태스크 큐가 비면 태스크 큐에서 가져온다.

## 45.8 fetch

- fetch 함수는 XMLHttpRequest 객체와 마찬가지로 HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API 이다.
- fetch 함수에는 HTTP 요청을 전송할 URL과 HTTP 요청 메서드, HTTP 요청 헤더, 페이로드 등을 설정한 객체를 전달한다.

```js
const promise = fetch(url, [, option]);
```

- `fetch` 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 프로미스를 반환하므로 후속 처리 메서드 then을 통해 프로미스가 resolve한 Response 객체를 전달받을 수 있다.

- Response.prototype 에는 Response 객체에 포함되어 있는 HTTP 응답 몸체를 위한 다양한 메서드를 제공
- `fetch` 함수가 반환한 프로미스가 래핑하고 있는 MIME 타입이 application/json 인 HTTP 응답 몸체를 취득하려면 Response.prototype.json 메서드를 사용
- Response.promise.json 메서드는 Response 객체에서 HTTP 응답 몸체 (response body) 를 취득하여 역직렬화 (parse) 한다.

```js
fetch("https://~~~~~~~~/todos/1")
	.then((response) => response.json())
	.then((json) => console.log(json));
```

- fetch 함수를 사용할 때 에러 처리

```js
fetch(wrongUrl)
	.then(() => console.log("ok"))
	.catch(() => console.error("error"));
```

- `fetch` 함수가 반환하는 프로미스는 기본적으로 404 not found 같은 HTTP 에러가 발생해도 에러를 reject 하지 않는다.
- 대신 불리언 타입의 ok 상태를 false로 설정한 Response 객체를 resolve (return) 한다.
- 오프라인 등의 네트워크 장애나 CORS 에러에 의해 요청이 완료되지 못한 경우에만 프로미스를 reject 한다.

- 따라서 `fetch` 함수를 사용할 때는 `fetch` 함수가 반환한 프로미스가 resolve한 불리언 타입의 ok 상태를 확인해 명시적으로 에러를 처리할 필요가 있음

```js
fetch(wrongUrl)
	.then((response) => {
		if (!response.ok) throw new Error(response.statusText);
		return response.json();
	})
	.then((result) => console.log(result))
	.catch((err) => consol.error(err));
```

- `axios` 는 모든 HTTP 에러를 reject 하는 프로미스를 반환한다. 따라서 모든 에러를 catch 할 수 있어 편리하다.

_220517_
