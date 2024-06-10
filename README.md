<div align='center'>
    <h1><b>Oh, My Indie</b></h1>
		<img src="https://github.com/Jaharim/Oh-My-Indie/assets/83650872/6c365082-3f5d-45ae-a41c-66526cf6d1b3" />
    <br/>
		<br/>
		<h3><b>당신의 Indie 는 누구인가요?</b></h3>
  <p>"Oh, My Indie" 는 한국의 인디뮤지션들을 소개하고, 이용자가 응원하는 인디뮤지션들을 서포트 할 수 있는 서비스 입니다.</p>
  		<br/>

</div>

<br />

> 🗝️ **Oh, My Indie 배포 링크 및 테스트 계정**

👉 [Oh, My Indie](https://oh-my-indie.web.app/)

```md
ID: test@test.com
PW: test1
```

<br />

## 📢 **1. 서비스 소개**

**"Oh, My Indie"** 는 한국의 인디뮤지션들을 소개하고, 이용자가 인디뮤지션들을 서포트 할 수 있는 서비스 입니다.

'나만 알고 있는 내 가수를 다른 사람에게 알리고 응원할 수 있는 서비스가 있으면 좋겠다' 라는 생각으로 개발했습니다.

이용자는 인디가수의 프로필에 좋아요를 누르고, 방명록 형태의 서포트 메시지를 작성해 인디가수에게 응원의 메시지를 전할 수 있습니다.

인디가수 프로필의 SNS버튼을 통해 해당 가수의 유튜브, 인스타그램, 사운드클라우드 등의 SNS로 이동할 수 있습니다.

또, 내가 좋아하는 인디가수를 직접 검색하는 것 외에도 랜덤으로 인디가수를 추천받습니다.

내가 좋아하는 인디가수가 없거나 문의사항이 생길경우 컨택트 메시지를 통해 운영자와 소통할 수 있습니다.

<br />
<br />

## ⚙️ **2. 개발 환경 및 기술 스택**
| FrontEnd | BackEnd | Database | FrontEnd 배포 | BackEnd 배포 |
|------|------|------|------|------|
| React.js | Express.js | MongoDB | Firebase | koyeb |

<br/>
<br />

## ✴️ **3. 주요 기능 소개**
### 1) 홈 
![메인페이지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/7209ad85-a172-446d-840e-785c6d787de0)  

<br />
<br />

### 2) 로그인 및 회원가입

- 로그인 페이지

  ![로그인페이지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/d12048a6-d447-4eb0-b961-d88941816d00)  

  - 유효성 검사  

    - 가입되지 않은 이메일로 로그인 시도
   
      |가입되지 않은 이메일 입력|알림|
      |---|---|
      |![로그인페이지_이메일오류](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/36371d38-adc2-442b-b1a6-0ded582bdd69)|![로그인페이지_이메일오류_알림](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/8616dc69-6ae5-4529-9b01-85c7fddea065)|
      <br />

    - 틀린 비밀번호로 로그인 시도
   
      |틀린 비밀번호 입력|알림|
      |---|---|
      |![로그인페이지_비밀번호오류](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/73f6c7a4-c480-4130-b4c7-55d0a3ee7a2b)|![로그인페이지_비밀번호오류_알림](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/ca4e0b51-5c6e-446c-a3a5-82367b06e9e3)|
      <br />
      <br />

- 회원가입 페이지

  ![회원가입페이지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/6ef1ae9d-f3a2-4089-8d78-9be76b31e76d)  

  - 유효성 검사  

    - 이미 가입된 이메일로 회원가입 시도
   
      |이미 가입된 이메일 입력|알림|
      |---|---|
      |![회원가입페이지_이메일중복](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/8c9a534d-e474-4f3e-8e7b-ae421f0beb1f)|![회원가입페이지_이메일중복_알림](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/acf35562-d186-4f9a-8eea-66f6a25fb635)|
      <br />

    - 이미 사용중인 닉네임으로 회원가입 시도
   
      |이미 사용중인 닉네임 입력|알림|
      |---|---|
      |![회원가입페이지_닉네임중복](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/82103972-5dda-4211-a480-584c8349f821)|![회원가입페이지_닉네임중복_알림](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/879f543d-7e8c-4f4c-b115-4e7ae455d8cf)|

<br />

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br />
  
### 3) 유저

- 메인 페이지

  ![유저로그인](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/78b817e7-621b-48f7-8dce-127a813383f0)

  유저 로그인 시 네비게이션 바 변경

    ![유저로그인_네비게이션바](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/16ddf50f-c563-4654-bd51-44d7ee99a7e3)

<br />

- #### 마이 인디 페이지  
    - 메인 페이지

      ![마이인디페이지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/64d3d09a-2859-4539-8668-0d928714a511)
  
  <br />
  
    - 인디검색 및 랜덤 인디 추천
      
      |인디검색|랜덤 인디 추천|
      |---|---|
      |![마이인디페이지_인디검색](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/eb93a4b4-ac69-4639-83cf-9317d945f1d2)|![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/197b07ff-d1a7-4f5b-87d3-eae80bf97e09)|

  <br />
  <br />

    - #### 인디 페이지

      ![마이인디페이지_인디페이지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/fe8b98fe-a506-4589-97f4-016b1311e6ff)
  
  <br />

    - 인디 좋아요

      |좋아요 버튼 클릭 전|좋아요 버튼 클릭 후|
      |---|---|
      |![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/407d246f-d695-4975-9c86-cfe51860c1be)|![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/7a96fd5c-846a-49f5-92d4-9a5865a28da2)|

      ![마이인디페이지_인디페이지_좋아요](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/fd758c84-14b1-4e21-86b0-670bb6bd2d7a)
  
  <br />

    - 인디 SNS

      ![마이인디페이지 sns링크](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/068480af-746d-4a80-823e-0e16dac2c032) 각 버튼 클릭시 해당 SNS 페이지로 이동
      <br />

      1) Youtube
         
        ![마이인디페이지 sns링크_youtube](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/a6904cb0-cf56-4039-8fb4-386200db201b)

      2) Instagram
  
        ![마이인디페이지 sns링크_instagram](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/95c4992a-f993-411a-b311-8b28e7bf71ba)

      3) SoundCloud
         
          등록되지 않은 SNS는 메인 페이지로 이동

  <br />

    - #### 인디에게

      ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/e110e5ca-c1a6-45a5-a354-418ad3bd0197) 버튼 클릭시 인디에게 페이지로 이동
      ![마이인디페이지_인디에게](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/be5ea567-3d2b-4258-ba8e-122cd607f11f)
      <br />

      1) 서포트 메시지 등록하기
         
          ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/d715a709-3788-4abd-80e3-d16eee6d3784) 버튼 클릭시 서포트 메시지 등록하기 모달 열림
    
          |서포트 메시지 등록하기|||
          |---|---|---|
          |![마이인디페이지_인디에게_등록하기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/3bc97e89-b119-4bdc-9434-5ece08f5a0d6)|![마이인디페이지_인디에게_등록하기_완료](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/616f0c7b-2ee2-4c4d-a848-ed763a4de648)|![마이인디페이지_인디에게_등록하기_등록완료됨](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/7237cbf2-35de-4b71-9b2f-11083cc1ea8a)|
         <br />

      2) 서포트 메시지 수정하기  

          ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/43d9a9e1-4b10-4055-ba56-9a38d34b2344) 버튼 클릭시 서포트 메시지 수정하기 모달 열림
    
          |서포트 메시지 수정하기|||
          |---|---|---|
          |![마이인디페이지_인디에게_수정하기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/59cf0899-573e-435c-a8ce-04072b0e6461)|![마이인디페이지_인디에게_수정하기_완료](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/c0205a00-ed23-40ee-a5fb-8f4ea428c8a3)|![마이인디페이지_인디에게_수정하기_수정완료됨](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/2423a60f-cd7f-4eed-aad6-1abcdf60be67)|
         <br />

      3) 서포트 메시지 삭제하기 

          ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/a05c4ad9-aa8e-49e0-961b-ce5b08a30b58) 버튼 클릭시 서포트 메시지 삭제하기 모달 열림
    
          |서포트 메시지 삭제하기|||
          |---|---|---|
          |![마이인디페이지_인디에게_삭제하기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/897b9fba-284a-4229-a9ef-de261ba08013)|![마이인디페이지_인디에게_삭제하기_완료](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/56e930ed-45fb-4ffb-b3d1-b370f032eb9e)|![마이인디페이지_인디에게_삭제하기_삭제완료됨](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/45308b37-5eae-4b1f-924d-dfa494f2c4a0)|

