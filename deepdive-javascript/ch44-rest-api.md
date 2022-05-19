# DeepDive JS Ch.44 REST API

- REST 는 HTTP 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처
- REST API 는 REST를 기반으로 서비스 API를 구현한 것을 의미

## 44.1 REST API 구성

- REST API는 `자원` / `행위` / `표현` 3가지 요소로 구성

| 구성 요소            | 내용                           | 표현 방법        |
| -------------------- | ------------------------------ | ---------------- |
| 자원 resource        | 자원                           | URI(엔드포인트)  |
| 행위 verb            | 자원에 대한 행위               | HTTP 요청 메서드 |
| 표현 representations | 자원에 대한 행위의 구체적 내용 | 페이로드         |

## 44.2 REST API 설계 원칙

- RESTful API를 설계하는 기본 원칙
  1. URI는 리소스를 표현하는데 집중
  2. 행위에 대한 정의는 HTTP 요청 메서드를 통해 하는 것

1. URI는 리소스를 표현해야 한다.

- 동사보다는 명사를 사용 (get 과 같은 행위에 대한 표현이 들어가서는 안됨)

```
# bad
GET /getTodos/1
GET /todos/show/1

# good
GET /todos/1
```

2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.

- HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법

- 리소스에 대한 행위는 HTTP 요청 메서드를 통해 표현하여 URI 표현하지 않는다.

```
# bad
GET /todos/delete/1

# good
DELETE /todos/1
```

- REST API 말고 GraphQL 을 쓰자!
