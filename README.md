# <img src="https://github.com/user-attachments/assets/3cc5b90c-4d81-4f77-8b2e-1239ddd046f3" width="50" height="50">   패션 아이템 거래 플랫폼 README
![image](https://github.com/user-attachments/assets/9a3466ac-257e-455f-8a59-f92cfbf7ab3f)

- 시연 영상 : https://codyUs.shop

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

https://mysterious-experience-bf5.notion.site/055ecf8ba4de496381bd55043567e53b?v=12657459093d46e4ae85ff79beb4133a

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
- 협업 툴 : Notion, Figma, erdcloud
- 서비스 배포 환경 :  AWS RDS, EC2, Load Balancer, Route53, Github Action
<br>

## 작업 관리
- <img src="https://github.com/user-attachments/assets/50e1c8a0-119e-4e7f-b747-b4372e5e84f7" alt="image" width="50"/> Github PR을 통해 개발 작업을 관리하고 코드 리뷰를 진행하였습니다
- <img src="https://github.com/user-attachments/assets/63426993-84a7-4764-9cf5-3da6772ccf32" alt="image" width="50"/> Jira를 사용하여 역할 분담 및 프로젝트 진행 상황을 관리하였습니다


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

## 트러블 슈팅
<details>
    
<summary style="font-size: 1.5em; font-weight: bold;"> 🔎 이미지 업로드 S3 관련 ERR_CERT_COMMON_NAME_INVALID 오류 </summary>

### 문제

- 이미지처럼 게시글을 조회하는 페이지에서 `ERR_CERT_COMMON_NAME_INVALID` 오류가 발생
![image](https://github.com/user-attachments/assets/9257ea6d-bac3-45d8-9f52-0625636985f3)
![image](https://github.com/user-attachments/assets/7880a9f8-50f2-4831-b41b-96c4bc540a40)


### 원인

- 해당 오류 메세지와 함께 `S3` 에 저장하고 받은 url 링크를 조회한 이미지들에 엑스박스가 생겨서 s3 문제라고 인지를 했음. 구글링 결과 url 관련 문제임을 알게되었고, 기존 `Virtual Hosted-Style URL` 을 사용하여 `S3` 업로드를 했고 저장은 됐지만, `SSL`인증서 오류로 인해 조회가 되지 않았다는 것을 알게되었음. 기존에 사용하던 `Virtual Hosted-Style URL`에서 오류가 발생한 이유는 주로 `SSL`인증서와 도메인 이름의 불일치 때문이며, 우리가 사용하는 버킷 이름에 점(.) 이 있었기 때문에 발생한 오류였음.

### 해결

- `SSL`문제를 피하기 위해 선택한 url 스타일은 `Path-Style URL` 이었는데, 특징은 버킷 이름이 도메인의 일부가 아니기 때문에, `SSL` 문제를 피할 수 있음. 따라서 `Path-Style URL` 을 사용하여 해당 문제를 해결하였음.
    
</details>

<details>

<summary style="font-size: 1.5em; font-weight: bold;"> 🔎 `WebSocket STOMP` 시큐리티 토큰 인증 연결시 401 에러 </summary>

 ---

### 문제

- 클라이언트가 `SockJS`를 사용하여 `WebSocket`연결을 시도할 때 401 인증 에러가 발생.
- JWT 토큰은 정상적인 유효값임에도 불구하고 인증 실패.

### 원인

- **헤더 지원 부족**
    - `SockJS`는 기본적으로 `WebSocket`연결 시 HTTP 헤더를 설정하는 것을 지원하지 않음. 이로 인해 클라이언트에서 설정한 Authorization 헤더가 서버에 전달되지 않음.
- **서버 측 토큰 검증**
    - 서버 측에서 `WebSocket`핸드셰이크 요청을 처리할 때 `Authorization`헤더를 찾지 못해 인증에 실패함.

### 해결

- **Spring Security 설정**
    - `Spring Security` 설정에서 `WebSocket` 엔드포인트에 대한 접근을 허용합니다. 이를 위해 `permitAll()` 메서드를 사용하여 인증 없이 접근할 수 있도록 설정
- **STOMP 핸들러에서 토큰 검증**
    - `WebSocket` 연결 후 헤더에서 `JWT`토큰을 추출하여 토큰을 검증

        ![image](https://github.com/user-attachments/assets/226e7535-ab29-4581-a8a4-d03cd679b293)
        
- **STOMP 메시지를 전송할 때 토큰을 메시지 본문에 포함하여 전송**
    - 클라이언트에서 메시지 페이로드에 전송하면 서버측에서 토큰을 추출하여 검증 성공하면 메시지를 처리하고 실패하면 Throw 처리

      ![image](https://github.com/user-attachments/assets/c7abf875-5f37-4b11-b63c-4e2782c9323a)

    
</details>

<br>

## 프로젝트 후기

### ![image](https://github.com/user-attachments/assets/31aeb898-7e09-4acf-a963-486710499996) 최연환

-

<br>

### ![image](https://github.com/user-attachments/assets/083e9df2-f7ec-4ed4-92cc-2a651f1d1db8) 장재현

-

<br>

### ![image](https://github.com/user-attachments/assets/8a1ccc66-cbae-40c2-b2a8-ba273150c83a) 김지수

- 이번 프로젝트를 통해 프론트엔드와 백엔드의 통합, 효율적인 데이터베이스 설계, 실시간 기능 구현 등 다양한 기술을 배우고 적용할 수 있었습니다. 
이러한 경험을 통해 문제 해결 능력이 향상되었고 개발 역량을 한층 더 발전시킬 수 있었습니다.

<br>

### ![image](https://github.com/user-attachments/assets/5420f83c-3e2e-4b59-b37c-7e19deb08878) 윤일영

-