<br />
<br />

- 컨택트 페이지

  - 메인 페이지

    ![컨택트페이지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/2fcebceb-c147-4712-97a3-8f64c7786228)
    <br />

    1) 컨택트 메시지 등록하기

       ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/31d52f3e-487e-41d2-afe7-c85f71a0f23f) 버튼 클릭시 컨택트 메시지 등록 모달 열림
       |컨택트 메시지 등록하기||
       |---|---|
       |![컨택트페이지_등록하기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/34079548-b041-4af1-870e-df965c806030)|![컨택트페이지_등록하기_완료](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/dca7970b-f88a-41b5-98ea-a3e15fa218ea)|
       
<br />

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br />

- #### 마이 페이지

  - 메인 페이지
 
    ![마이페이지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/b57ab9de-1016-4cc0-9ef5-88a126430b42)
    <br />

    - 나의 서포트메시지 모아보기
      
        ![마이페이지_서포트메시지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/96bfddfa-6d30-4e40-8eb1-ab458f67845c)
      <br />

      1) 서포트 메시지 수정하기  

          ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/43d9a9e1-4b10-4055-ba56-9a38d34b2344) 버튼 클릭시 서포트 메시지 수정하기 모달 열림
    
          |서포트 메시지 수정하기|||
          |---|---|---|
          |![마이페이지_서포트메시지_수정하기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/f03d5731-fbbd-430f-a93d-be2ee9b88401)|![마이페이지_서포트메시지_수정하기_완료](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/565ac8ca-4d38-47b8-8ea3-5bdd61889f0f)|![마이페이지_서포트메시지_수정하기_수정완료됨](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/e67f24a4-b105-4be3-9cb9-b4ee6b323d14)|
         <br />

      2) 서포트 메시지 삭제하기 

          ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/a05c4ad9-aa8e-49e0-961b-ce5b08a30b58) 버튼 클릭시 서포트 메시지 삭제하기 모달 열림
    
          |서포트 메시지 삭제하기|||
          |---|---|---|
          |![마이페이지_서포트메시지_삭제하기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/963ba975-304a-459d-8761-91f4102fbee1)|![마이페이지_서포트메시지_삭제하기_완료](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/e7949d17-a6c5-4dbd-8642-853ccc8fe181)|![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/520ef0fa-ab87-4c27-b155-6cddbcc09483)|  
         <br />
	 <br />

    - 나의 컨택트메시지 모아보기
   
      1) 답변 대기중인 컨택트 메시지  

         ![마이페이지_컨택트메시지_답변대기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/50995ecf-e6e8-4bb6-9865-5e87bd229575)  
         <br />

      2) 답변 완료된 컨택트 메시지
     
         |답변 완료 상태|답변 보기|
         |---|---|
         |![마이페이지_컨택트메시지_답변완료](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/3730e162-cfa8-4d82-9e1c-bf323d33903e)|![마이페이지_컨택트메시지_답변보기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/c2d20e59-0c41-41e7-8a04-08939698c19c)|
         <br />

      3) 컨택트 메시지 삭제하기
     
         |삭제하기|삭제 완료|삭제 후|
         |---|---|---|
         |![마이페이지_컨택트메시지_삭제하기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/7e5a5431-69ef-4a7e-9708-bfceca5f51dc)|![마이페이지_컨택트메시지_삭제하기_완료](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/95ea742b-0504-4427-aa2b-bd2bde049c7b)|![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/a450fd0e-2c3d-44b3-917d-650ad71d35e9)|
         
