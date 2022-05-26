## 6.5 함수 선언문 바꾸기

### 배경

- 함수는 프로그램을 작은 부분으로 나누는 주된 수단
- 함수 선언은 각 부분이 서로 맞물리는 방식을 표현하며, 실질적으로 소프트웨어 시스템의 구성 요소를 조립하는 연결부 역할을 함 -연결부를 잘 정의하면 시스템에 새로운 부분을 추가하기가 쉬워지는 반면, 잘못 정의하면 지속적인 방해요인으로 작용하여 소프트웨워 동작을 파악하기 어려워지고 요구사항을 바뀔 때 적절히 수정하기 어렵게 한다.
- 연결부에서 가장 중요한 요소는 `함수의 이름`이다.
- **이름이 좋으면 함수의 구현 코드를 살펴볼 필요 없이 호출문만 보고도 무슨 일을 하는지 파악할 수 있다.**
- _이름이 잘못된 함수를 발견하면 더 나은 이름이 떠오르는 즉시 바꾸자._

- 좋은 이름을 떠올리는 효과적인 방법 : 주석을 이용해 함수의 목적을 설명해 보자. 그러다보면 주석이 멋진 이름으로 바뀌어 돌아온다.

- 매개변수는 함수가 외부 외부 세계와 어우러지는 방식을 정의한다.
- 매개변수는 함수를 사용하는 문맥을 설정한다.
- 매개변수를 올바르게 선택하는 규칙 : 어떻게 연결하는 것이 더 나은지 더 잘 이해하게 될대마다 그에 맞게 코드를 개선할 수 있도록 함수 선ㅇ넌 바꾸기 리팩터링에 친숙해지기

### 절차

- 먼저 변경 사항을 살펴보고 함수 선언과 호출문들을 단번에 고칠 수 있을지 가늠해본다.

#### 간단한 절차

1. 매개변수를 제거하려거든 먼저 함수 본문에서 제거 대상 매개변수를 참조하는 곳은 없는지 학인한다.
2. 메서드 선언을 원하는 형태로 바꾼다.
3. 기존 메서드 선언을 참조하는 부분을 모두 찾아서 바뀐 형태로 수정한다.
4. 테스트 한다.

#### 마이그레이션 절차

1. 이어지는 추출 단계를 수월하게 만들어야 한다면 함수의 본문을 적절히 리팩터링한다.
2. 함수 본문을 새로운 함수로 추출한다.
3. 추출한 함수에 매개변수를 추가해야 한다면 '간단한 절차' 를 따라 추가한다.
4. 테스트 한다.
5. 기존 함수를 인라인한다.
6. 이름을 임시로 붙여뒀다면 함수 선언 바꾸기를 한 번 더 적용해서 원래 이름으로 되돌린다.
7. 테스트 한다.

### 예시 : 함수 이름 바꾸기 (간단한 절차)

```js
function circum(radius) {
	return 2 * Math.PI * radius;
}

function circumference(radius) {
	return 2 * Math.PI * radius;
}
// circum() 을 호출한 곳을 모두 찾아서 circumfrence()로 바꾼다.
```

- 기존 함수를 참조하는 곳을 얼마나 잘 찾아내는지가 관건이다.
- 매개변수 추가나 제거도 똑같이 처리한다. 함수를 호출하는 부분을 모두 찾은 뒤, 선언문을 바꾸고, 호출문도 그에 맞게 고친다.
- 함수 이름 바꾸기 -> 테스트하기 -> 매개변수 추가하기 -> 테스트

### 예시 : 함수 이름 바꾸기 (마이그레이션 절차)

- 마이그레이션 절차로 진행하기

```js
function circum(radius) {
	return circumference(radius);
}

function circumference(radius) {
	return 2 * Math.PI * radius;
}
```

- 수정한 코드를 테스트한 뒤 예전 함수를 인라인한다.
- 하나를 변경할 때마다 테스트하면서 한 번에 하나식 처리하자.
- 모두 바꿨다면 기존 함수를 삭제한다.

### 예시 : 매개변수 추가하기

- 도서관리 프로그램의 Book 클래스에 예약 기능이 구현되었는지 우선 순위 매개변수를 추가하라는 요구

```js

addReservation(customer) {
	this._reservations.push(customer);
}
```

- addReservation 을 호출하는 곳을 모두 찾고 고치기가 쉽다면 곧바로 변경하면 되는데 그렇지 않다면 마이그레이션 절차대로 진행해야 한다.
- addReservation 의 본문을 임시로 이름을 붙여 새로운 함수로 추출한다.

```js
addReservation(customer) {
	this.zz_addReservation(customer)
}
zz_addReservation(customer) {
	this._reservations.push(customer);
}
```

- 그런 다음 새 함수의 선언문과 호출문에 원하는 매개변수를 추가한다.

```js
addReservation(customer) {
	this.zz_addReservation(customer, false)
}
zz_addReservation(customer, isPriority) {
	this._reservations.push(customer);
}
```

- 호출문을 변경하기 전에 어셔선을 추가하여 호출하는 곳에서 새로 추가한 매개변수를 실제로 사용하는지 확인한다.

```js
zz_addReservation(customer, isPriority) {
	aerrt(isPriority === true || isPriority === false) {
		this._reservations.push(customer);
	}
}
```

- 이렇게 해두면 호출문을 수정하는 과정에서 실수로 새 매개변수를 빠뜨린 부분을 찾는데 도움이 된다.
- 기존 함수를 인라인하여 호출 코드들이 새 함수를 이용하도록 고친다. 호출문은 한 번에 하나씩 변경한다.
- 다 고쳤다면 새 함수의 이름을 기존 함수의 이름으로 바꾼다.

### 예시 : 매개변수를 속성으로 바꾸기

```js
function inNewEngland(aCustomer) {
	return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}

const newEnglanders = someCustomers.filter((c) => inNewEngland(c));
```

- 이 함수가 주 식별 코드를 매개변수로 받도록 리팩터링한다. 그러면 고객에 대한 의존성이 제거되어 더 넓은 문맥에 활용할 수 있다.
- 매개변수로 사용할 코드를 `변수로 추출`

```js
function inNewEngland(aCustomer) {
	const stateCode = aCustomer.address.state;
	return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}
```

- 이제 `함수 추출하기`로 새 함수를 만든다.

```js
function inNewEngland(aCustomer) {
	const stateCode = aCustomer.address.state;
	return xxNEWinNewEngland(stateCode);
}

function xxNEWinNewEngland(stateCode) {
	return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}
```

- 임시로 바꾼 함수의 이름은 검색하기 좋은 이름을 붙여둔다 .
- 기존 함수 안에 변수로 추출해둔 입력 매개변수를 인라인한다. `변수 인라인하기`

```js
function inNewEngland(aCustomer) {
	return xxNEWinNewEngland(aCustomer.address.state);
}
```

- 함수 인라인하기로 기존 함수의 본문을 호출문들에 집어넣는다. 실질적으로 기존 함수 호출문을 새 함수 호출문으로 교체하는 셈

```js
const newEnglanders = someCumstomers.filter((c) =>
	xxNEWinNewEngland(c.address.state)
);
```

- 기존 함수를 모든 호출문에 인라인했다면 `함수 선언 바꾸기` 를 다시 한 번 적용하여 새 함수의 이름을 기존 함수의 이름으로 바꾼다.

```js
function inNewEngland(stateCode) {
	return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

const newEnglanders = someCumstomers.filter((c) =>
	inNewEngland(c.address.state)
);
```

_220526_
