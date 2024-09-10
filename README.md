# <img src="https://github.com/user-attachments/assets/3cc5b90c-4d81-4f77-8b2e-1239ddd046f3" width="30" height="30"> &nbsp; 패션 아이템 거래 플랫폼 &nbsp;|&nbsp; CodyUs
![CodyUsPPT](https://github.com/user-attachments/assets/bcf55271-fcaf-4b0d-8bb3-ddc540229e6c)


- 시연 영상 : https://codyUs.shop

<br>

## ✏️ 목차
* [🏷️ &nbsp; 프로젝트 소개](#a)

* [📆 &nbsp; 개발 기간](#b)

* [🖇️ &nbsp; 팀 구성](#c)

* [🛠️ &nbsp; 개발 환경](#d)

* [💻 &nbsp; 작업 관리](#e)

* [💡 &nbsp; 채택한 개발 기술과 브랜치 전략](#f)

* [🔗 &nbsp; 프로젝트 구조](#g)

* [🔋 &nbsp; 트러블 슈팅](#h)

* [✅ &nbsp; 프로젝트 후기](#i)

<br>

<div id="a">

## 🏷️ &nbsp; 프로젝트 소개
**일상 코디와 스타일링을 공유하는 패션 아이템 거래 플랫폼 개발 프로젝트.**
<br>
사용자들이 자신의 스타일을 공유하고 서로 참고할 수 있으며, 실시간 채팅을 통해 새 상품 및 중고 상품 거래가 이루어지는 웹 사이트입니다. 

<br>

<details>
<summary style="font-size: 1.5em; font-weight: bold;"> &nbsp; 서비스 아키텍처 </summary>

---

![image](https://github.com/user-attachments/assets/f36c71a1-3bcc-455d-9b4a-672e5cfea2ae)

</details>

<details>
<summary style="font-size: 1.5em; font-weight: bold;"> &nbsp; ERD </summary>

---
    
![image](https://github.com/user-attachments/assets/5b04f7bb-1006-4fbe-8dc9-4f9e4f8e276b)

</details>

<details>
<summary style="font-size: 1.5em; font-weight: bold;"> &nbsp; 와이어 프레임 </summary>

---

<img width="1289" alt="스크린샷 2024-09-10 오후 5 32 49" src="https://github.com/user-attachments/assets/dc079c91-bcf8-4254-80e5-ff77a372f346">

</details>

<details>
<summary style="font-size: 1.5em; font-weight: bold;"> &nbsp; API 명세서 </summary>

https://mysterious-experience-bf5.notion.site/055ecf8ba4de496381bd55043567e53b?v=12657459093d46e4ae85ff79beb4133a

</details>

<br>

<div id="b">

## 📆 &nbsp; 개발 기간
* 2024.07.19 - 2024.08.21 (5주)

<br>

<div id="c">

## 🖇️ &nbsp; 팀 구성 (Back-End 4명)

| 최연환 [리더]                         | 장재현 [부리더]                         | 김지수                         | 윤일영                         |
|-------------------------------|-------------------------------|-------------------------------|-------------------------------|
| [![최연환](https://github.com/nenney.png)](https://github.com/nenney) | [![장재현](https://github.com/JangJaehyeonn.png)](https://github.com/JangJaehyeonn) | [![김지수](https://github.com/jisu9169.png)](https://github.com/jisu9169) | [![윤일영](https://github.com/1004102.png)](https://github.com/1004102) |
| - 사용자 기능 <br> - 인증 / 인가 | - 게시글 CRUD <br> - 검색 | - 실시간 채팅 | - 파일 업로드 <br> - 디자인 관련

<br>

<div id="d">

## 🛠️ &nbsp; 개발 환경
### Front-End <br>
![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white) &nbsp; ![CSS](https://img.shields.io/badge/CSS-01B4E4?&style=for-the-badge&logo=css3&logoColor=white) &nbsp; ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white) &nbsp; ![Thymeleaf](https://img.shields.io/badge/Thymeleaf-005F0F?style=for-the-badge&logo=Thymeleaf&logoColor=white)
### Back-End <br>
![Spring Boot](https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) &nbsp; ![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=Spring-Security&logoColor=white) &nbsp; ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) &nbsp; ![S3](https://img.shields.io/badge/amazons3-F45E3F?style=for-the-badge&logo=amazons3&logoColor=white) &nbsp; JPA &nbsp; QueryDSL &nbsp; WebSocket &nbsp; STOMP &nbsp; OAuth2.0
### 협업 툴 <br>
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) &nbsp; ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)  &nbsp; ![slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) &nbsp; erdcloud &nbsp; Zep
### 서비스 배포 환경 <br>
![AWS RDS](https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white) &nbsp; ![EC2](https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white) &nbsp; ![Load Balancer](https://img.shields.io/badge/awselasticloadbalancing-22314E?style=for-the-badge&logo=awselasticloadbalancing&logoColor=white) &nbsp; ![Route53](https://img.shields.io/badge/amazonroute53-8C4FFF?style=for-the-badge&logo=amazonroute53&logoColor=white) &nbsp; ![Github Action](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
  
<br>

<div id="e">

## 💻 &nbsp; 작업 관리
### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566899596/noticon/slhw4nu8hybreryigopq.png" alt="image" width="25"/> &nbsp; Github <br>
- Github PR을 통해 개발 작업을 관리하고 코드 리뷰를 진행하였습니다.
### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1676966453/noticon/gdq4xi8msuhfqfiwypam.png" alt="image" width="20"/> &nbsp; Jira <br>
- Jira를 사용하여 역할 분담 및 프로젝트 진행 상황을 관리하였습니다.

<br>

<div id="f">

## 💡 &nbsp; 채택한 개발 기술과 브랜치 전략
### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1583139874/noticon/dri6ny863om8qxtics4i.png" alt="image" width="20"/> &nbsp; Spring Boot 3.3.1
- **최신 기술 지원** : <br>
Spring Boot 3.x는 최신 Spring 프레임워크의 기능을 지원합니다. <br>
Spring Boot 3.3.1은 Spring Framework 6.x와 함께 동작하며 최신 Java 버전 (Java 17 이상)을 지원하여 최신 JDK의 기능을 활용할 수 있습니다. <br>
- **향상된 성능 및 보안** : <br>
Spring Boot 3.x는 성능과 보안 측면에서 개선된 기능을 제공합니다. <br>
개선된 메모리 관리, 최신 보안 패치 및 최적화된 성능을 통해 더 안정적이고 안전한 애플리케이션을 구축할 수 있습니다. <br>

- **버전 호환성** : <br>
Spring Boot 3.x는 Spring Framework 6.x와 호환되며 이는 더 강력한 기능을 제공하고 장기적으로 유지보수에 유리합니다. <br>
2.x 버전은 더 이상 지원되지 않는 구형 라이브러리와의 호환성 문제를 피할 수 있습니다. <br>

- **기술 스택의 최신화** : <br>
최신 기술 스택을 사용하는 것은 최신의 개선된 기능을 활용할 수 있게 해주며 유지보수와 커뮤니티 지원 측면에서도 유리합니다.

<br>

### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1629972500/noticon/htwpjnfc0hlr1teypbjo.png" alt="image" width="20"/> &nbsp; JDK 17

- Java 17부터 사용 가능한 최신 기능과 성능 향상을 지원합니다.
- Spring Boot 3.x와 호환되는 LTS 버전이므로 Java 17을 사용하는 것이 최적의 선택입니다.

<br>

### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1687307488/noticon/o9lxyva5z8zbwyeaxers.png" alt="image" width="20"/> &nbsp; JPA

- **객체-관계 매핑(ORM) 지원** : <br>
JPA는 객체와 데이터베이스 테이블 간의 매핑을 자동으로 처리하여 개발 생산성을 높이고 코드의 유지보수를 용이하게 합니다.

- **자동화된 데이터 관리** : <br>
엔티티 상태 관리 및 트랜잭션 관리를 자동으로 처리하여 복잡한 데이터베이스 작업을 간소화합니다.

<br>

### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1692240119/noticon/hpchnwrovjwntosnz5ag.png" alt="image" width="20"/> &nbsp; Spring Security
- **강력한 보안 기능** : <br>
Spring Security는 인증 및 권한 부여 기능을 제공하여 애플리케이션의 보안을 강화합니다. <br>

- **유연한 설정** : <br>
Spring Security는 다양한 보안 요구사항을 충족할 수 있는 유연한 설정과 커스터마이징을 지원합니다.

<br>

### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1621236120/noticon/v3pcpusajohadldxvm7k.png" alt="image" width="20"/> &nbsp; QueryDSL
- **타입 안전한 쿼리 작성** : <br>
QueryDSL은 타입 안전한 SQL 쿼리를 작성할 수 있도록 지원하며, 코드의 가독성과 유지보수성을 향상시킵니다. <br>

- **간편한 쿼리 작성** : <br>
복잡한 SQL 쿼리 작성 시, QueryDSL은 코드 자동 완성 및 오류를 사전에 방지할 수 있는 기능을 제공합니다.

<br>

### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913591/noticon/e2bd9zw78n6zw6his4bd.png" alt="image" width="20"/> &nbsp; MySQL
- **성숙한 데이터베이스** : <br>
MySQL은 널리 사용되는 오픈 소스 데이터베이스로 성숙한 생태계와 신뢰성을 제공합니다. <br>

- **높은 성능과 확장성** : <br>
성능이 뛰어나고 대규모 데이터와 트래픽을 효과적으로 처리할 수 있습니다.

<br>

### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567064876/noticon/sb5llmvfubuceldbkmx8.png" alt="image" width="20"/> &nbsp; S3
- **안전하고 확장 가능한 스토리지** : <br>
Amazon S3는 안정적이고 확장 가능한 객체 스토리지 서비스로 대용량 파일 저장과 관리를 용이하게 합니다. <br>

- **AWS 통합** : <br>
AWS 생태계와 원활하게 통합되어 다양한 AWS 서비스와 함께 사용할 수 있습니다.

<br>

### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1706767600/noticon/wgnyqnxpipdacnvwwbcn.png" alt="image" width="20"/> &nbsp; WebSocket
- **실시간 양방향 통신** : <br>
WebSocket은 클라이언트와 서버 간의 실시간 양방향 통신을 지원하여 실시간 애플리케이션 구현에 적합합니다. <br>

- **낮은 지연 시간** : <br>
저지연 실시간 통신을 통해 빠른 반응 속도를 제공합니다.

<br>

 ### STOMP
- **실시간 메시징 프로토콜** : <br>
STOMP는 WebSocket과 함께 사용하여 효율적인 실시간 메시징을 지원합니다. <br>

- **높은 호환성** : <br>
STOMP는 다양한 메시징 시스템과 호환되며 실시간 애플리케이션의 요구 사항을 충족할 수 있습니다.

<br>

### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566912632/noticon/konazfwbuwdnn43mcqux.png" alt="image" width="20"/> &nbsp; OAuth2.0
- **표준화된 인증 및 권한 부여** : <br>
OAuth2.0은 인증과 권한 부여를 위한 표준 프로토콜로 안전하고 유연한 인증 솔루션을 제공합니다. <br>

- **다양한 인증 옵션** : <br>
다양한 인증 방식과 토큰 관리를 지원하여 애플리케이션의 보안 요구 사항에 맞출 수 있습니다.

<br>

### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1592435734/noticon/ovcserf615eo3sbcbv8b.png" alt="image" width="20"/> &nbsp; Thymeleaf
- **Spring Boot 와의 호환성** : <br>
Spring Boot 와의 호환성 덕분에 설정 및 사용이 간단하고, Spring의 의존성 주입 및 보안 기능을 그대로 사용할 수 있습니다. <br>

- **서버 사이드 렌더링(SSR) 지원** : <br>
SEO 에 대한 추가 작업이 필요하지 않습니다. <br>

- **복잡도가 낮은 프로젝트에 적합** : <br>
복잡도가 낮은 저희 프로젝트에는 React 나 Vue 와 같은 프레임워크를 사용하기보다는 <br>
Learning Curve 가 낮은 Thymeleaf 를 사용하는 편이 더 적합합니다.

<br>

### <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566777755/noticon/yfmwxv8nhnr5aqaxhxpg.png" alt="image" width="20"/> &nbsp; AWS
- **다양한 서비스와의 통합** : <br>
AWS는 S3, RDS, EC2, Route53 등 다양한 서비스를 제공하며, <br>
이러한 서비스들을 쉽게 통합할 수 있어 프로젝트의 요구사항에 따라 쉽게 추가할 수 있습니다. <br>

- **높은 가용성과 안정성** : <br>
글로벌 인프라를 통해 높은 가용성과 안정성을 제공합니다. <br>

- **비용 효율성** : <br>
AWS는 사용한 만큼만 비용을 지불하는 유연한 요금제를 제공합니다.

<br>

### 🗒️ &nbsp; 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature 보조 브랜치를 운용했습니다. <br>
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다. <br>
    - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
    - **Feat** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해 주었습니다.

<br>

<div id="g">

## 🔗 &nbsp; 프로젝트 구조
<details>
    <summary style="font-size: 1.5em; font-weight: bold;"> &nbsp; 프로젝트 구조 </summary>

```
src
└── main
    ├── generated
    ├── java
    │   └── codyus
    │       ├── domain
    │       │   ├── admin
    │       │   │   ├── controller
    │       │   │   ├── dto
    │       │   │   ├── entity
    │       │   │   ├── repository
    │       │   │   └── service
    │       │   ├── chatting
    │       │   │   ├── controller
    │       │   │   ├── dto
    │       │   │   ├── entity
    │       │   │   ├── repository
    │       │   │   └── service
    │       │   ├── like
    │       │   │   ├── controller
    │       │   │   ├── dto
    │       │   │   ├── entity
    │       │   │   ├── repository
    │       │   │   └── service
    │       │   ├── oauth
    │       │   │   ├── controller
    │       │   │   ├── dto
    │       │   │   └── service
    │       │   ├── post
    │       │   │   ├── controller
    │       │   │   ├── dto
    │       │   │   ├── entity
    │       │   │   ├── repository
    │       │   │   └── service
    │       │   │       └── PostService
    │       │   ├── user
    │       │   │   ├── controller
    │       │   │   ├── dto
    │       │   │   ├── entity
    │       │   │   ├── repository
    │       │   │   └── service
    │       ├── global
    │       │   ├── config
    │       │   ├── controller
    │       │   ├── dto
    │       │   ├── entity
    │       │   ├── exception
    │       │   ├── jwt
    │       │   ├── repository
    │       │   ├── runner
    │       │   └── security
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

<div id="h">

## 🔋 &nbsp; 트러블 슈팅
<details>
    
<summary style="font-size: 1.5em; font-weight: bold;"> &nbsp; 이미지 업로드 S3 관련 ERR_CERT_COMMON_NAME_INVALID 오류 </summary>

### 문제

![image](https://github.com/user-attachments/assets/9257ea6d-bac3-45d8-9f52-0625636985f3)
![image](https://github.com/user-attachments/assets/7880a9f8-50f2-4831-b41b-96c4bc540a40)
- 이미지처럼 게시글을 조회하는 페이지에서 `ERR_CERT_COMMON_NAME_INVALID` 오류가 발생

### 원인

- 해당 오류 메세지와 함께 `S3` 에 저장하고 받은 url 링크를 조회한 이미지들에 엑스박스가 생겨서 s3 문제라고 인지를 했음. 구글링 결과 url 관련 문제임을 알게되었고, 기존 `Virtual Hosted-Style URL` 을 사용하여 `S3` 업로드를 했고 저장은 됐지만, `SSL`인증서 오류로 인해 조회가 되지 않았다는 것을 알게되었음. 기존에 사용하던 `Virtual Hosted-Style URL`에서 오류가 발생한 이유는 주로 `SSL`인증서와 도메인 이름의 불일치 때문이며, 우리가 사용하는 버킷 이름에 점(.) 이 있었기 때문에 발생한 오류였음.

### 해결

- `SSL`문제를 피하기 위해 선택한 url 스타일은 `Path-Style URL` 이었는데, 특징은 버킷 이름이 도메인의 일부가 아니기 때문에, `SSL` 문제를 피할 수 있음. 따라서 `Path-Style URL` 을 사용하여 해당 문제를 해결하였음.
    
</details>

<details>

<summary style="font-size: 1.5em; font-weight: bold;"> &nbsp; `WebSocket STOMP` 시큐리티 토큰 인증 연결시 401 에러 </summary>

### 문제

- 클라이언트가 `SockJS`를 사용하여 `WebSocket`연결을 시도할 때 401 인증 에러가 발생.
- JWT 토큰은 정상적인 유효값임에도 불구하고 인증 실패.

### 원인

- **헤더 지원 부족**
    - `SockJS`는 기본적으로 `WebSocket`연결 시 HTTP 헤더를 설정하는 것을 지원하지 않음. <br> 이로 인해 클라이언트에서 설정한 Authorization 헤더가 서버에 전달되지 않음.
- **서버 측 토큰 검증**
    - 서버 측에서 `WebSocket`핸드셰이크 요청을 처리할 때 `Authorization`헤더를 찾지 못해 인증에 실패함.

### 해결

- **Spring Security 설정**
    - `Spring Security` 설정에서 `WebSocket` 엔드포인트에 대한 접근을 허용합니다. <br> 이를 위해 `permitAll()` 메서드를 사용하여 인증 없이 접근할 수 있도록 설정
- **STOMP 핸들러에서 토큰 검증**
    - `WebSocket` 연결 후 헤더에서 `JWT`토큰을 추출하여 토큰을 검증

        ![image](https://github.com/user-attachments/assets/226e7535-ab29-4581-a8a4-d03cd679b293)
        
- **STOMP 메시지를 전송할 때 토큰을 메시지 본문에 포함하여 전송**
    - 클라이언트에서 메시지 페이로드에 전송하면 서버측에서 토큰을 추출하여 검증 성공하면 메시지를 처리하고 실패하면 Throw 처리

      ![image](https://github.com/user-attachments/assets/c7abf875-5f37-4b11-b63c-4e2782c9323a)

    
</details>

<details>
<summary style="font-size: 1.5em; font-weight: bold;"> &nbsp; 인덱스 추가를 통한 쿼리 성능 최적화 </summary>

 ### 원인
더미 데이터(약 496,000건)을 다루는 쿼리에서 성능 저하가 발생
`post_category_matches` 테이블과 `category` 테이블 간의 조인 및 조건 검색에서 느려지는 문제

### 해결
   데이터베이스에 인덱스를 추가하여 쿼리 성능을 개선함
   JPQL에서 QueryDSL 로 전환하여 쿼리 성능을 개선함

`CREATE INDEX idx_post_category_matches ON post_category_matches (category_id, post_id);`
<br>
 `CREATE INDEX idx_category_name ON category (category);`
<br>
이러한 인덱스 추가

 ### 결과
 - **QueryDSL로 전환하여 쿼리 실행 시간이 11초에서 10초로 개선됨**
      
![image](https://github.com/user-attachments/assets/ed327b88-0f2f-42b1-9cf6-c036319aca86)

 - **인덱스 추가 전 쿼리 실행 시간이 평균 10초에서 3초로 줄어듬**
  
![image](https://github.com/user-attachments/assets/227a3710-98ca-4042-99d4-051e536b46e7)
- **이후 추가 인덱스 적용으로 성능이 0.7초로 개선됨**
  
![image](https://github.com/user-attachments/assets/46444bc9-ab81-438f-b937-2cad94241291)

  </details>

<br>

<div id="i">

## ✅ &nbsp; 프로젝트 후기

### ![1](https://github.com/user-attachments/assets/acc2add4-0e04-45ac-9485-f48e5354724b) <br> &nbsp;&nbsp; 최연환


- 이번 프로젝트를 통해 많은 것을 배우고 느낄 수 있었습니다. 특히, 실제 프론트엔드와의 연동 작업을 진행하면서 초기 기획의 중요성을 다시 한 번 실감하게 되었습니다. 프로젝트 초기에는 백엔드의 관점에서만 API 설계를 진행했었는데, 실제 프론트엔드와의 연동을 시작하고 나서야 우리의 API 설계와 요구사항이 다소 차이가 있다는 것을 깨달았습니다. 또한, 이러한 예상치 못한 문제들을 극복하면서 기술적인 부분뿐만 아니라 팀원들과의 팀워크 및 커뮤니케이션이 얼마나 중요한지 실감하게 되었습니다.
좋은 팀원들과 즐겁게 작업을 했다는 생각이 들고, 이번 프로젝트를 통해 더 많이 성장했다고 느꼈습니다.

<br>

### ![2](https://github.com/user-attachments/assets/e668213c-dbff-4081-8337-9680c0d6ae73) <br> &nbsp;&nbsp; 장재현

- 이번 프로젝트를 진행하면서 많은 것을 배울 수 있었습니다. 그동안 주로 백엔드 개발만 해왔었는데, 프론트엔드와 연동 작업을 함께 진행하면서, 백엔드와 프론트엔드의 연결이 생각보다 훨씬 까다롭고 복잡하다는 것을 느꼈습니다
프로젝트를 통해 다양한 기술들을 새롭게 배우고 적용해 볼 수 있는 기회가 되었으며, 그 과정에서 문제 해결 능력과 새로운 기술을 빠르게 습득하는 능력이 많이 향상되었습니다
훌륭한 팀원들과 함께 협업하면서 서로의 의견을 조율하고 각자의 역할을 충실히 해내는 것이 얼마나 중요한지를 깨달았습니다. 팀원들과의 원활한 소통과 협업 덕분에 프로젝트를 성공적으로 완수할 수 있었고, 이를 통해 개인적으로도 많은 성장을 이루었다고 생각합니다.

<br>

### ![3](https://github.com/user-attachments/assets/cc252c0f-e22c-4e06-ad9a-8f5f422f73ec) <br> &nbsp;&nbsp; 김지수

- 이번 프로젝트를 통해 프론트엔드와 백엔드의 통합, 효율적인 데이터베이스 설계, 실시간 기능 구현 등 다양한 기술을 배우고 적용할 수 있었습니다. 
이러한 경험을 통해 문제 해결 능력이 향상되었고 개발 역량을 한층 더 발전시킬 수 있었습니다.

<br>

### ![4](https://github.com/user-attachments/assets/914d1085-121d-4476-b182-3379befd895e) <br> &nbsp;&nbsp; 윤일영

- 지금까지 진행했던 프로젝트 중 가장 긴 시간을 들인 프로젝트인 만큼 애정도 담기고 배운 점도 많은 것 같습니다.
매번 백엔드를 기준으로 계획하고 진행을 해왔는데, 이번 프로젝트에서는 프론트까지 병행해야 해서 생각보다 훨씬 복잡하고 어렵다고 느꼈습니다.
이번 프로젝트를 통해 다양한 기술 사용 및 문제점들을 햬결해 나가면서 한 걸음 더 성장할 수 있었던 소중한 경험을 얻었다고 생각하고,
좋은 팀원들과 함께 이 프로젝트를 진행하고 마무리 할 수 있어서 너무 감사했다고 다시 한 번 전해드리고 싶습니다.

<br> <br>

![footer](https://capsule-render.vercel.app/api?type=Venom&color=auto&height=200&section=header&text=CodyUs&fontSize=50&fontColor=7F7F7F&animation=fadeIn)
