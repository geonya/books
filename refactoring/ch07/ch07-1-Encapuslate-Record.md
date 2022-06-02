_220530_

## 7.1 레코드 캡슐화하기 Encapuslate Record

### 배경

- 레코드는 연관된 여러 데이터를 직관적인 방식으로 묶을 수 있어서 각각을 따로 취급할 때보다 훨씬 의미 있는 단위로 전달할 수 있게 해준다.
- 하지만 계산해서 얻을 수 있는 갑소가 그렇지 않은 값을 명확히 구분해 저장해야 하는 점이 번거롭다
- 이 때문에 가변 데이터를 저장하는 용도로는 레코드보다 객체가 유용하다.
- 객체를 사용하면 어떻게 저장했는지를 숨긴 채 값을 각각의 메서드로 제공할 수 있다.
- 사용자는 무엇이 저장된 값이고 무엇이 계산된 값인지 알 필요가 없다.
- 캡슐화하면 필드 이름을 바궈도 기본 이름과 새 이름 모두를 각각의 메서드로 제공할 수 이써엇 사용자 모두가 새로운 메서드로 옮겨갈 때까지 점진적으로 수정할 수 있다.

- 레코드 구조는 두 가지로 구분할 수 있다.

  1. 필드 이름을 노출하는 형태
  2. 필드를 숨겨서 원하는 이름을 쓸 수 있는 형태

- 헤시맵은 필드를 명확히 알려주지 않는다는 게 단점이다. 해시맵을 많이 사용하면 불분명함으로 인해 문제가 발생한다.
- **레코드 대신 클래스를 사용하는 편이 낫다.**

### 절차

1. 레코드를 담은 변수를 캡슐화한다.
2. 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한다. 이 클래스에 원본 레코드를 반환하는 접근자도 정의하고, 변수를 캡슐화하는 함수들이 이 접근자를 사용하도록 수정한다.
3. 테스트한다.
4. 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수를 새로 만든다.
5. 레코드를 반환하는 예전 함수를 사용하는 코드를 (4) 에서 만든 새 함수를 사용하도록 바꾼다. 필드에 접근할 때는 객체의 접근자를 사용한다. 적절한 접근자가 없다면 추가한다. 한 부분을 바꿀 때마다 테스트 한다.
6. 클래스에서 원본 데이터를 반환하는 접근자와 (1에서 검색하기 쉬운 이름을 붙여둔) 원본 레코드를 반환하는 함수들을 제거한다.
7. 테스트 한다.
8. 레코드의 필드도 데이터 구조인 중첩 구조라면 `레코드 캡슐화하기`와 `컬렉션 캡슐화하기`를 재귀적을 적용한다.

> 재귀적 : 컴퓨터 과학에 있어서 재귀는 자신을 정의할 때 자기 자신을 재참조하는 방법을 뜻하며, 이를 프로그래밍에 적용한 재귀 호출의 형태로 많이 사용된다.

### 예시 : 간단한 코드 캡슐화하기

```js
// 레코드 구조
const organization = { name: "애크미 구스베리", country: "GB" };
// 1. 가장 먼저 이 상수를 캡슐화한다. (`변수 캡슐화하기`)

function getRawDataOfOrganization() {
	return organization;
}

// 다음과 같이 읽히고 쓰임
result += `<h1>${getRawDataOfOrganization().name}</h1>`; // 읽기 예
getRawDataOfOrganization().name = newName;
```

- 게터를 찾기 쉽도록 의도적으로 이상한 이름을 붙였다.
- 레코드를 캡슐하하는 목적은 변수 자체는 물론 그 내용을 조작하는 방식도 통제하기 위해서다.

2. 이렇게 하려면 레코드를 클래스로 바꾼다.
3. 새 클래스의 인스턴스를 반환하는 함수를 새로 만든다.

```js
class Organization {
	contstructor(data) {
		this._data = data;
	}
}

const organization = new Organization({
	name: "애크미 구스베리",
	country: "GB",
});
function getRawDateOfOrganization() {
	return organization._data;
}
function getOrganization() {
	return organization;
}
```

