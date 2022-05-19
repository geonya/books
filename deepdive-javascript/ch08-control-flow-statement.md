# Ch.08 제어문 Control Flow Statement

제어문은 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용한다.
제어문은 코드의 실행 흐름을 인위적으로 제어할 수 있는데 이는 코드의 가독성을 해칠 수 있다.

## 8.1 블록문

- 블록문은 0개 이상의 문을 중괄호 {} 로 묶은 것으로, 코드 블록 또는 블록이라고 부른다.
- 자바스크립트는 블록문을 하나의 실행 단위로 취급
- 블록문의 끝에는 세미콜론을 붙이지 않는다. (언제나 문의 종료를 의미하는 자체 종결성을 갖고 있기 때문)

```javascript
{
	let foo = 10;
}
if (x < 10) {
	x++;
}
function sum(a, b) {
	return a + b;
}
```

## 8.2 조건문

- 조건문은 주어진 조건식의 평가 결과에 따라 코드 블록의 실행을 결정한다. 조건식은 불리언 값으로 평가될 수 있는 표현식이다.

### 8.2.1 if...else 문

- 조건이 true 일 경우 if 문의 코드블럭 실행
- false 일 경우 else 문의 코드블럭 실행

```javascript
if (num > 0) {
	kine = "양수";
} else if (num < 0) {
	kind = "음수";
} else {
	kind = "영";
}
```

- 삼항 조건 연산자로 바꿔 쓸 수도 있다.

```javascript
const result = x ? (x % 2 ? "홀수" : "짝수") : "영";
```

### 8.2.2 switch 문

- switch 문은 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case 문으로 실행 흐름을 옮긴다.
- 표현식과 일치하는 case 문이 없다면 실행 순서는 default 문으로 이동, default 문 사용은 옵션이다.

```javascript
swtich(표현식) {
    case 표현식1:
        switch 표현식1과 일치하면 실행;
        break;
    case 표현식2:
        switch 표현식2와 일치하면 실행;
        break;
    default:
        switch 일치하는 case 문이 없을 때 실행;
}
```

- break 문이 없다면 case 문의 표현식과 일치하지 않더라도 실행 흐름이 다음 case 문으로 연이어 이동한다.

## 8.3 반복문 Loop Statement

- 반복문은 조건식의 평가 결과가 참인 경우 코드 블록을 실행한다. 그 후 조건식을 다시 평가하여 여전히 참힌 경우 코드 블록을 다시 실행한다.
- 이는 조건식이 거짓일 때까지 반복된다.

## 8.3.1 for 문

- for 문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행한다.

for (변수 선언문 또는 할당문; 조건식; 증감식) {
조건식이 참인 경우 반복 실행될 문;
}

```javascript
for (let i = 0; i < 2; i++) {
	console.log(i);
}
>> 0
   1
```

ex) 두 개의 주사위를 던졌을 때 두 눈의 합이 6이 되는 모든 경우의 수를 출력

```javascript
for (let i = 1; i <= 6; i++) {
	for (let j = 1; j <= 6; j++) {
		if (i + j === 6) console.log(`[${i}, ${j}]`);
	}
}
```

### 8.3.2 while 문

- while 문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행
- for 문 : 반복 횟수 명확할 때
- while 문 : 반복 횟수가 불명확할 때

```javascript
let count = 0;

while (count < 3) {
	console.log(count); // 0 1 2
	count++;
}
```

### 8.3.3 do...while 문

do...while 문은 코드 블록을 먼저 실행하고 조건식을 평가한다.

```javascript
let count = 0;

do {
	console.log(count); // 0 1 2
	count++;
} while (count < 3);
```

## 8.4 break 문

- `break` 문은 코드 블록을 탈출한다.
- `레이블문`, `반복문` 또는 `switch` 문의 코드 블록을 탈출한다. 이 외에 `break` 문을 사용하면 문법 에러 발생

#### 레이블문 탈출 예시

```javascript
foo: {
	consol.log(1);
	break foo;
	console.log(2);
}

console.log("Done!");
```

- `break` 문은 `반복문`을 더 이상 진행하지 않아도 될 때 불필요한 반복을 회피할 수 있어 유용하다

## 8.5 continue 문

- `continue` 문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 실행 흐름을 이동시킨다.

```javascript
const string = "hello world";
const search = "l";
const count = 0;

// 문자열은 유사 배열이므로 for 문으로 순회할 수 있다.
for (let i = 0; i < string.length; i++) {
	// 'l' 이 아니면 현 지점에서 실행을 중단하고 반복문의 증감식으로 이동한다.
	if (string[i] !== search) continue;
	count++;
}

console.log(count); //3

// 참고로 String.prototype.match 메서드를 사용해도 같은 동작을 한다.
const regexp = new RegExp(search, "g");
console.log(string.match(regexp).length); // 3
```

- 참고로 위 예제에 for 문은 아래와 동일하게 사용 가능하다.

```javascript
for (let i = 0; i < string.length; i++) {
	if (string[i] === search) count++;
}
```

- if 문이 길고 복잡할 때 continue 문을 쓰면 가독성을 높일 수 있다.

```javascript
for (let i = 0; i < string.length; i++) {
	if (string[i] === search) {
		count++;
		// code
		// code
		// code
	}
}
for (let i = 0; i < string.length; i++) {
	if (string[i] !== search) continue;
	count++;
	// code
	// code
	// code
}
```
