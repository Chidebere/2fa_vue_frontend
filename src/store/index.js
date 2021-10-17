import Vue from 'vue'
import Vuex from 'vuex'
import userAuths from './modules/userAuths'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    userAuths
  }
})
