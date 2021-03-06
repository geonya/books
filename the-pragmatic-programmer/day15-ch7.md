_2022.03.29_

> # Ch.7 코딩하는 동안

- 코딩은 기계적인 작업이 아니다.
- 본능과 무의식적인 생각을 잘 활용하라.
- 실용주의 프로그래머는 모든 코드를 비판적인 시각으로 바라본다. 자기 자신의 코드도 예외가 아니다. 우리는 우리가 마는 프로그램과 설계에서 언제나 개선할 여지를 찾아낸다.
- 늘 기민하게 유지하면 재앙을 막을 수 있다.

## Topic 37 파충류의 뇌에 귀 기울이기

- 뇌는 계속 저장하고 있다.

### 백지의 공포

- 직감이 역량이 일조하도록 하라.

### 자신과 싸우기

- 여러분의 코드가 무언가 말하려는 것이다. 지금 하는 작업이 필요 이상으로 힘들다고, 어쩌면 구조나 설계가 틀렸을 수도 있고... 이유가 무엇이든 코드가 보내는 피드백을 파충류의 뇌가 느끼고 있다. 그래서 여러분의 주의를 끌기 위해 필사적으로 노력하는 것이다.

### 파충류와 이야기하는 법

#### Tip 61 - 내면의 파충류 (본능, 무의식)에게 귀 기울여라

- 일단 하고 있는 일을 멈춰라. 여러분의 뇌가 정리를 좀 할 수 있도록 시간과 공간을 확보하라... 언젠가는 다시 생각이 의식의 영역으로 올라와서 '아하'하는 순간이 찾아올 것이다.

### 프로토타이핑 하라

1. 포스트잇에 “프로토 타이핑 중” 이라고 써서 모니터 옆에 붙여라.
2. 프로토타이핑은 원래 실패한다고 자신에게 상기시켜라. 실패하지 않더라도 프로토타입은 버리는 것이라는 점도 함께 상기시켜야 한다. 프로토타이핑으로 손해 볼 일은 없다.
3. 텅 빈 에디터 화면에 여러분이 배우고 싶은 것 혹은 하고 싶은 것을 한 문장의 주석으로 표현해 보라.
4. 코딩을 시작하라.

- 첫 단계는 산책과 수다, 그리고 휴식이다.

- 다른 사람의 코드를 읽고 패턴을 찾아보고 의심드는 점은 메모하라. 새로운 것을 배울 수도 있다.

- 본능에 귀를 기울이고 문제가 튀어나오기 전에 미리 대처하라.

#### Topic 38 우연에 맡기는 프로그래밍을 하지 말자.

- 행운과 우연한 성공에 의존하는 프로그래밍을 하지 말자. 대신 '의도적으로 프로그래밍' 해야 한다.

- 왜 코드가 망가졌는지 모르며, 애초에 코드가 왜 잘 돌아갔는지도 몰랐기 때문
- 가정하지 말고 증명하자 !
- 잘 되는 듯한 답을 찾는 것과 올바른 답을 찾는 것은 다르다.
- 확고한 사실에 근거하지 않은 가정은 어떤 프로젝트에서든 재앙의 근원이 된다.

## 의도적으로 프로그래밍하기

- 더 경험이 적은 프로그래머에게 코드를 상세히 설명할 수 있는가? 그렇지 않다면 아마 우연에 기대고 있는 것일 터이다.
- 자신도 잘 모르는 코드를 만들지 마라.
- 계획을 세우고 그것을 바탕으로 진행하라.
- 신뢰할 수 있는 것에만 기대고, 가정에 의존하지 말라. 무언가를 신뢰할 수 있을지 판단하기 어렵다면 일단 최악의 상황을 가정하라.
- 가정을 기록으로 남겨라
- 코드뿐 아니라 가정도 테스트해보라, 어떤 일이든 추측만 하지 말고 실제로 시험해봐야 한다.
- 노력을 기울일 대상의 우선순위를 정하라.
- 과거 코드의 노예가 되지 말고 과감하게 리팩토링하라.
- 어떤 것이 잘 돌아가는 듯이 보이기는 하는데 그 이유를 모를 경우 그것이 우연이 아닌지 반드시 확인하라.

## 알고리즘의 속도

- 코드의 실행시간이 얼마나 될지 또는 메모리를 얼마나 사용할지 확실하지 않다면 직접 실행해보라.
- 실제 서비스에서 실제 데이터로 돌아가는 코드의 수행 시간단만이 정말로 의미 있는 수치다.
- 성급환 최적화를 조심하라. 언제나 어떤 알고리즘을 개선하느라 여러분의 귀중한 시간을 투자하기 전에 그 알고리즘이 정말로 병목인지 먼저 확인하는 것이 좋다.

