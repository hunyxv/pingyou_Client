<template>
  <div id="app">
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="nav-menu sideBar" v-show="$cookie.get('token')">
      <ul>
        <!-- <router-link to="/recommend" active-class="menu-item selected" tag="li" class="menu-item">
          <a>
            <span class="glyphicon glyphicon-star" aria-hidden="true"></span>公司推荐</a>
        </router-link> -->
         <router-link to="/home" active-class="menu-item selected" tag="li" class="menu-item" v-if="me.role !== 'Administrator'">
                <a><span class="glyphicon glyphicon-home" aria-hidden="true"></span>首页</a>
        </router-link>
       <router-link to="/user" active-class="menu-item selected" tag="li" class="menu-item" v-if="me.role !== 'Administrator'">
                 <a><span class="glyphicon glyphicon-user" aria-hidden="true"></span>用户</a>
        </router-link>
        <router-link to="/ballot" active-class="menu-item selected" tag="li" class="menu-item" v-if="me.role !== 'Administrator'">
                 <a><span class="glyphicon glyphicon-flag" aria-hidden="true"></span>投票</a>
        </router-link>
        <router-link to="/audit" active-class="menu-item selected" tag="li" class="menu-item" v-if="me.role === 'Counselor'">
                <a><span class="glyphicon glyphicon-check" aria-hidden="true"></span>审核</a>
        </router-link>
        <router-link to="/score" active-class="menu-item selected" tag="li" class="menu-item" v-if="me.role !== 'Counselor'" v-show="me.role !== 'Administrator'">
                <a><span class="glyphicon glyphicon-object-align-left" aria-hidden="true"></span>考核积分</a>
        </router-link>
        <router-link to="/statistics" active-class="menu-item selected" tag="li" class="menu-item">
          <a>
            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>统计</a>
        </router-link> 
       <!-- <router-link v-if="me && me.level === 2 && me.is_sales_manager" to="/statistic" active-class="menu-item selected" tag="li" class="menu-item">
          <a>
            <span class="glyphicon glyphicon-stats" aria-hidden="true"></span>统计</a>
        </router-link> -->
      </ul>
      <div class="nav-menu-footer">
        <div class="admin-info" v-show="me">
          <a href="javascript:;" class="admin-avatar" v-show="me">
            <img src="https://rs.ingageapp.com/static/img/default_face.png" class="userpic" alt="">
          </a>
          <div class="personal-info">
            <a href="javascript:;">
                <span class="peopel-name">{{ me && me.name }}</span><br>
                <span>{{me && me.department}}</span>
                <span v-if="me" class="company-name label label-info">{{me.role}}</span>
              
            </a>
          </div>
        </div>
        <a @click="loginOut()">
          <span class="glyphicon glyphicon-log-out"></span>
          <strong>退出</strong>
        </a>
      </div>
    </div>
    <div :class="['main_content',{'bg':!$cookie.get('token')}]">
      <router-view/>
    </div>
  </div>
</template>

<script>
import util from './util'

export default {
        name: 'App',
        data:() => ({
                me: false,
        }),
        created (){
                util.me()
                        .then(res => {
                                let me = res.data.data
                                if (me.confirmed){
                                        this.me = me
                                        this.$cookie.set('me', JSON.stringify(me), {expires: '14D'})
                                }else{
                                        alert('你已毕业， 无权登录')
                                        this.$cookie.delete('token')
                                        this.$cookie.delete('me')
                                        this.$router.push('/login')
                                }
                        })
        },
        methods:{
                loginOut(){
                        if (confirm('确定要退出吗？')){
                                this.$cookie.delete('token')
                                this.$cookie.delete('me')
                                this.$router.push('/login')
                                this.me = false
                        }
                }
        }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.bg{
  background:url('../static/crmBg.jpg') no-repeat;
  background-size:100% 100%;
  padding-left: 0!important;
}
html,
body {
  width: 100% !important;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-default {
  border: 0;
}

.logo {
  max-width: 100px;
}

.navbar-brand {
  font-size: 20px !important;
  font-weight: 700;
}

.menu-item {
  font-size: 14px !important;
  font-weight: 700;
}

.login-out {
  display: inline-block;
  line-height: 50px;
  cursor: pointer;
}

.nav-menu {
  width: 220px;
  font-weight: 100;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 220px;
  height: 100%;
  color: #c0ddf8;
  background: #363d4d;
}

.main_content {
  width: 100%;
  height: 100%;
  padding: 10px 10px 0px 230px;
  overflow-y: auto;
  overflow-x: hidden
}
a{
  color: rgb(0, 112, 210);
}
/* button {
  border-radius: 0!important;
} */

.panel-container {
  background: #fff;
  min-height: 550px;
}

.nav-menu ul {
  padding-top: 67px;
  padding-left: 0;
}

.nav-menu li {
  list-style: none;
  line-height: 40px;
  height: 40px;
  padding-left: 20px;
}

.nav-menu a {
  display: block;
  text-align: left;
  font-size: 15px;
  color: #a3b1cc!important;
}

.nav-menu a:hover {
  text-decoration: none;
  color: #fff;
}

.nav-menu a span {
  margin-right: 10px;
}

.nav-menu .selected,.sideBar li:hover{
  background: #2d3143;
  box-shadow: inset 2px 0 0 #00aaef;
  transition-duration: 500ms;
  transition-property: width, background;
  transition-timing-function: ease;
  -webkit-transition-duration: 500ms;
  -webkit-transition-property: width, background;
  -webkit-transition-timing-function: ease;
}

.nav-menu .selected a ,.sideBar li a:hover{
  color: #00aaef!important;
}

.footer {
  width: 100%;
  display: block;
  text-align: center;
}

.nav-menu-footer {
  position: fixed;
  bottom: 0;
  height: 100px;
  padding: 0 0 0 20px;
}

.admin-info a.admin-avatar {
  line-height: 40px;
  float: left;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  text-align: center;
  border-radius: 50px;
  background: #fff;
}

.admin-info .userpic {
  display: block;
  float: left;
  width: 36px;
  height: 36px;
  margin: 2px auto 0 2px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50px;
}

.personal-info a {
  font-weight: bold;
  margin-bottom: 20px;
}

.panel-container nav {
  text-align: center;
}

.breadcrumb {
  margin-bottom: 0;
}
.pagination{
  margin: 0;
}
.navbar{
  margin-bottom: 10px!important;
}
.icon-container {
  width: 40px;
  height: 40px;
  min-width: 40px;
  padding-top: 4px;
  font-size: 28px;
  border-radius: 5px;
  float: left;
  text-align: center;
  vertical-align: middle;
  color: #ffffff;
}
.yellow {
  background-color: #FCB95B !important;
}
.green {
  background-color: #6EC06E !important;
}
.purple {
  background-color: #A094ED !important;
}
.pink {
  background-color: #F06292 !important;
}
.orange {
  background-color: #FFA726 !important;
}
.red {
  background-color: #E53935 !important;
}
.blue {
  background-color: #42A5F5 !important;
}
.panel{
  padding: 14px;
}
</style>
