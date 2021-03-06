_2022.03.20_

> # Ch2 실용주의 접근법

> ## 오늘 TIL 3줄 요약

-   좋은 설계는 ETC / DRY / 직교성 에서 시작한다.
-   바꾸기 쉬운 코드를 작성하여 아키텍처, 배포, 외부 제품과의 통합 영역을 유연하게 유지하라.
-   예광탄 / 프로토타입 개발 방법을 이용하면 개발 방향이나 예상되는 위험 요소를 미리 쉽고 빠르게 파악할 수 있다.

> ## 책에서 기억하고 싶은 내용을 써보세요.

-   DRY 원칙은 시스템 내부의 중복을 최소화하고, 직교성은 시스템 컴포넌트 간의 상호 의존도를 줄인다.
-   DRY 원칙, 결합도 줄이기, 외부 설정 사용하기 방법론을 잘 따르면 중요하면서도 되돌릴 수 없는 결정의 수를 가능한 한 줄일 수 있다.
-   예광탄 개발법 : 최소한의 구조를 가지고 전체 기능을 표현한 코드를 만들어 테스트해보며 통합하고 완성해나가는 점진적인 개발 방법

> ## 오늘 읽은 소감은? 떠오르는 생각을 가볍게 적어보세요.

-   ETC / DRY / 직교성 법칙을 잘 숙지하여 실천하자.
-   내가 쓴 코드를 비판적이고 분석적으로 바라보는 습관을 기르자.
-   개발 계획 -> 단위 테스트 -> 버그 수정 -> 리팩토링 -> 문서화를 생활화하자.

### Topic 8 좋은 설계의 핵심

-   좋은 설계는 나쁜 설계보다 바꾸기 쉽다. **ETC: Easier to Change**
-   교체 가능하게 작성하라는 말은 코드의 결합도를 낮추고 응집도를 높이라는 이야기

### Topic 9 DRY : 중복의 해악

-   **Don't Repeat Yourself**
-   모든 지식은 시스템 내에서 단 한 번만, 애매하지 않고, 권위 있게 표현되어야 한다.
-   DRY는 지식의 중복, 의도의 중복에 대한 것이다. 똑같은 개념을 다른 곳 두 군데에서 표현하면 안 된다는 것이다. 경우에 따라서는 중복 표현이 두 가지 완전히 다른 방식으로 이루어질 수도 있다.

#### 표현상의 중복

-   API 중복을 해결하는 방법
    1. 내부 API : 중앙 저장소에 넣어 두고 공유
    2. 외부 API : 공개 API를 OpenAPI 같은 형식으로 엄밀하게 문서화
-   데이터 저장소와의 중복 :
    -   스키마를 이용하여 데이터 생성 - 영속성 프레임 워크 이용

#### 개발자간의 중복

-   의사소통을 잘하는 튼튼하고 유대가 돈독한 팀을 만들어야 한다.

#### 재사용하기 쉽게 만들어라

### Topic 10 직교성

-   관련이 없는 것들 간에 서로 영향이 없도록 하라.
-   단일하고 잘 정의된 목적을 가진 독립적인 컴포넌트
-   직교적인 시스템은 생산성을 향상시키고 리스크를 감소시킨다.
-   시스템은 서로 협력하는 모듈의 집합으로 구성되어야 한다.
-   계층 구조는 직교적 시스템을 설계하는 강력한 방법
-   각 계층은 자기 바로 밑에 있는 계층이 제공하는 추상화만을 사용하기 때문에, 다른 코드에 영향을 끼치지 않으면서 기반 구현들을 변경할 수 있게 되어 유연성이 높아진다.
-   계층 구조는 또한 모듈 간에 의존성이 폭증할 위험을 줄인다.
-   설계가 직교적인지 확인하는 방법 : 컴포넌트를 나누엇을 때 특정 기능에 대한 요구 사항을 대폭 변경하는 경우 몇 개의 모듈이 영향을 받는가?
    -   직교적인 시스템의 경우 '하나' 여야 한다.
