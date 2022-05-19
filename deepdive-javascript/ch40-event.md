# Ch.40 Event

## 이벤트 드리븐 프로그래밍

- 브라우저는 처리해야할 특정 사건이 발생하면 이벤트 event 를 발생 trigger 시킨다.
- 예를 들어 : 마우스 이동 / 클릭, 키보드 입력

- 이벤트가 발생했을 때 호출될 함수를 `이벤트 핸들러` `event handler`
- 핸들러의 호출을 위임하는 것을 `이벤트 핸들러 등록` 이라고 한다.

- 이벤트가 언제 발생하고 이벤트 핸들러는 언제 호출할 지 알 수 없으므로 명시적으로 함수를 호출하는 것이 아니라 브라우저에게 함수 호출을 위임한다.

- 이벤트와 그에 대응하는 함수(이벤트 핸들러)를 통해 사용자와 애플리케이션은 상호작용을 할 수 있다.
- 이벤트 중심으로 프로그래밍의 흐름을 제어하는 방식을 `이벤트 드리븐 프로그래밍` 이라고 함

## 40.2 이벤트 타입

### 마우스 이벤트

- click : 마우스를 클릭
- dblclick : 마우스를 더블클릭
- mousedown : 마우스 버튼을 눌렀을 때
- mouseup : 누르고 있던 마우스 버튼을 놓았을 때
- mousemove : 마우스 커서를 움직였을 때
- mouseenter : 마우스 커서를 HTML 요소 안으로 이동했을 때 (버블링 되지 않는다)
- mouseover : 마우스 커서를 HTML 요소 안으로 이동했을 때 (버블링된다)
- mouseleave : 마우스 커서를 HTML 요소 밖으로 이동했을 때 (버블링되지 않는다)
- mouseout : 마우스 커서를 HTML 요소 밖으로 이동했을 때 (버블링된다)

#### 버블링이란 ?

- 이벤트가 제일 깊은 곳에 있는 요소에서 시작해 부모 요소를 거슬러 올라가며 발생하는 모양이 마치 물속 거품(bubble)과 닮았기 때문에 버블링이라고 부른다.

### 키보드 이벤트

- keydown : 모든 키를 눌렀을 때 발생
- keypress : 모든 키를 눌렀을 때 연속적으로 발생
- keyup : 누르고 있던 키를 놓았을 때 한 번만 발생

### 포커스 이벤트

- focus : HTML 요소가 포커스를 받았을 때 (버블링되지 않는다)
- blur : HTML 요소가 포커스를 잃었을 때 (버블링되지 않는다)
- focusin : HTML 요소가 포커스를 받았을 때 (버블링된다)
- focuesout : HTML 요소가 포커스를 잃었을 때 (버블링된다)

- (focusin과 focuesout 이벤트 핸들러는 addEventListener 메서드 방식을 사용해 등록해야 한다.)

### 폼 이벤트

- submit :
  1. form 요소 내의 input, select 입력 필드에서 엔터 키를 눌렀을 때
  2. from 요소 내의 submit 버튼 (<button>, <input type="submit">)을 클릭 했을 때
  - submit 이벤트는 form 요소에서 발생한다.

### 값 변경 이벤트

- input : input(text, checkbox, radio), select, textarea 요소의 값이 입력되었을 때
- change : input(text, checkbox, radio), select, textareat 요소의 값이 변경되었을 때
- readystatechange : HTML 문서의 로드와 파싱 상태를 나타내는 documnet.readyState 프로퍼티 값("loading", "interfactive", "complete")이 변경될 때

### DOM Mutation 이벤트

- DOMContentLoaded : HTML 문서의 로드와 파싱이 완료되어 DOM 생성이 완료되었을 때

### 뷰 이네트

- resize : 브라우저 윈도우의 크기를 리사이즈할 때 연속적으로 발생한다.
- scroll : 웹페이지 또는 HTML 요소를 스크롤할 때 연속적으로 발생한다.

