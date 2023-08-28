<template>
  <div id="mylutin_all">
    <div id="mylutin_sidebar">
      <ul>
        <li v-for="v in sideBar" :key="v">{{ v }}</li>
      </ul>
    </div>
    <div id="mylutin_content">
      <h1>나만의 루틴</h1>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sideBar: ['부위별 운동', '나만의 루틴', '집근처 헬스장', '자유게시판']
    }
  }
}
</script>
<style scoped>
#mylutin_all {
  display: flex;
  background-color: #585656;
  margin: 0;
  width: 100%;
  height: 100%;
}
#mylutin_sidebar {
  background-color: #d9d9d9;
  margin: 30px 0 0 30px;
  width: 13%;
  height: 20%;
}
#mylutin_sidebar li {
  color: lightslategray;
  margin: 30px 0 10px 20px;
}
#mylutin_sidebar li:nth-child(2) {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
#mylutin_content {
  background-color: #d9d9d9;
  margin: 30px;
  width: 85%;
  height: 92%;
}
</style>
