import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

export default createStore({
  state: {
    isLoggedIn: Cookies.get('isLoggedIn') === 'true' || false, // 쿠키에서 로그인 상태 읽어오기
    username: Cookies.get('username') || null // 쿠키에서 username 읽어오기
  },
  mutations: {
    login(state, username) {
      state.isLoggedIn = true
      state.username = username // 상태(state)에 username 설정
      Cookies.set('isLoggedIn', true)
      Cookies.set('username', username) // 쿠키에 username 저장
    },
    logout(state) {
      state.isLoggedIn = false
      state.username = null
      Cookies.remove('isLoggedIn')
      Cookies.remove('username') // 쿠키에서 username 제거
    }
  },
  plugins: [createPersistedState()]
})
