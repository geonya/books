# Ch.29 Math

- 표준 빌트인 객체인 Math는 수학적인 상수와 함수를 위한 프로퍼티와 메서드를 제공한다.
- Math는 생성자 함수가 아니다. 따라서 Math는 정적 프로퍼티와 정적 메서드만 제공한다.

## Math 프로퍼티

### Math.PI

- 원주율 PI 값 (3.141592653589793)

## Math 메서드

### Math.abs

- 숫자의 절대값을 반환
- 절대값은 반드시 0 또는 양수이어야 한다.

### Math.round

- 인수자로 전달된 숫자의 소수점 이하를 반올림한 정수를 반환

```js
Math.round(1.6); // 2
Math.round(-1.4); // -1
```

### Math.ceil

- 인수로 전달된 숫자의 소수점 이하를 올림한 정수를 반환

```js
Math.ceil(1.4); // 2
Math.ceil(-1.4); // -1
Math.ceil(-1.6); // -1
```

### Math.floor

- 인수로 전달된 숫자의 소수점 이하를 내림한 정수를 반환

### Math.sqrt

- 인수로 전달된 숫자의 제곱근을 반환

```js
Math.sqrt(9); // 3
Math.sqrt(0); // 0
```

### Math.random

- 임의의 난수(랜덤 숫자)를 반환한다. Math.random 메서드가 반환한 난수는 0에서 1미만의 실수다. (0 포함 1 미포함)

```js
// 1에서 10 범위의 정수 취득
const random = Math.floor(Math.random() * 10 + 1);
console.log(random); // 1~10
```

### Math.pow

- 첫 번째 인수를 밑으로, 두 번째 인수를 지수로 거듭제곱한 결과를 반환

```js
Math.pow(2, 8); // 256
```

- Math.pow 대신 지수 연산자를 사용하면 가독성이 더 좋다.

```jsx
// ES7 지수 연산자
2 ** (2 ** 2); // 16
Math.pow(Math.pow(2, 2), 2); // 16
```

### Math.max

- 전달 받은 인수 중에서 가장 큰 수를 반환, 인수가 전달되지 않으면 -Infinity 반환

```js
// 배열을 인수로 전달받아 배열의 요소 중에서 최대값 구하기
// Function.prototype.apply 메서드 또는 스프레드 문법을 사용해야 한다.
Math.max.apply(null, [1, 2, 3]);
Math.max(...[1, 2, 3]);
```

### Math.min

- 전달 받은 인수 중에서 가장 작은 수를 반환, 인수가 전달되지 않으면 Infinity 반환
