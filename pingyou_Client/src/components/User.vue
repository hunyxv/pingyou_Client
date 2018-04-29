<template>
        <div class="row">
                <div class="col-md-12" style="padding-boottom: 48%">
                        <spinner :show='loading'></spinner>
                        <nav class="navbar navbar-default">
                                <ol class="breadcrumb">
                                        <li>
                                                <a href="/user"> 用户 </a>
                                        </li>
                                        <li class="action">用户管理</li>
                                </ol>
                        </nav>
                </div>
                <!-- 添加班级 -->
                <div class="col-md-12">
                        <div class="panel panel-primary">
                                <div class="panel-heading">
                                        <h4 class="panel-title">创建班级</h4>
                                </div>
                                <div class="panel-body">
                                        <div class="panel panel-default">
                                                <div class="panel-body">
                                                        <div class="col-md-2">
                                                                <div class="input-group">
                                                                        <span class="input-group-addon" id="sizing-addon2">专业</span>
                                                                        <select name="department" v-model="classinfo.department" class="form-control">
                                                                                <option v-for="item in department_list" :value="item.id" :key="item.id">{{item.name}}</option>
                                                                        </select>
                                                                </div>
                                                        </div>
                                                        <div class="col-md-2">
                                                                <div class="input-group">
                                                                        <span class="input-group-addon" id="sizing-addon2">班级</span>
                                                                        <select name="class" v-model="classinfo.class" class="form-control">
                                                                                <option v-for="item in class_list" :key="item.id" :value="item.id" v-show="item.name === '<无>'? false: true">{{item.name}}</option>
                                                                        </select>
                                                                </div>
                                                        </div>
                                                        <div class="col-md-2">  
                                                                <div class="input-group">
                                                                        <span class="input-group-addon" id="basic-addon1">班级人数</span>
                                                                        <input type="text" class="form-control" placeholder="30" aria-describedby="basic-addon1" v-model="classinfo.num">
                                                                </div>
                                                        </div>
                                                        <div class="col-md-2">
                                                                <div class="input-group">
                                                                        <span class="input-group-addon" id="basic-addon1">届</span>
                                                                        <input type="text" class="form-control" placeholder="例:2014" aria-describedby="basic-addon1" v-model="classinfo.start_sid">
                                                                </div>
                                                        </div>
                                                        <div class="col-md-2">
                                                                <div class="input-group">
                                                                        <span class="input-group-addon" id="basic-addon1">初始密码</span>
                                                                        <input type="text" class="form-control" placeholder="password" aria-describedby="basic-addon1" v-model="classinfo.password">
                                                                </div>
                                                        </div>
                                                        <div class="col-md-1" v-if="me.role === 'Counselor'">
                                                                <button type="button" class="btn btn-primary btn-circle" @click="createClassUser({id: 'all',data:classinfo})">  &nbsp;创&nbsp;建&nbsp;  </button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
                <div class="col-md-12">
                        <div class="panel panel-primary">
                                <ul class="nav nav-tabs" id="tabs">
                                        <li class="active" @click="getThisDepartmentUser('me')" v-show="me.role==='Counselor'? true : false"><a>我的信息</a></li>
                                        <li class="active"  v-if="me.role!=='Counselor'? true : false"><a>我班同学</a></li>
                                        <li v-for="item in department_list" :key="item.id" @click="getThisDepartmentUser(item.name)"><a>{{item.name}}</a></li>
                                </ul>
                                <div  v-show="me.role==='Counselor'? true : false">
                                        <!-- 老师的信息 -->
                                        <div v-show="status.myInfo">
                                                <table class="table table-hover"> 
                                                        <tbody>
                                                                <br>
                                                                <tr v-for="(v, k) in myinfoObj" :key="k">
                                                                        <th></th><th> {{ k | mapMyInfoFrom}} </th><th> {{v || "无"}} </th><th></th><th></th>
                                                                </tr>  
                                                        </tbody> 
                                                </table>
                                                <div class="col-md-6"></div>
                                                <div>
                                                                <button type="button" data-placement="top" data-toggle="modal" data-target="#myModal" class="btn btn-primary">修改信息</button>
                                                </div>   
                                        </div>
                                        <div class="col-md-12"  v-show="!status.myInfo">
                                                <label class="radio-inline" v-for="item in period" :key="item">
                                                        <input type="radio" name="period" id="inlineRadio1" value="option1" @click="getperiodName(item)"> {{item}} 届
                                                </label>
                                        </div>
                                        <div class="col-md-12"  v-show="!status.myInfo">
                                                <label class="radio-inline" v-for="item in class_list" :key="item.id" v-show="item.name === '<无>'? false : true">
                                                        <input type="radio" name="class" id="inlineRadio1" value="option1" @click="getThisClassUser(item.name)"> {{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                </label>
                                        </div>
                                        <table class="table table-hover" v-show="!status.myInfo">
                                                <thead>
                                                        <tr>
                                                                <th>学号</th>
                                                                <th>姓名</th>
                                                                <th>性别</th>
                                                                <th>班长 or 学生</th>
                                                                <th>操作</th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                         <tr v-for="user in thisClassUser" :key="user.id" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                                                                <th>{{user.s_id}}</th>
                                                                <th>{{user.name}}</th>
                                                                <th>{{user.gender | mapGenter}}</th>
                                                                <th>{{user.role | mapRole}}</th>
                                                                <th>
                                                                        <div class="btn-group" role="group" aria-label="...">
                                                                                <button type="button" class="btn btn-default"  v-if="user.role === 'Student'" @click="updateInfo({id: user.id, data:{role: 1}, class:user.class, department: user.department})">升为班长</button>
                                                                                <button type="button" class="btn btn-default" v-if="user.role !== 'Student'" @click="updateInfo({id: user.id, data:{role: 0}, class: user.class, department: user.department})">降为学生</button>
                                                                                <button type="button" class="btn btn-primary" data-placement="top" data-toggle="modal" data-target="#myModal" @click="chengeName({id:user.id, class:user.class, department: user.department})">编辑</button>
                                                                                <button type="button" class="btn btn-danger" @click="deleteStudent({id:user.id, class:user.class, department: user.department})">删除</button>
                                                                        </div>
                                                                </th>
                                                        </tr> 
                                                </tbody>
                                        </table>
                                </div>
                                <div  v-show="me.role !== 'Counselor' ? true : false">
                                        <table class="table table-hover">
                                                <thead>
                                                        <tr>
                                                                <th>学号</th>
                                                                <th>姓名</th>
                                                                <th>性别</th>
                                                                <th>职位</th>
                                                                <th v-if="me.role === 'Monitor' ">操作 </th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                         <tr v-for="user in all_user_list" :key="user.id" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                                                                <th>{{user.s_id}}</th>
                                                                <th>{{user.name}}</th>
                                                                <th>{{user.gender | mapGenter}}</th>
                                                                <th>{{user.role | mapRole}}</th>
                                                                <th v-if="me.role === 'Monitor' ">
                                                                        <button type="button" class="btn btn-primary" data-placement="top" data-toggle="modal" data-target="#changename" @click="chengeName({id:user.id, class:user.class, department: user.department})">
                                                                                编辑
                                                                        </button>
                                                                </th>
                                                        </tr> 
                                                </tbody>
                                        </table>
                                </div>
                        </div>
                </div>

                <!-- 修改信息 -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        &times;
                                                </button>
                                                <h4 class="modal-title" id="myModalLabel">
                                                        修改资料
                                                </h4>
                                        </div>
                                        <div class="modal-body">
                                                <div class="row">
                                                        <div class="col-md-10 col-md-offset-1"  v-show="status.myInfo">
                                                                <div class="form-group" >
                                                                        <label class="col-md-4 control-label">用户名：</label>
                                                                        <div class="col-md-6">
                                                                                <input type="text" v-model="me.username" class="form-control" placeholder="" required>
                                                                        </div>
                                                                </div>
                                                                <div class="form-group" >
                                                                        <label class="col-md-4 control-label">姓名：</label>
                                                                        <div class="col-md-6">
                                                                                <input type="text" v-model="me.name" class="form-control" placeholder="" required>
                                                                        </div>
                                                                </div>
                                                                <div class="form-group">
                                                                        <label class="col-md-4 control-label">性别：</label>
                                                                        <div class="col-md-6">
                                                                                        <select class="form-control" v-model="me.gender">
                                                                                        <option value="Male">男</option>
                                                                                        <option value="Female">女</option>
                                                                                        <option value="Secret">未知</option>
                                                                                </select>
                                                                        </div>
                                                                </div>
                                                                <div class="form-group" >
                                                                        <label class="col-md-4 control-label">Email：</label>
                                                                        <div class="col-md-6">
                                                                                <input type="text" class="form-control" v-model="me.email" placeholder="" required>
                                                                        </div>
                                                                </div>
                                                                <div class="form-group" >
                                                                        <label class="col-md-4 control-label">ＱＱ：</label>
                                                                        <div class="col-md-6">
                                                                                <input type="text" class="form-control" v-model="me.qq_num" required>
                                                                        </div>
                                                                </div>
                                                                <div class="form-group" >
                                                                        <label class="col-md-4 control-label">微信：</label>
                                                                        <div class="col-md-6">
                                                                                <input type="text" class="form-control" v-model="me.weixin" required>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <!-- //修改某个学生的姓名 -->
                                                         <div  v-show="!status.myInfo">
                                                                <div class="form-group" >
                                                                        <label class="col-md-4 control-label">姓名：</label>
                                                                        <div class="col-md-6">
                                                                                <input type="text" class="form-control" v-model="changename" placeholder="" required>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                                <div class="panel panel-info" v-show="status.myInfo">
                                                        <div class="panel-heading">
                                                                <h4 class="panel-title">
                                                                        <a data-toggle="collapse" data-parent="#accordion" 
                                                                        href="#collapseThree" @click="sendEmail()">
                                                                                点击修改密码，修改密码前要先保证你的邮箱已经提交
                                                                        </a>
                                                                </h4>
                                                        </div>
                                                        <div id="collapseThree" class="panel-collapse collapse">
                                                                <div class="panel-body">
                                                                        <div class="form-group" >
                                                                                <label class="col-md-4 control-label">密码：</label>
                                                                                <div class="col-md-6">
                                                                                        <input type="password" class="form-control" v-model="me.password" required>
                                                                                </div>
                                                                        </div>
                                                                        <div class="form-group" >
                                                                                <label class="col-md-4 control-label">验证码：</label>
                                                                                <div class="col-md-6">
                                                                                        <input type="text" class="form-control" v-model="me.code" required>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">
                                                        关闭
                                                </button>
                                                <button type="button" class="btn btn-primary" data-dismiss="modal" v-if="status.myInfo" @click="updateInfo({id:'me', data: me})" >
                                                        提交修改
                                                </button>
                                                <button type="button" class="btn btn-primary" data-dismiss="modal" v-if="!status.myInfo" @click="updateInfo({id:updataID, data: {name: changename}, class:thisClass, department: thisDepartment})" >
                                                        提交修改
                                                </button>
                                        </div>
                                </div><!-- /.modal-content -->
                        </div><!-- /.modal -->
                </div>
                <div class="modal fade" id="changename" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        &times;
                                                </button>
                                                <h4 class="modal-title" id="myModalLabel">
                                                        修改资料
                                                </h4>
                                        </div>
                                
                                        <div class="modal-body">
                                                <div class="row">
                                                        <div class="col-md-10 col-md-offset-1">
                                                                <div class="form-group" >
                                                                        <label class="col-md-4 control-label">姓名：</label>
                                                                        <div class="col-md-6">
                                                                                <input type="text" class="form-control" v-model="changename" placeholder="" required>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                        <button type="button" class="btn btn-default" data-dismiss="modal">
                                                                关闭
                                                        </button>
                                                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateInfo({id:updataID, data: {name: changename}, class:thisClass, department: thisDepartment})" >
                                                                提交修改
                                                        </button>
                                        </div>
                                 </div>
                        </div>
                </div>
        </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { get, delete_ } from '../api'

import Spinner from './Spinner.vue'
import util from '../util'
import { config } from '../store/config'


export default {
        name : 'User',
        data: () => ({
                updataID:'',
                changename:'',
                period:[],
                thisClass:'',
                thisDepartment:'',
                departmentName:'',
                periodName:0,
                loading: false,
                classinfo: {
                        department:'',
                        class:'',
                        num: 30,
                        start_sid:'',
                        password: 'password'
                },
                user_list:[],
                thisDepartmentUser: [],
                thisClassUser:[],
                myinfoObj: {},
        }),
        computed: {
                ...mapGetters('user',{
                        state:  'state',
                        all_user_list: 'user_list',
                        class_list: 'class_list',
                        department_list: 'department_list',
                        status:  'status',
                })
               
        },
        methods: {
                ...mapActions('user',{
                        reload: 'reload',
                        update: 'updateInfo',
                        createUser: 'createUser',   
                        deleteUser: 'deleteUser',
                         sendCode:'sendCode'
                }),
                reloadALL() {
                        if (this.me.role === 'Counselor'){
                                this.reload({item: 'department', params: {}})
                                this.reload({item: 'class', params: {}})
                        }
                        this.reload({item: 'all', params: {}})
                                .then(res => {
                                        this.loading = false
                                })
                },
                getThisDepartmentUser(departmentname){
                        this.departmentName = departmentname
                        this.thisClassUser = []
                         if (departmentname !== 'me'){
                                this.status.myInfo = false
                                let thisDepartmentUser = []
                                // for (let index in this.all_user_list){
                                //        let user = this.all_user_list[index]
                                //         if (user.department === departmentname){
                                //                 thisDepartmentUser.push(user)
                                //         }
                                // } 
                                // this.thisDepartmentUser = thisDepartmentUser
                        } else{
                                this.status.myInfo = true
                        }
                },
                getperiodName(periodname){
                        this.periodName = periodname
                },
                 getThisClassUser(classname){
                        this.status.myInfo = false
                        let thisClassUser = []
                        for (let index in this.all_user_list){
                                let user = this.all_user_list[index]
                                if (user.department === this.departmentName && user.class === classname && user.period === this.periodName){
                                        thisClassUser.push(user)
                                }
                        }
                        // for (let index in this.thisDepartmentUser){
                        //         let user = this.thisDepartmentUser[index]
                        //         if (user.class === classname){
                        //                 thisClassUser.push(user)
                        //         }
                        // } 
                        this.thisClassUser = thisClassUser
                 },
                updateInfo(data){    
                        this.loading=true        
                        this.update(data)
                                .then(res => {
                                        if (data.id === 'me'){
                                                this.loading = false
                                                this.me = res.data.data
                                                this.$cookie.delete('me')
                                                this.$cookie.set('me', JSON.stringify(this.me), {expires: '14D'})
                                        }
                                        this.reload({item: 'all', params: {}})
                                                .then(res => {
                                                        this.getThisDepartmentUser(data.department)
                                                        this.getThisClassUser(data.class)
                                                        this.loading=false
                                                })
                                        alert('更新成功')
                                })
                                .catch(e =>{
                                        console.log(e)
                                })
                },
                deleteStudent(data){
                        this.loading=true  
                        this.deleteUser(data)
                                .then(res => {
                                        this.reload({item: 'all', params: {}})
                                                .then(res => {
                                                        this.getThisDepartmentUser(data.department)
                                                        this.getThisClassUser(data.class)
                                                        this.loading=false
                                                })
                                        alert('更新成功')
                                })
                },
                chengeName(data){
                        this.updataID = data.id
                        this.thisClass = data.class
                        this.thisDepartment = data.department
                },
                createClassUser(data){
                        this.loading = true
                        this.createUser(data)
                                .then(res => {
                                        this.getThisDepartmentUser(data.department)
                                        this.loading = false
                                        //  this.reload({item: 'all', params: {}})
                                        //         .then(res => {
                                        //                 this.loading = false
                                        //         })
                                })
                                .catch(e => {
                                        console.log(e)
                                })
                },
                sendEmail(){
                        if (!this.me.email){
                                alert('请填写你的邮箱')
                        }else{
                                this.sendCode()
                                        .then(res => {
                                                alert(res.data.data.msg)
                                        } )
                                        .catch(e => {
                                                console.log(e)
                                        })
                        }
                }
        },

        mounted(){
                $(function(){
                        $("#tabs li").click(function(e){
                                $(this).addClass('active').siblings().removeClass('active');
                        })
                })
        },
        created (){
                this.me = JSON.parse(this.$cookie.get('me'))
                this.myinfoObj = this.me
                delete this.myinfoObj.id
                delete this.myinfoObj.class
                delete this.myinfoObj.start_sid
                delete this.myinfoObj.confirmed
                delete this.myinfoObj.period
                let today = new Date()
                let year = today.getUTCFullYear()
                this.period = [...[year-4, year-3,year-2, year-1]]
                let month = today.getMonth()
                if([9,10,11,12].includes(month)){
                        this.period.push(year)
                }

                this.loading = true
                this.reloadALL()
        },
        components: {
                Spinner,
        }
}
</script>


<style>
.navbar {
  margin-bottom: 20px;
  min-height: 0;
}
</style>
