# Ch.07 Operator

-   연산자는 하나 이상의 표현식을 대상으로 산술, 할당, 비교, 논리, 타입, 지수 연산 등을 수행해 하나의 값을 만든다.
-   이때 연산의 대상을 피연산자라고 한다.
-   피연산자가 `값` 이라는 명사의 역할을 한다면 연산자는 `피연산자를 연산하여 새로운 값을 만든다` 라는 동사의 역할을 한다.

## 7.1 산술 연산자

-   산술 연산자는 피연산자를 대상으로 수학적 계산을 수행해 새로운 숫자 값을 만든다. 산술 연산이 불가능한 경우 NaN을 반환한다.

### 7.1.1 이항 산술 연산자

-   `+` 덧셈
-   `-`뺄셈
-   `*` 곱셈
-   `/` 나눗셈
-   `%` 나머지

### 7.1.2 단항 산술 연산자

-   `++` 증가
-   `--` 감소
-   `+` string -> number
    -- 숫자 타입이 아닌 피연산자에 + 단항 연산자를 사용하면 피연산자를 숫자 타입으로 변환하여 반환

https://dev.to/sanchithasr/7-ways-to-convert-a-string-to-number-in-javascript-4l

```javascript
//The unary plus operator (+) precedes its operand and evaluates to its operand but attempts to // //// convert it into a number, if it isn't already.
const x = 25;
const y = -25;
console.log(+x); // expected output: 25
console.log(+y); // expected output: -25
console.log(+""); // expected output: 0

// 7. Double tilde (~~) Operator
// We can use the double tilde operator to convert the string to number.
str = "1234";
console.log(~~str); // expected result: 1234
negStr = "-234";
console.log(~~negStr); // expected result: -234
```

-   `-` 양수를 음수로, 음수를 양수로 발전한 값을 반환
    -- + 와 마찬가지로 숫자타입으로 변환하고 부호를 반전하여 반환

### 7.1.3 문자열 연결 연산자

-   `+` 연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작

-   `암묵적 타입 변환`

```javascript
1 + true; // 2
```

## 7.2 할당 연산자

할당 연산자는 우항에 있는 피연산자의 평가 결과를 좌항에 있는 변수에 할당

```javascript
x = 10;
const srt = "Hello";
```

## 7.3 비교 연산자

-   비교 연산자는 좌항과 우항의 피연산자를 비교한 다음 그 결과를 불리언 값으로 반환한다.

```javascript
NaN === NaN; // false

5 === 5; // true

5 === "5"; // false

0 === -0; // true
```

```javascript
Object.is(-0, +0); // false
```

```javascript
5 > 0; // true
5 < 0; // false
```

## 7.4 삼항 조건 연산자

-   조건식의 평가 결과에 따라 반환할 값을 결정

```javascript
const result = scroe >= 60 ? "pass" : "fail";
```

-   if...else 문도 유사하게 처리할 수 있다.

```javascript
if (x % 2) result = "홀수";
else result = "짝수";
```

```javascript
Error XXX
const result = if (x % 2) { result = "홀수";} else { result = "짝수";}
```

-   if...else 문은 표현식이 아닌 문이다. 따라서 값처럼 사용할 수 없다.

## 7.5 논리 연산자 (Logical Operator)

`!!` 논리합(OR)
`&&` 논리곱(AND)
`!` 부정(NOT)

-   단축 평가 :: 논리합 `||` 또는 논리곱 `&&` 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가

```javascript
"Cat" && "Dog"; // Dog
```

## 7.6 쉼표 연산자

-   왼쪽부터 차례대로 피연산자 평가 -> 마지막 피연산자의 평가 결과 반환

```javascript
(x = 1), (y = 2), (z = 3); // 3
```

## 7.7 그룹연산자

-   () 먼저 계산

## 7.9 지수 연산

```javascript
2 ** 2; // 4
```

## 그 외의 연산자

`?.` : 옵셔널 체이닝
`??` : null 병합
`delete` : 프로퍼티 삭제
`new` : 생성자 함수를 호출할 때 사용 -> 인스턴스 생성
`instanceof` : 좌변의 객체가 우변의 생성자 함수와 연결된 인스턴스인지 판별
`in` : 프로퍼티 존재 확인
