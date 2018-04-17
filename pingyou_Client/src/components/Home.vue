<template>
        <div class="row">
                <div class="col-md-12" style="padding-boottom: 48%">
                        <spinner :show='loading'></spinner>
                        <nav class="navbar navbar-default">
                                <ol class="breadcrumb">
                                        <li>
                                                <a href="/home"> 主页 </a>
                                        </li>
                                        <li class="action">首页列表</li>
                                </ol>
                        </nav>
                </div>
                <div class="col-md-12">
                        <div class="col-md-8">
                                <div class="panel panel-default dashboard">
                                        <div class="title">
                                                <div class="icon-container pink">
                                                        <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                                                </div>
                                                <b>项目</b>
                                                <p>共{{ status.project_detail.count }}个</p>
                                        </div>
                                        <div class="tables">
                                                <table class="table" style="height: 366px">
                                                        <thead>
                                                                <tr>
                                                                        <th>项目类别</th>
                                                                        <th>项目名</th>
                                                                        <th>专业</th>
                                                                        <th> 班级</th>
                                                                        <th width='80'>状态</th>
                                                                        <th class='text-center'>操作</th>
                                                                </tr>
                                                        </thead>
                                                        <tbody>
                                                                <tr v-if="project_detail_list.length === 0">
                                                                        <td class="text-center" colspan="10">目前还没有待评选的项目</td>
                                                                </tr>
                                                                <tr v-for="p in project_detail_list"  :key="p.id">
                                                                        <td>{{p.project.name}}</td>
                                                                        <td>{{p.name}}</td>
                                                                        <td><a href="#" data-toggle="modal" data-target="#project-detail" @click="clickProjectDetail(p)">{{p.department.name}}</a></td>
                                                                        <td>{{p.class.name}}</td>
                                                                        <td><span class="label label-info">{{ p.status | mapProjectStatus }}</span></td>
                                                                        <td class="text-center text-lg">
                                                                                <a @click="deleteProjectDetail(p)" data-toggle="tooltip"  data-placement="top" v-show="status.newsStatus" title="删除项目">
                                                                                         <span class="glyphicon glyphicon-trash"></span>
                                                                                </a>
                                                                                <a @click="applyProject(p)" data-toggle="tooltip"  data-placement="top" v-show="me.role !== 'Counselor'"  v-if="!(p.participants.includes(me.s_id))" title="申请项目">
                                                                                         <span class="glyphicon glyphicon-bookmark"></span>
                                                                                </a>
                                                                                <a  data-toggle="tooltip"  data-placement="top" v-show="!status.newsStatus" v-if="p.participants.includes(me.s_id)" title="已申请">
                                                                                         <span class="glyphicon glyphicon-ok"></span>
                                                                                </a>
                                                                        </td>
                                                                </tr>
                                                        </tbody>
                                                </table>
                                                 <!-- 模态框 -->
                                                <div class="modal fade" id="project-detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                        <div class="modal-header">
                                                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                                                <h4 class="modal-title" id="myModalLabel">申请详情：</h4>
                                                                        </div>
                                                                        <div class="modal-body">
                                                                                <table class="table table-striped">
                                                                                        <tbody>
                                                                                                 <tr>
                                                                                                        <td>类型：</td><td>{{ click_project_detail.project.name }}</td><td></td><td>项目名：</td><td>{{ click_project_detail.name }}</td>
                                                                                                        <td>创建者：</td><td>{{ click_project_detail.counselor }}</td><td></td><td>状态：</td><td><span class="label label-info">{{ click_project_detail.status | mapProjectStatus }}</span></td>
                                                                                                </tr>
                                                                                                
                                                                                                <tr>
                                                                                                        <td>专业：</td><td>{{ click_project_detail.department.name }}</td><td></td><td>班级：</td><td>{{ click_project_detail.class.name }}</td>
                                                                                                        <td>名额：</td><td>{{ click_project_detail.places }}</td><td></td><td>已申请人数：</td><td>{{ click_project_detail.participants.length }}</td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                        <td>创建时间：</td><td>{{ click_project_detail.create_date | mapTimestamp}}</td><td></td><td>有效期：</td><td>{{ click_project_detail.expiration }} 天</td>
                                                                                                        <td>届：</td><td>{{click_project_detail.period}}</td><td></td><td>结果：</td><td><label v-for="(item, index) in click_project_detail.result" :key="index">{{ item }}、</label></td>
                                                                                                </tr>
                                                                                        </tbody>
                                                                                </table>
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <nav aria-label="...">
                                                <ul class="pager">
                                                        <li class="previous" :class="status.project_detail.has_previous ? '' : 'disabled'"><a @click="changePage(status.project_detail, status.project_detail.current_page - 1)" aria-label="Previous"><span aria-hidden="true">&larr;</span>上一页</a></li>
                                                        <li class="next" :class="status.project_detail.has_next ? '' : 'disabled'"><a @click="changePage(status.project_detail, status.project_detail.current_page + 1)" aria-label="Next">下一页 <span aria-hidden="true">&rarr;</span></a></li>
                                                </ul>
                                        </nav>
                                </div>
                                <!-- ========================================= -->                             
                        </div>
                        <div class="col-md-4"> 
                                <div class="panel panel-default dashboard">
                                         <div class="title">
                                                <div class="icon-container pink">
                                                        <span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
                                                </div>
                                                <b>公告栏</b>
                                                <p>   </p>
                                         </div>
                                         <div class="tables">
                                                <hr>
                                                <div v-show="!status.newsStatus" style="height: 425px">
                                                        <p style="font-size:17px;font-weight:bold;">{{gonggao.news}}</p>
                                                </div>
                                                <form v-show="status.newsStatus" class="form form-horizontal"  @submit.prevent="addNews()">
                                                        <textarea class="form-control" rows="16" v-model="gonggao.news"></textarea>
                                                        <div class="modal-footer">
                                                                         <button type="submit"  class="btn btn-primary btn-roundedrectangle"  ref="addnews">保存</button>
                                                         </div>
                                                </form>
                                         </div>
                                 </div>
                        </div>
                </div>
                <!-- 下边一行 -->
                <div class="col-md-12">
                        <!-- 教务微信公众号最新动态 -->
                        <div class="col-md-8">
                                <div class="panel panel-default dashboard">
                                        <div class="media hoverfa" v-for="(item, index) in wechat_list" :key="index" :onclick="item.content_url" target="_blank">
                                                <div class="media-left media-middle">
                                                        <a href="">
                                                                <img class="media-object" style="width:100px; height:100px;" :src="item.img " alt="...">
                                                        </a>
                                                </div>
                                                <div class="media-body">
                                                        <h4 class="media-heading">{{ item.title }}</h4>
                                                        {{ item.intro }}
                                                </div>
                                        </div>
                                        <nav aria-label="...">
                                                <ul class="pager">
                                                        <li class="previous" :class="status.wechat.has_previous ? '' : 'disabled'"><a @click="changePage(status.wechat, status.wechat.current_page - 1)" aria-label="Previous"><span aria-hidden="true">&larr;</span>上一页</a></li>
                                                        <li class="next" :class="status.wechat.has_next ? '' : 'disabled'"><a @click="changePage(status.wechat, status.wechat.current_page + 1)" aria-label="Next">下一页 <span aria-hidden="true">&rarr;</span></a></li>
                                                </ul>
                                        </nav>
                                </div>
                        </div>
                        <div class="col-md-4">
                                  <div class="panel panel-default dashboard">
                                        <div class="title">
                                                <div class="icon-container blue">
                                                        <span class="glyphicon glyphicon-plus"  aria-hidden="true"></span>
                                                </div>
                                                <b v-show="status.newsStatus">新增项目</b>
                                                <b v-show="!status.newsStatus">我的信息</b>
                                                <a  style="float: right" data-placement="top" data-toggle="modal" data-target="#myInfoModal" v-show="!status.newsStatus" title="修改">
                                                        <span class="glyphicon glyphicon-pencil"></span>
                                                </a>
                                                <!-- 修改信息 -->
                                                <div class="modal fade" id="myInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                        <div class="modal-header">
                                                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                                                        &times;
                                                                                </button>
                                                                                <h4 class="modal-title" id="myModalLabel">
                                                                                        修改我的信息
                                                                                </h4>
                                                                        </div>
                                                                        <div class="modal-body">
                                                                                 <div class="row">
                                                                                        <div class="col-md-10 col-md-offset-1">
                                                                                                <div class="form-group" >
                                                                                                        <label class="col-md-4 control-label">用户名：</label>
                                                                                                        <div class="col-md-6">
                                                                                                                <input type="text" v-model="me.username" class="form-control" placeholder="" required>
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
                                                                                </div>
                                                                               <div class="panel panel-info">
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
                                                                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updadeMyInfo({id:'me', data:me})" >
                                                                                        提交修改
                                                                                </button>
                                                                        </div>
                                                                </div><!-- /.modal-content -->
                                                        </div><!-- /.modal -->
                                                </div>
                                                <br>
                                                <hr>
                                        </div>
                                        <div class="dashboard-div">
                                                <div class="row">
                                                        <div class="col-md-12 ">
                                                                <!-- //  新建项目提交给 addProjectDetail 函数 -->
                                                                 <form class="form form-horizontal" v-show="status.newsStatus" @submit.prevent="addNewProjectDetail()">      
                                                                        <div class="from-group col-md-12">
                                                                                <label class="col-md-4 control-label">类型</label>
                                                                                <div class="col-md-8">
                                                                                        <select v-model="project_detail.project" name="project" class="form-control">
                                                                                                <option v-for="item in project_list" :value="item.id" :key="item.id">{{item.name}}</option>
                                                                                        </select>
                                                                                </div>
                                                                        </div>
                                                                        <div class="from-group col-md-12">
                                                                                <label class="col-md-4 control-label">项目名</label>
                                                                                <div class="col-md-8">
                                                                                        <input type="text" v-model="project_detail.name" class="form-control">
                                                                                </div>
                                                                        </div>
                                                                        <div class="from-group col-md-12">
                                                                                <label class="col-md-4 control-label">专业</label>
                                                                                <div class="col-md-8">
                                                                                        <div class="checkbox-inline">
                                                                                                <div  v-for="item in department_list" :key="item.id">
                                                                                                        <input type="checkbox" @click="checkbox_('department', item.id)">{{item.name}}
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        <div class="from-group col-md-12">
                                                                                <label class="col-md-4 control-label">届</label>
                                                                                <div class="col-md-8">
                                                                                        <div class="checkbox-inline">
                                                                                                <div class="radio-inline" v-for="item in period" :key="item">
                                                                                                        <input type="checkbox" name="period"  @click="checkbox_('period', item)"> {{item}} 
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        <div class="from-group col-md-12">
                                                                                <label class="col-md-4 control-label">班级</label>
                                                                                <div class="col-md-8">
                                                                                        <div class="checkbox-inline">
                                                                                                <div v-for="item in class_list" :key="item.id" v-show="item.name === '<无>' ? false: true">
                                                                                                        <input type="checkbox" @click="checkbox_('class', item.id)">   {{item.name}}
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        <div class="from-group col-md-12">
                                                                                <label class="col-md-4 control-label">名额(每班)</label>
                                                                                <div class="col-md-8">
                                                                                        <input type="text" v-model="project_detail.places" class="form-control">
                                                                                </div>
                                                                        </div>
                                                                        <div class="from-group col-md-12">
                                                                                <label class="col-md-4 control-label">期限(天)</label>
                                                                                <div class="col-md-8">
                                                                                        <input type="text" v-model="project_detail.exp" class="form-control">
                                                                                </div>
                                                                        </div>
                                                                         <div class="modal-footer col-md-12">
                                                                                <button type="submit" class="btn btn-primary btn-roundedrectangle"  ref="addprojectdetail">保存</button>
                                                                        </div>
                                                                 </form>
                                                                 <div class="col-md-1"></div>
                                                                 <!-- 我的信息 -->
                                                                <div class="col-md-10">
                                                                        <div class="tables">
                                                                                <table class="table" v-show="!status.newsStatus" >
                                                                                        
                                                                                        <thead>
                                                                                                <tr>
                                                                                                        <th><label>我的信息</label></th>
                                                                                                </tr>
                                                                                        </thead>
                                                                                        
                                                                                        <tbody>
                                                                                                <tr>
                                                                                                        <th>用户名：</th><th>{{me.username}}</th>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                        <th>&nbsp;&nbsp; 姓名：</th><th>{{me.name}}</th>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                        <th>&nbsp; &nbsp; 性别：</th><th>{{me.gender | mapGenter }}</th>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                        <th>&nbsp; &nbsp; 学号：</th><th>{{me.s_id}}</th>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                        <th>&nbsp; &nbsp; 专业：</th><th>{{me.department}}</th>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                        <th>&nbsp; &nbsp; 班级：</th><th>{{me.class}}</th>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                        <th>&nbsp; Email：</th><th>{{me.email || '无'}}</th>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                        <th>&nbsp; &nbsp;&nbsp;  QQ：</th><th>{{me.qq_num || '无'}}</th>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                        <th>&nbsp; &nbsp; 微信：</th><th>{{me.dweixin || '无'}}</th>
                                                                                                </tr>
                                                                                        </tbody>
                                                                                </table>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>      
                </div>
        </div>
