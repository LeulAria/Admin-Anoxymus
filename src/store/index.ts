import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';

// modules
import appModule from './modules/app'
import userModule from './modules/user'

Vue.use(Vuex)

// main states
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

export default new Vuex.Store({
  strict: true,
  devtools: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    app: appModule,
    user: userModule
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
      key: 'app-cache',
    }).plugin,
  ],
})