-   **자신의 힘으로 제어할 수 없는 속성에 의존하지 말라.**
-   외부에서 만든 툴킷이나 라이브러리를 도입할 때 시스템의 직교성을 해치지 않는지 주의 깊게 살펴볼 것

#### 코딩시 직교성을 유지하는 팁

1. 코드의 결합도를 줄여라
    - 불필요한 것은 다른 모듈에 보여주지 않으며, 다른 모듈의 구현에 의존하지 않는 코드를 작성하라
2. 전역 데이터를 피하라
    - 코드가 전역 데이터를 참조할 때마다 코드는 해당 데이터를 공유하는 다른 컴포넌트와 묶이게 된다.
3. 유사한 함수를 피하라
    - 시작과 끝에서는 동일한 코드를 사용하지만 중간의 알고리즘이 다른 유사 함수는 중복 코드다. 전략 패턴을 사용하여 더 낫게 구현할 수 없는지 고민하라.

**자신이 작성하는 코드를 항상 비판적으로 바라보는 습관을 길러라**

#### 관련 없는 것들 간에 서로 영향이 없도록 하라.

#### 테스트

-   직교적으로 설계하고 구현한 시스템은 테스트하기 더 쉽다.
-   단위 테스트 / 버그 수정을 통하여 직교성을 테스트하라

#### 문서화

-   내용과 표현이라는 두 개의 축으로 직교성을 가진 문서를 작성해보자.

#### DRY + 직교성

-   DRY 원칙은 시스템 내부의 중복을 최소화하고, 직교성은 시스템 컴포넌트 간의 상호 의존도를 줄인다.
-   DRY 원칙으로 무장하고 직교성 원칙을 충실히 적용한다면 개발하고 있는 시스템이 더 유연하고 이해하기 쉬워질 것이다.
-   디버깅, 테스트, 유지 보수 또한 쉬워질 것이다.

#### Topic 11 가역성

-   무언가를 구현하는 데는 항상 여러 가지 길이 있다. 이 때문에 어떤 방법도 100프로 맞다고 볼 수 없다.
-   DRY 원칙, 결합도 줄이기, 외부 설정 사용하기 방법론을 잘 따르면 중요하면서도 되돌릴 수 없는 결정의 수를 가능한 한 줄일 수 있다.
-   되돌릴 수 없는 결정을 줄여야 하는 까닭은 우리가 프로젝트 초기에 늘 최선의 결정을 내리지는 못하기 때문이다.
-   기술 개념을 올바르게 추상화하여 영속성을 하나의 서비스로 제공하도록 만들었다면 달리는 도중에 말을 갈아탈 수 있는 유연성이 생긴다.
-   기술 트랜드는 계속 바뀌고 우리가 할 수 있는 것은 유행을 쫓지 말고 어떤 기술에도 적용 가능하도록 최대한 유연하게 만들어라.

#### Topic 12 예광탄

-   예광탄 개발 : 최소한의 구조를 가지고 전체 기능을 표현한 코드를 가지고 테스트해보며 통합하고 완성해나가는 점진적인 개발 방법
    -   요구 사항으로부터 최종 시스템의 일부 측면까지 빨리 눈에 보이게 반복적으로 도달하게 해줄 수 있음
    -   목표를 정확하게 타겟팅 할 수 있고 전체 흐름을 파악할 수 있음
-   예광탄이 언제나 목표물을 맞히는 것은 아니다 최대한 목표치에 근접하도록 계속 쏘아보면 된다.
-   프로토타입은 나중에 버리는 코드를 만들지만 예광탄 코드는 기능은 별로 없지만 완결된 코드이며 최종 시스템 골격 중 일부가 된다.
-   프로토타입은 예광탄을 발사하기 전에 먼저 수행하는 정찰이나 정보 수집과 같은 것이다.

#### Topic 13 프로토타입과 포스트잇

