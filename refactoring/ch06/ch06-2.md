## 6.2 함수 인라인하기 Inline Function

```js
//before

function getRating(driver) {
	return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}
function moreThanFiveLateDeliveries(driver) {
	return driver.numberOfLateDeliveries > 5;
}

// after

function getRating(driver) {
	return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
```

### 배경

- 목적이 분명히 드러나는 이름의 짤막한 함수를 이용하기를 권함
- 그래야 코드가 명료해지고 이해하기 쉬워지기 때문
- 함수 본문이 이름만큼 명확한 경우도 있다. 또는 함수 본문코드를 이름만큼 깔끔하게 리팩터링할 때도 있다.
- 이럴 때는 그 함수를 제거한다. 간접 호출은 유용할 수 있지만 쓸데없는 간접 호출은 거슬릴 뿐이다.

- 리팩터링 과정에서 잘못 추출된 함수들도 다시 인라인한다.
- 잘못 추출된 함수들을 원래 함수로 합친 다음, 필요하면 원하는 형태로 다시 추출하는 것이다.

- 간접 호출을 너무 과하게 쓰는 코드도 흔한 인라인 대상이다.

### 절차

1. 다형 메서드인지 확인한다.
2. 인라인할 함수를 호출하는 곳을 모두 찾는다.
3. 각 호출문을 함수 본문으로 교체한다.
4. 하나식 교체할 때마다 테스트한다.
5. 함수 정의 (원래 함수)를 삭제한다.

- 핵심은 항상 단계를 잘게 나눠서 처리하는 데 있다.
- 복잡할 수록 최대한 한 문장씩 처리하도록 노력한다.
- 그리고 매 스텝마다 테스트를 잊지 말자

---