### 리소스 이벤트

- load : DOMContentLoaded 이벤트가 발생한 이후, 모든 리소스(이미지, 폰트 등)의 로딩이 완료되었을 때 (주로 window 객체에서 발생)
- unload : 리소스가 언로드될 때(주로 새로운 웹페이지를 요청한 경우)
- abort : 리소스 로딩이 중단되었을 때
- error : 리소스 로딩이 실패했을 때

## 40.3 이벤트 핸들러 등록

- **이벤트 핸들러** : 이벤트가 발생하면 브라우저에 의해 호출될 함수

### 이벤트 핸들러 어트리뷰트 방식

```html
<button onclick="sayHi("han")">Click me! </button>
<script>
  function sayHi(name) {
    console.log(`Hi!, ${name}`);
  }
</script>
```

- HTML 요소의 어트리뷰트 중에는 이벤트에 대응하는 이벤트 핸들러 어트리뷰트가 있다.

- 이벤트 핸들러를 등록할 때 콜백 함수와 마찬가지로 함수 참조를 등록해야 브라우저가 이벤트 핸들러를 호출할 수 있다.

### 이벤트 핸들러 프로퍼티 방식

- 이벤트 핸들러 프로퍼티에 함수를 바인딩하면 이벤트 핸들러가 등록된다.

```js
$button.onclick = function () => {
  console.log("button clicked");
}
```

- 이벤트를 발생시킬 객체인 이벤트 타깃과 이벤트의 종류를 나타내는 문자열 이벤트 타입 그리고 이벤트 핸들러를 지정하여 이벤트 핸들러 등록

### addEventListener 메서드 방식

```js
EventTarget.addEventListener("eventType", callBackFunc, [useCapture]);
// capture 사용 여부
// - true : capturing
// - false : bubbling (기본값)
```

- addEventListener 메서드는 하나 이상의 이벤트 핸들러를 등록할 수 있다.

## 40.4 이벤트 핸들러 제거

```js
EventTarget.removeEventListener("eventType", callBackFunc);
```

- callBackFunc 가 무명 함수로 전달한 경우 이벤트 리스너를 제거할 수 없다.

## 40.5 이벤트 객체

- 이벤트가 발생하면 이벤트에 관련된 다양한 정보를 담고 있는 이벤트 객체가 동적으로 생성된다.
- 이 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다.

- type : 이벤트 타입
- target : 이벤트를 발생시킨 DOM 요소
- currentTarget : 이벤트 핸들러가 바인딩된 DOM 요소
- eventPhase : 이벤트 전파 단계
- bubbles: 이벤트를 버블링으로 전파하는 여부
- cancelable : preventDefault 메서드를 호출하여 이벤트의 기본 동작을 취소할 수 있는지 여부
- defaultPrevented : preventDefault 메서드를 호출하여 이벤트를 취소했는지 여부
- isTrusted : 사용자의 행위에 의해 발생한 이벤트인지 여부
- timeStamp : 이벤트가 발생한 시각

### 마우스 정보 취득

- 마우스 포인터의 좌표 정보를 나타내는 프로퍼티 : screenX/screenY, clientX/clientY, pageX/pageY, offsetX/offsetY
- 버튼 정보를 나타내는 프로퍼티 : altKey, ctrlKey, shiftKey, button

### 키보드 정보 취득

- keydown, keyup, keypress 이벤트 발생하면 생성되는 이벤트 객체의 프로퍼티 : altKey, crtilKey, shiftKey, meataKey, key

### 이벤트 전파

- DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파

- 캡처링 단계 (caputring phase) : 이벤트가 상위 요소에서 하위 요소 방향으로 전파
- 타깃 단계 (target phase) : 이벤트가 이벤트 타깃에 도달
- 버블링 단계 (bubbling phase) : 이벤트가 하위 요소에서 상위 요소 방향으로 전파

- 이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론 상위 DOM 요소에서도 캐치할 수 있다. (cpaturing 과 bubbling 속성을 이용하여)

