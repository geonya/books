_2022.03.28_

# Mission (2)

-   책 읽으면서 연습문제 직접 풀어보셨나요? 지나간 연습문제 중 한 문제를 뽑아 이번에 제대로 풀어봅시다.
-   5장까지 총 23개의 연습문제가 있습니다. 이 중 한 문제를 골라 풀이과정을 작성해 주세요.
-   (1) 연습문제를 읽어 본다.
-   (2) 맘에 드는 연습 문제를 하나 고른다.
-   (3) 연습 문제를 풀고 해설과 참고 문헌을 자세히 쓴다.
-   (필독)연습문제 풀이 예시글을 꼭 참고하세요.

## 연습 문제 15

0, 5, 10, 15, ......, 100이라는 수열에 숫자가 몇 개나 있는가?

-   아주 단순하게 100을 5로 나눈 숫자는 5부터 시작하는 5의 배수 개수가 되고 0의 숫자 하나만 추가하면 21개가 있다고 생각할 수 있다.
-   일반화하기 위해 간단하게 코드를 짜보았다.

```jsx
// array 객체 초기화
let array = [];
// for 반복문으로 0부터 시작하는 5의 배수 배열 만들기
for (let i = 0; i * 5 <= 100; i++) {
	// 구문을 반복할 때마다 1씩 더해지는 i를 5의 배수로 만들어 array에 추가함
	array.push(i * 5);
}
// array.length 는 배열의 전체 길이, 즉 요소의 개수를 나타냄
console.log("수열에는 총 ", array.length, "개의 숫자가 있다"); // 수열에는 총 21개의 숫자가 있다
```

### 참고

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array

## 연습 문제 23

```jsx
“X 언어에는 파이프라인이 없는데요”에서 우리는 다음과 같은 코드를 썼다.

const content = File.read(file_name);
const lines = find_matching_lines(content, pattern);
const result = truncate_lines(lines);

많은 사람이 객체 지향 코드를 짤 때 메서드 호출을 연결해서 쓴다. 그래서 어쩌면 위 코드도 다음과 같이 바꾸고 싶을지도 모른다.

const result = content_of(file_name) .find_matching_lines(pattern)
.truncate_lines();

두 가지 코드의 차이는 무엇인가? 여러분이 보기에 우리는 어느 쪽을 선호할 것 같은가?
```

-   두 코드는 모두 변환 프로그래밍을 개념을 기초하고 있지만 단계별 처리 방식의 차이를 가진다. -
    -   이는 직렬과 병렬의 차이로 생각해보아도 좋다.

---

-   1번 코드는 병렬로 작동하기 때문에 코드 간의 위치 이동을 하거나 중간에 다른 코드를 끼워넣어도 적상적으로 작동한다.

```jsx
const content = File.read(file_name);
const pattern = patter_making(content);
const lines = find_matching_lines(content, pattern);
const result = truncate_lines(lines);
```

---

-   2번 코드는 이전 단계의 결과에 다음 단계가 전적으로 의존하기 때문에 코드간 결합도가 높아져 쉽게 바꾸기 어렵다.

```jsx
const result = content_of(file_name)
	.making_pattern(content)
	.find_matching_lines(pattern)
	.truncate_lines();
// 이전 단계에서 정의한 메소드에 따라 다음 단계 코드를 모두 바꾸어야할지 모른다.
```

-   또한 1번 함수는 조건만 맞는다면 어디서나 쉽게 재사용이 가능하다.
    -   함수형 프로그래밍의 장점

### 용어 정리

> -   파이프라인(pipeline) 이란?

    -   프로세서에서 성능을 높이기 위해서 명령어 처리 과정으로 명령어 처리를 여러 단계로 나누어 단계별로 동시에
        수행 하여 병렬화를 시키는 것을 말한다.

파이프라인이란?
https://doitnow-man.tistory.com/72

> -   함수형 프로그래밍 이란 ?

    -함수형 프로그래밍은 하나의 프로그래밍 패러다임으로 정의되는 일련의 코딩 접근 방식이며, 자료처리를 수학적 함수의 계산으로 취급하고 상태와 가변 데이터를 멀리하는 프로그래밍 패러다임을 의미한다.

함수형 프로그래밍 소개:
https://jongminfire.dev/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%B4%EB%9E%80
