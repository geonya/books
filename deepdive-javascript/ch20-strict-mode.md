# Ch.20 Strict Mode

## 20.1 strict mode ?

```jsx
function foo() {
	x = 10;
}
foo();
console.log(x); // 10 (x : 암묵적 전역 변수)
```

- strict mode 는 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.
- ESLint 같은 린트 도구를 사용해도 stirict mode 와 유사한 효과를 얻을 수 있다.

```jsx
"use strict";

function foo() {
	x = 10; // ReferenceError : x is not defined
}
foo();
```
