# Ch.39 DOM

- DOM : 브라우저가 이해할 수 있는 자료구조로 HTML은 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API,
- 즉 프로퍼티와 메서드를 제공하는 트리구조다.

## 39.1

### 39.1.1 HTML 요소와 노드 객체

- HTML 요소는 HTML 문서를 구성하는 개별적인 요소를 의미한다.

```html
<div(시작태그) class(어트리뷰트 이름) = "greeting" (어트리뷰트 값) > Hello(콘텐츠) </div>(종료 태그)
```

- HTML 요소는 렌더링 엔진의 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환된다.
- 이때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로, HTML 요소의 텍스트 콘텐츠는 텍스트 노드로 변환된다.

- HTML 문서는 HTML 요소들의 집합
- HTML 요소는 중첩 관계를 가짐
- 중첩 관계에 의해 계층적인 부자(parent-child) 관계가 형성
- 부자 관계를 반영하여 HTML 문서의 구성 요소인 HTML 요소를 객체화한 모든 노드 객체들을 트리 자료 구조로 구성

### 트리 자료 구조

- 부모 노드와 자식 노드로 구성된 노드들의 계층 구조를 표현하는 비선형 자료 구조
  (비선형 자료 구조는 하나의 자료 뒤에 여러 개의 자료가 존재할 수 있는 자료 구조)
- 최상위 노드는 부모 노드가 없으며, 루트 노드 `root node` 라 한다.
- 자식 노드가 없는 노드를 리프 노드라 `leaf node` 한다.

- **노드 객체들로 구성된 트리 자료 구조를 DOM** 이라 한다.
- DOM 트리라고 부르기도 한다.

### 문서 노드 document node

- 문서 노드는 DOM 트리의 최상위에 존재하는 루트 노드로서 document 객체를 가리킨다.
- 모든 자바스크립트 코드는 전역 객체 window 의 document 프로퍼티에 바인딩 되어 있는 하나의 document 객체를 바라본다.
- 요소, 어트리뷰트, 텍스트 노드에 접근하려면 문서 노드를 통해야 한다.

### 요소 노드 element node

- 요소 노드는 HTML 요소를 가리키는 객체다.
- HTML 요소 간의 중첩에 의해 부자 관계를 가지며, 이 부자 관계를 통해 정보를 구조화한다.

### 어트리뷰트 노드 attribute node

- HTML 요소의 어트리뷰트를 가리키는 객체로 요소노드에만 연결되어 있다.

### 텍스트 노드 text node

- 텍스트 노드는 HTML 요소의 텍스트를 가리키는 객체
- leaf node 로 DOM 트리의 최종단

### 노드 객체의 상속 구조

- DOM 은 HTML 문서의 계층적 구조와 정보를 표현하며, 이를 제어할 수 있는 API, 즉 프로퍼티와 메서드를 제공하는 `트리 자료구조`
- DOM을 구성하는 노드 객체는 ECMA Script 사양에 정의된 표준 빌트인 객체가 아니라 브라우저 환경에서 추가적으로 제공하는 호스트 객체다.
- 그렇지만 노드 객체도 자바스크립트 객체이므로 프로토타입에 의한 상속 구조를 갖는다.
- DOM은 HTML문서의 계층적 구조와 정보를 표현하는 것은 물론 노드 객체의 종류, 즉 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 DOM API로 제공한다.
- 이 DOM API 를 통해 HTML 구조와 내용 또는 스타일 등을 둥적으로 조작할 수 있다.
- DOM API를 사용하여 노드에 접근하고 HTML의 구조나 내용 또는 스타일 등을 동적으로 변경하는 방법을 익혀라
- 프론트엔드 개발자에게 HTML은 반드시 DOM과 연관 지어 바라보아야 한다.

## 39.2 요소 노드 취득

- HTML의 구조나 내용 또는 스타일 등을 동적으로 조작하려면 먼저 요소 노드를 취득해야함

### id를 이용한 요소 노드 취득

- `Document.prototype.getElementById` 메서드
- id 값은 HTML 문서 내에서 유일한 값이어야 한다.
- 하나의 값만 반환하며, 값이 없을 경우 null 은 반환한다.

