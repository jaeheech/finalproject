<template>
  <div id="part_all">
    <div id="part_sidebar">
      <ul>
        <li v-for="v in sideBar" :key="v">{{ v }}</li>
      </ul>
    </div>
    <div id="part_content">
      <h1>부위별 운동</h1>
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
#part_all {
  display: flex;
  background-color: #585656;
  margin: 0;
  width: 100%;
  height: 100%;
}
#part_sidebar {
  background-color: #d9d9d9;
  margin: 30px 0 0 30px;
  width: 13%;
  height: 20%;
}
#part_sidebar li {
  color: lightslategray;
  margin: 30px 0 10px 20px;
}
#part_sidebar li:first-child {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
#part_content {
  background-color: #d9d9d9;
  margin: 30px;
  width: 85%;
  height: 92%;
}
</style>
