_220602_

## 7.2 컬렉션 캡슐화하기 Encapsulate Collection

### 배경

- 가변 데이터를 모두 캡슐화하면 데이터 구조가 언제 어떻게 수정되는지 파악하기 쉬워서 필요한 시점에 데이터 구조를 변경하기도 쉬워진다.
- 게터가 컬렉션을 그대로 반환하지 못하도록 하라. (**복사본을 만들어서 반환하라!**)
- add() 나 remove() 와 같은 이름으로 컬렉션 변경자 메서드를 만들어 관리하면 항상 컬렉션을 소유한 클래스를 통해서만 원소를 변경하도록 하여 프로그램을 개선하면서 컬렉션 변경 방식도 원하는대로 수정할 수 있다.
- 컬렉션 게터가 원본 컬렉션을 반환하지 않게 만들어서 클라이언트가 실수로 컬렉션을 바꿀 가능성을 차단하는게 낫다.
- 컬렉션을 읽기 전용으로 만들어라
- 컬렉션 게터를 제공하되 내부 컬렉션의 복제본을 반환하는 방법
- 코드 베이스에 일관성을 주기 위해 컬렉션 접근 함수의 동작 방식을 통일해야 한다.

### 절차

1. 아직 컬렉션을 캡슐화하지 않았다면 변수 캡슐화하기부터 한다.
2. 컬렉션에 원소를 추가/제거하는 함수를 추가한다.
   컬렉션 자체를 통째로 바꾸는 세터는 제거한다. 세터를 제거할 수 없다면 인수로 받은 컬렉션을 복제해 저장하도록 한다.
3. 정적 검사를 수행한다.
4. 컬렉션을 참조하는 부분을 모두 찾는다. 컬렉션의 변경자를 호출하는 코드가 모두 앞에서 추가/제거 함수를 호출하도록 수정한다. 하나식 수정할 때마다 테스트 한다.
5. 컬렉션 게터를 수정해서 원본 내용을 수정할 수 없는 읽기전용 프락시나 복제본을 반환하게 한다.
6. 테스트 한다.

### 예시

```js
class Person {
	constructor(name) {
		this._name = name;
		this._course = [];
	}
	get name() {
		return this._name;
	}
	get course() {
		return this._courses;
	}
	set courses(aList) {
		this._course = aList;
	}
}

class Course {
	constructor(name, isAdvanced) {
		this._name = name;
		this._isAdvanced = isAdvanced;
	}
	get name() {
		return this._name;
	}
	get isAdvanced() {
		return this._isAdvanced;
	}
}
```

- 클라이언트는 Person 이 제공하는 수업 컬렉션에서 수업 정보를 얻는다.

```js
numAdvancedCourses = aPerson.courses.filter((c) => c.isAdvanced).length;
```

- 여기에 허점이 있다 세터를 이용해 수업 컬렉션을 통째로 설정한 클라이언트는 누구든 이 컬렉션을 마음대로 수정할 수 있기 때문이다.

```js
const basicCourseNames = readBasicCourseNames(filename);
aPerson.courses = basicCourseNames.map((name) => new Course(name, false));
```

- 클라이언트 입장에서는 다음처럼 수업 목록을 직접 수정하는 것이 훨씬 편할 수 있다.

```js
for (const name of readBasicCourseNames(filename)) {
	aPerson.courses.push(new Course(name, false));
}
```

- 하지만 이런 식으로 목록을 갱신하면 Person 클래스는 더는 컬렉션을 제어할 수 없으니 캡슐화가 깨진다.
- 필드를 참조하는 과정만 캡슐화했을 뿐 필드에 담긴 내용은 캡슐화하지 않은 게 원인이다.

2. 제대로 캡슐화하기 위해 먼저 클라이언트가 수업을 하나씩 추가하고 제거하는 메서드를 Person 에 추가해보자.

```js
// Person class
addCourse(aCourse) {
  this._course.push(aCourse)
}
removeCourse(aCourse, fnIfAbsent = () => {throw new RangeError()}) { // *&* 매개변수를 함수로 ?
  const index = this._courses.indexOf(aCourse);
  if (index === -1) fnIfAbsent();
  else this._course.splice(index, 1)
}
```

- 제거 메서드에서는 클라이언트가 컬렉션 없는 원소를 제거하려 할 때의 대응 방식도 정한다.
- 기본적으로 에러를 던지되, 호출자가 원하는 방식으로 처리할 여지도 남겨뒀다.

4. 컬렉션의 변경자를 직접 호출하던 코드를 모두 찾아서 방금 추가한 메서드를 사용하도록 바꾼다.

```js
for (const name of readBasicCoursseNames(filename)) {
	aPeson.addCourse(name, false);
}
```

2. 이렇게 개별적인 원소를 추가하고 제거하는 메서드를 제공하기 때문에 setCourses()를 사용할 일이 없어졌으니 제거한다 (`세터 제거하기`)
   세터를 제공해야 할 특별한 이유가 있다면 인수로 받은 컬렉션의 복제본을 필드에 저장하게 한다.

```js
// Person class
set courses(aList) {this._courses = aList.slice()}
```

5. 저자는 이 메서드들을 사용하지 않고서는 아무 목록을 변경할 수 없게 만드는 방식을 선호한다.
   다음과 같이 복제본을 제공하면 된다.

```js
//Person class
get courses() {return this._courses.slice();}
```

- **컬렉션에 대해서는 어느 정도 강박증을 갖고 불필요한 복제본을 만드는 편이, 예상치 못한 수정이 촉발한 오류를 디버깅하는 것보다 낫다.**
- 컬렉션을 변경할 가능성이 있는 작업을 할 때도 습관적으로 복제본을 만든다.

_220602_