### 태그 이름을 이용한 요소 취득

- `Document.prototype/Element.prototype.getElementsByTagName`
- 메서드는 인수로 전달한 태그 이름을 갖는 모든 요소들을 탐색하여 반환한다.
- 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 `HTMLCollection` 객체를 반환
- `HTMLCollection` 객체는 유사 배열 객체이면서 이터러블이다.
- HTML 문서의 모든 요소 노드를 취득하려면 `getElementsByTagName("*")`

### class를 이용한 요소 노드 취득

- `Document.prototype/Element.prototype.getElementsByClassName` 메서드는 인수로 전달한 class 어트리뷰트 값을 갖는 모든 요소 노드들을 탐색하여 반환한다.

### CSS 선택자를 이용한 요소 취득

- `Document.prototype/Element.prototype.querySelector` 메서드는 인수로 전달한 CSS 선택자를 만족시키는 하나의 요소 노드를 탐색하여 반환한다.
- `Document.prototype/Element.prototype.querySelectorAll` 메서드는 인수로 전달한 CSS 선택자를 만족시키는 모든 요소 노드를 탐색하여 반환한다.
- `querySelectorAll` 메서드는 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 NodeList 객체를 (유사 배열 객체, 이터러블) 반환한다.

### 특정 요소 노드를 취득할 수 있는지 확인

```js
const $apple - document.querySelector(".apply");
console.log($apple.mathes("#fruits > li.apple")); // true
console.log($apple.mathes("#fruits > li.banana")); // false
```

### HTML Collection과 NodeList

- DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬렉션 객체
- HTMLCollection과 NodeList 는 모두 유사 배열 객체이면서 이터러블
- 노드 객체의 상태 변화를 실시간으로 반영하는 살아있는(Live) 객체

## 39.3 노드 탐색

- 요소 노드를 취득한 다음, 취득한 요소 노드를 기점으로 DOM 트리의 노드를 옮겨 다니며 부모, 형제, 자식 노드 등을 탐색해야 할 때
- `Node.prototype` 제공 : `prarentNode`, `prevouseSibling`, `firstChild`, `childNodes`
- `Element.prototype` 제공 : `previousElementSibling`, `nextElementSibling`, `childeren`

- 노드 탐색 프로퍼티는 모두 접근자 프로퍼티다.
- 단 노드 탐색 프로퍼티는 getter만 존재하여 참조만 가능한 읽기 전용 접근자 프로퍼티이다.
- 값을 할당하면 에러 없이 무시된다.

### 공백 텍스트 노드

- HTML 요소 사이의 스페이스, 탭, 줄바꿈(개행) 등의 공백 문자는 텍스트 노드를 생성하고 이를 공백 텍스트 노드라 한다.

### 자식 노드 탐색

- `Node.prototype.childNodes` : 자식 모드를 모두 탐색하여 DOM 컬렉션 객체인 NodeList에 담아 반환 (텍스트 노드 포함 가능)
- `Element.prototype.children` : 자식 노드 중에서 요소 노드만 모두 탐색하여 DOM 컬렉션 객체인 HTMLCollection에 담아 반환 (텍스트 노드 포함 불가)
- `Node.prototype.firstChild` : 첫 번째 자식 노드를 반환 (텍스트 노드 or 요소 노드)
- `Node.prototype.lastChild` : 마지막 자식 노드 반환
- `Element.prototype.firstElementChild` : 첫 번째 자식 요소 노드 반환 (요소 노드만 반환 텍스트 X)
- `Element.prototype.lastElementChild` : 마지막 자식 요소 노드 반환

### 자식 노드 존재 확인

- `Node.prototype.hasChildNodes` 메서드를 사용하여 자식 노드 존재 여부를 확인한다. (true/false 반환)

### 부모 노드 탐색

- `Node.prototype.prarentNode` 프로퍼티를 사용한다.

### 형제 노드 탐색

