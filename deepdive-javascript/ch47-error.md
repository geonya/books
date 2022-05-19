# DeepDive JS Ch.47 Error

## 47.1 에러 처리의 필요성

- 에러는 언제나 발생할 수 있다.
- 에러에 대처하지 않고 방치하면 프로그램은 강제 종료될 수 있다.
- 에러 처리는 이를 방지하기 위함이다.

- `try...catch` 문을 사용해 발생한 에러에 적절하게 대응하면 프로그램이 강제 종료되지 않고 계속해서 코드를 실행시킬 수 있다.

## 47.2 try...catch...finally 문

```js
try {
	// 실행할 코드(에러가 발생할 가능성이 있는 코드)
} catch (err) {
	// try 코드 블록에서 에러가 발생하면 이 코드 블록의 코드가 실행됨
	// err 에는 try 코드 블록에서 발생한 Error 객체가 전달됨
} finally {
	// 에러 발생과 상관없이 반드시 한 번 실행된다.
}
```

## 47.3 Error 객체

```js
const error = new Error("invalid");
```

- Error 생성자 함수가 생성한 에러 객체는 message 프로퍼티와 stack 프로퍼티를 갖는다.
- message : Error 생성자 함수에 인수로 전달한 에러 메시지
- stack : 에러를 발생시킨 콜스택의 호출 정보를 나타내는 문자열 (디버깅 목적)

- `Error` : 일반적인 에러
- `SyntaxError` : 자바스크립트 문법에 맞지 않는 문을 해석할 때 발생하는 에러 객체
- `RefrenceError` : 참조할 수 없는 식별자를 참조했을 때 발생하는 에러 객체
- `TypeError` : 피연산자 또는 인수의 데이터 타입이 유효하지 않을 때 발생하는 에러 객체
- `RangeError` : 숫자값의 허용 범위를 벗어났을 때 발생하는 에러 객체
- `URIError` : encodeURI 또는 decodeURI 함수에 부적절한 인수를 전달했을 때 발생하는 에러 객체
- `EvalError` : eval 함수에서 발생하는 에러 객체

## 47.4 throw 문

- 에러를 발생시키려면 try 코드 블록에서 throw 문으로 에러 객체를 던져야 한다.

```js
try {
	// 에러 객체를 생성한다고 에러가 발생하는 것이 아님
	new Error("Something Wrong");
} catch (error) {
	console.log(error);
}
```

```js
try {
	throw new Error("Something Wrong");
} catch (error) {
	console.log(error);
}
```

## 47.5 에러의 전파

- 에러는 호출자 caller 방향으로 전파된다.
- 즉, 콜 스택의 아래 방향(실행 중인 실행 컨텍스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향)으로 전파된다.

```js
const foo = () => {
	throw Error("foo애서 발생한 에러");
};

const bar = () => {
	foo();
};

const baz = () => {
	bar();
};

try {
	baz();
} catch (err) {
	console.error(err);
}

//     Error: foo애서 발생한 에러
//     at foo (<anonymous>:2:8)
//     at bar (<anonymous>:6:2)
//     at baz (<anonymous>:10:2)
//     at <anonymous>:14:2
```

- 이처럼 throw 된 에러를 캐치하지 않으면 호출자 방향으로 전파된다.
- 이때 throw된 에러를 캐치하여 적절히 대응하면 프로그램을 강제 종료시키지 않고 코드의 실행 흐름을 복구할 때 있다.

- 주의)
  - 비동기 함수인 setTimeout 이나 프로미스 후속 처리 메서드의 콜백 함수는 호출자가 없다는 것
  - setTimeout이나 프로미스 후속 처리 메서드의 콜백 함수는 태스크 큐나 마이크로태스크 큐에 일시 저장되었다가 콜 스택이 비면 이벤트 루프에 의해 콜 스택으로 푸시되어 실행
  - 이때 콜 스택에 푸시된 콜백 함수의 실행 컨텍스트는 콜 스택의 가장 하부에 존재하게 된다. 따라서 에러를 전파할 호출자가 존재하지 않음

_220519_
