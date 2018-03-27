// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'

import App from './App'
import router from './router'
import store from './store'

import util from './util'
import { Poptip, Switch, Tabs } from 'iview'


Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.use(Vuex)
Vue.component('Poptip', Poptip)
Vue.component('i-switch', Switch)
Vue.component('Tabs', Tabs)


// Global hook
router.beforeEach((to, from, next) => {
        let needRefresh = Vue.cookie.get('needRefresh')
        if (needRefresh === 'true'){
                Vue.cookie.set('needRefresh', false,{ 'expires': '14D' })
                window.location.replace('/home')
        }
        if (Vue.cookie.get('token')){
                next()
        }else{
                if (to.path === '/login'){
                        next()
                }else{
                        next('/login')
                }
        }
})

Vue.filter('mapProjectStatus', function(state){
        let stateMap = {
                0: '未开始',
                1: '开始投票',
                2: '结束',
                3: '作废'
        }
        if (stateMap.hasOwnProperty(state)){
                return stateMap[state]
        }else{
                return '未知'
        }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