</template>


<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

import Spinner from './Spinner.vue'
import util from '../util'
import { config } from '../store/config'


export default {
        name: "Home",
        data: () => ({
                me: null,
                loading: false,
                period:[],
                project_detail: {
                        project:'',
                        name:'',
                        period_list:[],
                        department_list: [],
                        class_list: [],
                        places:'',
                        exp: '',
                },
                click_project_detail: {
                        project:{
                                name:''
                        },
                        name:'',
                        department: {name:''},
                        class: {name:''},
                        participants:[],
                        places:'',
                        exp: '',
                },
                gonggao:{
                        news: ''
                },
                statisticData: null
        }),
        computed:{
                ...mapGetters('home',{
                        project_detail_list: "project_detail_list",
                        project_list: "project_list",
                        class_list:  "class_list",
                        department_list: "department_list",
                        news: "news",
                        user: "user",
                        wechat_list: 'wechat_list',
                        status: "status"
                })
        },
        methods: {
                ...mapActions('home', {
                        reload: 'reload',
                        addProjectDetail: 'addProjectDetail',
                        delProjectDetail: 'deleteProjectDetail',
                        editNews: 'editNews',
                        applyPeojectDetail: 'applyPeojectDetail',
                        sendCode:'sendCode'
                }),
                ...mapActions('user',{
                        updateInfo: 'updateInfo'
                }),

                reloadALL (){
                        this.reload({item: 'news', params:{}})
                                .then(res =>{
                                        this.gonggao =this.news
                                })
                        this.reload({item: 'wechat', params:{}})
                        if (this.me.role === 'Counselor'){
                                this.reload({item: 'project', params: {}})
                                this.reload({item: 'department', params: {}})
                                this.reload({item: 'class', params: {}})
                                this.status.newsStatus = true
                        }else{
                                //  学生界面 需要加载的
                                
                        }
                         this.reload({item: 'project_detail', params: {}})
                                .then(res => {
                                        this.loading = false
                                 })
                },
                changePage(status, page){
                        if (!isNaN(page) && page <= status.page_sum && page > 0){
                                this.loading = true
                                this.reload({item: status.item, params: {page: page, state: status.item}})
                                        .then(res => {
                                                this.loading = false
                                                location.href = '#top'
                                        })
                        }
                 },
                addNewProjectDetail(button) {
                         this.$refs.addprojectdetail.setAttribute('disabled', true)
                         this.addProjectDetail(this.project_detail)
                                .then(res => {
                                        setTimeout(() => {
                                                alert('新建项目成功')
                                                this.$refs.addprojectdetail.removeAttribute('disabled')
                                                this.reload({item: 'project_detail', params: {}})  
                                        })
                                })
                                .catch(e => {
                                        this.$refs.addprojectdetail.removeAttribute('disabled')
                                        console.log(e)
                                })
                 }, 
                 deleteProjectDetail(data){
                         if (confirm('确定要删除吗？')){
                                 this.loading = true
                                 this.delProjectDetail(data)
                                        .then(res => {
                                                this.loading = false
                                                this.reload({item: 'project_detail', params: {}})
                                        })
                         }
                 },
                 applyProject(pro){
                         this.loading = true
                         this.applyPeojectDetail(pro)
                                .then(res => {
                                        alert(res.data.data.msg)
                                         this.reload({item: 'project_detail', params: {}})
                                                .then(
                                                        this.loading = false
                                                )
                                })
                                .catch(e => {
                                        console.log(e)
                                        this.loading = false
                                })
                 },
                 addNews(button){
                        this.$refs.addnews.setAttribute('disabled', true)
                        this.editNews(this.gonggao)
                                .then(res => {
                                        setTimeout(()=>{
                                                alert('已更新公告')
                                                this.$refs.addnews.removeAttribute('disabled')
                                                this.reload({item: 'news', params: {}})
                                        })
                                })
                 },
                 updadeMyInfo(data){
                        this.loading = true
                        this.updateInfo(data)
                                .then(res => {
                                        this.loading = false
                                        this.me = res.data.data
                                        this.$cookie.delete('me')
                                        this.$cookie.set('me', JSON.stringify(this.me), {expires: '14D'})
                                        alert('更新成功')
                                })
                                .catch(e =>{
                                        console.log(e)
                                })
                 },
                 checkbox_(item, id){
                        if (item === 'department'){
                                if  ( this.project_detail.department_list.includes(id)){
                                        this.project_detail.department_list.pop(id)
                                }else{
                                        this.project_detail.department_list.push(id)
                                }
                        }
                        if (item === 'class'){
                                if (this.project_detail.class_list.includes(id)){
                                         this.project_detail.class_list.pop(id)
                                }else{
                                        this.project_detail.class_list.push(id)
                                }
                        }
                        if (item === 'period'){
                                if (this.project_detail.period_list.includes(id)){
                                        this.project_detail.period_list.pop(id)
                                }else{
                                        this.project_detail.period_list.push(id)
                                }
                        }
                },
                clickProjectDetail(project_detail){
                        this.click_project_detail = project_detail
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
        created (){
                this.me = JSON.parse(this.$cookie.get('me'))
                this.loading = true
                let today = new Date()
                let year = today.getUTCFullYear()
                this.period = [...[year-4, year-3,year-2, year-1]]
                let month = today.getMonth()
                if([9,10,11,12].includes(month)){
                        this.period.push(year)
                }
                this.reloadALL()
        },
        mounted(){

        },
        components: {
                Spinner,
        }
}
</script>



<style scoped>
.panel {
  margin: 2%;
}
#menu {
  margin-bottom: 20px;
}
.input-group {
  margin-bottom: 15px;
}
.navbar {
  margin-bottom: 20px;
  min-height: 0;
}
.breadcrumb {
  margin-bottom: 0;
}
.panel-container {
  padding: 14px;
  border-radius: 4px !important;
}
.content-header {
  padding: 0;
}
.content-comment {
  font-size: 13px;
  padding: 5px 0px 5px 0px;
}
.content-filter {
  text-align: center;
  padding: 15px 0px 15px 0px;
  margin: auto;
}
.btn-roundedrectangle {
  border-radius: 4px !important;
}
.btn-left {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
.btn-right {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
.btn-dropdown {
  padding: 0px;
  border: 0px;
  border-color: #ffffff !important;
  box-shadow: none !important;
  background-color: #ffffff !important;
  background-image: none !important;
}
.btn-default.active.focus,
.btn-default.active:focus,
.btn-default.active:hover,
.btn-default:active.focus,
.btn-default:active:focus,
.btn-default:active:hover,
.open>.dropdown-toggle.btn-default.focus,
.open>.dropdown-toggle.btn-default:focus,
.open>.dropdown-toggle.btn-default:hover {
  border-color: #ffffff;
  box-shadow: none;
  background-color: #ffffff;
  background-image: none;
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
.sales-selector {
  height: 20px !important;
  width: 100px;
}
.dashboard {
        margin: 11.344px;
}
.from-group {
        margin-top: 10px;
}
.row{
        overflow: hidden; 
}
.col-md-8 .col-md-4{
        margin-bottom: -99999px;
        padding-bottom: 99999px;
}
.hoverfa:hover{ 
        border:rgb(119, 129, 129) 1px solid; 
        background: #ccc5c5;
}
</style>

