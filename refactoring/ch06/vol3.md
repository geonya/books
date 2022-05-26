## 6.3 변수 추출하기 Extract Variable

```js
// before
return (
	order.quantity * order.itemprice -
	Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
	Math.min(order.quantity * order.itemPrice * 0.1, 100)
);

// after

const basePrice = order.quantity * order.itemprice;
const quantityDiscount =
	Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 100);
return basePrice - quantityDiscount + shipping;
```

### 배경

- 표현식이 너무 복잡해서 이해하기 어려울 대는 지역 변수를 활용하여 표현식을 쪼개 관리하기 더 쉽게 만든다.
- 복잡한 로직을 구성하는 단계마다 이름을 붙여 코드의 목적을 훨씬 명확하게 드러낸다.
- 추가한 변수는 디버깅에도 도움된다. 디버깅 중단점을 지정하거나 상태를 출력하는 문장을 추가할 수 있기 때문
- _현재 함수 안에서만 의미가 있다면 변수로 추출하는 것이 좋다._
- _그러나 함수를 벗어난 넓은 문맥에서까지 의미가 된다면 그 넓은 범위에서 통용되는 이름을 가진 `함수로 추출해야 한다.`_
- 이름이 통용되는 문맥을 넓히면 다른 코드에서 사용할 수 있기 때문에 같은 표현식을 중복해서 작성하지 않아도 되고
- 중복이 적으면서 의도가 잘 드러나는 코드를 작성할 수 있다.

### 절차

1. 추출하려는 표현식에 부작용이 없는지 확인한다.
2. 불변 변수를 하나 선언하고 이름을 붙일 표현식의 복제본을 대입한다.
3. 원본 표현식을 새로 만든 변수로 교체한다.
4. 테스트 한다.
5. 표현식을 여러 곳에서 사용한다면 각각을 새로 만든 변수로 교체한다. 하나 교체할 때마다 테스트 한다.

### 예시

```js
// before
function price(order) {
	// 가격 (price) = 기본 가격 - 수량 할인 + 배송비
	order.quantity * order.itemprice -
		Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
		Math.min(order.quantity * order.itemPrice * 0.1, 100);
}

// after

function price(order) {
	const basePrice = order.quantity * order.itemprice;
	const quantityDiscount =
		Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
	const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 100);
	return basePrice - quantityDiscount + shipping;
}
```

### 예시 : 클래스 안에서

```js
// before
class Order {
	constructor(aRecord) {
		this._data = aRecord;
	}

	get quantity() {
		return this._data.quantity;
	}
	get itemPrice() {
		return this._data.itemPrice;
	}
	get price() {
		return (
			this.quantity * this.itemPrice -
			Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
			Math.min(this.quantity * this.itemPrice * 0.1, 100)
		);
	}
}

//after

class Order {
	constructor(aRecord) {
		this._data = aRecord;
	}

	get quantity() {
		return this._data.quantity;
	}
	get itemPrice() {
		return this._data.itemPrice;
	}
	get price() {
		return this.basePrice - this.quantityDiscount + this.shipping;
	}
	get basePrice() {
		return this.quantity * this.itemPrice;
	}
	get quntityDiscount() {
		return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
	}
	get shipping() {
		return Math.min(this.quantity * this.itemPrice * 0.1, 100);
	}
}
```

- 객체의 엄청난 장점 : 객체는 특정 로직과 데이터를 외부와 공유하려 할 때 공유할 정보를 설명해주는 적당한 크기의 문맥이 되어줌
- 덩치가 큰 클래스에서 공통 동작을 별도 이름으로 뽑아내서 추상화해두면 그 객체를 다룰 때 쉽게 활용할 수 있어서 매우 유용하다.
