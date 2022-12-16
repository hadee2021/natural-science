# 수능 과탐 공부
## Objective
Link: https://natural-science-a2e20.web.app/

수능 과탐을 공부하는 학생들을 위해 기출문제와 원칙을 학습할 수 있는

서비스를 개발 하였습니다!!

수능 과학탐구 서비스는 **학생**과 **관리자** 관점을 분리하여 만들었습니다.

실제 서비스 출시를 생각하고 있기에 스마트폰, 테블릿, 데스크 탑,등을 이용하는 학생들의 편의성과

문제와 원칙을 업데이트하는 관리자의 편의성을 고려하였습니다.






---
## 개발 환경
## Core Framework
![React](https://img.shields.io/badge/react-20232a.svg?style=for-the-badge&logo=react&logoColor=61DAFB)

**사용 근거** 

hook을 이용하여 상태관리를 하고 router의 사용이 직관적이고

Recoil, React Query, 등의 React의 라이브러리의 이점을 활용하고 싶어서 React를 사용하였습니다.

![TypeScript](https://img.shields.io/badge/typescript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

**사용 근거** 

유저정보, 문제정보 처럼 주요한 상태정보는 타입을 정하여 오류를 미리방지하고

미리 만들어둔 모듈의 함수는 어느 컴포넌트에서 사용을 하더라도 인자에 무엇을 넣을지 타입을 알려주기 때문에 매우 편했습니다.

![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

**사용 근거** 

firebase를 서버로 활용하여 가져온 데이터를 캐싱하여 중복 요청을 방지하고

서버의 내용이 변경될때 client 측에도 바로 반영되게 하였습니다.

(필요에 따라 캐싱의 시간을 옵션에서 조절할 수 있습니다.)

## Design
![MUI](https://img.shields.io/badge/MUI-0081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

**사용 근거** 

버튼, 아이콘, 등의 스타일을 제공하는 라이브러리를 사용하여 CSS의 의존도를 낮추었습니다.

별도의 스타일이 필요한 경우는 styled-components를 활용했는데 

고유의 className이 붙어서 중복을 피할 수 있었습니다.

## Backend/Hosting

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

**사용 근거** 

서버는 Firebase로 학생과 문제의 정보를 collection과 document 구조를 활용하여 

세부적으로 나누고 직관적으로 관리하기 위해 사용했습니다.

소켓통신을 기반으로 하기에 정보의 변화가 실시간으로 반영 됩니다.

호스팅 역시 Firebase를 사용했습니다.

학생들이 복습문제 기능을 사용하거나 관리자가 문제업데이트를 하는 등의 동적인 작업이 다수 예상되기 때문입니다.

또한 그 만큼 서비스의 배포도 빠르게 진행되어야 하기 때문에

깃 허브에서 CI/CD로 자동 배포기능을 사용하였습니다.


---
## 학생 관점


### 시작 화면

![001 시작 화면](https://user-images.githubusercontent.com/85422934/208044424-c41827eb-be3e-4c01-99de-6b621ba72e01.png)

<br/><br/> 

처음 이용하는 사람을 위해 시연하기 버튼이 있습니다.

자신의 학습공간이 있으면 스터디룸으로 입장하시면 됩니다.
<br/><br/><br/> 

### 1. 홈

![002 홈 화면](https://user-images.githubusercontent.com/85422934/208044513-9359f449-a3d0-486c-859c-5a8e5cd57643.png)

<br/><br/> 

개인 복습문제 현황을 그래프를 통해 한 눈에 볼 수 있습니다.
<br/><br/><br/> 

### 2. 원칙 공부 리스트

![003 원칙 공부 리스트](https://user-images.githubusercontent.com/85422934/208046416-a2877023-3c89-4d5f-ae4a-f2b092070c1e.png)

<br/><br/> 
과목과 단원을 선택 할 수 있습니다.
<br/><br/><br/> 

### 3. 문제학습

![004 문제학습1](https://user-images.githubusercontent.com/85422934/200260002-c5b4e1e7-3452-4398-b386-4c38dfc3e9ad.png)
<br/><br/> 

문제를 직접 풀어보고 정답을 확인 할 수 있습니다.
<br/><br/><br/> 

![005 문제학습2](https://user-images.githubusercontent.com/85422934/200260102-8024eaac-e690-4bc2-80bd-c04cece6baaf.png)
<br/><br/> 

정답은 OMR 카드를 마킹해야 확인 가능합니다.

또한 **복습추가** 버튼을 눌러 원하는 문제를 다시 풀 수 있습니다
<br/><br/><br/> 

### 4. 복습하기

![006 복습문제](https://user-images.githubusercontent.com/85422934/208046215-6ac05b48-bacc-4571-aac6-3630fab66bc9.png)

<br/><br/> 

아까 문제학습에서 복습하기에 추가한 문제를 학습 할 수 있습니다.

문제 사진을 미니 사이즈로 하여 직관적으로 찾을 수 있습니다.
<br/><br/> 

![006 복습문제 2](https://user-images.githubusercontent.com/85422934/208046267-c0f9757f-c59d-4468-9b42-9efca9244f88.png)

사진을 클릭하면 확대하여 보실 수 있습니다.
<br/><br/><br/> 

### 5. 문제집

![007 문제집1](https://user-images.githubusercontent.com/85422934/208048402-e596b59e-b3e0-44ce-ba87-ce1ceff12cf9.png)
<br/><br/> 

학습에 필요한 문제집 리스트를 볼 수 있습니다.
<br/><br/> 

![007 문제집2](https://user-images.githubusercontent.com/85422934/208048532-94204763-db73-443a-ba09-aaf85e7111f4.png)
<br/><br/> 

간단한 설명과 pdf 파일을 통해 맛보기를 할 수 있습니다.
<br/><br/><br/> 

### 6. 추천 영상

![008 추천 영상1](https://user-images.githubusercontent.com/85422934/208050203-ca37b355-ba1a-425f-8d59-d86ec7d616ef.png)

<br/><br/> 

과목과 관련된 영상을 볼 수 있습니다.
<br/><br/> 

![008 추천 영상2](https://user-images.githubusercontent.com/85422934/208050247-5918bb53-a728-4a34-99c2-d235acbb4904.png)

<br/><br/> 

iframe을 통해 영상을 보여주었습니다.
<br/><br/><br/> 

---
## 관리자 관점


### 1. 단원별 학습에서 빠른추가

![009 관리자 페이지1](https://user-images.githubusercontent.com/85422934/208055547-78254cf5-647e-4e14-b7ed-a03077725b6e.png)
<br/><br/> 

같은 단원에서 새로운 문제를 추가한다면 단원별 학습에서 빠른 추가를 이용할 수 있습니다.
<br/><br/> 

![009 관리자 페이지2](https://user-images.githubusercontent.com/85422934/208055658-8e5289a2-e9f3-44f2-bb88-792904527726.png)
<br/><br/> 

과목과 단원을 자동완성해주고 문제 순서를 제공하는 점에서 편리성을 확보 하였습니다.
<br/><br/><br/> 


### 2. 문제 수정

![010 관리자 문제 수정](https://user-images.githubusercontent.com/85422934/208055730-732f7bde-3d2b-40c6-91b4-b6681520f88d.png)

<br/><br/> 

관리자는 문제카드에서 직접 문제의 정보를 수정 및 삭제 할 수 있습니다.
<br/><br/> 

![010 관리자 문제 수정 2](https://user-images.githubusercontent.com/85422934/208056055-99dea1b0-a1c7-4ca1-a1f9-5d2598c33458.png)
<br/><br/> 

문제를 수정하면 문제 양식에서 자동으로 기존의 정보를 동기화 시켜 보여줍니다.
<br/><br/><br/> 

### 3. 문제집

![011 관리자 문제집](https://user-images.githubusercontent.com/85422934/208056394-671f6d28-109e-42f7-af1a-2bd6ca36e9e5.png)
<br/><br/> 

관리자는 문제집을 추가하거나 수정 및 삭제를 할 수 있습니다.
<br/><br/> 

![011 관리자 문제집 2 ](https://user-images.githubusercontent.com/85422934/208056543-281e8adb-86b1-49bc-a82c-63b41e935de6.png)
<br/><br/> 

문제집 양식 입니다.
<br/><br/><br/> 

### 4. 추천 영상

![012 추천영상 1](https://user-images.githubusercontent.com/85422934/208057112-e0808c19-91a6-4a3f-88b4-36a53fa3876a.png)
<br/><br/> 

관리자는 영상을 추가하거나 수정 및 삭제를 할 수 있습니다.
<br/><br/> 

![012 추천영상 2](https://user-images.githubusercontent.com/85422934/208057172-fa582d20-51a8-44c9-b905-a606363c5753.png)
<br/><br/> 

영상 양식에서 링크를 입력하면 썸네일과 영상을 미리 확인 가능 합니다.
<br/><br/><br/> 

---






