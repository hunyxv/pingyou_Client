import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import user from './modules/user'
import ballot from './modules/ballot'
import audit from './modules/audit'
import admin from './modules/admin'
import statistics from './modules/statistics'


Vue.use(Vuex)

const state = {}

export default new Vuex.Store({
        state,
        modules:{
                home,
                user,
                ballot,
                audit,
                admin,
                statistics
        }
})