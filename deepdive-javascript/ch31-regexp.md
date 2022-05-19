# Ch.31 RegExp

## 31.1 정규 표현식이란 ?

- 정규표현식은 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어다.
- 정규표현식은 문자열을 대상으로 패턴 매칭 기능을 제공한다.

- ex) 예제

```js
// 입력 받은 휴대폰 번호
const tel = "공10-1234-567팔";
const regExp = /\d{3}-\d{4}-\d{4}$/;
regExp.test(tel); // false
```

## 31.2 정규 표현식의 생성

- 정규 표현식 객체 (RegExp 객체)를 생성하기 위해서는 정규 표현식 리터럴과 `RegExp` 생성자 함수를 사용할 수 있다.
- `RegExp` 생성자 함수를 사용하여 `RegExp` 객체를 생성할 수도 있다.

```js
// pattern: 정규 표현식의 패턴
// flags: 정규 표현식의 플래그(g, i, m, u, y)

new RegExp(pattern[, flags])

const target = "Is this all there is?"
const regexp = new RegExp(/is/i);
regexp.test(target); // true
```

- 정규 표현식을 사용하면 반복문과 조건문 없이 패턴을 정의하고 테스트하는 것으로 간단히 체크할 수 잇다.
- 다만 정규표현식은 주석이나 공백을 허용하지 않고 여러 가지 기호를 혼합하여 사용하기 때문에 가독성이 좋지 않다는 문제가 있다.

```js
const count = (str, char) => (str.match(new RegExp(char, "gi")) ?? []).length;
count("Is this all there is ?", "is"); // 3
count("Is this all there is ?", "xx"); // 0
```

## 31.3 RegExp 메서드

### RegExp.prototype.exec

- `exec` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다. 매칭 결과가 없는 경우 null을 반환한다.

```js
const target = "Is this all there is?";
const regExp = /is/;
regExp.exec(target);
//[ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
```

### RegExp.prototype.test

- `test` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환

```js
const target = "Is this all there is?";
const regExp = /is/;
regExp.test(target); // true
```

### 31.3.3 String.prototype.match

- `String` 표준 빌트인 객체가 제공하는 `match` 메서드는 문자열과 인수로 전달받은 정규 표현식과 매칭 결과를 배열로 반환한다.

```js
const target = "Is this all there is?";
const regExp = /is/;
target.match(regExp);
//[ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
```

- `exec` 메서드는 문자열 내의 모든 패턴을 검색하는 g 플래그를 지정해도 첫 번째 매칭 결과만 반환한다. 하지만 `String.prototype.match` 메서드는 `g` 플래그가 지정되면 모든 매칭 결과를 배열로 반환한다.

```jsx
const target = "Is this all there is?";
const regExp = /is/g;
target.math(regExp); // -> ["is", "is"]
```

## 31.4 플래그

- 정규 표현식의 검색 방식을 설정하기 위해 사용한다.

| flag | meaning     | description                                                     |
| ---- | ----------- | --------------------------------------------------------------- |
| i    | Ignore case | 대소문자를 구별하지 않고 패턴을 검색한다.                       |
| g    | Global      | 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다. |
| m    | Multi line  | 문자열의 행이 바뀌더라도 패턴 검색을 계속한다.                  |

- 플래그는 옵션이므로 선택적으로 사용할 수 있으며, 순서와 상관없이 하나 이상의 플래그를 동시에 설정할 수 있다.
- 어떠한 플래그를 사용하지 않는 경우 대소문자를 구별해서 패턴을 검색한다.
- 그리고 문자열에 패턴 검색 매칭 대상이 1개 이상 존재해도 첫 번째 매칭한 대상만 검색하고 종료한다.

```jsx
const target = "Is this all there is?";

// target 문자열에서 is 문자열을 대소문자를 구별하면 한 번만 검색한다.
target.match(/is/);
// [ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]

// target 문자열에서 is 문자여를 대소문자 구별하지 않고 한 번만 검색한다.
target.match(/is/i);
// 'Is', index: 0, input: 'Is this all there is?', groups: undefined ]

// target 문자열에서 is 문자열을 대소문자 구별하여 전역 검색한다.
target.match(/is/g);
// ['is', 'is' ]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 전역 검색한다.
target.match(/is/gi);
// [ 'Is', 'is', 'is' ]
```

## 31.5 Pattern

