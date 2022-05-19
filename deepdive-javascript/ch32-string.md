# Ch.32 String

## 32.1 String 생성자 함수

- 표준 빌트인 객체인 `String` 객체는 생성자 함수 객체다. 따라서 new 연산자와 함께 호출하여 `String` 인스턴스를 생성할 수 있다.
- `String` 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 `[[StringData]]` 내부 슬롯에 빈 문자열을 할당한 String 래퍼 객체를 생성한다.

```js
const strObj = new String();
console.log(strObj); // String {length:0, [[PrimitiveValue]]: ""}
```

```js
const strObj = new String("han");
console.log(strObj);
String {
  '0': 'h',
  '1': 'a',
  '2': 'n',
  length: 3,
  [[PrimitiveValue]]: "han"
  }
}
```

- `String` 래퍼 객체는 배열과 마찬가지로 `length` 프로퍼티와 인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키로, 각 문자를 프로퍼티 값으로 갖는 유사 배열 객체이면서 이터러블이다.
- 따라서 배열과 유사하게 인덱스를 사용하여 각 문자에 접근할 수 있다.

```js
const strObj = new String("han");
// 문자열은 원시 값이므로 변경할 수 없다. 이때 에러가 발생하지 않는다.
strObj[0] = "S";
console.log(strObj); // "han"
```

- `String` 생성자 함수의 인수로 문자열이 아닌 값을 전달하면 인수를 문자열로 강제 변환하여 `[[StringData]]` 내부 슬롯에 변환된 문자열을 할당한 `String` 래퍼 객체를 생성한다.

```js
let strObj = new String(123);
console.log(strObj); // "123"

strObj = new String(null);
console.log(strObj); // "null"
```

## 32.2 legnth 프로퍼티

- `length` 프로퍼티는 문자열의 문자 개수를 반환한다.

## 32.3 String 메서드

- 문자열은 변경 불가능한 원시 값이기 때문에 `String` 래퍼 객체도 읽기 전용 객체로 제공된다.

```js
const strObj = new String("Han");
console.log(Object.getOwnPropertyDescriptors(strObj));
// {
//   '0': {
//     value: 'H',
//     writable: false,
//     enumerable: true,
//     configurable: false
//   },
//  ...
// }
```

- `String` 객체의 모든 메서드는 `String` 래퍼 객체를 직접 변경할 수 없고
- `String` 객체의 메서드는 언제나 새로운 문자열을 반환한다.

### String.prototype.indexOf

- `indexOf` 메서드는 대상 문자열(메서드를 호출한 문자열)에서 인수로 전달받은 문자열을 검색하여 첫 번째 인덱스를 반환한다.
- 검색에 실패하면 -1을 반환한다.

```js
const str = "Hello world";
// 문자열 str 에서 "l"을 검색하여 첫 번째 인덱스를 반환한다.
str.indexOf("l"); // 2
str.indexOf("x"); // -1
str.includes("x"); // false
```

### String.prototype.search

- `search` 메서드는 대상 문자열에서 인수로 전달받은 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스를 반환한다.
- 검색에 실패하면 -1을 반환한다.

```js
const str = "Hello world";
str.search(/0/); // 4
str.search(/x/); // -1
```

### String.prototype.includes

- 문자열이 포함되어 있는지 확인하여 그 결과를 `true` or `false` 로 반환한다.

### String.prototype.startsWith

- 대상 문자열로 시작하는 확인하여 그 결과를 `true` or `false` 로 반환한다.

```js
const str = "Hello world";

str.startsWith("He"); // true

// 문자열 str의 인덱스 5부터 시작하는 문자열이 " "로 시작하는지 확인
str.startsWith(" ", 5); // true
```

### String.prototype.EndsWith

- endsWith 메서드는 대상 문자열이 인수로 전달받은 문자열로 끝나는지 확인하여 그 결과를 `true` or `false`로 반환한다.

### String.prototype.charAt

- 대상 문자열에서 인수로 전달받은 인덱스에 위치한 문자를 검색하여 반환한다

```js
const str = "Hello world";
for (let i = 0; i < str.length; i++) {
	console.log(str.charAt(i));
}
// 'H'
// 'e'
// 'l'
// 'l'
// 'o'
// ' '
// 'w'
// 'o'
// 'r'
// 'l'
// 'd'
```

### String.prototype.substring

- substring 메서드는 대상 문자열에서 첫 번째 인수로 전달받은 인덱스에 위치하는 문자부터 두 번째 인수로 전달받은 인덱스에 위치하는 문자의 바로 이전 문자까지의 부분 문자열을 반환한다.

```js
const str = "Hello World";

// 인덱스 1부터 4 이전까지의 부분 문자열을 반환
str.substring(1, 4); // ell
// 인덱스 1부터 마지막 문자까지
str.substring(1); // ello World
```

- String.prototype.indexOf 메서드와 함께 사용하면 특정 문자열을 기준으로 앞뒤에 위치한 부분 문자열을 취득할 수 있다.

```js
const str = "Hello World";
// space 를 기준으로 앞에 있는 부분 문자열을 취득
str.substring(0, str.indexOf(" ")); // Hello
str.substring(str.indexOf(" ") + 1, str.length); // World
```

### String.prototype.slice

- `substring`과 동일하게 동작한다.
- 단, `slice` 메서드에는 음수인 인수를 전달할 수 있다.
- 음수인 인수를 전달하면 대상 문자열의 가장 뒤에서부터 시작하여 문자열을 잘라내어 반환

```js
const str = "hello wrold";
str.substring(0, 5);
str.slice(0, 5); // "hello"
```

### String.prototype.toUpperCase

- toUpperCase 메서드는 대상 문자열을 모두 대문자로 변경한 문자열을 반환한다.

### String.prototype.toLowerCase

- toLowerCase 메서드는 대상 문자열을 모두 소문자로 변경한 문자열을 반환한다.

### String.prototype.trim

- trim 메서드는 대상 문자열 앞뒤에 공백 문자가 있을 경우 이를 제거한 문자열을 반환

### String.prototype.repeat

- 대상 문자열을 인수로 전달받은 정수만큼 반복해 연결한 새로운 문자여를 반환
- 인수로 전달받은 정수가 0이면 빈문자열을 반환
- 음수이면 에러 발생

```js
const str = "abc";

str.repeat(2); // "abcabc"
```

### String.prototype.split

```js
const str = "How are you doing?";
str.split(" ");
// [How, are, you, doing];
```

- 예제) 문자열 역순으로 뒤집기

```js
const reverseStirng = (str) => {
	return str.split("").reverse().join("");
};
```