- 객체로 만든 이후

5. 레코드를 사용하던 코드를 살펴보자

- 레코드를 갱신하던 코드는 모두 세터를 사용하도록 고친다.

```js
// Organization Class
set name(aString) {this._data.name = aString;}

// client
getOrganization.name = newName;

```

- 마찬가지로, 레코드를 읽는 코드는 모두 게터를 사용하게 바꾼다.

```js
// class
get name() {return this._data.name;}
// client
result += `<h1>${getOrganization().name}</h1>`
```

6. 다 바꿨다면 앞에서 이상한 이름으로 지었던 임시 함수를 제거함

```js
function getOrganization() {
	return organization;
}
```

- 마지막으로 \_data 필드들을 객체 안에 펼쳐놓으면 더 깔끔하다.

```js
class Organization {
	contstructor(data) {
		this._name = data.name;
		this._country = data.country;
	}
	get name() {
		return this._name;
	}
  get name(aString) {
    this._name = aString;
  }
  get country() {
    return this._country;
  }
  get country(aCountryCode) {
    this._country = aCountryCode;
  }
}
```

- 이렇게 하면 입력 데이터 레코드와의 연결을 끊어준다는 이점이 생긴다.
- 특히 이 레코드를 참조하여 캡슐화를 깰 우려가 있는 코드가 많을 때 좋다.
- 데이터를 개별 필드로 펼치지 않는다면 `_data`를 대입할 때 복제하는 식으로 처리해도 된다.

### 예시 : 중첩된 레코드 캡슐화하기

- JSON 문서처럼 여러 겹 중첩된 레코드라면 어떻게 해야 할까 ?

```json
"1920" : {
  name : "마틴 파울러",
  id:"1920",
  usages: {
    "2016": {
      "1":50,
      "2":55,
    },
    "2015":{
      "1":70,
      "2":63,
    }
  }
},
"38673": {
  name:"닐 포드",
  id:"38673",
  // 정보
}
```

```js
// 쓰기 예 ...
customerData[customerID].usages[year][month] = amount;
```

```js
// 읽기 예 ...
function compareUsage(customerId, laterYear, month) {
	const later = customerData[customerID].usages[lastYear][month];
	const earlier = customerData[customerID].usages[lastYear - 1][month];
	return { laterAmount: later, change: later - earlier };
}
```

- 이번 캡슐화도 앞에서와 마찬가지로 변수 캡슐화부터 시작한다.

```js
function getRawDataOfCustomers() {
	return customerData;
}
function setRawDataOfCustomers(arg) {
	customerData = arg;
}

// 쓰기 예 ...
customerData[customerID].usages[year][month] = amount;

// 읽기 예 ...
function compareUsage(customerId, laterYear, month) {
	const later = customerData[customerID].usages[lastYear][month];
	const earlier = customerData[customerID].usages[lastYear - 1][month];
	return { laterAmount: later, change: later - earlier };
}
```

- 전체 데이터 구조를 표현하는 클래스를 정이하고 이를 반환하는 함수를 새로 만든다.

```js
class CustomerData {
	constructor(data) {
		this._data = data;
	}
}

function getCustomerData() {
	return customerData;
}
function getRawDataOfCustomers() {
	return customerData._data;
}
function setRawDataOfCustomers(arg) {
	customerData = new CustomerData(arg);
}
```

- getRawDataOfCustomers() 를 호출한 후 데이터를 변경하는 경우에도 주의해야 한다.

```js
// 쓰기 예...
getRawDataOfCustomers()[customerID].usages[year][month] = amount;
```

- 기본 절차에 따르면 고객 객체를 반환하고 필요한 접근자를 만들어서 사용하게 하면 된다.
- 현재 고객 객체에는 이 값을 쓰는 세터가 없어서 데이터 구조 안으로 깊이 들어가서 값을 바꾸고 있다.
- 따라서 데이터 구조 안으로 들어가는 코드를 세터로 뽑아내는 작업부터 한다. `함수 추출하기`

```js
// 쓰기 예
setUsage(customerID, year, month, amount);

function setUsage(customerID, year, month, amount) {
	getRawDataOfCustomers()[customerID].usages[year][month] = amount;
}
```

