import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import User from '@/components/User'
import Ballot from '@/components/Ballot'
import Audit from '@/components/Audit'
import Score from '@/components/Score'

Vue.use(Router)

export default new Router({
        mode: 'history',
        routes: [
                {
                        path: '/',
                        name: 'home',
                        redirect: '/home'
                },
                {
                        path: '/home',
                        name: 'Home',
                        component: Home
                },
                {
                        path:'/login',
                        name: 'Login',
                        component: Login
                },
                {
                        path:'/user',
                        name: 'User',
                        component: User
                },
                {
                        path:'/ballot',
                        name: 'Ballot',
                        component:Ballot
                },
                {
                        path: '/audit',
                        name: 'Audit',
                        component: Audit
                },
                {
                        path: '/score',
                        name: 'Score',
                        component: Score
                }
        ]
})
