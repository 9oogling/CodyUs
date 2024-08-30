# <img src="https://github.com/user-attachments/assets/3cc5b90c-4d81-4f77-8b2e-1239ddd046f3" width="50" height="50">   패션 아이템 거래 플랫폼 README
![image](https://github.com/user-attachments/assets/9a3466ac-257e-455f-8a59-f92cfbf7ab3f)

- 배포 URL : https://codyUs.shop

<br>

## 프로젝트 소개


### 🗓️ 개발 기간( 2024. 07. 19 ~ 2024. 08. 21 ) 

- 중고 의류와 새 패션 아이템을 쉽고 편리하게 사고팔 수 있는 플랫폼입니다.
- 판매자는 자신만의 스타일을 표현할 수 있도록 아이템을 올리고 각 스타일에 대해 개별 실시간 채팅이 가능하게 만들어 사용자 간의 직접적인 소통을 지원합니다. 
- 이를 통해 판매자와 구매자는 특정 스타일에 대해 더 자세히 논의하고 거래를 원활하게 진행할 수 있습니다. 

<details>
<summary style="font-size: 1.5em; font-weight: bold;"> 🔎 서비스 아키텍처 </summary>

---

![image](https://github.com/user-attachments/assets/f36c71a1-3bcc-455d-9b4a-672e5cfea2ae)

</details>

<details>
<summary style="font-size: 1.5em; font-weight: bold;"> 🔎 ERD </summary>

---
    
![image](https://github.com/user-attachments/assets/5b04f7bb-1006-4fbe-8dc9-4f9e4f8e276b)

</details>

<details>
<summary style="font-size: 1.5em; font-weight: bold;"> 🔎 와이어 프레임 </summary>

---

![image](https://github.com/user-attachments/assets/39fd4597-681f-4c79-9431-d74c818d1e21)

</details>

<details>
<summary style="font-size: 1.5em; font-weight: bold;"> 🔎 API 명세서 </summary>
    [API명세서.pdf](https://github.com/user-attachments/files/16809101/API.pdf)
---

</details>

<br>

## 팀원 구성 (백엔드 4 명)

<div align="center">
    
![image](https://github.com/user-attachments/assets/d825e580-12ec-4fea-b9c1-836098258b2c)


</div>

<br>


## 🛠️ 개발 환경

- Front : HTML, CSS, JavaScript, Thymeleaf
- Back-end : Spring Boot, JPA, Spring Security, QueryDSL, MySQL, S3, WebSocket, STOMP, OAuth2.0
- 버전 및 이슈관리 : Github, Jira
- 협업 툴 : Notion
- 서비스 배포 환경 :  AWS RDS, EC2, Load Balancer
<br>

## 채택한 개발 기술과 브랜치 전략
### Spring Boot 3.3.1
- 최신 기술 지원
Spring Boot 3.x는 최신 Spring 프레임워크의 기능을 지원합니다.
Spring Boot 3.3.1은 Spring Framework 6.x와 함께 동작하며 최신 Java 버전 (Java 17 이상)을 지원하여 최신 JDK의 기능을 활용할 수 있습니다.

- 향상된 성능 및 보안
Spring Boot 3.x는 성능과 보안 측면에서 개선된 기능을 제공합니다. 
개선된 메모리 관리, 최신 보안 패치 및 최적화된 성능을 통해 더 안정적이고 안전한 애플리케이션을 구축할 수 있습니다.

- 버전 호환성
Spring Boot 3.x는 Spring Framework 6.x와 호환되며 이는 더 강력한 기능을 제공하고 장기적으로 유지보수에 유리합니다. 
2.x 버전은 더 이상 지원되지 않는 구형 라이브러리와의 호환성 문제를 피할 수 있습니다.

- 기술 스택의 최신화
최신 기술 스택을 사용하는 것은 최신의 개선된 기능을 활용할 수 있게 해주며 유지보수와 커뮤니티 지원 측면에서도 유리합니다.

### JDK 17
Java 17부터 사용 가능한 최신 기능과 성능 향상을 지원합니다. 
Spring Boot 3.x와 호환되는 LTS 버전이므로 Java 17을 사용하는 것이 최적의 선택입니다.

### JPA
- 객체-관계 매핑(ORM) 지원
JPA는 객체와 데이터베이스 테이블 간의 매핑을 자동으로 처리하여 개발 생산성을 높이고 코드의 유지보수를 용이하게 합니다.

- 자동화된 데이터 관리
엔티티 상태 관리 및 트랜잭션 관리를 자동으로 처리하여 복잡한 데이터베이스 작업을 간소화합니다.

### Spring Security
- 강력한 보안 기능
Spring Security는 인증 및 권한 부여 기능을 제공하여 애플리케이션의 보안을 강화합니다. 
- 유연한 설정
Spring Security는 다양한 보안 요구사항을 충족할 수 있는 유연한 설정과 커스터마이징을 지원합니다.

### QueryDSL
- 타입 안전한 쿼리 작성
QueryDSL은 타입 안전한 SQL 쿼리를 작성할 수 있도록 지원하며, 코드의 가독성과 유지보수성을 향상시킵니다.

- 간편한 쿼리 작성
복잡한 SQL 쿼리 작성 시, QueryDSL은 코드 자동 완성 및 오류를 사전에 방지할 수 있는 기능을 제공합니다.

### MySQL
- 성숙한 데이터베이스
MySQL은 널리 사용되는 오픈 소스 데이터베이스로 성숙한 생태계와 신뢰성을 제공합니다.

- 높은 성능과 확장성
성능이 뛰어나고 대규모 데이터와 트래픽을 효과적으로 처리할 수 있습니다.

### S3
- 안전하고 확장 가능한 스토리지
Amazon S3는 안정적이고 확장 가능한 객체 스토리지 서비스로 대용량 파일 저장과 관리를 용이하게 합니다.

- AWS 통합
AWS 생태계와 원활하게 통합되어 다양한 AWS 서비스와 함께 사용할 수 있습니다.

### WebSocket
- 실시간 양방향 통신
WebSocket은 클라이언트와 서버 간의 실시간 양방향 통신을 지원하여 실시간 애플리케이션 구현에 적합합니다.

- 낮은 지연 시간
저지연 실시간 통신을 통해 빠른 반응 속도를 제공합니다.

### STOMP
- 실시간 메시징 프로토콜
STOMP는 WebSocket과 함께 사용하여 효율적인 실시간 메시징을 지원합니다.

- 높은 호환성
STOMP는 다양한 메시징 시스템과 호환되며 실시간 애플리케이션의 요구 사항을 충족할 수 있습니다.

### OAuth2.0
- 표준화된 인증 및 권한 부여
OAuth2.0은 인증과 권한 부여를 위한 표준 프로토콜로 안전하고 유연한 인증 솔루션을 제공합니다.

- 다양한 인증 옵션
다양한 인증 방식과 토큰 관리를 지원하여 애플리케이션의 보안 요구 사항에 맞출 수 있습니다.


### 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
    - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
    - **Feat** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.

<br>

## 프로젝트 구조
<details>
    <summary style="font-size: 1.5em; font-weight: bold;"> 🔎 프로젝트 구조 </summary>

---

```
src
└── main
    ├── generated
    ├── java
    │   └── codyus
    │       ├── domain
    │       │   ├── admin
    │       │   │   ├── chatting
    │       │   │   │   ├── controller
    │       │   │   │   ├── dto
    │       │   │   │   ├── entity
    │       │   │   │   ├── repository
    │       │   │   │   └── service
    │       │   ├── like
    │       │   ├── oauth
    │       │   ├── post
    │       │   │   ├── controller
    │       │   │   ├── dto
    │       │   │   ├── entity
    │       │   │   ├── repository
    │       │   │   └── service
    │       │   │       └── PostService
    │       │   ├── user
    │       │   └── global
    │       ├── upload
    │       ├── CodyUsApplication
    │       └── HomeController
    ├── resources
    │   ├── static
    │   │   ├── css
    │   │   ├── images
    │   │   └── js
    │   ├── templates
    │   ├── application.properties
    │   └── application-secrets.properties
```
</details>
<br>

## 신경 쓴 부분

<br>

## 트러블 슈팅

<br>

## 개선 목표

-
    
<br>

## 프로젝트 후기

### 🍊 최연환

<br>

### 👻 장재현

<br>

### 😎 김지수

<br>

### 🐬 윤일영
