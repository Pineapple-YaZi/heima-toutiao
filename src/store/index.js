import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

const hmttToken = 'HMTT-TOKEN'
export default new Vuex.Store({
  state: {
    user: getItem(hmttToken)
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setItem(hmttToken, payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
