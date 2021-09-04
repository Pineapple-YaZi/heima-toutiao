import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const hmttToken = 'HETT-TOKEN'
export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem(hmttToken))
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      localStorage.setItem(hmttToken, JSON.stringify(payload))
    }
  },
  actions: {
  },
  modules: {
  }
})