- 정규 표현식의 패턴은 문자열의 일정한 규칙을 표현하기 위해 사용하며, 정규 표현식의 플래그는 정규 표현식의 검색 방식을 설정하기 위해 사용한다.
- 패턴은 /로 열고 닫으며 문자열의 다옴표는 생략한다.
- 패턴은 특별한 의미를 가지는 메타문자 또는 기호로 표현할 수 있다.

## 31.5.2 임의의 문자열 검색

- `.`은 임의의 문자 한 개를 의미한다. 문자의 내용은 무엇이든 상관없다.

```js
const target = "Is this all there is?";

// 임의이ㅡ 3자리 문자열을 대소문자 구별하여 전역 검색한다.
const regExp = /.../g;
target.match(regExp);
// [ 'Is ', 'thi', 's a', 'll ', 'the', 're ', 'is?' ]
```

### 반복 검색

- `{m, n}`은 앞선 패턴(다음 예제의 경우 A)이 최소 m번, 최대 n번 반복되는 문자열을 의미한다.
- 콤마 뒤에 공백이 있으면 정상 동작하지 않으므로 주의하기 바란다.

```js
const target = "A AA B BB Aa Bb AAA";

// "A"가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{1,2}/g;
target.match(regExp);
//[ 'A', 'AA', 'A', 'AA', 'A' ]
```

- `{n}` 은 앞선 패턴이 n번 반복되는 문자열을 의미한다.

```js
const target = "A AA B BB Aa Bb AAA";

// "A"가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{2}/g;
target.match(regExp);
//[ 'AA', 'AA' ]
```

- `{n, }`은 앞선 패턴이 최소 n번 이상 반복되는 문자열을 의미한다.

```js
const regExp2 = /A{2,}/g;
target.match(regExp2);
//[ 'AA', 'AAA' ]
```

- `+` 은 앞선 패턴이 최소 한 번 이상 반복되는 문자열을 의미한다.
- 즉, `+` 는 `{1,}`과 같다.

```js
const target = "A AA B BB Aa Bb AAA";

// "A"가 최소 한 번 이상 반복되는 문자열
const regExp = /A+/g;
target.match(regExp);
//[ 'A', 'AA', 'A', 'AAA' ]
```

- `?` 는 앞선 패턴이 최대 한 번 이상 (0번 포함) 이상 반복되는 문자열을 의미한다.
- 즉, `?`는 `{0, 1}`과 같다.

```js
const target = "color colour";

// "colo" 다음 "u"가 최대 한 번 (0번 포함) 이상 반복되고 "r"이 이어지는
// 문자열 "color", "colour"을 전역 검색한다.

const regExp = /colou?r/g;
target.match(regExp);
// [ 'color', 'colour' ]
```

### 31.5.4 OR 검색

- `|` 은 `or`의 의미를 갖는다.

```js
const target = "A AA B BB Aa Bb";

// "A" 또는 "B"를 전역 검색한다.
const regExp = /A|B/g;
target.match(regExp);
//[ 'A', 'A', 'A', 'B', 'B', 'B', 'A', 'B' ]
```

- 분해되지 않은 단어 레벨로 검색하기 위해서는 `+`를 함께 사용한다.

```js
const target = "A AA B BB Aa Bb";

// A 또는 B가 한 번 이상 반복되는 문자열을 검색한다.
// "A"가 최소 한 번 이상 반복되는 문자열
// const regExp = /A+/g;

const regExp = /A+|B+/g;
target.match(regExp);
// [ 'A', 'AA', 'B', 'BB', 'A', 'B' ]
```

- 이를 단순화하면

```js
const regExp = /[AB]+/g;
target.match(regExp);
// [ 'A', 'AA', 'B', 'BB', 'A', 'B' ]
```

- 범위를 지정하려면 `[]` 내에 `-`를 사용한다.
- 다음 예제의 경우 대문자 알파벳을 검색한다.

```js
const target = "A AA BB ZZ Aa Bb";
const regExp = /[A-Z]+/g;
target.match(regExp);
//[ 'A', 'AA', 'BB', 'ZZ', 'Aa', 'Bb' ]
```

- 대소문자를 구별하지 않고 알파벳을 검색하는 방법

```js
const target = "AA BB Aa Bb 12";
const regExp = /[A-Za-z]+/g;
target.match(regExp);
// [ 'AA', 'BB', 'Aa', 'Bb' ]
```

- 숫자를 검색하는 방법