```
 개발자라면 알고리즘을 어떻게 설계하고 분석하는지에 대한 감각이 있어 야 한다. 로버트 세지윅Robert Sedgewick은 이 주제에 대해 쉽게 읽을 수 있는 책을 몇 권 썼다.《( 알고리즘》,《An Introduction to the Analysis of Algorithms(알고리즘 분석 입문)》) 여러분의 서가에 세 지윅의 책 가운데 한 권을 추가하고 반드시 읽기를 권한다.
```

## Topic 40 리팩터링

- 소프트웨어 개발은 건축보다 정원 가꾸기에 더 가깝다. 딱딱하기보다는 유기적인 활동이다.
- 어떤 루틴이 너무 크게 자라거나 너무 많은 것을 하려고 한다면 둘로 나눠야 하고, 계획대로 잘 되지 않는 것들은 잡초 제거하듯 뽑아내거나 가지치기를 해야 한다.
- 코드 고쳐쓰기, 다시 작업하기, 다시 아키텍처 만들기는 모두 아울러서 '재구성 restructuring' 이라고 부른다. 그런데 그런 활동 중 일부를 따로 떼어 '리팩터링 refactoring'이라는 이름을 실천한다.

- 리팩터링 : 밖으로 드러나는 동작은 그대로 유지한 채 내부 구조를 변경함으로써 이미 존재하는 코드를 재구성하는 체계적인 기법

1. 체계적으로 해야한다.
2. 기능을 추가하는 작업이 아니다. 밖으로 드러나는 동작은 바뀌지 않는다.

- 정원 가꾸기에 예를 들면 리팩터링은 잡초 제거나 갈퀴질처럼 위험하지 않은 작은 단계들을 밟는 일상 활동이다.
- 무질서하게 대규모로 코드를 다시 쓰는 것이 아니라, 정확한 목적을 가지고 정밀하게 접근하는 활동이다. 그래서 코드를 바꾸기 쉽게 유지하는 것이다.
- 코드가 더는 잘 맞지 않아서 장애물에 부딪혔을 때, 두 가지가 사실은 하나로 합쳐져 있어야 한다는 것을 발견했을 때, 무엇이든 '잘못' 되었다는 생각이 들 때가 있을 때,
- **주저하지 말고 변경하라** 언제나 바로 지금이 최적기다. 코드를 리팩터링할 이유는 아주 많다.

### 고통 관리

- 리팩터링이 필요한 코드를 일종의 '종양'이라고 생각하자. 종양을 제거하려면 수술이 필요하다. 지금 바로 수술해서 아직 종양이 작을 때 제거할 수도 있다. 아니면 종양이 자라고 다른 곳으로 전이할 때까지 놓아둘 수도 있다. 하지만 그때가 되면 제거하는 데 드는 비용도 더 늘어날뿐더러 위험도 훨씬 커진다.

### Tip 65 일직 리팩터링하고, 자주 리팩터링하라.

- 리팩터링의 본질은 재설계다.

1. 리팩터링과 기능 추가를 동시에 하지 말라.
2. 리팩터링을 시작하기 전 든든한 테스트가 있는지 먼저 확인하라. 할 수 있는 한 자주 테스트를 돌려보라
   탄탄한 회귀 테스트를 유지하는 것이야말로 안전한 리팩터링의 비결
3. 단계를 작게 나누어 신중하게 작업하라.

- 기대하는 수준에 못 미치는 코드는 발견하면, 고쳐라, 고통을 관리하라. 지금은 고통스러울지라도 앞으로 더욱 고통스러워질 것 같으면 지금 고치는 편이 낫다.
- `깨진 창문`을 그대로 놓아두지 말라.

### 테스트로 코딩하기

- 우리는 테스트의 주요한 이득이 테스트를 실행할 때가 아니라 테스트에 대해 생각하고 테스트를 작성할 때 생긴다고 믿는다.
- 즉, 무언가를 테스트하기 좋게 만들면 결합도도 낮아진다.
- 테스트 주도 개발 : Test Driven Development, TDD
  1. 추가하고 싶은 작은 기능 하나를 결정
  2. 그 기능이 구현되었을 때 통과하게 될 테스트를 하나 작성
  3. 테스트를 실행. 다른 테스트는 통과하고 방금 추가한 테스트 딱 하나만 실패해야 한다.
  4. 실패하는 테스트를 통과시킬 수 있는 최소한의 코드만 작성, 모든 테스트가 동과하는지 확인
  5. 코드 리팩터링

### Tip 68 End to End 를 만들어라.

- 소프트웨어를 만드는 유일한 방법은 점진적인 방법이다.
- 한쪽 끝과 다른 쪽 끝을 잇는 조그만 기능 조각들을 만들고, 그 과정에서 문제에 대하여 배워라.

#### 테스트, 설계, 코딩, 이 모든 것이 프로그래밍이다.

- 여러분의 소프트웨어를 테스트하라. 그렇지 않으면 사용자가 테스트하게 될 것이다.

