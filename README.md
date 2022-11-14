# 수능 과탐 공부
## Objective
Link: https://natural-science-a2e20.web.app/

수능 과탐을 공부하는 학생들을 위해 기출문제와 원칙을 학습할 수 있는

서비스를 개발 하였습니다!!

수능 과학탐구 서비스는 **학생**과 **관리자** 관점을 분리하여 만들었습니다.

실제 서비스 출시를 생각하고 있기에 스마트폰, 테블릿, 데스크 탑,등을 이용하는 학생들의 편의성과

문제와 원칙을 업데이트하는 관리자의 편의성을 고려하였습니다.


![과탐 소개 학생](https://user-images.githubusercontent.com/85422934/201569965-6df7ac26-969b-406f-8359-b23fdc255042.gif)



---
## 개발 환경
## Core Framework
![React](https://img.shields.io/badge/react-20232a.svg?style=for-the-badge&logo=react&logoColor=61DAFB)

**사용 근거** : 훅을 이용하여 상태관리를 하고 router로 여러페이지를 부드럽게 구현 하기 위해 사용하였습니다. 

컴포넌트 단위로 나누어 관리하고 TypeScript도 같이 사용할 수 있는 이점이 컷습니다.

![TypeScript](https://img.shields.io/badge/typescript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

**사용 근거** : 유저정보, 문제정보 처럼 주요한 상태정보는 타입을 정하여 오류를 미리방지하고

미리 만들어둔 모듈의 함수는 어느 컴포넌트에서 사용을 하더라도 인자에 무엇을 넣을지 타입을 알려주기 때문에 매우 편했습니다.

![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

**사용 근거** : firebase를 서버로 활용하여 정보를 요청하는 과정에서 cashing을 활용하면 중복된 요청을 피할 수 있어서 

속도의 이득을 보기위해 사용했습니다.

(필요에 따라 캐싱의 시간을 옵션에서 조절할 수 있습니다.)

## Design
![MUI](https://img.shields.io/badge/MUI-0081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

**사용 근거** : 버튼, 아이콘, 등의 스타일을 제공하는 라이브러리를 사용하여 CSS의 의존도를 낮추었습니다.

## Backend/Hosting

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

**사용 근거** : 학생과 문제의 정보를 collection과 document 구조를 활용하여 세부적으로 나누고 직관적으로 관리할 수 있어서 사용하였습니다.

소켓통신을 기반으로 하기에 정보의 변화가 실시간으로 반영 됩니다.

깃 허브에 push하고 action에서 버튼을 클릭하면 firebase에 자동 배포가 됩니다.


---
## 학생 관점


### 처음화면

![001 처음 화면](https://user-images.githubusercontent.com/85422934/200259413-62ed0a5c-6df3-48bf-a32a-23656b9b5e08.png)
<br/><br/><br/> 

처음 이용하는 사람을 위해 시연하기 버튼이 있습니다.

자신의 학습공간이 있으면 스터디룸으로 입장하시면 됩니다.

### 홈

![002 홈](https://user-images.githubusercontent.com/85422934/200259702-33342e03-de3f-45c2-bb03-8bd5eadf7627.png)
<br/><br/><br/>

간단한 설명과 로그아웃 버튼


### 원칙 공부 리스트

![003 원칙공부](https://user-images.githubusercontent.com/85422934/200259839-887dc7ef-9587-4a74-be2e-936d58667ef6.png)
<br/><br/><br/> 

과목과 테마를 선택 할 수 있습니다.


### 문제학습

![004 문제학습1](https://user-images.githubusercontent.com/85422934/200260002-c5b4e1e7-3452-4398-b386-4c38dfc3e9ad.png)


문제를 직접 풀어보고 정답을 확인 할 수 있습니다.

![005 문제학습2](https://user-images.githubusercontent.com/85422934/200260102-8024eaac-e690-4bc2-80bd-c04cece6baaf.png)


정답은 OMR 카드를 마킹해야 확인 가능합니다.

또한 **복습추가** 버튼을 눌러 원하는 문제를 다시 풀 수 있습니다


### 복습하기


![006 복습문제1](https://user-images.githubusercontent.com/85422934/200260864-14f274e1-500d-4d94-8231-a193a5f04642.png)

아까 문제학습에서 복습하기에 추가한 문제를 학습 할 수 있습니다.

문제 사진을 미니 사이즈로 하여 한눈에 찾아 볼 수 있게 하였고


![007 복습문제2](https://user-images.githubusercontent.com/85422934/200261260-4456bfc4-e2dc-4797-9e21-8a94aef35170.png)

사진을 클릭하면 확대하여 보실 수 있습니다.

---
## 관리자 관점


### 홈

![008 관리자 홈](https://user-images.githubusercontent.com/85422934/200261904-e4375bfd-6bc8-4651-a3f5-5f1d3ae33d55.png)

관리자는 홈 화면의 우측 하단에 문제를 추가 할 수 있는 버튼이 있습니다.


### 문제 추가 양식

![009 관리자 문제추가](https://user-images.githubusercontent.com/85422934/200262110-d6aabed1-24bd-4026-922a-3efcf797bee4.png)

문제 추가는 정해진 포맷을 제공합니다.

### 단원별 학습에서 빠른추가

![010 관리자 빠른추가](https://user-images.githubusercontent.com/85422934/200262435-0cd788ff-3c3c-488c-a533-6ab1751a70da.png)

같은 단원에서 새로운 문제를 추가한다면 단원별 학습에서 빠른 추가를 이용할 수 있습니다.

![011 관리자 빠른추가](https://user-images.githubusercontent.com/85422934/200262546-f3bf88cd-0ccb-4164-b6b9-81f60686979a.png)

과목과 단원을 자동완성해주고 문제 순서를 제공하는 점에서 편리성을 확보 하였습니다.



### 문제 수정

![012 관리자 문제 수정 삭제](https://user-images.githubusercontent.com/85422934/200262856-7dc10715-f60c-4e3a-8736-ed9d3138ddab.png)

관리자는 문제카드에서 직접 문제의 정보를 수정 및 삭제 할 수 있습니다.


![013 관리자 문제 수정 삭제2](https://user-images.githubusercontent.com/85422934/200262963-688966d4-4a31-450a-82bc-976dfeb7c287.png)

문제를 수정하면 문제 양식에서 자동으로 기존의 정보를 동기화 시켜 보여줍니다.


---
## 향후 업데이트 계획

1. 문제풀이 타이머 제공

2. 복습문제 에서 원하는 분류 제공 ex) 년도별 분류, 점수별 분류, 오름차순 내림차순





