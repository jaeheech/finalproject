import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate' // vuex-persistedstate 임포트
export default createStore({
  state: {
    isLoggedIn: false
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    }
  },
  plugins: [createPersistedState()] // vuex-persistedstate 사용
})
