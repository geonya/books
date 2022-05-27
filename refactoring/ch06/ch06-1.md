## 6.1 함수 추출하기

```js
// before
function printOwing(invoice) {
	printBanner();
	let outstanding = calculateOutstanding();

	// 세부사항 출력
	console.log(`고객명 : ${invoice.customer}`);
	console.log(`채무액 : ${outstanding}`);
}

// after

function printOwing(invoice) {
	printBanner();
	let outstanding = calculateOutstanding();
	printDetails(outstanding);

	function printDetails(outstanding) {
		console.log(`고객명 : ${invoice.customer}`);
		console.log(`채무액 : ${outstanding}`);
	}
}
```

- 코드 조각을 찾아 무슨 일을 하는지 파악한 다음, 독립된 함수로 추출하고 목적에 맞는 이름을 붙인다.

- 코드를 언제 독립된 함수로 묶어야 할지는 **목적과 구현을 분리** 로 판단하는 방식이 가장 합리적이다.
- 코드를 보고 무슨 일을 하는지 파악하는 데 한참 걸린다면 그 부분을 함수로 추출한 뒤 '무슨 일'에 걸맞는 이름을 짓는다.
- 이렇게 해두면 코드를 다시 읽을 때 함수의 목적이 눈에 확 들어오고, 본문 코드 (그 함수가 목적을 이루기 위해 구체적으로 수행하는 일)에 대해서는 더 이상 신경 쓸 일이 거의 없다.
- 길이는 중요하지 않다 한 줄 짜리 함수도 유용하다.
- 함수가 짧으면 캐싱하기가 더 쉽기 때문에 컴파일러가 최적화하는 데 유리할 때가 많다.

> (성능,속도)최적화를 할 때는 다음 두 규칙을 따르기 바란다. 1. 하지마라 2. (전문가 한정) 아직 하지 마라.

- 짧은 함수의 이점은 이름을 잘 지어야만 발휘된다.

### 함수 이름 잘 짓는 요령

1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다. (어떻게가 아닌 **`무엇을`** 하는지 드러나도록)

- _대상 코드가 함수 호출문 하나처럼 매우 간단하더라도 함수로 뽑아서 목적이 더 잘 드러나는 이름을 붙일 수 있다면 추출한다._
- 이런 이름이 떠오르지 않는다면 함수로 추출하면 안 된다는 신호다.

2. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다.
3. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사한다. 있다면 매개변수로 전달한다.

- 원본 함수의 중첩 함수로 추출할 때는 이런 문제가 없음
- 일반적으로 함수에는 지역 변수와 매개변수가 있기 마련이다. 가장 일반적인 처리 방법은 이런 변수를 모두를 인수로 전달하는 것이다.
- 추출한 코드에서 사용하는 변수가 추출한 함수 밖에 선언되어 있다면 추출한 함수 안에서 선언하도록 수정
- 추출한 코드 안에서 값이 바뀌는 변수 중에서 값으로 전달되는 것들은 주의해서 처리
  - 이런 변수가 하나뿐이라면 추출한 코드를 질의 함수로 취급해서 그 결과(반환 값)를 해당 변수에 대입한다.
- 때로는 추출한 코드에서 값을 수정하는 지역 변수가 너무 많을 수 있다. 이럴 때는 함수 추출을 멈추고, 변수 쪼개기나 임시 변수를 질의 함수로 바꾸기와 같은 다른 리팩터링을 적용해서 변수를 사용하는 코드를 단순하게 바꿔본다. 그런 다음 함수 추출을 다시 시도한다.

4. 변수를 다 처리했다면 컴파일 한다.

- 컴파일되는 언어로 개발 중이라면 변수를 모두 처리하고 나서 한 번 컴파일해보자. 제대로 처리하지 못한 변수를 찾는 데 도움될 때가 많다.

5. 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꾼다

- 즉, 추출한 함수로 일을 위임한다.

6. 테스트한다.
7. 다른 코드에서 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살핀다. 있다면 방금 추출한 새 함수를 호출하도록 바꿀지 검토한다(인라인 코드를 함수 호출로 바꾸기).

- 검색 기능을 이용하여 다른 곳에 중복된 코드가 없는지 확인해보는 것도 좋다.

### 예시: 유효범위를 벗어나는 변수가 없을 때

```js
function printOwing(invoice) {
	let outstanding = 0;

	console.log("************");
	console.log("***고객채무***");
	console.log("************");

	// 미해결 채무 (outstanding)를 계산한다.
	for (const o of invoice.orders) {
		outstanding += o.amount;
	}

	// 마감일(dueDate)을 기록한다.
	const today = Clock.today;
	invoice.dueDate = new Date(
		today.getFullYear(),
		today.getMonth(),
		tdoay.getDate() + 30
	);
	// 세부 사항을 출력한다.
	console.log(`고객명 : ${invoice.customer}`);
	console.log(`채무액 : ${outstanding}`);
	console.log(`마감일 : ${invoice.dueDate.toLocaleDateString()}`);
}
```

