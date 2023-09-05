<template>
  <div id="neargym_all">
    <div id="neargym_sidebar">
      <ul>
        <li v-for="v in sideBar" :key="v">{{ v }}</li>
      </ul>
    </div>
    <div id="neargym_content">
      <div id="neargym_content_title" style="border-bottom: 4px solid black">
        <h1 style="text-align: center; letter-spacing: 2px">집근처 헬스장</h1>
      </div>
      <p
        style="
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 1px;
          text-align: center;
          margin-top: 3%;
        "
      >
        우리집 근처 역은?
      </p>
      <select
        v-model="station"
        @change="moveToSelectedStation"
        style="
          width: 500px;
          height: 35px;
          border-radius: 10px;
          margin: 0 0 5% 32%;
          background-color: black;
          color: #ffe600;
          font-weight: bold;
          letter-spacing: 1px;
        "
      >
        <option value="">역을 선택하세요</option>
        <option value="동대신동역">동대신동역</option>
        <option value="토성역">토성역</option>
        <option value="부산진역">부산진역</option>
        <option value="서면역">서면역</option>
      </select>
      <div id="map" class="map-container"></div>
    </div>
  </div>
</template>
<script>
import gyms from '../../public/gym.js'

export default {
  data() {
    return {
      station: '',
      stationCoords: {
        동대신동역: { gpsx: 35.1098, gpsy: 129.0179 },
        토성역: { gpsx: 35.0995, gpsy: 129.0196 },
        부산진역: { gpsx: 35.1278, gpsy: 129.0477 },
        서면역: { gpsx: 35.1571, gpsy: 129.0591 }
      },
      gyms,
      map: null,
      sideBar: ['부위별 운동', '나만의 루틴', '집근처 헬스장', '자유게시판']
    }
  },
  mounted() {
    this.loadKakaoMapScript().then(() => {
      this.initMap()
    })
  },
  methods: {
    async loadKakaoMapScript() {
      return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_API_KEY}&libraries=services,drawing&autoload=false`
        script.onload = resolve
        document.body.appendChild(script)
      })
    },
    initMap() {
      window.kakao.maps.load(() => {
        this.map = new window.kakao.maps.Map(document.getElementById('map'), {
          center: new window.kakao.maps.LatLng(35.1578, 129.0578),
          level: 4
        })
        this.loadGymsMarkers()
      })
    },
    loadGymsMarkers() {
      for (const gymName in this.gyms) {
        const gymLocations = this.gyms[gymName]
        for (const locationName in gymLocations) {
          const { gpsx, gpsy } = gymLocations[locationName]
          const position = new window.kakao.maps.LatLng(gpsx, gpsy)
          this.displayMarker(position, locationName)
        }
      }
    },
    moveToSelectedStation() {
      this.map.setLevel(4, { animate: { duration: 500 } })

      if (this.station in this.stationCoords) {
        const { gpsx, gpsy } = this.stationCoords[this.station]
        const center = new window.kakao.maps.LatLng(gpsx, gpsy)
        this.map.setCenter(center)
      }
    },
    displayMarker(position, message) {
      const marker = new window.kakao.maps.Marker({
        position: position,
        map: this.map, // 마커를 지도에 추가
        icon: {
          url: 'https://previews.123rf.com/images/luka007/luka0071505/luka007150500106/39573588-%EC%A7%80%EB%8F%84-%ED%8F%AC%EC%9D%B8%ED%84%B0-%EC%95%84%EC%9D%B4%EC%BD%98.jpg',
          size: new window.kakao.maps.Size(10, 10)
        }
      })

      const iwContent = message
      const infowindow = new window.kakao.maps.InfoWindow({
        content: iwContent,
        removable: true
      })

      infowindow.open(this.map, marker)
    }
  }
}
</script>

<style scoped>
#neargym_all {
  display: flex;
  background-color: black;
  margin: 0;
  width: 100%;
  height: 100%;
}
#neargym_sidebar {
  background-color: #ffe600;
  margin: 30px 0 0 30px;
  width: 13%;
  height: 20%;
}
#neargym_sidebar li {
  color: lightslategray;
  margin: 30px 0 10px 20px;
}
#neargym_sidebar li:nth-child(3) {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
#neargym_content {
  background-color: #ffe600;
  margin: 30px;
  width: 85%;
  height: 92%;
}
#neargym_content select:hover {
  box-shadow: inset 3px 3px 3px black;
  cursor: pointer;
}
#neargym_content select option {
  text-align: center;
  background-color: black;
  color: #ffe600;
}
.map-container {
  width: 1000px;
  height: 700px;
  border-radius: 20px;
  margin: 2% 0 0 14%;
}
</style>
