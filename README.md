# Bind 🌍

## 지인과 익명의 사람들과 소통하고 만나 추억을 쌓아보세요.

바인드는 지인 또는 익명의 사람들과 소통하고 대면하기 위한 앱입니다.\
게시물을 작성하고 장소를 선택하여 사람들과 만날 수 있습니다.\
게시물에 대해서 댓글로 궁금한 점이나 토론을 할 수도 있고 개인으로 채팅도 가능합니다.\
자신의 사진을 프로필에 올려 매력을 뽐내고 마음에 드는 상대방을 팔로워 해보세요!.

모두가 더 나은 🌍공동체가 되었으면 좋겠습니다

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/main_dark.png" alt="main_white" width="700px" />
</h2>
<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/main_white.png" alt="main_dark" width="700px" />
  <br>
</h2>

## Features

⚡️ 아름다운 모던 디자인\
⚡️ 싱글 페이지 어플리케이션 빌드 with React\
⚡️ Material-UI 컴포넌트 스타일링 + CSS in JS\
⚡️ 완전한 반응형\
⚡️ 라이트 & 다크 모드\
⚡️ Firebase Auth 회원 구현\
⚡️ Firestore 클라우드 데이터 베이스를 이용한 CRUD\
⚡️ Firestore 보안 규칙을 통해 유저 보안 강화\
⚡️ Firebase Storage를 이용해 개개인의 이미지 콘텐츠 저장\
⚡️ Firebase Cloud Function을 이용한 실시간 알림 기능\
⚡️ Firebase RealTime Database로 실시간 채팅에 최적화된 채팅, 댓글 기능

라이브로 보기, **[클릭](https://bind-5d6a6.firebaseapp.com/)**

## 루트 컴포넌트 살펴보기 🚀

각 컴포넌트 이미지와 최적화 부분을 설명합니다.

<br/>

### 이벤트 대시보드(홈)

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/main_dark.png" alt="main_white" width="700px" />
</h2>

### 로그인 폼

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/login.png" alt="login" width="700px" />
</h2>
로그인 컴포넌트

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/password.png" alt="login" width="700px" />
</h2>
비밀번호 찾기 컴포넌트

### 이벤트 게시 폼

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/eventForm.png" alt="login" width="700px" />
</h2>

**!중요 사항**:\
유료 기능이라 불가피하게 한도를 최대한 낮게 하였습니다. \
**_구글 Place API, GeoCode API 일일 할당량 100_,
_Firebase Storage 이미지 업로드 3MB 이하만 가능_**

<br>

### 이벤트 디테일

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/eventDetailed.png" alt="login" width="700px" />
</h2>
<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/eventDetailed2.png" alt="login" width="700px" />
</h2>

<br/>

### 알림 리스트

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/alram.png" alt="login" width="700px" />
</h2>

**최적화**:\
 [react-window](https://www.npmjs.com/package/react-window) 라이브러리를 사용해 마운트 시 렌더링을 빠르게 하였습니다.
<br/>

### 프로필

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/profile.png" alt="login" width="700px" />
</h2>
프로필 상단

<br/>

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/profile_events.png" alt="login" width="700px" />
</h2>
프로필 피드 탭

**최적화**:\
[react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller)를 사용해 마운트 시 데이터 요청을 적게하여 렌더링을 빠르게 하였습니다.
<br/>

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/profile_gallery.png" alt="login" width="700px" />
</h2>
프로필 갤러리 탭

**최적화**:\
[react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller) 라이브러리를 사용해 마운트 시 데이터 요청을 적게하여 렌더링을 빠르게 하였습니다.
<br/>

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/profile_follower.png" alt="login" width="700px" />
</h2>
프로필 팔로워/팔로잉 탭

**최적화**:\
 [react-window](https://www.npmjs.com/package/react-window) 라이브러리를 사용해 마운트 시 렌더링을 빠르게 하였습니다.

<br/>

### 채팅

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/chat2.png" alt="login" width="700px" />
</h2>

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/chat.png" alt="login" width="700px" />
</h2>

**최적화**:\
기존 데이터베이스에서 리얼타임 데이터베이스로 교체를 하여 새로운 채팅이 업데이트가 되고 UI에 리렌더링할 떄 채팅을 모두 요청을 하지않고 마지막 채팅 데이터만 요청하여
과도한 리렌더링 방지와 데이터 요청 개수를 줄였습니다.

<br/>

### 계정 설정

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/auth.png" alt="login" width="700px" />
</h2>

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/auth_no.png" alt="login" width="700px" />
</h2>
Auth 제공자가 다른 기업인 경우

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/auth2.png" alt="login" width="700px" />
</h2>

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/auth3.png" alt="login" width="700px" />
</h2>

<br/>

### 유저 검색

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/search.png" alt="login" width="700px" />
</h2>

**최적화**:\
디바운스 훅을 사용하여 요청 수를 줄였습니다.

### 404 Page

<h2 align="center">
  <img src="https://github.com/Leenamkwon/Bind/blob/main/example/error.png" alt="login" width="700px" />
</h2>

---

## 베포 📦

[Firebase Hosting](https://www.firebase.com/)

## 기술 🛠️

- [Firebase](https://www.firebase.com) - 구글의 앱 개발 플랫폼
- [Redux](https://ko.redux.js.org/introduction/getting-started/) - 상태 관리 라이브러리
- [Redux-Thunk](https://www.npmjs.com/package/redux-thunk) - 비동기 디스패치를 ​​수행하는 함수를 반환할 수 있게 해주는 Redux 미들웨어
- [React-Router](https://reactrouter.com/) - SPA 라우팅 라이브러리
- [React](https://es.reactjs.org/) - 프론트 엔드 자바스크립트 라이브러리
- [Material-UI](https://material-ui.com/) - 리액트 UI 라이브러리
- [Formik](https://formik.org/docs/api/field) - 리액트 폼 핸들링 라이브러리
- [Yup](https://www.npmjs.com/package/yup) - 폼 입력 검증 라이브러리
- [google-map-react](https://www.npmjs.com/package/google-map-react) - 리액트 구글 맵 라이브러리
- [react-places-autocomplete](https://www.npmjs.com/package/react-places-autocomplete) - 구글 Place Api와 Geocoding Api를 사용한 컴포넌트 라이브러리
- [react-window](https://www.npmjs.com/package/react-window) - 초기 렌더링과 업데이트를 처리하는데 시간을 줄여주는 최적화 라이브러리
- [react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller) - 무한 스크롤 라이브러리

## 제작 👥

- **이남권** - [https://github.com/Leenamkwon](https://github.com/Leenamkwon)
