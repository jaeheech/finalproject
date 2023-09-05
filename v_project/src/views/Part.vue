<template>
  <div id="part_all">
    <!-- 좌측 네비 파트 -->
    <div id="part_sidebar">
      <ul>
        <li v-for="v in sideBar" :key="v">{{ v }}</li>
      </ul>
    </div>
    <!-- // 좌측 네비 파트 -->

    <!-- 우측 content 파트 -->
    <div id="part_content">
      <div id="part_content_title" style="border-bottom: 4px solid black">
        <h1 style="text-align: center; letter-spacing: 2px">부위별 운동</h1>
      </div>
      <!-- selection 파트 -->
      <div id="part_content_selection" style="margin: 2% 0 2% 30%">
        <!-- 각 체크박스에 v-model 추가 -->
        <label v-for="part in parts" :key="part">
          <input
            type="checkbox"
            :id="part"
            :value="part"
            v-model="selectedParts"
          />
          {{ part }}
        </label>
      </div>
      <!-- // selection 파트 -->

      <!-- result 파트 -->
      <div id="part_content_result" style="margin: 0 0 0 5%">
        <div
          id="GEcard_vfor"
          v-for="(gymEquipment, index) in filteredEquipment"
          :key="index"
        >
          <div id="GEcard">
            <div id="GEcard_img">
              <img :src="gymEquipment.image" />
            </div>
            <p id="GEcard_name">명칭: {{ gymEquipment.name }}</p>
            <p id="GEcard_part">부위: {{ gymEquipment.part }}</p>
            <p id="GEcard_disciption">횟수: {{ gymEquipment.disciption }}</p>
          </div>
        </div>
      </div>
      <!-- // result 파트 -->
    </div>
    <!-- // 우측 content 파트 -->
  </div>
</template>
<script>
import gymEquipmentData from '../../public/gymEquipment.js'

export default {
  data() {
    return {
      sideBar: ['부위별 운동', '나만의 루틴', '집근처 헬스장', '자유게시판'],
      gymEquipmentData,
      parts: ['어깨', '가슴', '등', '하체', '이두', '삼두'],
      selectedParts: [] // 선택한 부위들을 담을 배열
    }
  },
  computed: {
    // 선택한 부위에 따라 필터링된 운동 기구 데이터를 반환
    filteredEquipment() {
      if (this.selectedParts.length === 0) {
        return this.gymEquipmentData // 아무 부위 선택 안한 경우 모든 데이터 반환
      } else {
        return this.gymEquipmentData.filter((equipment) =>
          this.selectedParts.includes(equipment.part)
        )
      }
    }
  }
}
</script>
<style scoped>
#part_all {
  display: flex;
  background-color: black;
  margin: 0;
  width: 100%;
  height: 100%;
}
#part_sidebar {
  background-color: #ffe600;
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
  background-color: #ffe600;
  margin: 30px;
  width: 85%;
  height: 92%;
}
#part_content_selection input[type='checkbox'] {
  width: 20px;
  height: 20px;
}
#part_content_selection label {
  font-size: 20px;
  margin-right: 20px;
}
#part_content_result {
  display: flex;
  flex-wrap: wrap;
}
#GEcard {
  background-color: black;
  width: 230px;
  height: 270px;
  margin: 0 20px 20px 0;
}
#GEcard_img img {
  margin: 15px 0 0 15px;
  width: 200px;
  height: 120px;
}
#GEcard p {
  text-align: left;
  color: white;
  font-weight: bold;
  font-size: 15px;
  margin-left: 15px;
}
</style>
