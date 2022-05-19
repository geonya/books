# Ch.28 Number

## 28.1 Number 생성자 함수

```js
const numbObj = new Number();
console.log(numbObj); // Number {[[PrimitiveValue]]: 0}
```

- 표준 빌트인 객체인 Number 객체는 생성자 함수 객체다. 따라서 new 연산자와 함께 호출하여 Number 인스턴스를 생성할 수 있다.
- Number 생성자 함수에 인수를 전달하지 않고 new 연산자와 호출하면 [[NumberData]] 내부 슬롯에 0을 할당한 Number 래퍼 객체를 생성한다.

## 28.2 Number 프로퍼티

### Number.EPSILON

- 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같다 ??
- 부동소수점 산술 연산은 정확한 결과를 기대하기 어렵다. 정수는 2진법으로 오차 없이 저장 가능하지만 부동소수점을 표현하기 위해 가장 널리 쓰이는 표준인 IEEEE 754는 2진법으로 변환했을 때 무한소수가 되어 미세한 오차가 발생할 수 없는 구조적 한계가 있다.

```jsx
0.1 + 0.2; // -> 0.3000000000000004
0.1 + 0.2 === 0.3; // false
```

- Number.EPSILON 은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용한다.

```jsx
function isEqual(a, b) {
	// a와 b를 뺀 값의 절대값이 Number.EPSILON보다 작으면 같은 수로 인정한다.
	return Math.abs(a - b) < Number.EPSILON;
}

isEqual(0.1 + 0.2, 0.3); // true
```

### Number.MAX_VALUE

- Number.MAX_VALUE는 자바스크립트에서 표현할 수 있는 가장 큰 양수 값이다.
- 이보다 큰 숫자는 Infinity다.

### Number.MIN_VALUE

- 자바스크립트에서 표현할 수 있는 가장 작은 양수 값

### Number.MAX_SAFE_INTEGER

- 자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정수값

### Number.MIN_SAFE_INTEGER

- 자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수값

### Number.POSITIVE_INFINITY

- 양의 무한대를 나타내는 숫자값 Infinity와 같다.

### Number.NEGATIVE_INFINITY

- 음의 무한대를 나타내는 숫자값 -Infinity와 같다.

### Numnber.NaN

- 숫자가 아님을 나타내는 숫자값이다. (Not-a-Number)

## Number 메서드

### 28.3.1 Number.isFinite

- 인수로 전달된 숫자값이 정상적인 유한수, 즉 Infinity (or -Infinity)가 아닌지 검사하여 그 결과를 불리언 값으로 반환

```js
Number.isFinite(Infinity); // false
```

### Number.isInteger

- 인수로 전달된 숫자값이 정수인지 검사한다.
- 검사하기 전에 인수를 숫자로 암묵적 타입 변환하지 않는다.

### Number.isNaN

- 인수로 전달된 숫자값이 NaN인지 검사하여 그 결과를 불리언값으로 반환
- 암묵적 타입 변환을 하지 않으므로 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 false다.

### Number.isSafeInteger

- 인수로 전달된 숫자값이 안전한 정수인지 검사하여 불리언 값으로 반환

### Number.prototype.toExponential

- 숫자를 지수 표기법으로 변환하여 문자열로 반환

### Number.prototype.toFixed

- 숫자를 반올림하여 문자열로 반환

### Number.prototype.toPrecision

- 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환

### Number.prototype.toString

- 숫자를 문자열로 변환하여 반환
- 진법을 나타내는 2~36 사이의 정수값을 인수로 전달 (기본값을 10진법)
