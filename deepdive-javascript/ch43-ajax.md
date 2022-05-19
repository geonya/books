# Ch.43 AJAX

## 43.1 Ajax 란 ?

- `Ajax` Asynchronous Javascript and XML 란 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식이다.
- Ajax 는 브라우저에서 제공하는 Web API인 `XMLHttpRequest` 객체를 기반으로 동작
- XMLHttpRequest 는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공
  <br/>
- 이전의 웹페이지는 완전한 HTML을 서버로부터 전송받아 웹페이지 전체를 처음부터 다시 렌더링 하는 방식으로 동작함

  - 불필요한 데이터 통신
  - 전체 페이지를 다시 렌더링하기 때문에 화면 깜빡임 현상
  - 클라이언트와 서버와의 통신이 동기 방식으로 동작하기 때문에 서버로부터 응답이 있을 때까지 다음 처리는 블로킹된다.

- Ajax의 등장으로 서버로부터 웹페이지의 변경에 필요한 데이터만 비동기 방식으로 전송받아 웹페이지를 변경할 필요가 없는 부분은 다시 렌더링하지 않고
- 변경할 필요가 있는 부분만 한정적으로 렌더링하는 방식이 가능해짐
- 브라우저에서도 데스크톱 애플리케이션처럼 빠른 퍼포먼스와 부드러운 화면 전환이 가능해짐

- Ajax의 장점
  - 불필요한 데이터 통신 X
  - 깜박임 현상 X
  - 비동기 방식으로 서버에서 요청을 보낸 이후 블로킹 X

## 43.2 JSON

- `JSON` Javascript Object Notation 은 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷
- 자바스크립트에 종속되지 않는 언어 독립형 데이터 포맷으로, 대부분의 프로그래밍 언어에서 사용 가능

### JSON.stringify

- `JSON.stringify` 메서드는 객체를 JSON 포맷의 문자열로 변환
- 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 하는데 이를 직렬화 serializing 라 한다.

### JSON.parse

- `JSON.parse` 메서드는 JSON 포맷의 문자열을 객체로 변환
- 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열이다. 이 문자열을 객체로 사용하려면 JSON 포맷의 문자열을 객체화해야 하는데 이를 역직렬화 deserializing 라 한다.

## 43.3 XMLHttpRequest

- 자바스크립트를 사용하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용한다.
- Web API 인 XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메서드와 프로퍼티를 제공

### XMLHttpRequest 객체 생성

```js
// XMLHttpRequest 객체의 생성
const xhr = new XMLHttpRequest();
```

### XMLHttpRequest 객체의 프로퍼티와 메서드

- 책 참고

### HTTP 요청 전송

- HTTP 요청을 전송하는 순서
  1. XMLHttpRequest.prototype.open 메서드로 HTTP 요청을 초기화
  2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 특성 HTTP 요청의 헤더 값을 설정
  3. XMLHttpRequest.prototype.send 메서드로 HTTP 요청을 전송

#### XMLHttpRequest.prototype.open

```js
xhr.open(method, url[, async]);
```

- method : HTTP 요청 메서드 (GET, POST, PUT, DELETE 등)
  - `GET` : index/retrieve : 모든/특정 리소스 취득
  - `POST` : create : 리소스 생성
  - `PUT` : replace : 리소스 전체 교체
  - `PATCH` : modify : 리소스의 일부 수정
  - `DELETE` : delete : 모든/특정 리소스 삭제
- url : HTTP 요청을 전송할 URL
- async : 비동기 요청 여부, 옵션으로 기본값은 true

#### XMLHttpRequest.prototype.send

- send 메서드는 open 메서드로 초기화된 HTTP 요청을 서버에 전송
- GET / POST 요청 메서드에 따라 전송 방식 차이가 있다.
  - `GET` : 데이터를 URL 일부분인 쿼리 문자열 query string 로 서버에 전송
  - `POST` : 데이터(payload)를 요청 몸체 (request body)에 담아 전송(payload가 객체인 경우 반드시 JSON.stringify 메서드를 사용하여 직렬화한 다음 전달해야함)
- HTTP 요청 메서드가 GET인 경우 send 메서드에 페이로드로 전달한 인수는 무시되고 요청 몸체는 null로 설정됨

#### XMLHttpRequest.prototype.setRequestHeader

- setRequestHeader 메서드는 특정 HTTP 요청의 헤더 값을 설정
- setRequestHeader 메서드는 반드시 open 메서드를 호출한 이후에 호출해야 함
- Content-type 은 요청 몸체에 담아 전송할 데이터의 MIME 타입의 정보를 표현
  - 자주 사용되는 MIME 타입
    - `text`
    - `application`
    - `multipart`

```js
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open(“POST”, “/users”);

// HTTP 요청 헤더 설정
// 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json

xhr.setRequestHeader(“content-type”, “application/json”);

// HTTP 요청 전송
xhr.send(JSON.stringify({id:1, content:”HTML”, completed:false});
```

- HTTP 클라이언트가 서버에 요청할 대 서버가 응답할 데이터의 MIME 타입을 Accept 로 지정할 수 있다.

### HTTP 응답 처리

- 서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야함
- XMLHttpRequest 는 `onreadystatechange`, `onload`, `onerror` 같은 이벤트 핸들러 프로퍼티를 갖는다.
- HTTP 요청의 현재 상태를 나타내는 `readyState` 프로퍼티 값이 변경된 경우 발생하는 readystatechange 이벤트를 캐치하여 HTTP 응답을 처리할 수 있음

```js
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open(“GET, “/users”);

// HTTP 요청 전송
xhr.send();

// readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가 변경될 때마다 발생
xhr.onreadystatechange = () => {
  // readyState 프로퍼티는 HTTP 요청의 현재 상태를 나타냄
  // readState 프로퍼티 값이 4(XMLHttpRequest.DONE)가 아니면 서버 응답이 완료되지 않은 상태임

 if (xhr.readState !== XMLHttpRequest.DONE) return;

 // status 프로퍼티는 응답 상태 코드를 나타냄

 if (xhr.status === 200) {
   console.log(JSON.parse(xhr.response));
 } else {
   console.error("Error", xhr.status, xhr.statusText);
 }
}
```

- send 메서드를 통해 HTTP 요청을 서버에 전송하면 서버는 응답을 반환한다.
- 하지만 언제 응답이 클라이언트에 도달할지는 알 수 없다.
- 따라서 readystatechange 이벤트를 통해 HTTP 요청의 현재 상태를 확인해야 한다.
- readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가 변경될 때마다 발생

- onreadystatechange 이벤트 핸들러 프로퍼티에 할당한 이벤트 핸들러는 HTTP 요청의 현재 상태를 나타내는 xhr.readyState 가 XMLHttpRequest.DONE 인지 확인하여 서버의 응답이 완료되었는지 확인
- 서버의 응답이 완료되면 xhr.status 값을 200으로 확인할 수 있음 (HTTP 상태 코드)
- readystatechange 이벤트 대신 `load 이벤트` 를 캐치해도 됨

```js
// XMLHttpRequest 객체 생성
const xhr = new XMLHttpRequest();

// HTTP 요청 초기화
xhr.open(“GET, “/users”);

// HTTP 요청 전송
xhr.send();

// load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생
xhr.onload = () => {
  if (xhr.status === 200) {
   console.log(JSON.parse(xhr.response));
 } else {
   console.error("Error", xhr.status, xhr.statusText);
 }
}
```

_220512_