- 배너 출력 코드 추출

```js
function printOwing(invoice) {
	let outstanding = 0;

	printBanner();

	// 미해결 채무 (outstanding)를 계산한다.
	for (const o of invoice.orders) {
		outstanding += o.amount;
	}

	// 마감일(dueDate)을 기록한다.
	const today = Clock.today;
	invoice.dueDate = new Date(
		today.getFullYear(),
		today.getMonth(),
		tdoay.getDate() + 30
	);
	// 세부 사항을 출력한다.
	console.log(`고객명 : ${invoice.customer}`);
	console.log(`채무액 : ${outstanding}`);
	console.log(`마감일 : ${invoice.dueDate.toLocaleDateString()}`);
}
function printBanner() {
	console.log("************");
	console.log("***고객채무***");
	console.log("************");
}
```

- 마찬 가지로 세부사항을 출력하는 코드도 추출

```js
function printOwing(invoice) {
	let outstanding = 0;

	printBanner();
	printDetails();

	function printDetails() {
		console.log(`고객명 : ${invoice.customer}`);
		console.log(`채무액 : ${outstanding}`);
		console.log(`마감일 : ${invoice.dueDate.toLocaleDateString()}`);
	}
}
function printBanner() {
	console.log("************");
	console.log("***고객채무***");
	console.log("************");
}
```

- printDetails 는 printOwing 에 중첩되록 정의했는데 이렇게 하면 추출한 함수에서 printOwing에 정의된 모든 변수에 접근할 수 있기 때문

### 예시 : 지역 변수를 사용할 때

```js
function printOwing(invoice) {
	let outstanding = 0;
	printBanner();
	printDetails(invoice, outstanding);
}
function printDetails(invoice, outstanding) {
	console.log(`고객명 : ${invoice.customer}`);
	console.log(`채무액 : ${outstanding}`);
	console.log(`마감일 : ${invoice.dueDate.toLocaleDateString()}`);
}
```

- 세부 사항을 출력하는 코드에서 지역 변수 두 개를 매개변수로 받는 함수로 추출한다.

```js
function printOwing(invoice) {
	let outstanding = 0;

	printBanner();

	// 미해결 채무 (outstanding)를 계산한다.
	for (const o of invoice.orders) {
		outstanding += o.amount;
	}

	recordDueDate(invoice);
	printDetails(invoice, outstanding);
}

function recordDueDate(invoice) {
	const today = Clock.today;
	invoice.dueDate = new Date(
		today.getFullYear(),
		today.getMonth(),
		tdoay.getDate() + 30
	);
}
```

- 마감일 설정 로직을 함수로 추출한다.

### 예시 : 지역 변수의 값을 변경할 때

- 만약 매개변수에 값을 대입하는 코드를 발견하면 곧바로 그 변수를 쪼개서 임시 변수를 새로 하나 만들어 그 변수에 대입하게 한다.

```js
function printOwing(invoice) {
	printBanner();
	const outstanding = caculateOutstanding(invoice);
	recordDueDate(invoice);
	printDetails(invoice, outstanding);
}

function caculateOutstanding(invoice) {
	let result = 0;
	for (const o of invoice.orders) {
		result += o.amount;
	}
	return result;
}
```

1. 선언문을 변수가 사용되는 코드 근처로 슬라이드
2. 추출한 부분을 새로운 함수로 복사
3. outstanding 선언문을 추출할 코드 앞으로 옮겼기 대문에 매개변수로 전달하지 않아도 된다. 추출한 코드에서 값이 변경된 변수는 outstanding 일 뿐이다.

- 따라서 이 값을 반환한다.

4. 컴파일 테스트
5. 추출한 코드의 원래 자리를 새로 뽑아낸 함수를 호출하는 문장으로 교체한다. 추출한 함수에서 새 값을 반환하니 이 값을 원래 변수에 저장한다.

- 원본 변수인 outstanding 에 `const` 를 붙여 불변으로 만든다.

### 값을 반환할 변수가 여러 개라면?

- **함수가 값 하나만 반환하도록 함수를 여러 개로 만든다.**
- 여러 값을 반환해야 한다면 임시 변수를 질의 함수로 바꾸거나 변수를 쪼개는 식으로 처리해도 좋다.
- 이렇게 추출한 함수를 취상위 수준 같은 다른 문맥으로 이동하려면 중첩 함수로 추출하고 새로운 문맥으로 옮긴다.
- 중첩 함수로 추출할 수 있더라도 최소한 원본 함수와 같은 수준의 문맥을 먼저 추출해보고 제대로 추출했는지 판단해본다.

_220525_
