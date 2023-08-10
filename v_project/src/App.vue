<template>
  <div id="app">
    <header style="margin: 20px 0">
      <img src="../public/logo.jpg" alt="logo" />
    </header>
    <nav>
      <router-link to="/">메인</router-link>
      <router-link to="/about">부위별 운동</router-link>
      <router-link to="/A">나만의 루틴</router-link>
      <router-link to="/neargym">집근처 헬스장</router-link>
      <router-link to="/C">각종 구매처</router-link>
      <router-link to="/D">자유게시판</router-link>
      <router-link to="/E">로그인</router-link>
      <router-link to="/F">마이페이지</router-link>
    </nav>
    <router-view class="main-content" />
    <Footer>
      <div id="footer_container">
        <div id="footer_up">
          <div id="Inf"></div>
          <div id="Adv"></div>
        </div>
        <div id="footer_down">
          <small
            >Copyright ⓒ Ministry of Patriots and Veterans Affairs. All Rights
            Reserved</small
          >
        </div>
      </div>
    </Footer>
  </div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #989898;
  display: flex;
  flex-direction: column;
}

#app {
  flex: 1; /* 남은 세로 공간을 채우기 위해 flex 사용 */
  display: flex;
  flex-direction: column;
}

header {
  height: auto; /* 헤더가 내용에 맞게 높이를 조정할 수 있도록 함 */
  padding: 20px 0;
  text-align: center;
}

nav {
  display: flex;
  font-size: 20px;
  color: #585656;
  background-color: #d9d9d9;
}

nav a {
  text-align: center;
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  display: inline-block; /* 링크가 너비를 내용에 맞게 조정하도록 설정 */
  padding: 10px 20px; /* 링크 내용 주위에 패딩 추가 */
}

nav a.router-link-active {
  background-color: #585656;
  color: white;
}

footer {
  background-color: #d9d9d9;
  padding: 10px 0;
  text-align: center;
}

/* 푸터 콘텐츠나 다른 요소에 대한 추가 스타일은 여기에 추가할 수 있습니다 */
</style>
