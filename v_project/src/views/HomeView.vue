<template>
  <div id="Homeview">
    <!-- 쳇봇 -->
    <div
      @click="showModal = true"
      id="chat_bot"
      style="width: 85px; height: 85px; position: fixed; top: 90%; left: 94%"
    >
      <img
        src="../../public/chatbot.png"
        style="width: 100%; height: 100%; /* position: fixed; */"
        @click="showModal = true"
      />
    </div>
    <!-- // 쳇봇 -->
    <div v-if="showModal" id="modal">
      <!-- 모달 창 -->
      <div id="modal_content">
        <img
          src="../../public/logo_ver2.png"
          alt="logo"
          style="position: relative; left: 20%"
        /><br />
        질문 <input id="question" v-model="question" />
        <p>답변</p>
        <textarea id="response" v-model="response"></textarea>
        <button id="modal_click" @click="gpt3()">질문</button>
        <button id="modal_end" @click="showModal = false">취소</button>
      </div>
    </div>

    <!-- 사진, 명언집, 노래 or 게시글들 -->
    <div id="main_row_01">
      <div
        class="left"
        style="
          width: 680px;
          height: 350px;
          margin-left: 80px;
          border: 5px solid #ffe600;
        "
      >
        <!-- 사진들 오토레이어 -->
        <div id="row_01_imgs" class="slick-slider" ref="slickSliderHealth">
          <div
            style="margin: 0 20px"
            v-for="(healthimg, index) in healthimgs"
            :key="index"
            class="slick-slide"
          >
            <img :src="healthimg.image" />
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 명언집, 노래 등 -->
        <div
          id="row_01_content_01"
          style="
            width: 730px;
            height: 90px;
            margin-bottom: 20px;
            border-radius: 10px;
            background-color: #ffe600;
            padding-top: 15px;
            padding-left: 20px;
          "
        >
          <span style="font-weight: bold; font-size: 18px"> 오늘의 띵언 </span>
          <ul ref="slickSliderMaxim">
            <li
              v-for="(maxim, index) in maxims"
              :key="index"
              class="slick-slider"
              style="list-style: none"
            >
              <span class="maxim-content" style="font-weight: bold">{{
                maxim.content
              }}</span>
            </li>
          </ul>
        </div>
        <div
          id="row_01_content_02"
          style="
            width: 730px;
            height: 220px;
            background-color: #ffe600;
            border-radius: 10px;
            padding-top: 15px;
            padding-left: 20px;
          "
        >
          <span style="font-weight: bold; font-size: 18px">실시간 핫한 글</span>
          <ul>
            <li
              v-for="(post, index) in hotPosts"
              :key="index"
              style="font-weight: bold"
            >
              {{ post.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- // 사진, 명언집, 노래 or 게시글들 -->

    <!-- 오늘의 건강뉴스 -->
    <p
      style="
        font-weight: bold;
        color: white;
        letter-spacing: 1px;
        margin: 80px 0 0 80px;
      "
    >
      〈오늘의 건강 뉴스〉
    </p>
    <div>
      <div
        v-for="(article, index) in articles"
        :key="index"
        class="article"
        style="margin: 0 0 20px 80px"
      >
        <a
          :href="article.articleLink"
          target="_blank"
          style="text-decoration-line: none; color: white"
        >
          <h1>{{ article.title }}</h1>
          <div class="news_low1_content" style="display: flex">
            <img :src="article.imageUrl" alt="...로딩중" style="width: 300px" />
            <p style="margin-left: 20px; font-size: 18px; width: 72%">
              {{ article.summary }}
            </p>
          </div>
        </a>
      </div>
    </div>

    <!-- // 오늘의 건강뉴스 -->

    <!-- 오늘의 핫딜 상품들 -->
    <p
      style="
        font-weight: bold;
        color: white;
        letter-spacing: 1px;
        margin: 80px 0 0 80px;
      "
    >
      〈오늘의 핫딜 상품들〉
    </p>
    <div id="main_row_03">
      <div id="contents">
        <div id="slick-slider" ref="slickSlider">
          <div
            v-for="(product, index) in products"
            :key="index"
            class="slick-slide"
            style="margin: 20px"
          >
            <a :href="product.url">
              <img :src="product.image" />
              <div class="product-name">{{ product.name }}</div>
              <div class="product-price">{{ product.price }}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- // 오늘의 핫딜 상품들 -->
  </div>
</template>
<script>
import axios from 'axios'
import productsData from '../../public/products.js'
import maximData from '../../public/maxim.js'
import healthimgs from '../../public/healthimg.js'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import $ from 'jquery'
import 'slick-carousel'
import { gpt3 } from '../../gpt3.js'

export default {
  data() {
    return {
      products: productsData,
      maxims: maximData,
      healthimgs,
      slickSlider: null,
      slickSliderMaxim: null,
      slickSliderHealth: null,
      showModal: false,
      question: '',
      response: '',
      hotPosts: [],
      articles: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initSlickSlider()
    })
    this.fetchHotPosts()
    axios
      .get('/healthnews-data')
      .then((response) => {
        this.articles = response.data
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  },
  methods: {
    initSlickSlider() {
      const sliderOptions = {
        dots: true,
        arrows: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000
      }
      const sliderOptionsMaxim = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
      }
      const sliderOptionsHealth = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
      }

      const sliderElement = this.$refs.slickSlider
      const sliderElementMaxim = this.$refs.slickSliderMaxim
      const sliderElementHealth = this.$refs.slickSliderHealth
      this.slickSlider = $(sliderElement).slick(sliderOptions)
      this.slickSliderMaxim = $(sliderElementMaxim).slick(sliderOptionsMaxim)
      this.slickSliderHealth = $(sliderElementHealth).slick(sliderOptionsHealth)
    },
    gpt3: async function () {
      this.response = '타이핑중'
      const start = this.question
      const answer = await gpt3(start)
      this.response = answer
      // this.init + this.history +  // 현재 입력 + 기본 정보 + 이전 대화 기록
      // this.history += `인간: ${this.inData}\nAI: ${answer}\n` // 이전 대화 기록에 새로운 대화를 추가합니다.
      // if (this.history.length > 4000) {
      //   this.history = ''
      // }
    },
    fetchHotPosts() {
      axios
        .get('/get-hot-posts')
        .then((response) => {
          this.hotPosts = response.data
        })
        .catch((error) => {
          console.error('실시간 핫한 글 가져오기 오류:', error)
        })
    }
  },
  beforeUnmount() {
    if (this.slickSlider) {
      this.slickSlider.slick('unslick')
    }
    if (this.slickSliderMaxim) {
      this.slickSliderMaxim.slick('unslick')
    }
    if (this.slickSliderHealth) {
      this.slickSliderHealth.slick('unslick')
    }
  }
}
</script>
<style scoped>
#Homeview {
  height: 100%;
  background-color: black;
}