<br />

  <!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br />

### 4) 관리자

- 메인 페이지

  ![어드민_메인페이지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/5c6289c6-e994-4afe-a02b-f8e678ad67e9)

  관리자 로그인 시 네비게이션 바 변경

    ![어드민로그인_네비게이션바](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/1180bdcc-d06c-4ef4-b6a9-1c8a65167e08)
  <br />
  <br />

- 마이 인디 페이지
  
  - #### 어드민 마이 인디 페이지
 
    ![어드민_마이인디페이지_인디에게](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/e482042d-22d7-4a6e-b7af-4dbf2d831ff9)

    1) 유저의 서포트 메시지 수정하기
   
       ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/43d9a9e1-4b10-4055-ba56-9a38d34b2344) 버튼 클릭시 서포트 메시지 수정하기 모달 열림
       
       ![어드민_마이인디페이지_인디에게_수정가능](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/abc9deca-510c-4d81-aaea-f10322a3f084)  
       <br />

    3) 유저의 서포트 메시지 삭제하기
   
       ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/a05c4ad9-aa8e-49e0-961b-ce5b08a30b58) 버튼 클릭시 서포트 메시지 삭제하기 모달 열림
       
       ![어드민_마이인디페이지_인디에게_삭제가능](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/1e9cba73-c06e-4e63-b07f-29dc824d7d33)
       <br />
       <br />
       
