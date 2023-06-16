# 📽 영화 웹페이지 프로젝트

## **📗 목차**

<b>

- 📝 [프로젝트 개요](#-프로젝트-개요)
- 🛠 [기술 및 도구](#-기술-및-도구)
- 📦 [ERD 설계](#-ERD-설계)
- 📌 [프로젝트 수행 과정](#-프로젝트-수행-과정)
- 🔎 [주요 기능 소개](#-주요-기능-소개)

</b>

## **📝 프로젝트 개요**
#### `1. 프로젝트 소개`
- Spring-Boot와 React를 이용하여 개발한 영화 웹페이지 입니다.

#### `2. 개발 기간`
- Demo-Version : 2023.01.08 ~ 2023.04.05
- Refactoring : 2023.04.10 ~ 2023.05.30

#### `3. 개발 인원`
- 오병주 : Demo-Version 프로젝트 개발, 코드 리팩토링 및 배포
- 강경목 : Demo-Version 프로젝트 개발

## **🛠 기술 및 도구**
#### `Front-end`
- React
- Styled-components
- Axios
- Redux
- Redux-Saga
#### `Back-end`
- Java 11
- Spring-Boot
- Spring Data JPA
- Spring-Security
- MySQL
- Redis
#### `DevOps`	
- AWS (EC2, RDS)
- Nginx
- Gradle
- Docker
- GitHub
#### `Security`
- JWT
- HTTPS
#### `API`
- Swagger (Springdoc)

## **📦 ERD 설계**
<img width="100%" alt="ERD" src="https://user-images.githubusercontent.com/96694919/246102323-3dbcef99-3e0a-47cc-8fa5-55926d9d65f8.png"/>

## **📌 프로젝트 수행 과정**
### * 시스템 구성도
<img width="100%" alt="Sys" src="https://user-images.githubusercontent.com/96694919/246202776-83847a3b-d272-4157-b927-f175c96f8f70.jpg"/>

> 프로젝트의 전체적인 시스템 구성도입니다. <br/>
사용자가 웹페이지의 URL을 요청하면 ec2 인스턴스를 거쳐 Docker 컨테이너 환경에 존재하는 NGINX(Web Server)로 요청이 전달되며 NGINX는 요청들을 https 요청으로 리다이렉트함과 동시에 정적요소는 빌드된 index.html 파일로부터 데이터를 가져와 사용자에게 전달하고, 동적요소는 Spring-Boot 서버에게 요청을 전달한 뒤 Spring-Boot 서버가 RDS에 접근하여 가져온 데이터를 사용자에게 전달합니다.


### * 사용자 요청에 따른 NGINX의 DB 접근 순서도
<img width="100%" alt="Flow" src="https://user-images.githubusercontent.com/96694919/246356899-7e0a539f-69f8-4cb4-914e-5061c5bc34af.jpg"/>
<br />

### 1️⃣ NGINX
<img width="100%" alt="Flow" src="https://user-images.githubusercontent.com/96694919/246402430-297d2b2b-9c88-449a-b313-80adad1f546c.jpg"/>

- **URL Rewrite 처리** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/5ff68aa372daa08db4a777cf06da9cac3f9a310f/Docker_nginx/conf.d/default.conf#L36)
	- 사용자가 요청한 URL에서 백엔드 요청에 필요없는 ~/APICALL/ 부분을 NGINX 내부에서 제거한 뒤 URL을 재정의합니다.
- **Reverse Proxy 처리** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/5ff68aa372daa08db4a777cf06da9cac3f9a310f/Docker_nginx/conf.d/default.conf#L37)
	- 사용자의 요청을 백엔드 서버에게 전달합니다. Reverse Proxy 덕분에 사용자는 DB의 데이터가 필요할 때 프록시 서버 URL로만 접근할 수 있으며 백엔드 서버에 직접적으로 접근이 불가능하게 됩니다.

### 2️⃣ jwtFilter
<img width="100%" alt="Flow" src="https://user-images.githubusercontent.com/96694919/246399743-f2dc2997-acea-4e27-bb60-f303bcb95c95.jpg"/>

- **토큰 존재 여부 파악** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/5ff68aa372daa08db4a777cf06da9cac3f9a310f/Spring_backend/src/main/java/com/movie/Spring_backend/jwt/JwtFilter.java#L51)
	- REST API 요청에서 AcessToken이 필요한 요청인 경우 AceesToken의 존재 여부를 파악합니다. (토큰에 대한 검증은 Service단에서 실행)

- **CSRF 공격 방지** 📌 [코드 확인](https://github.com/Oh-byeongju/Movie_Project/blob/5ff68aa372daa08db4a777cf06da9cac3f9a310f/Spring_backend/src/main/java/com/movie/Spring_backend/util/CsrfCheckUtil.java#L38)
	- REST API 요청이 POST, DELETE, PUT, PATCH인 경우 CSRF 공격을 방지하기 위하여 Double submit cookie를 통한 검사를 실행합니다.


<!-- ## 데이터베이스 접근 순서도를 만들면 될듯 -->
<!-- 개발하면서 아쉬웠던점(기억나는거 다적기) -> jwt필터단에서  access토큰 유효성 검사를 하지 못하고 service단에서 실행한것 (이유는 axios interceptor를 쓰려고 하는데 jwt필터단에서 Custom 예외처리를 적용시킬 수 있었으나 토큰 만료, 불일치, 형식오류등 각종 상황에 따른 다른 예외처리가 불가능하여서 service단에서 처리 ) -->
<!-- 
cors 이슈 -> 리액트와 스프링부트를 이용해서 개발은 진행하다보니 서로의 서버간 port번호가 달라 cors 이슈가 있었다. 그치만 이걸 spring-boot의 전역설정으로 해결하였고 Cookie까지 받아오려고 widhtㄱ크래셜?? 그거까지 설정했다.

from dis cash 이슈 -> 배포 과정에서 발견한 트러블이슈인데 설명좀 추가해서 적고 ~~~ 일이 있었다. 그래서 프론트단에서 백엔드를 요청할때 axios 헤더에 무슨무슨 값을 설정해서 해결했다. -->

## **🔎 주요 기능 소개 여기 아래는 wiki로 다날려도 될듯**
### `로그인관련`
- 회원가입
- JWT를 이용한 로그인 (로그인 유지하기 포함)
- 아이디 / 비밀번호 찾기

#### `영화관련`
- 분류별 영화 조회
- 영화 상세내용 조회
- 버튼 클릭시 빠른 예매 기능
- 영화 공감 및 관람평 작성 기능

#### `상영시간표 관련`
- 영화를 중심으로 상영정보 조회
- 극장을 중심으로 상영정보 조회
- 버튼 클릭시 빠른 예매 기능

#### `영화예매 관련`
- 예매가 가능한 영화, 극장, 날짜 조회
- 조건에 맞는 상영정보 조회
- 좌석조회 및 선택
- 결제기능

#### `게시판 관련`
- 게시물 조회, 작성, 수정, 삭제 기능
- 댓글 및 답글 작성, 삭제 기능
- 게시물 및 댓글 공감 기능

#### `마이페이지 관련`
- 예매내역, 예매 취소내역, 지난 관람내역 목록 조회
- 예매내역, 예매 취소내역, 지난 관람내역 상세 조회
- 사용자가 공감한 영화 조회
- 관람평 작성이 가능한 영화 및 작성한 관람평 조회
- 회원정보 수정 및 탈퇴

#### `관리자 관련`
- 영화 및 배우 조회, 작성, 수정, 삭제 기능
- 상영정보 조회, 작성, 수정, 삭제 기능
- 극장 및 상영관 조회, 작성, 수정, 삭제 기능
- 회원 조회, 삭제 기능
- 영화 또는 극장에 따른 예매내역 조회 기능
- 관람평 및 게시물 조회, 삭제 기능