```js
const target = "AA 12,345";
const regExp = /[0-9]+/g;
target.match(regExp);
// [ '12', '345' ]
```

- 위 예제의 경우 쉼표 때문에 매칭 결과가 분리되므로 쉼표를 패턴에 포함시킨다.

```js
const target = "AA 12,345";
const regExp = /[0-9,]+/g;
target.match(regExp);
// [ '12,345' ]
```

- 위 예제를 간단히 표현하면 다음과 같다.
- `\d` 는 숫자를 의미한다 === `[0-9]`
- `\D` 는 숫자가 아닌 문자를 의미한다.

```js
const target = "AA BB 12,345";

// 0 ~ 9 또는 , 가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /[\d,]+/g;
target.match(regExp);
// [ '12,345' ]

// 0~9가 아닌 문자(숫자가 아닌 문자) 또는 ","가 한 번 이상 반복되는 문자열을 전역 검색한다.
const regExp2 = /[\D,]+/g;
target.match(regExp2);
// [ 'AA BB ', ',' ]
```

- `\w` 는 알파벳, 숫자, 언더스코어를 의미한다. 즉 `\w` 는 `[A-Za-z0-9_]` 와 같다.
- `\W` 는 알파벳, 숫자, 언더스코어가 아닌 문자를 의미한다.

```js
const target = "Aa Bb 12,345 _$%&'";
let regExp = /[\w,]+/g;
target.match(regExp);
// [ 'Aa', 'Bb', '12,345', '_' ]
regExp = /[\W,]+/g;
target.match(regExp);
// [ ' ', ' ', ',', ' ', "$%&'" ]
```

### 31.5.5 NOT 검색

- `[...]` 내의 `^`은 `not` 의 의미를 갖는다.
- 예를 들어 `[^0-9]`는 숫자를 제외한 문자를 의미한다.

### 31.5.6 시작위치로 검색

- `[...]` 밖의 `^`은 문자열의 시작을 의미한다.

```js
const target = "https://google.com";

// https 로 시작하는지 검사

const regExp = /^https/;
regExp.test(target);
// true
```

### 31.5.7 마지막 위치로 검색

- `$`는 문자열의 마지막을 의미한다.

```js
const target = "https://google.com";

// com 으로 끝나는지 검사

const regExp = /com$/;
regExp.test(target);
// true
```

## 31.6 자주 사용하는 정규 표현식

### 31.6.1 특정 단어로 시작하는지 검사

```js
const url = "https://sample.com";

// http:// 또는 https://로 시작하는지 검사
/^https?:\/\//.test(url); // true
```

### 31.6.2 특정 단어로 끝나는지 검사

```js
const fileName = "index.html";

// html 로 끝나는지 검사
/html$/.test(fileName); // true
```

### 31.6.3 숫자로만 이루어진 문자열인지 검사

- `[...]` 바깥의 ^은 문자열의 시작을, $은 문자열의 마지막을 의미
- `\d`는 숫자를 의미, +는 앞선 패턴이 최소 한 번 이상 반복되는 문자열을 의미를

```js
const target = "12345";

// 숫자로만 이루어진 문자열인지 검사한다.
/^\d+$/.test(target); // true
```

### 31.6.4 하나 이상의 공백으로 시작하는지 검사

- `\s` 는 여러 가지 공백 문자를 의미한다.

```js
const target = " hi";
/^[\s]+/.test(target); // true
```

### 31.6.5 아이디로 사용 가능한지 검사

```js
const id = "abc123";

// 알파벳 대소문자 또는 순자로 시작하고 끝나며 4 ~ 10자리인지 검사
/^[A-Za-z0-9]{4,10}$/.test(id); // true
```

### 31.6.6 메일 주소 형식에 맞는지 검사

```js
const email = "geony@signpod.co.kr";
/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(
	email
); // true
```

### 31.6.7 핸드폰 번호 형식에 맞는지 검사

```js
const cellphone = "010-1234-1234";
/^\d{3}-\d{3,4}-\d{4}$/.test(cellphone); //true
```

### 31.6.8 특수 문자 포함 여부 검사

- 특수 문자는 A-Za-z0-9 이외의 문자다

```js
const target = "abc#123";
/[^A-Za-z0-9]/gi.test(target); // true
```

- 특수 문자를 제거할 때는 `String.prototype.replace` 메서드를 사용한다.

```js
const target = "abc#123";
target.replace(/[^A-Za-z0-9]/gi, ""); //'abc123'
```