-   소프트웨어 프로토타입은 위험 요소를 분석하고 매우 저렴한 비용으로 바로 잡을 기회를 준다.
-   포스트잇은 작업 흐름이나 애플리케이션 로직과 같이 동적인 것을 프로토타이핑할 수 있는 훌륭한 도구다.
-   사용자 인터페이스 프로토타입은 화이트보드에 그림을 그려도 되고 그림판 / 인퍼테이스 빌더 등을 이용해 기능을 구현하지 않고 만들어 볼 수도 있다.
-   프로토타이핑은 학습 경험이다. 이를 통해 배우는데 그 가치가 있다.
-   프로토타입을 만들 때 무시해야할 세부 사항 : 정확성, 완전성, 안정성, 스타일
-   프로토타이핑의 목적은 전체적으로 시스템이 어떻게 동작할지에 대해 감을 잡는 것이다.

#### Topic 14

"언어의 한계가 곧 자기 세계의 한계다."

-   문제 도메인에 가깝게 프로그래밍 하라.
-   궁극적으로 어떤 형태로 만들더라도 호스트 언어와 문법을 벗어날 수 없다.
-   기본적으로 가능하다면 YAML / JSON / CSV 처럼 널리 통용되는 외부 언어를 사용하라.

#### Topic 15 추정

-   추정치 산출 과정을 통해 프로그램을 좀더 잘 이해할 수 있다.
-   추정하는 법을 배우고 추정 능력을 개발하여 무언가의 규모를 직관적으로 짚을 정도가 되면, 추정 대상의 가능성을 가늠하는 마법과 같은 능력을 발휘할 수 있게 될 것이다.
-   코드와 함께 일정도 반복하며 조정하라.

> ## 궁금한 내용이 있거나, 잘 이해되지 않는 내용이 있다면 적어보세요.

-   YAML을 사용한 앤서블?
-   PARSING ? PARSER ?

> ## 용어 정리

-   직교성 orthogonality : 설계와 빌드, 테스트, 확장이 쉬운 시스템을 만드는 데에 있어 중요한 개념 :
    -   모듈식, 컴포넌트 기반, 계층
    -   기하학에서 그래프의 축과 같이 두 직선이 직각으로 만나는 경우 직교한다고 말한다. 벡터 용어로 보면 두 개의 선은 독립적이다.
    -   컴퓨터 과학에서 이 용어는 일종의 독립성이나 결합도 줄이기 `decoupling` 을 의미 한다.
    -   하나가 바뀌어도 나머지에 어떤 영향도 주지 않으면서 서로 직교한다.
    -   잘 설계된 시스템에서는 데이터베이스 코드가 사용자 인터페이스와 서로 직교할 것이다.
-   YAML : XML, C, 파이썬, 펄, RFC2822에서 정의된 e-mail 양식에서 개념을 얻어 만들어진 '사람이 쉽게 읽을 수 있는' 데이터 직렬화 양식이다.

-   Parsing과 Parser

    1. Parsign : 어떤 데이터를 원하는 모양으로 만들어 내는걸 말한다.

        - 특정문서(XML 따위)를 읽어 들여서 이를 다른 프로그램이나 서브루틴이 사용할 수 있는 내부 의 표현 방식으로 변환시켜 주는 것이다. XML 문서를 보시면 HTML처럼 <>태그가 보일 것입니다. 사용자가 이렇게 입력하지만 컴터가 알아 볼 수 있도록 바꿔주는 과정을 의미합니다.
        - 컴파일러의 일부로써 원시 프로그램의 명령문이나 온라인 명령문, HTML 문서등에서 마크업태그등을 입력으로 받아들여서 구문을 해석 할 수 있는 단위로 여러 부분으로 분할해 주는 역할을 한다.

    2. Parser :
        - 파서는 파싱을 하는 프로세서를 파서라고 부립니다. 즉, 파서가 파싱 작업을 하는 것.
        - 파서(parser)란 컴파일러의 일부로서 원시 프로그램즉, 컴퍼일러나 인터프리터에서 원시 프로그램을 읽어 들여, 그문장의 구조를 알아내는 구문 분석(parsing)을 행하는 프로그램을 말한다.

-   가역성 (可逆性 / reversibility)은 반응 시 초기 상황으로 되돌아올 수 있는지의 여부를 일컫는 말이다. 가능하면 가역, 불가능한 것을 비가역이라고 한다.