### 속성 기반 테스트

- 속성 기반 테스트는 여러분이 코드를 불변식과 계약이라는 과점으로 바라보게 한다. 여러분이 무엇이 변하지 않아아야 하고, 어떤 조건을 만족해야 하는지 생각하게 된다. 이런 관점을 보면 코드에 마법과 같은 효과가 일어난다. 경계 조건을 줄어들고, 데이터의 일관성을 해치는 함수는 더 도드라진다.

### 기본 보안 원칙

1. 공격 표면을 최소화하라.

- 단순한 코드를 유지하라.

2. 최소 권한 원칙

- 시간과 권한 차원에서 굥격 매개체의 유효 범위를 줄여라. 권한은 적을 수록 낫다.

3. 안전한 기본값
4. 민감 정보는 암호화
5. 보안 업데이트

## 이름 짓기

- 변수나 함수의 역할을 고려하여 무엇이 특별한지, 무엇을 할 수 있는지, 무엇과 상호작용하는지를 생각하여 이름을 지어야 한다.
- 이름을 지을 때는 우리가 표현하고 싶은 것을 더 명확하게 다듬기 위해 끊임 없이 노력해야 한다. 이렇게 명확하게 다듬는 작업이 여러분이 코드를 작성할 때 코드를 더 잘 이애할 수 있도록 도울 것이다.

> 컴퓨터 과학에는 어려운 문제가 딱 두 개 있다. 캐시 무효화와 이름 짓기.

#### Tip74 이름을 잘 지어라. 필요하면 이름을 바꿔라 !

- 지나치게 일반적인 이름을 가진 함수나 메서드를 발견했다면 실제로 하는 일을 모두 반영하도록 이름을 바꿔 보라. 리팩터링하기 쉬워질 것이다.

# 읽고 느낀점

- 코딩은 아주 이성적이고 논리적인 활동인줄 알았는데 첫 번째 문단부터 본능에 기대어 보라는 얘기를 듣고 조금 의아했다. 읽다보니 의식을 뛰어넘는 무의식에 잠재력에 대해서 저자가 깨달은 바를 알려주는 것이었다. 뛰어난 생각들은 우리가 잠을 자거나 멍 때리다가 우연히 찾아오는 경우 많고, 본능적으로 위험한 순간을 직감해서 피해를 모면한 경험들 모두 해보았을 것이다. 저자는 코딩을 하는 과정에서도 때때로 무의식과 본능을 최대한 활용하여 우리가 미처 의식적으로 생각치 못한 부분에 대하여 우리 자신에게 되묻고 해답을 찾아보라는 이야기였다. 내 자신은 내가 가장 잘 안 다고 하지 않는가. 본능과 직감을 기반으로 사고의 수준을 넓혀보자!
- 코딩은 건축보다는 정원 가꾸기에 가깝다는 말은 기존에 가져온 개발에 대한 내 인식과는 달라 낯설었다. 어쩌면 하드웨어와 소프트웨어가 정반대의 속성을 가진 이름으로 불리는데는 분명 이유가 있는 것이었다. 정원 가꾸기는 무질서하고 중구난방으로 이뤄진다. 이거 해봤다가 아니면 뽑고 다른데 심어보고 때때로는 잡초 뽑는데에 하루를 다 소비하고 지켜만 볼 때도 있고 한 번에 잔뜩 심을 때도 있고 어떤 계획에 의해서 행해지긴 하지만 그 절차가 직선 방향이라기 보다는 빙글빙글 돌거나 마구잡이로 뻗어가는 나무가지에 가깝다고 볼 수 있다. 도식화하면 마인드맵과 같은? 이러한 소프트웨어 특성을 잘 이해하고 유연한 사고를 길러야 겠다고 생각했다.
- 프로토타이핑이란 것은 아이디어 샘플 테스트 같은 거라고 보면 될까. 하고 싶은 프로젝트를 최대한 간략화해서 먼저 실행해보며 아이디어를 구체화시키는 방법인 것 같다. 사실 코딩은 일단 해보는 것이 중요하다. 조금 개발을 배워보니 토이 프로젝트 하나를 실행하려고 하는데도 참 많은 의지력이 소모된다는 것을 느꼈다. 대체로 머릿속에서 해볼까 하는 생각에서 그만 끝나버리는 경우가 많다. 그 이유는 실패에 대한 두려움인 것 같다. 이 막연한 두려움으로 행동으로 옮기는데 필요한 실행력을 갉아먹는다. 모니터에 포스트잇으로 프로포토타입 중이라고 써붙여 놓는 건 실패해도 괜찮으니 1시간 아니 10분이라도 좋으니 그 문제에 대해 집중해서 생각해보자는 것을 상기시켜준다. 어쩌면 본 작업에서 겪어야 될 많은 문제들을 프로토타입 중에 해결할 수도 있다.