- 어드민 페이지

  - 메인 페이지

    ![어드민_어드민페이지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/40d24125-6b2c-4dfb-9026-e77b1ca2eb8d)

    - #### 인디 메뉴  

      1) 인디 추가하기
         
         ![어드민_어드민페이지_인디_인디추가](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/dbc9113f-eef2-4c4a-91c8-c517ba00aa11)  
         <br />

      2) 인디 수정하기
         
         |수정할 인디 입력|수정하기|
         |---|---|
         |![어드민_어드민페이지_인디_수정할인디입력](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/c83cd190-6b10-4324-9e17-b0176b4b56ea)|![어드민_어드민페이지_인디_수정하기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/afbb4a1e-7d39-451f-b43c-36d1a8e0f8db)|  
         <br />

      3) 인디 삭제하기
     
         |삭제할 인디 입력|삭제하기|
         |---|---|
         |![어드민_어드민페이지_인디_삭제할인디입력](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/468385f9-e61d-4f0f-8914-e6b1bb3ad1fd)|![어드민_어드민페이지_인디_삭제하기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/5346b812-c933-4a6b-9b20-a158c6a3a610)|
         <br />
	 <br />

    - #### 유저 메뉴
   
      - 메인 페이지
     
        ![어드민_어드민페이지_유저](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/792feeff-60c3-4d3e-9e88-ae79c692e468)

	    - 유저 서포트 메시지 모아보기

   	      ![어드민_어드민페이지_유저_서포트메시지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/44b89ac6-c425-4640-b6e5-1e93f357ae2a)

   	        1) 유저의 서포트 메시지 수정하기
   
   	           ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/43d9a9e1-4b10-4055-ba56-9a38d34b2344) 버튼 클릭시 서포트 메시지 수정하기 모달 열림
       
   	           ![어드민_어드민페이지_유저_서포트메시지_수정가능](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/e8b1a58a-2c74-4fc3-964f-18d23b10cfa5)  
   	           <br />

   	        2) 유저의 서포트 메시지 삭제하기
   
   	           ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/a05c4ad9-aa8e-49e0-961b-ce5b08a30b58) 버튼 클릭시 서포트 메시지 삭제하기 모달 열림
       
   	           ![어드민_어드민페이지_유저_서포트메시지_삭제가능](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/30571604-9b83-4382-8a51-c057effb2c2c)
     	           <br />
   	           <br />
       
	    - 답변 대기중인 컨택트 메시지 모아보기
     
	        ![어드민_컨택트메시지_답변대기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/c34b409b-4dbe-4fbf-b69a-219a4c9897ce)

	        1) 답변하기

	           |답변하기|답변완료|
	           |---|---|
	           |![어드민_컨택트메시지_답변하기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/6b11eafa-bbd3-4f71-b662-27984dd61409)|![어드민_컨택트메시지_답변하기_완료](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/26c1230e-877b-4dfd-bebc-9246f66a5e26)|
	           <br />

	        2) 삭제하기

	           ![어드민_컨택트메시지_답변대기_삭제가능](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/c1013f93-e028-4dc4-a058-453cee8c95a4)  
	           <br />
	           <br />

	    - 답변 완료된 컨택트 메시지 모아보기
     
	        ![어드민_어드민페이지_유저_컨택트메시지_답변완료](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/890f6f5b-af2a-4fa5-b719-221d674abf98)

	        1) 답변 내용보기
     
	           ![어드민_어드민페이지_유저_컨택트메시지_답변완료_답변보기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/c2f32519-9983-43e8-94e7-c483cdee5571)  
                   <br />
		   
	        2) 답변 수정하기
     
	           답변 내용보기 상태에서 ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/047f0622-3d15-4df4-8100-af42d66af26f) 버튼 클릭시 수정 모드로 전환

     
	           ![어드민_어드민페이지_유저_컨택트메시지_답변완료_답변수정가능](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/61feb0fb-bb6a-47c5-8ba8-e6a0dd0c6197)  
                   <br />

	        4) 답변 삭제하기
     
	           ![image](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/a05c4ad9-aa8e-49e0-961b-ce5b08a30b58) 버튼 클릭시 서포트 메시지 삭제하기 모달 열림
       
	           ![어드민_어드민페이지_유저_컨택트메시지_답변완료_삭제가능](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/d5e8dc02-ba49-4e3f-9fad-4b8da0da779c)  
	           <br />

	        
	        |답변내용 보기|답변내용 수정하기|답변 완료된 컨택트메시지 삭제하기|
	        |---|---|---|
	        |![어드민_어드민페이지_유저_컨택트메시지_답변완료_답변보기](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/c2f32519-9983-43e8-94e7-c483cdee5571)|![어드민_어드민페이지_유저_컨택트메시지_답변완료_답변수정가능](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/61feb0fb-bb6a-47c5-8ba8-e6a0dd0c6197)|![어드민_어드민페이지_유저_컨택트메시지_답변완료_삭제가능](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/d5e8dc02-ba49-4e3f-9fad-4b8da0da779c)|

<br />

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br />
 
### 5) 비로그인 시

- 마이 인디 접근 시  

  |마이 인디 접근|알림|로그인 페이지로 이동|
  |---|---|---|
  |![비로그인_컨택트메시지접근](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/043953be-f3ee-4552-9da8-ee4119c3f65d)|![비로그인_컨택트메시지접근_알림](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/4e0ca600-f69d-4b78-aa4b-dfc46109e0b5)|![로그인페이지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/ef16c50e-4e6b-432c-ba13-359339e37f01)|
  <br />
  
- 컨택트 메시지 접근 시

  |컨택트 메시지 접근|알림|로그인 페이지로 이동|
  |---|---|---|
  |![비로그인_마이인디접근](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/5fac5e6e-96df-4bdd-9f13-86d75dc2ff7f)|![비로그인_마이인디접근_알림](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/4e1ef461-2c2c-4ce9-8d4b-0641f4e915a6)|![로그인페이지](https://github.com/Jaharim/Oh-My-Indie/assets/83650872/ef16c50e-4e6b-432c-ba13-359339e37f01)|

  

<!-- Top Button -->
<p style='background: black; width: 32px; height: 32px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-left: auto;'><a href="#top" style='color: white; '>▲</a></p>

<br />
