# 🍈 한끼출근
![image](https://github.com/user-attachments/assets/f59834cf-8ef5-4c9a-a595-4e7b91a82f67)

## 1. 주제 선정 이유
**바쁜 현대인의 식단을 관리해줄 수 있는 방법은 없을까?**
```
1. 바쁜 현대인들은 식사에 신경쓰기가 어렵다.
2. 하루종일 무엇을 얼마만큼 먹었는지 잊어버리기 쉽다.
3. 냉장고를 관리하지 않으면 음식을 해먹기가 어렵다.
```
## 2. 팀원 구성
![image](https://github.com/user-attachments/assets/8fd13c43-fd51-4be5-b969-c13e613dbe4c)

내가 담당했던 역할
```
1. Node js 백엔드 서버 - 찜목록, 댓글, 메인 레시피, 게시판 벡엔드 설계
2. 비밀번호 찾기 페이지 설계 수정
3. 프론트엔드 axios 요청 함수 설계
 
```


## 3. 개발 환경

| 종류    | 기술스택                                    |
| ---------- | ------------------------------------------------------------------------------------|
| 디자인 | ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) |
|런타임|<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">|
|언어| ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![typescript](https://img.shields.io/badge/typescript-%23323330.svg?style=for-the-badge&logo=typescript&logoColor=%23F7DF1E)|
|라이브러리|<img src="https://img.shields.io/badge/react-E34F26?style=for-the-badge&logo=react&logoColor=pink"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/chakra UI-C34F26?style=for-the-badge&logo=chakraUI&logoColor=white">|
|패키지|<img src="https://img.shields.io/badge/npm-3776AB?style=for-the-badge&logo=npm&logoColor=white">|
|협업툴|<img src="https://img.shields.io/badge/SLACK-0000F0?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/NOTION-0EA0F0?style=for-the-badge&logo=notion&logoColor=white">|
|IDE| <img src="https://img.shields.io/badge/VSCODE-AEA0F0?style=for-the-badge&logo=vscode&logoColor=white">|
|DB| <img src="https://img.shields.io/badge/mysql-E34F26?style=for-the-badge&logo=mysql&logoColor=white">|

## 4. 프로젝트 구조
```
backend
├─config
├─controllers
├─models
│  ├─FoodLog
│  ├─Grocery
│  ├─Posting
│  └─Recipe
├─routes
├─uploads
└─utils

frontend
+---build
+---node_modules
+---public
├─ingredients
└─menu
+---src
├─components
│  ├─atoms
│  ├─molecules
│  ├─organisms
│  ├─pages
│  ├─templates
│  └─ui
├─store
└─styles

```

## 5. 개발 기간 및 작업 관리
| 구분 | 기간|활동|비고|
|----------------|------|----|----|
|**사전기획**|12/02(월)~12/03(화)| 기획 및 주제 선정|개발 가능성 고려하여 선정|
|**요구사항 및 기능 정의**|12/04(수)~12/08(토)|1. 요구사항 설계 2. 필요 기능 정의 및 구체화|팀원의 희망사항 고려하여 역할 분배, 개발 능력을 고려하여 소요 시간 예측|
|**필요모델 설계**|12/09(월)~12/10(화)|요구사항을 바탕으로 필요 모델 설계|    |
|**서비스 개발 1차**|12/10(화)~12/15(금)|기능 별 api 설계, 페이지 디자인 설계|   |
|**중간보고**|12/17(월)~12/18(월)|팀별 중간보고 진행|       |
|**서비스 개발**|12/18(화)~12/20(목)|1. 페이지 디자인 마무리 2. 반응형 디자인 설계 3. 기능 별 api 테스트|     |
|**기능 테스트**|12/20(금)~12/22(토)|엣지 케이스 테스트 및 기능 최종 점검|   |
|**배포**|12/24(금)|배포 시도하기|  |
|**총 개발 기간**|10/30(수)~11/13(수)|   |    |

## 6. 페이지별 기능(현재 미완)

1. 로그인 화면

2. 회원가입 기능

3. 냉장고 재료- 등록/수정
   
4. 레시피 등록/수정

5. 게시판 등록/수정

6. 댓글 창

7. 찜목록
   

## 7. 트러블 슈팅 및 어려웠던 점

### **TypeScript의 타입 지정**

```
- 담당하기로 한 부분은 백엔드였는데, 시간상의 문제로 axios 요청 부분을 설계하게 되었다.
- 그때, 실제 DB에 설정해놓았던 값이랑 TypeScrpt로 UseState에 정의해논 데이터의 유형이 달라서 에러가 발생하는 부분이 있었다.
```
### **Node js의 싱글 쓰레드 방식**

<img src="https://github.com/user-attachments/assets/365610e7-bb71-43c2-a1ac-43d801625427" width="40%" height="50%">

```
- 찜목록을 설계하는 과정에서 레시피 데이터를 불러온 다음, 불러온 데이터 별로 찜이 되어 있는지 확인하는 방식으로 처리했었다.
- 그래서 찜목록을 가져오는 과정에서 무한대기가 발생해서 Open API를 사용해 레시피를 가져오는 함수가 동작하지 않은 문제가 있었다.
- 하루 종일 원인을 찾느라 씨름했었는데, else 문 하나가 빠져 있어 발생한 문제라는 걸 깨닫고 허탈했었다.
```
### **무분별한 디자인 패턴과 라이브러리의 사용**

```
- 제대로 배우지 않고 쓰면 편하겠다는 마음으로 차크라 ui와 atoms 패턴을 사용해봤는데, 오히려 편하기는 커녕 개발 시간만 늘어나는 문제를 맞이했다.
- 결국, 프로젝트는 완성 시켰지만 배포하지 못하는 등 시간에 쫒기는 상황을 맞이했다.
- 라이브러리가 개발에 편리함을 가져다 줄 순 있지만 제대로 습득하지 않고 사용한다면 오히려 악영향이라는 걸 느꼈다.
```
### Open API와 원하는 데이터 형식의 괴리
![image](https://github.com/user-attachments/assets/edd82d4a-b421-4775-8d54-673abc165846)

```
- 시크릿 키를 발급받아 Open API에 axios 요청을 보내고 받은 데이터가 우리가 필요한 부분이 누락되어 있거나, 레시피의 번호가 중복되거나 누락되어 있거나, 재료의 단위 값이 빠져있는 등 데이터의 형식이 각양각색이었다.
- 가공되지 않은 데이터를 우리가 원하는 형식에 맞춰 정제하여 프론트엔드로 보내는 함수에 대한 고민이 있었다.
- 일단, 필요한 데이터가 없는 레시피를 삭제한 뒤, 제미나이 API를 활용해 데이터를 배열행태로 바꾼뒤 원하는 형태로 가공하는 과정을 거쳤다. 
```
### 중복되는 레시피에 대한 처리 ###

![image](https://github.com/user-attachments/assets/652d4b77-f424-440d-b5bf-bcfc8e6a1fcb)
![image](https://github.com/user-attachments/assets/877571ab-fc89-4fb2-9036-32de42901e92)


```
- 하나의 레시피 당 요리 순서는 특정 갯수로 정해져 있는 것이 아니기에 데이터의 크기, 양이 많을 수록 대기문제가 발생할 확률이 높아서 함수를 설계하는데 고민이 필요했다.
- 그래서 방대한 데이터를 하나의 Table에 저장하지 않고 요리 순서와 재료를 따로 분리하여 Table을 만듬으로써 문제를 해결했다.

```


## 8. 개선 목표

```
- 배포 : 이번 프로젝트를 할 적에 프로젝트 기간에 쫒겨 프로젝트 배포까지 완수하지 못했다.
- 데이터 관리 : 프론트엔드에서 데이터를 관리할 적에 props를 사용해서 넘겨주는 방식을 썼었는데, 다음번엔 redux, zustand, Recoil과 같은 상태 관리 라이브러리를 써볼 계획이다.
- Oauth2 : 카카오나 네이버의 로그인 API를 활용해서 회원가입 수단을 늘릴 계획이다.
- 코드 재활용 : 공통으로 사용하는 메서드 등을 따로 빼내어 간결하게 만들어볼 계획이다.
- AWS 이미지 관리 미비: AWS S3 이미지 관리 구현 예정이었으나, 시간 부족으로 미구현
```

## 9. 채택한 기술에 대한 감사
**React**
````
- Dom 요소들을 직접 관리해야하는 바닐라JS와 달리, 브라우저의 상태값 관리가 용이하다는 걸 느꼈다.
- 바닐라js와 달리 DOM에 변화가 발생했을 때 변화가 발생된 부분만 재렌더링하는 형식이라 상당히 유연하다는 걸 느꼈다.
- 컴포넌트가 불필요하게 자주 렌더링되거나 복잡한 계산을 수행하는 경우 성능 문제가 발생할 수 있으니, 너무 쪼개는 것도 좋지 않다는 걸 느꼈다.
````
**TypeScript**
```
- 본래 구상했던 것과 다른 데이터 타입으로 작용해서 오류가 발생하는 문제를 사전에 찾을 수 있다는 게 매력적이었다.
- 이번에 프로젝트를 할 때 실행 시에 적용되는 타입이랑 정의해논 타입이 달라서 에러가 많이 났었는데, 바닐라js에서 기능이 동작한다고 그냥 넘기는 게 얼마나 잘못된 건지 느꼈다.     
```

