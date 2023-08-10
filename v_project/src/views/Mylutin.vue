<template>
  <div id="neargym_all">
    <div id="neargym_sidebar">
      <ul>
        <li>메인</li>
        <li>부위별 운동</li>
        <li>나만의 루틴</li>
        <li>집근처 헬스장</li>
        <li>각종 구매처</li>
        <li>자유게시판</li>
        <li>마이페이지</li>
      </ul>
    </div>
    <div id="neargym_content">
      <h1>집근처 헬스장</h1>
      <div id="neargym_content_select">
        우리집 근처 역은?
        <select name="" id="" v-model="station">
          <option value="">동대신동역</option>
          <option value="">부산진역</option>
          <option value="">토성역</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      station: ''
    }
  }
}
</script>
<style scoped>
#neargym_all {
  display: flex;
  background-color: #585656;
  margin: 0;
  width: 100%;
  height: 100%;
}
#neargym_sidebar {
  background-color: #d9d9d9;
  margin: 30px 0 0 30px;
  width: 12%;
  height: 45%;
}
#neargym_sidebar li {
  color: lightslategray;
  margin: 20px 0 10px 20px;
}
#neargym_sidebar li:nth-child(3) {
  color: black;
  font-weight: bold;
}
#neargym_content {
  background-color: #d9d9d9;
  margin: 30px;
  width: 85%;
  height: 92%;
}
</style>
