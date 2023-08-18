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
        <select name="" id="" v-model="station" @change="updateMapLocation">
          <option value="동대신동역">동대신동역</option>
          <option value="토성역">토성역</option>
          <option value="부산진역">부산진역</option>
          <option value="서면역">서면역</option>
        </select>
        <button @click="displayMarker">이동</button>
      </div>
      <div id="map" class="map-container"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      station: '',
      gpsx: 35.1578,
      gpsy: 129.0578
    }
  },
  mounted() {
    const gpsx = 35.1578
    const gpsy = 129.0578
    const mapContainer = document.getElementById('map')

    const script = document.createElement('script')
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=e139f221a53ae8e1de064297bd6fbdd1&autoload=false'
    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOptions = {
          center: new window.kakao.maps.LatLng(gpsx, gpsy),
          level: 4
        }

        const map = new window.kakao.maps.Map(mapContainer, mapOptions)

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            const locPosition = new window.kakao.maps.LatLng(lat, lon)
            const message = '<div>여기가 현재위치</div>'
            this.displayMarker(map, locPosition, message)
          })
        } else {
          alert(
            '이 문장은 사용상의 웹 브라우저가 Geolocation API를 지원하지 않을 때 나타납니다.'
          )
        }
      })
    }

    document.body.appendChild(script)
  },

  methods: {
    updateMapLocation() {
      switch (this.station) {
        case '동대신동역':
          this.gpsx = 35.1098
          this.gpsy = 129.0179
          break
        case '토성역':
          this.gpsx = 35.0995
          this.gpsy = 129.0196
          break
        case '부산진역':
          this.gpsx = 35.1278
          this.gpsy = 129.0477
          break
        case '서면역':
          this.gpsx = 35.1571
          this.gpsy = 129.0591
          break
        default:
          // Handle default case
          break
      }
    },
    displayMarker(map, locPosition, message) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: locPosition
      })

      const iwContent = message
      const iwRemovable = true
      const infowindow = new window.kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemovable
      })

      infowindow.open(map, marker)
      map.setCenter(locPosition)
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
  height: 50%;
}
#neargym_sidebar li {
  color: lightslategray;
  margin: 20px 0 10px 20px;
}
#neargym_sidebar li:nth-child(4) {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
#neargym_content {
  background-color: #d9d9d9;
  margin: 30px;
  width: 85%;
  height: 92%;
}
.map-container {
  width: 800px;
  height: 300px;
  padding: 100px;
}
</style>
