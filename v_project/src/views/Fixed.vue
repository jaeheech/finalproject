<template>
  <div id="fixed_all">
    <div id="fixed_sidebar">
      <ul>
        <li v-for="item in sideBar" :key="item">
          <a :href="getLink(item)" style="text-decoration: none">{{ item }}</a>
        </li>
      </ul>
    </div>
    <div id="fixed_content">
      <div id="fixed_content_title" style="border-bottom: 4px solid white">
        <h1 style="text-align: center; letter-spacing: 2px">운동자세 교정</h1>
      </div>
      <select
        id="expose"
        v-model="expose"
        style="
          width: 500px;
          height: 35px;
          border: none;
          border-radius: 10px;
          margin: 5% 0 0 30%;
          background-color: #ffe4e4;
          color: black;
          font-weight: bold;
          letter-spacing: 1px;
          text-align: center;
        "
      >
        <option value="">운동을 고르시오</option>
        <option value="squart">스쿼트</option>
        <option value="pullUp">풀업</option>
      </select>
      <div id="fixed_content_cam">
        <div id="cam">
          <video
            ref="video"
            id="video"
            width="700"
            height="500"
            autoplay
            muted
            playsinline
            style="position: absolute"
          ></video>
          <canvas ref="canvas" id="canvas" style="position: absolute"></canvas>
        </div>
        <div
          id="result_label"
          style="
            background-color: #ffe4e4;
            color: black;
            display: inline-block;
            letter-spacing: 2px;
            font-size: 18px;
            padding: 10px 20px;
          "
        >
          {{ poseResult }}
        </div>
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
import * as posenet from '@tensorflow-models/posenet'
import * as tf from '@tensorflow/tfjs'
// import '@tensorflow/tfjs-backend-webgl'
export default {
  data() {
    return {
      sideBar: ['부위별 운동', '운동자세 교정', '집근처 헬스장', '자유게시판'],
      poseResult: '운동 자세를 선택하고 시작해주세요',
      epose: '',
      model: '',
      expose: ''
    }
  },
  mounted() {
    this.initializeCamera()
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
    },
    async initializeCamera() {
      const video = document.getElementById('video')
      const canvas = document.getElementById('canvas')
      try {
        const context = canvas.getContext('2d')
        console.log('video element:', video)
        console.log('canvas element:', canvas)
        console.log('canvas context:', context)
        await tf.data.webcam(video)
        this.loadPoseNetModel(video, canvas, context)
      } catch (error) {
        console.error('Error initializing camera:', error)
      }
    },
    async loadPoseNetModel(video, canvas, context) {
      try {
        const model = await posenet.load()
        console.log('PoseNet model:', model)

        const predict = async () => {
          const pose = await model.estimateSinglePose(video)
          console.log('Estimated pose:', pose)
          canvas.width = video.width
          canvas.height = video.height
          this.drawKeypoints(pose.keypoints, 0.6, context, 1)
          this.drawSkeleton(pose.keypoints, 0.6, context, 1)
          if (this.expose === 'squart') {
            this.analyzePoseSquart(pose)
          }
          if (this.expose === 'pullUp') {
            this.analyzePosePullUp(pose)
          }
          // 이 부분 수정
          requestAnimationFrame(predict)
        }

        predict() // 비동기 함수를 호출
      } catch (error) {
        console.error('Error loading PoseNet model:', error)
      }
    },
    toTuple({ y, x }) {
      return [y, x]
    },
    drawPoint(ctx, y, x, r) {
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      ctx.fillStyle = 'yellow' // 이미 선언된 color 변수 사용
      ctx.fill()
    },
    drawSegment([ay, ax], [by, bx], color, scale, ctx) {
      // ctx 위치 변경
      ctx.beginPath()
      ctx.moveTo(ax * scale, ay * scale)
      ctx.lineTo(bx * scale, by * scale)
      ctx.lineWidth = 2
      ctx.strokeStyle = color
      ctx.stroke()
    },
    drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
      for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i]
        if (keypoint.score < minConfidence) {
          continue
        }
        const { y, x } = keypoint.position
        this.drawPoint(ctx, y * scale, x * scale, 3)
      }
    },
    drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
      const color = 'yellow'
      const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
        keypoints,
        minConfidence
      )
      adjacentKeyPoints.forEach((keypoints) => {
        this.drawSegment(
          this.toTuple(keypoints[0].position),
          this.toTuple(keypoints[1].position),
          color,
          scale,
          ctx // ctx를 마지막 인자로 전달
        )
      })
    },
    analyzePoseSquart(pose) {
      const leftHip = pose.keypoints[11].position.y
      const leftKnee = pose.keypoints[13].position.y

      // 임의의 기준을 설정하여 스쿼트 자세 여부를 판단
      const threshold = 10 // 이 값은 조절할 수 있음

      if (Math.abs(leftHip - leftKnee) < threshold) {
        this.poseResult = '올바른 스쿼트 자세입니다.'
      } else {
        this.poseResult = '엉덩이를 내리세요.'
      }
      tf.dispose()
    },
    analyzePosePullUp(pose) {
      const leftelbow = pose.keypoints[7].position.y
      const leftshoulder = pose.keypoints[5].position.y

      // 임의의 기준을 설정하여 스쿼트 자세 여부를 판단
      const threshold = 10 // 이 값은 조절할 수 있음

      if (Math.abs(leftshoulder - leftelbow) < threshold) {
        this.poseResult = '올바른 풀업 자세입니다.'
      } else {
        this.poseResult = '좀더 올라가주세요.'
      }
      tf.dispose()
    }
  }
}
</script>

<style scoped>
#fixed_all {
  display: flex;
  background-color: white;
  margin: 0;
  width: 100%;
  height: 100%;
}
#fixed_sidebar {
  background-color: #ffbfbf;
  border-radius: 15px;
  margin: 30px 0 0 30px;
  width: 13%;
  height: 20%;
}
#fixed_sidebar li {
  color: darkgray;
  margin: 30px 0 10px 20px;
}
#fixed_sidebar li a:visited {
  color: darkgray;
}
#fixed_sidebar li:nth-child(2) {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
#fixed_sidebar li:nth-child(2) a:visited {
  color: black;
}
#fixed_content {
  background-color: #ffbfbf;
  border-radius: 15px;
  margin: 30px;
  width: 85%;
  height: 92%;
}
#expose option {
  text-align: center;
  background-color: #ffe4e4;
  color: black;
}
#fixed_content_cam {
  width: 80%;
  height: 43%;
  margin-top: 5%;
  margin-left: 22%;
}
#fixed_content_cam #cam {
  width: 100%;
  height: 90%;
}
#warning_point {
  background-color: #ffe4e4;
  display: inline-block;
  margin: 6% 0 0 18%;
  padding: 10px 20px;
}
#warning_point h2,
h4 {
  color: black;
}
#warning_point h4 {
  margin-left: 15px;
}
</style>