### 이벤트 위임

- 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를 등록하는 대신 하나의 상위 DOM 요소에 이벤트 핸들러를 등록하는 방법

```html
<ul id="fruits">
	<li id="apple" class="activate">Apple</li>
	<li id="banana">Apple</li>
	<li id="orange">Apple</li>
</ul>
```

```js
function activate({ target }) {
	if (!target.matches("#fruits > li")) return;
	[...$fruits.children].forEach(($fruit) => {
		$fruit.classList.toggle("active", $fruit === target);
		$msg.textContent = target.id;
	});
}

$fruits.onclick = activate;
```

## 40.8 DOM 요소의 기본 동작 조작

### DOM 요소의 기본 동작 중단

- 이벤트 객체의 preventDefault 메서드는 이러한 DOM 요소의 기본 동작을 중단시킨다.

### 이벤트 전파 방지

- 이벤트 객체의 stopPropagation 메서드는 하위 DOM 요소의 이벤트를 개별적으로 처리하기 위해 이벤트의 전파를 중단시킨다.

## 40.9 이벤트 핸들러 내부의 this

- 이벤트 핸들러 어트리뷰트 방식

```js
<button onclick="handleClick()">Click me </button>
<script>
  function handleClick() {
    console.log(this); // window
  }
```

- 일반 함수로서 호출되는 함수 내부의 this는 전역 객체를 가리킨다.
- 단, 이벤트 핸들러를 호출할 때 인수로 전달한 this는 이벤트를 바인딩한 DOM 요소를 가리킨다.

```js
<button onclick="handleClick(this)">Click me </button>
<script>
  function handleClick(button) {
    console.log(button) // 이벤트를 바인딩한 button 요소
    console.log(this); // window
  }
```

### 이벤트 핸들러 프로퍼티 방식돠 addEventListener 메서드 방식

- 이벤트 핸들러 방식과 addEventListener 메서드 방식 모두 이벤트 핸들러 내부의 this는 이벤트를 바인딩한 DOM 요소를 가리킨다.
- 즉, 이벤트 핸들러 내부의 this 는 이벤트 객체의 currentTarget 프로퍼티와 같다.

- 화살표 함수로 정의한 이벤트 핸들러 내부의 this는 상위 스코르의 this를 가리킨다. 화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문

## 40.10 이벤트 핸들러에 인수 전달

- 이벤트 핸들러 프로퍼티 방식과 addEventListener 메서드 방식의 경우 이벤트 핸들러를 브라우저가 호출하기 때문에 함수 호출문이 아닌 함수 자체를 등록해야 한다. 따라서 인수를 전달할 수 없다.
- 그러나 인수를 전달할 방법이 전혀 없는 것은 아니다.

```js
const checkUserNameLength = (min) => {
	$msg.textContent =
		$input.value.length < min ? `이름은 ${min}자 이상 입력해주세요` : "";
};

$input.onblur = () => {
	checkUserNameLength(MIN_USERNAME_LENGTH);
};
```

- 또는 이벤트 핸들러를 반환하는 함수를 호출하면서 인수를 전달할 수도 있다

```js
const checkUserNameLength = (min) => (e) => {
	$msg.textContent =
		$input.value.length < min ? `이름은 ${min}자 이상 입력해주세요` : "";
};
$input.onblur = checkUserNameLength(MIN_USERNAME_LENGTH);
```

- checkUserNameLength 함수는 함수를 반환한다.
- 따라서 $input.onblur 에는 결국 checkUserNameLength 함수가 반환하는 함수가 바인딩된다.

## 40.11 커스텀 이벤트

- Event, UIEvent, MouseEvent 같은 이벤트 생성자 함수를 호출하여 명시적으로 생성한 이벤트 객체는 임의이 이벤트 타입을 지정할 수 있다.
- 이처럼 개발자의 의도로 생성된 이벤트를 커스텀 이벤트라 한다.

_220511_