- 이 함수를 고객 데이터 클래스로 옮긴다. `함수 옮기기`

```js
// 쓰기 예...
getCustomer().setUsage(customerID, year, month, amount);

// Class

class CustomerData {
	constructor(data) {
		this._data = data;
	}
	setUsage(customerID, year, month, amount) {
		this._data[customerID].usages[year][month] = amount;
	}
}
```

- 덩치 큰 데이터 구조를 다룰 때는 쓰기 부분에 집중하자.
- 캡슐화에서는 값을 수정하는 부분을 명확하게 드러내고 한 곳에 모아두는 일이 굉장히 중요하다.

### 읽기 처리

1. 세터 때와 같은 방법으로 읽는 코드를 모두 독립 함수로 추출한 다음 고객 데이터 클래스로 옮기기

```js
// Class
usage(customerID, year, month) {
		return this._data[customerID].usages[year][month];
	}



// 최상위...

function compareUsage (customerID, laterYear, month) {
	const later = getCustomerData().usage(customerID, laterYear, month);
	const earlier = getCustomerData().usage(customerID, laterYear - 1, month);
	return {laterAmount:later, change:later - earlier};
}
```

- 이 방법의 가장 큰 장점은 customerData의 모든 쓰임을 명시적인 API로 제공한다는 것이다.
- 이 클래스만 보면 데이터 사용 방법을 모두 파악할 수 있다.
- 하지만 읽는 패턴이 다양하면 코드가 너무 많아진다...!

- 다른 방법으로, 클라이언트가 데이터 구조를 요청할 때 실제 데이터를 제공해도 된다.
- 하지만 클라이언트가 데이터를 직접 수정하지 못하게 막을 방법이 없다.
- 가장 간단한 방법은 앞에서 작성한 rawData() 메서드를 사용하여 내부 데이터를 복제해서 제공하는 것이다.

```js
// class
get rawData() {
	return _.cloneDeep(this._data);
}

// 최상위...
function compareUsage (customerID, laterYear, month) {
	const later = getCustomerData().rawData[customerID]usage[laterYear][month];
	const earlier = getCustomerData().rawData[customerID].usage[laterYear - 1][month];
	return {laterAmount:later, change:later - earlier};
}
```

- 이 방법의 문제는 데이터 구조가 클수록 복제 비용이 커져서 성능이 느려질 수 있다. 하지만 테스트 해보기 전까지는 모르는 것이다.
- 또 다른 문제는 클라이언트가 원본을 수정한다고 착각하는 것
- 이럴 때는 읽기전용 프락시를 제공하거나 `복제본을 동결 = Object.freeze` 켜서 데이터를 수정하려 할 때 에러를 던지도록 만들 수 있다.

> ## DeepDive JS ch.16

> ### 16.5 객체 변경 방지

- 객체 확장 금지 : `Object.preventExtensions`
- 객체 밀봉 : `Object.seal`
- 객체 동결 : `Object.freeze`

```js
const Direction = Object.freeze({
	UP: Symbol("up"),
	DOWN: Symbol("down"),
	LEFT: Symbol("left"),
	RIGHT: Symbol("right"),
});
```

- 두 번째 방법은 레코드 캡슐화를 재귀적으로 하는 것으로, 할 일은 늘어나지면 가장 확실하게 제어할 수 있다.
- 이 방법을 적용하려면 먼저 고객 정보 레코드를 클래스로 바꾸고 `컬렉션 캡슐화하기` 로 레코드를 다루는 코드를 리팩터링해서 고객 정보를 다루는 클래스를 생성한다.
- 그런 다음 접근자를 이용하여 갱신을 함부로 하지 못하게 만든다.
- 하지만 데이터 구조가 거대하면 일이 너무 복잡해진다.

- 때로는 새로 만든 클래스와 게터를 잘 혼합해서, 게터는 데이터 구조를 깊이 탐색하게 만들되 원본 데이터를 그대로 반환하지 말고 객체로 감싸서 반환하는 게 효과적일 수 있다.

_220530_