- `Node.prototype.previousElementSibling` : 부모 노드가 같은 형제 노드 중에서 자신의 이전 형제 노드를 탐색하여 반환한다.
- `Node.prototype.nextSibling` : 부모 노드가 같은 형제 노드 중에서 자신의 다음 형제 노드를 탐색하여 반환한다.
- `Element.prototype.previousElementSibling` : 부모 노드가 같은 형제 요소 노드 중에서 자신의 이전 형제 요소 노드를 탐색하여 반환
- `Element.prototype.nextElementSibling` : 부모 노드가 같은 형제 노드 중에서 자신의 다음 형제 요소 노드를 탐색하여 반환

## 39.4 노드 정보 취득

- `Node.prototype.nodeType` : 노드 객체의 종류, 즉 노드 타입을 나타내는 상수를 반환한다. (요소노드 : 1, 텍스트 노드 : 3, Document_Node: 9)
- `Node.prototype.nodeName` : 노드의 이름을 문자열로 반환

## 39.5 요소 노드의 텍스트 조작

### 39.5.1 nodeValue

- `Node.prototype.nodeValue` 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티다.
- 따라서 nodeValue 프로퍼티는 참조와 할당 모두 가능하다.
- 노드 객체의 nodeValue 프로퍼티를 참조하면 노드 객체의 값(텍스트 노드의 텍스트)을 반환한다.
- 따라서 텍스트 노드가 아닌 노드의 nodeValue 프로퍼티를 참조하면 null을 반환한다.

### 39.5.2 textContent

- `Node.prototype.textcontent` 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 텍스트와 모든 자손 노드의 텍스트를 모두 취득하거나 변경한다.

```html
<div id="foo">Hello <span>world!</span></div>
<script>
	console.log(document.getElementById("foo").textContent); // Hello world!
</script>
```

### textContent vs innerText

- `innerText` 프로퍼티는 CSS에 순종적이다. (예를 들어 visibility:hidden;)로 지정된 요소 노드의 텍스트를 반환하지 않음
- `innteText` 는 CSS를 고려해야 하므로 textContent 프로퍼티보다 느리다.

## 39.6 DOM 조작

- DOM 조작은 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것을 말한다.

### innerHTML

- `Element.prototype.innerHTML` 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 HTML 마크업을 취득하거나 변경한다.
- innerHTML를 참조하면 모든 HTML 마크업을 문자열로 반환한다.
- 크로스 사이트 스크립팅 공격의 위험과 변경시 기존 자식 노드를 모두 제거해버리는 비효율성을 내포하고 있어 사용에 주의를 요한다.

### insertAdjacentHTML 메서드

- `Element.prototype.insertAdjacentHTML(position, DOMString) 메서드는 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입한다.`
- posititon 인수 4가지 : beforebegin, afterbegin, beforeend, afterend
- insertAdjacentHTML 메서드는 기존 요소에는 영향을 주지 않고 새롭게 삽입될 요소만을 파싱하여 자식 요소로 추가하므로 innerHTML 프로퍼티보다 효율적이고 빠르다.

### 노드 생성과 추가

- DOM은 노드를 직접 생성/삽입/삭제/치환하는 메서드도 제공한다.

#### 요소 노드 생성

- `Documnet.prototype.createElement(tagName)` 메서드는 요소 노드를 생성하여 반환한다.
- 이렇게 생성된 노드는 DOM에 추가되지 않는다.

#### 텍스트 노드 생성

- `Document.prototype.createTextNode(text)` 메서드는 텍스트 노드를 생성하여 반환한다.
- `createElement` 메서드와 마찬가지로 텍스트 노드를 생성할 뿐 요소 노드에 추가하지 않는다.

#### 텍스트 노드를 요소 노드의 자식 노드로 추가

- `Node.prototype.appendChild(childNode)` 메서드는 매개변수 childNode 에게 인수로 전달한 노드를 appendChild 메서드를 호출한 노드의 마지막 자식 노드로 추가

```tsx
// 텍스트 노드를 생성하여 요소 노드의 자식 노드로 추가
$li.appendChild(document.createTextNode("Banana"));

// $li 요소 노드에 자식 노드가 하나도 없는 위 코드와 동일하게 동작한다.
$li.textContent = "Banana";
```