/* chat_bot */
#chat_bot:hover {
  cursor: pointer;
}

/* main_row_01 */
#main_row_01 {
  display: flex;
  margin-top: 60px;
}
#main_row_01 .left {
  margin-left: 60px;
  margin-right: 50px;
}
#main_row_01 div img {
  width: 680px;
  height: 350px;
  margin-left: -20px;
}

/* main_row_02 */
#main_row_02 {
  display: flex;
  margin-top: 50px;
  margin-left: 80px;
}
.article a :is(h1, p):hover {
  color: #ffe600;
}
#main_row_02 .left {
  display: flex;
  color: white;
}
#main_row_02 .right span {
  color: white;
}
:is(#right_row_01, #right_row_02) {
  margin-bottom: 5px;
}

/* main_row_03 */
#contents {
  margin: 0 0 0 80px;
  padding: 5px;
  width: 90%;
}
#contents #slick-slide {
  display: flex;
  margin-right: 30px;
}

#contents #slick-slide:hover {
  cursor: pointer;
}

#contents img {
  width: 210px;
}
#contents div {
  color: white;
  font-weight: bold;
}
#modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
#modal_content {
  border: 3px solid #ffe600;
  width: 500px;
  height: 500px;
  background-color: black;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  color: #ffe600;
}
#modal_click {
  position: absolute;
  bottom: 2%;
  left: 12.5%;
  background-color: #ffe600;
  font-weight: bold;
}
#modal_end {
  position: absolute;
  bottom: 2%;
  left: 25%;
  background-color: #ffe600;
  font-weight: bold;
}
#question {
  width: 50%;
  height: 5%;
  margin: 10px;
  background-color: #ffe600;
}
#response {
  width: 80%;
  height: 60%;
  margin: -35px 0 0 47px;
  background-color: #ffe600;
}
.left img {
  width: '400px';
  height: '285px';
}
</style>
