<template>
  <div id="fixed_all">
    <div id="fixed_sidebar">
      <ul>
        <li v-for="item in sideBar" :key="item">
          <a :href="getLink(item)">{{ item }}</a>
        </li>
      </ul>
    </div>
    <div id="fixed_content">
      <div id="fixed_content_title" style="border-bottom: 4px solid black">
        <h1 style="text-align: center; letter-spacing: 2px">운동자세 교정</h1>
      </div>
      <div id="fixed_content_cam">
        <div id="cam">
          <video
            src=""
            id="video"
            width="640"
            height="480"
            autoplay
            muted
            playsinline
            style="position: absolute"
          ></video>
          <canvas id="canvas" style="position: absolute"></canvas>
        </div>
        <button style="position: absolute; top: 65%">pose</button>
        <p id="rst">결과 출력</p>
      </div>
      <div id="warning_point">
        <h2>촬영시 주의사항 <small>📢필독</small></h2>
        <h4>
          📌 인식오류를 띄울 수 있으니 가급적 밝은 곳에서 촬영을 진행해주시기를
          당부드립니다.
        </h4>
        <h4>
          📌 촬영중임을 주위사람들에게 알리고, 미리 양해를 구하신 후 본 촬영에
          임해주시기를 바랍니다.
        </h4>
        <h4>
          📌 본 촬영은 짧은 녹화본을 토대로 결과를 도출하기 때문에 가급적 유동
          인구가 적은곳에서 하십시오.
        </h4>
        <h4>
          📌 양해를 구하지않고 진행할시 초상권 침해 등을 위반하는 행위이며 이에
          대한 책임은 촬영자 본인에게 있습니다.
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sideBar: ['부위별 운동', '운동자세 교정', '집근처 헬스장', '자유게시판']
    }
  },
  methods: {
    getLink(item) {
      switch (item) {
        case '부위별 운동':
          return 'http://localhost:3000/part'
        case '운동자세 교정':
          return 'http://localhost:3000/fixed'
        case '집근처 헬스장':
          return 'http://localhost:3000/neargym'
        case '자유게시판':
          return 'http://localhost:3000/Board'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
#fixed_all {
  display: flex;
  background-color: black;
  margin: 0;
  width: 100%;
  height: 100%;
}
#fixed_sidebar {
  background-color: #ffe600;
  margin: 30px 0 0 30px;
  width: 13%;
  height: 20%;
}
#fixed_sidebar li {
  color: lightslategray;
  margin: 30px 0 10px 20px;
}
#fixed_sidebar li:nth-child(2) {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
#fixed_content {
  background-color: #ffe600;
  margin: 30px;
  width: 85%;
  height: 92%;
}
#fixed_content_cam {
  background-color: darkcyan;
  width: 80%;
  height: 50%;
  margin-top: 5%;
  margin-left: 10%;
}
#fixed_content_cam #cam {
  background-color: azure;
  width: 100%;
  height: 90%;
}
#warning_point {
  margin-top: 6%;
  margin-left: 10%;
}
#warning_point h4 {
  margin-left: 15px;
}
</style>
