<template>
        <div class="container">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                        <div class="login-div">
                                <div class="panel-heading">
                                        <h3 class="panel-title">
                                                <strong>评优评先管理系统</strong>
                                        </h3>
                                </div>
                                <div class="panel-body">
                                        <form role="form" @submit.prevent="login">
                                                <div class="form-group">
                                                        <label for="username_sid" style="float: left; margin-left: 2px">用户名或学号</label>
                                                        <input type="text" class="form-control" placeholder="请输入用户名或邮箱" v-model="username_sid">
                                                </div>
                                                <div class="form-group">
                                                        <label for="password" style="float: left; margin-left: 2px">密码</label>
                                                        <input type="password" class="form-control" placeholder="请输入密码" v-model="password">
                                                </div>
                                                <div class="form-group">
                                                        <button type="submit" class="btn login-btn btn-block">登录</button>
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
                <div class="col-md-4"></div>
        </div>
</template>

<script>
import axios from 'axios'
import {config} from '../store/config'

export default {
        data: () => ({
                url: config.url.baseUrl + config.url.login,
                username_sid:'',
                password:''
        }),
        created() {

        },
        methods:{
                login: function (){
                        axios.post(this.url, {
                                username_sid: this.username_sid,
                                password: this.password
                        })
                        .then(response => {
                                let token = response.data.data.access_token
                                this.$cookie.set('token', token, {expires: '14D'})
                                axios({
                                        url: config.url.baseUrl + config.url.me,
                                        method: 'get',
                                        headers:{
                                                Authorization: 'JWT '+ token
                                        }
                                })
                                        .then(response => {
                                                this.$cookie.set('me', JSON.stringify(response.data.data), {expires: '14D'})
                                                this.$cookie.set('needRefresh', true, {expires: '14D'})
                                                if(response.data.data.role === 'Administrator'){
                                                        this.$router.push('/admin')
                                                }else{
                                                        this.$router.push('/home')
                                                }
                                        })
                                        .catch(e => {
                                                console.log(e)
                                        })
                        })
                        .catch(e => {
                                alert('请填写正确的用户名和密码')
                        })
                }
        }
}
</script>



<style scoped>
.container{
  margin-top: 20%;
}
.login-div{
  background: rgba(0, 0, 0, .5)
}
.panel-title{
  color: #fff;
  text-align: center
}
.login-div label{
  color: #fff;
}
.login-btn{
  color:#fff;
  background: #3f89ec;
  letter-spacing: 5px;
}
</style>
