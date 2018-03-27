import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'


Vue.use(Vuex)

const state = {}

export default new Vuex.Store({
        state,
        modules:{
                home,
        }
})