- 단 요소 노드에 자식 노드가 있는 경우 `textContent` 프로퍼티에 문자열을 할당하면 모든 기존 자식 노드가 제거되므로 주의해야 한다.

#### 요소 노드를 DOM에 추가

```js
$fruits.appendChild($li);
```

### 복수의 노드 생성과 추가

- DOM을 변경하는 것은 높은 비용이 드는 처리이므로 가급적 횟수를 줄이는 편이 성능에 유리
- Container 요소에 자식 노드들을 추가하고 컨테이너 요소만 상위 노드에 자식으로 추가하면 DOM은 한 번만 변경된다
- 다만 위 방법은 불필요한 div 요소를 만들기 때문에 부작용이 있다.
- `DocumentFragment` 노드를 통해 해결할 수 있다.

```js
const $fruits = document.getElementById("fruits");

// DocumentFragment 노드 생성
const $fragment = document.createDocumentFragment();

["apple", "banana", "orange"].forEach((text) => {
	// 1. 요소 노드 생성
	const $li = document.createElement("li");
	// 2. 텍스트 노드 생성
	const textNode = document.createTextNode(text);
	$li.appendChild(textNode);
	$fragment.appendChild($li);
});

$fruits.appendChild($fragment);
```

- 여러 개의 요소 노드를 DOM에 추가하는 경우 `DocumentFragment` 노드를 사용하는 것이 효율적임

### 노드 삽입

#### 마지막 노드로 추가

- `appendChild`는 위치를 지정할 수 없고 언제나 마지막 자식 노드로 추가

#### 지정한 위치에 노드 삽입

- `Node.prototype.insertBefore(newNode, childNode)` 메서드는 첫 번째 인수로 전달받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입

### 노드 이동

- DOM에 이미 존재하는 노드를 `appendChild` 또는 `insertBefore` 메서드를 사용하여 DOM에 다시 추가하면 현재 위치에서 노드 제거 -> 새로운 위치에 노드 추가

### 노드 복사

- `Node.prototype.cloneNode([deep:true | false])` 메서드는 노드의 사본을 생성하면 변환한다.
- 매개변수 deep에 true를 인수로 전달하면 깊은 복사하여 모든 자손 노드가 포함된 사본을 생성
- false를 인수로 전달하거나 생략하면 얕은 복사하여 노드 자신만의 사본을 생성 (자식은 복사 안함)

### 노드 교체

- `Node.prototype.replaceChild(newChild, oldChild)` 메서드는 자신을 호출한 노드의 자식 노드를 다른 노드로 교체

### 노드 삭제

- `Node.prototype.removeChild(child)` 메서드는 child 매개변수에 인수로 전달한 코드를 DOM에서 삭제

## 39.7 어트리뷰트

### 어트리뷰트 노드와 attribuetes 프로퍼티

- HTML 요소는 여러 개의 어트리뷰트(속성)를 가질 수 있음
- <input id="user" type="text" value="geony" />
- HTML 문서가 파싱될 때, HTML 요소의 어트리뷰트는 어트리뷰트 노드로 변환되어 요소 노드와 연결됨 (어트리뷰트 하나당 하나의 노드가 만들어짐)

#### HTML 어트리뷰트 조작

- 요소 노드의 attributes 프로퍼티는 getter 만 존재하는 읽기 전용 프로퍼티임
- attributes 이용시 HTML 어트리뷰트 값은 취득할 수 있지만 변경은 불가
- `Element.prototype.getAttribute/setAttribute` 메서드를 사용하면 attributes 프로퍼티를 통하지 않고 직접 어트리뷰트 값을 취득하거나 변경할 수 있어 편리함

```js
// <input id="user" type="text" value="geony" />

const $input = document.getElementById("user");

const inputValue = $input.getAttribute("value");
console.log(inputValue); // geony

$input.setAttribute("value", "foo");
console.log($input.getAttribute("value")); // foo
```

- `Element.prototype.hasAttribute(attributeName)` : 특정 어트리뷰트가 존재하는 확인
- `Element.prototype.removeAttribute(attributeName)` : 특정 어트리뷰트 삭제

### HTML 어트리뷰트 vs. DOM 프로퍼티

