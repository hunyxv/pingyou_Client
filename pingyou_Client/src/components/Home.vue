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
                                                                        <td>{{p.department.name}}</td>
                                                                        <td>{{p.class.name}}</td>
                                                                        <td><span class="label label-info">{{ p.status | mapProjectStatus }}</span></td>
                                                                        <td class="text-center text-lg">
                                                                                <a @click="deleteProjectDetail(p)" data-toggle="tooltip"  data-placement="top"  title="删除项目">
                                                                                         <span class="glyphicon glyphicon-trash"></span>
                                                                                </a>
                                                                        </td>
                                                                </tr>
                                                        </tbody>
                                                </table>
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
                                                        <!-- 学生看到的 -->
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
                <div class="col-md-12">
                        <div class="col-md-8">
                                 <div class="panel panel-default dashboard">
                                         <div class="title">
                                                        <p>---先空着 动态--</p>
                                         </div>
                                         <div class="tables">
                                                 <p>===========================</p>
                                                 {{project_detail.department_list}}
                                                 <p>++++++++++++++++++++</p>
                                                 {{project_detail.class_list}}
                                                 <p>000000000000000000</p>
                                                 {{news}}
                                                 <p>////////////////////////////</p>
                                                 {{project_detail}}
                                         </div>
                                 </div>
                        </div>
                        <div class="col-md-4">
                                  <div class="panel panel-default dashboard">
                                        <div class="title">
                                                <div class="icon-container blue">
                                                        <span class="glyphicon glyphicon-plus"  aria-hidden="true"></span>
                                                </div>
                                                <b>新增项目</b>
                                                <p></p>
                                        </div>
                                        <div class="dashboard-div">
                                                <div class="row">
                                                        <div class="col-md-12 ">
                                                                <!-- // 提交给 addProjectDetail 函数 -->
                                                                 <form class="form form-horizontal"  @submit.prevent="addNewProjectDetail()">      
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
                                                                                <label class="col-md-4 control-label">班级</label>
                                                                                <div class="col-md-8">
                                                                                        <div class="checkbox-inline">
                                                                                                <div v-for="item in class_list" :key="item.id">
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
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>      
                </div>
        </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import { get } from '../api'

import Spinner from './Spinner.vue'
import util from '../util'
import { config } from '../store/config'


export default {
        name: "Home",
        data: () => ({
                me: null,
                loading: false,
                project_detail: {
                        project:'',
                        name:'',
                        department_list: [],
                        class_list: [],
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
                        status: "status"
                })
        },
        methods: {
                ...mapActions('home', {
                        reload: 'reload',
                        addProjectDetail: 'addProjectDetail',
                        delProjectDetail: 'deleteProjectDetail',
                        editNews: 'editNews'
                }),
                reloadALL (){
                        this.reload({item: 'project_detail', params: {}})
                        this.reload({item: 'news', params:{}})
                                .then(res =>{
                                        this.gonggao =this.news
                                })
                        if (this.me.role === 'Counselor'){
                                this.reload({item: 'project', params: {}})
                                this.reload({item: 'department', params: {}})
                                this.reload({item: 'class', params: {}})
                                this.status.newsStatus = true
                        }else{
                                //  学生界面 需要加载的
                                
                        }
                                // .then(res => {
                                         this.loading = false
                                // })
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
                         this.$refs.addprojectdetail.setAttribute('disable', true)
                         this.addProjectDetail(this.project_detail)
                                .then(res => {
                                        setTimeout(() => {
                                                alert('新建项目成功')
                                                this.$refs.addprojectdetail.removeAttribute('disable')
                                                this.reload({item: 'project_detail', params: {}})  
                                        })
                                })
                                .catch(e => {
                                        this.$refs.addprojectdetail.removeAttribute('disable')
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
                 addNews(button){
                         this.$refs.addnews.setAttribute('disable', true)
                        this.editNews(this.gonggao)
                                .then(res => {
                                        setTimeout(()=>{
                                                alert('已更新公告')
                                                this.$refs.addnews.removeAttribute('disable')
                                                this.reload({item: 'news', params: {}})
                                        })
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
                }

        },
        created (){
                this.me = JSON.parse(this.$cookie.get('me'))
                this.loading = true
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
</style>

