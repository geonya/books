_220527_

## 6.6 변수 캡슐화하기

## 배경

- 리팩터링은 결국 프로그램의 요소를 조작하는 일인데 함수는 데이터보다 다루기가 수월하다.
- 함수를 사용한다는 건 대체로 호출한다는 뜻이고, 함수의 이름을 바꾸거나 다른 모듈로 옮기기는 어렵지 않다.
- 여차하면 기존 함수를 그대로 둔 채 전달 함수로 활용할 수도 있기 때문이다.
- 이런 전달 함수는 리팩터링 작업을 간소화하는데 큰 역할을 한다.

- 반대로 데이터는 함수보다 다루기가 까다롭다. 유호범위가 넓어질수록 다루기가 더 어려워진다.
- 전역 데이터는 골칫거리다.
- 그래서 접근할 수 있는 범위가 넓은 데이터를 옮길 때는 먼저 그 데이터로의 접근을 독점하는 함수를 만드는 식으로 캡슐화하는 것이 가장 좋은 방법일 때가 많다.
- 데이터의 재구성이라는 어려운 작업을 함수 재구성이라는 더 단순한 작업으로 변환하는 것이다.
- 데이터 캡슐화는 데이터를 변경하고 사용하는 코드를 감시할 수 있는 확실한 통로가 되어주기 때문에 데이터 변경 전 검증이나 변경 후 추가 로직을 쉽게 끼워넣을 수 있다.
- 저자는 유효범위가 함수 하나보다 넓은 가변 데이터는 모두 이런 식으로 캡슐화해서 그 함수를 통해서만 접근하게 만드는 습관이 있다.
- 레거시 코드를 다룰 대도 이런 변수를 참조하는 코드를 추가하거나 변경할 때마다 최대한 캡슐화한다.
- 그래야 자주 사용하는 데이터대한 결합도가 높아지는 것을 방지할 수 있다.

- 객체 지향에서 객체의 데이터를 항상 `private` 으로 유지해야 한다고 강조하는 이유가 있다.
- 다만, 불변 데이터는 가변 데이터보다 캡슐화할 이유가 적다.

## 절차

1. 변수로의 접근과 갱신을 전담하는 캡슐화 함수들을 만든다.
2. 정적 검사를 수행한다.
3. 변수를 직접 참조하던 부분을 모두 적절한 캡슐화 함수 호출로 바꾼다. 하나씩 바꿀 때마다 테스트 한다.
4. 변수의 접근 범위를 제한한다.
5. 테스트 한다.
6. 변수 값이 레코드라면 레코드 캡슐화하기를 적용할지 고려해본다.

## 예시

```js
// before
let defaultOwner = { firstName: "거니", lastName: "한" };
// after

let defaultOwnerData = { firstName: "거니", lastName: "한" };

// 1. 기본 캡슐화를 위해 가장 먼저 데이터를 읽고 쓰는 함수부터 정의한다.
function getDefaultOwner() {
	return defaultOwnerData;
}
function setDefaultOwner(arg) {
	defaultOwnerData = arg;
}
// 2. 그런 다음 defaultOwner 를 참조하는 코드를 찾아서 방금 만든 게터 함수를 호출하도록 고친다.
sapceship.owner = getDefaultOwner();
// 대입문은 세터 함수로 바꾼다.
setDefaultOwner({ firstName: "보라", lastName: "이" });
// 하나씩 바꿀 때마다 테스트 한다.

// 3. 모든 참조를 수정했다면 이제 변수의 가시 범위를 제한한다.
// - 자바스크립도 작성할 때는 변수와 접근자 메서드를 같은 파일로 옮기고 접근자만 노출시키면 된다.

// defaultOwner.js
let defaultOwnerData = { firstName: "거니", lastName: "한" };
export function defaultOwner() {
	return defaultOwnerData;
}
export function setDefaultOwner(arg) {
	defaultOwnerData = arg;
}
```

### 값 캡슐화하기

- 기본 캡슐화 기법으로 데이터 구조로의 참조를 캡슐화하면, 그 구조로의 접근이나 구조 자체를 다시 대입하는 행위를 제어할 수 있다.
- 하지만 필드 값을 변경하는 일은 제어할 수 없다.

```js
const owner1 = defaultOwner();
assert.equal("거니", owner1.lastName, "처음 값 확인");
const owner2 = defaultOwner();
owner2.lastName = "박";
asset.equal("박", owner1.lastName, "owner2 를 변경한 후");
```

- 기본 캡슐화는 데이터 항목을 참조하는 부분만 캡슐화하는데 변수에 담긴 내용을 변경하는 행위까지 제어할 수 있게 캡슐화하고 싶을 때는?
  1. 그 값을 바꿀 수 없게 만든다.

```js
let defaultOwnerData = { firstName: "거니", lastName: "한" };
export function defaultOwner() {
	return Object.assign({}, defaultOwnerData);
}
// 복제본을 반환하도록 수정하는 식으로 처리
export function setDefaultOwner(arg) {
	defaultOwnerData = arg;
}
```

- 리스트에 이 기법을 많이 적용한다. 데이터의 복제본을 반환하면 클라이언트는 게터로 얻은 데이터를 변경할 수 잇지만 원본에는 아무 영향을 주지 못한다.

  2. 레코드 캡슐화하기

```js
let defaultOwnerData = { firstName: "거니", lastName: "한" };
export function defaultOwner() {
	return new Person(defaultOwnerData);
}
// 복제본을 반환하도록 수정하는 식으로 처리
export function setDefaultOwner(arg) {
	defaultOwnerData = arg;
}

class Person {
	constructor(data) {
		this._lastName = data.lastName;
		this._firstName = data.firstName;
	}
	get lastName() {
		return this._lastName;
	}
	get firstName() {
		return this._firstName;
	}
}
```

- 이렇게 하면 defaultOwnerData의 속성을 대입하는 연산은 모두 무시된다.
- 세터에서도 복제본을 만드는 편이 좋을 수도 있다.
- 링크가 없다면 데이터를 복제해 저장하여 나중에 원본이 변경돼서 발생하는 사고를 방지할 수 있다.
- 복제본 만드기가 번거롭고 까다롭지만, 원본을 그대로 사용하면 나중에 디버깅하기 어렵고 시간도 오래 걸릴 위험이 있다.
- 분명한 사실은 데이터의 사용 범위가 넓을수록 적절히 캡슐화하는 게 좋다는 것이다.

_220527_