- 요소 노드 객체에는 HTML 어트리뷰트에 대응하는 프로퍼티가 존재 (DOM 프로퍼티)
- DOM 프로퍼티들은 HTML 어트리뷰트 값을 초기값으로 가지고 있음

```js
// <input id="user" type="text" value="geony" />
const $input = document.getElementById("user");
$input.value = "foo";

console.log($input.value); // foo
```

- HTML 어트리뷰트의 역할은 HTML 요소의 초기 상태를 지정하는 것
- HTML 어트리뷰트 값은 HTML 요소의 초기 상태를 의미하며 이는 변하지 않음
- 요소 노드의 초기 상태는 어트리뷰트 노드가 관리하며, 요소 노드의 최신 상태는 DOM 프로퍼티가 관리한다.

#### 어트리뷰트 노드

- HTML 요소에 지정한 어트리뷰트 값은 사용자의 입력에 의해 변하지 않으므로 결과는 언제나 동일하다.

#### DOM 프로퍼티

- 사용자가 입력한 최신 상태는 요소 노도의 DOM 프로퍼티가 관리한다.
- 사용자가 입력을 할 경우 `getAttribute` 메서드로 취득한 HTML 어트리뷰트 값, 즉 초기 상태는 변하지 않고 유지되고
- DOM 프로퍼티로 취득한 최신 상태 값은 사용자의 입력에 의해 언제든지 동적으로 변경되어 최신 상태를 유지한다.
- 단, 사용자 입력에 의한 상태 변화와 관계 없는 어트리뷰트들은 (예를 들어 id 어트리뷰트) 사용자 입력과 관계없이 항상 동일한 값을 유지한다. (직접 변경할 경우에만 변경된다.)

#### HTML 어트리뷰트와 DOM 프로퍼티의 대응 관계

- 대부분의 HTML 어트리뷰트는 HTML 어트리뷰트 이름과 동일 DOM 프로퍼티와 1:1로 대응한다.

#### DOM 프로퍼티 값의 타입

- `DOM 프로퍼티` 로 취득한 최신 상태 값은 문자열이거나 불리언 타입일 수 있다.

### data 어트리뷰트와 dataset 프로퍼티

- data 어트리뷰트와 dataset 프로퍼티를 사용하면 HTML 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간에 데이터를 교환할 수 있음.

```html
<li id="1" data-user-id="1234" data-role="admin">geony</li>
```

- data 어트리뷰트의 값은 `HTMLElement.dataset` 프로퍼티로 취득할 수 있다.
- 반환되는 DOMStringMap 객체는 data 어트리뷰트의 data- 접수다 다음에 붙인 임의의 이름을 카멜 케이스로 변환한 프로퍼티를 가지고 있다.

```html
<li id="1" data-user-id="1234" data-role="admin">geony</li>

<script>
	const user = users.find((user) => user.dataset.userId === "1234");
	console.log(user.dataset.role); // "admin"
</script>
```

## 39.8 스타일

### 인라인 스타일 조작

- `HTMLElement.prototype.style` 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 인라인 스타일을 취득하거나 추가 또는 변경한다.

```js
$div.style.color = "blue";
```

### 클래스 조작

- HTML 요소의 class 어트리뷰트 값을 변경하여 HTML 요소의 스타일을 변경할 수도 있다.
- 이때 HTML 요소의 class 어트리뷰트를 조작하려면 class 어트리뷰트에 대응하는 요소 노드의 DOM 프로퍼티를 사용한다.

#### className

- `Element.prototype.className` 프로퍼티는 setter 와 getter 모두 존재하는 접근자 프로퍼티로서 clss 어트리뷰트 값을 취득하거나 변경

```js
$box.className = $box.className.replace("red", "blue");
```

#### classList

- `Element.prototype.classList` 프로퍼티는 class 어트리뷰트의 정보를 담은 DOMTokenList 객체를 반환한다.

### 요소에 적용되어 있는 CSS 스타일 참조

- HTML 요소에 적용되어 있는 모든 CSS 스타일을 참조해야할 경우 getComputedStyle 메서드를 사용할 수 있다.
