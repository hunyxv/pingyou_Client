<template>
        <div class='row'>
                <div class="col-md-12" style="padding-boottom: 48%">
                        <spinner :show='loading'></spinner>
                        <nav class="navbar navbar-default">
                                <ol class="breadcrumb">
                                        <li>
                                                <a href="/home"> admin </a>
                                        </li>
                                        <li class="action">资源管理</li>
                                </ol>
                        </nav>
                </div>
                <div class="col-md-6">
                        <div class="panel panel-primary panels">
                                <div class="icon-container">
                                                <span class="glyphicon glyphicon-th-list" style="color: rgb(132, 69, 102); font-size: 17px; margin:auto;"> </span>
                                </div>
                                        <span class="glyphicon glyphicon-plus" style="color: rgb(132, 69, 102); font-size: 17px; float:right; margin-top:10px;" title="添加" data-toggle="modal" data-target="#addDepartment">&nbsp;&nbsp;</span>  
                                        <h3 class="panel-title" style="margin-top:18px;">系院 / 专业</h3>
                                <div class="panel-body">
                                        <ul class="list-group">
                                                <li class="list-group-item" v-for="item in departmentList" :key="item.id" v-if="item.name !== '<无>'">
                                                        <span class="badge glyphicon glyphicon-pencil" title="修改" data-toggle="modal" data-target="#addDepartment" @click="update({item:'department', obj: item})">.</span>
                                                        {{item.name}}
                                                </li>
                                        </ul>
                                </div>
                        </div>
                        <div class="modal fade" id="addDepartment" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                <h4 class="modal-title" id="myModalLabel">增加院系专业</h4>
                                        </div>
                                        <div class="modal-body">
                                                <form class="form-horizontal" role="form">
                                                        <div class="form-group">
                                                                <label for="deparement" class="col-sm-2 control-label">院系</label>
                                                                <div class="col-sm-10">
                                                                        <select v-model="department.up_one_level" name="project" class="form-control">
                                                                                <option v-for="item in departmentList" :value="item.id" :key="item.id">{{item.name}}</option>
                                                                        </select>
                                                                </div>
                                                        </div>
                                                        <div class="form-group">
                                                                <label for="name" class="col-sm-2 control-label">专业</label>
                                                                <div class="col-sm-10">
                                                                        <input type="text" class="form-control" id="name" v-model="department.name" placeholder="请输入名字">
                                                                </div>
                                                        </div>
                                                </form>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                                <button type="submit" class="btn btn-primary" @click="change({item: flag, obj:{item:'department',data:department}})">提交更改</button>
                                        </div>
                                        </div><!-- /.modal-content -->
                                </div><!-- /.modal -->
                        </div>
                </div>
                <div class="col-md-6">
                        <div class="panel panel-primary panels">
                                <div class="icon-container">
                                                <span class="glyphicon glyphicon-th-list" style="color: rgb(132, 69, 102); font-size: 17px; margin:auto;"> </span>
                                 </div>
                                        <span class="glyphicon glyphicon-plus" style="color: rgb(132, 69, 102); font-size: 17px; float:right; margin-top:10px;" title="添加" data-toggle="modal" data-target="#addClass">&nbsp;&nbsp;</span>
                                        <h3 class="panel-title" style="margin-top:18px;">班级</h3>
                                <div class="panel-body">
                                        <ul class="list-group">
                                                <li class="list-group-item" v-for="item in classList" :key="item.id" v-if="item.name !== '<无>'">
                                                        <span class="badge glyphicon glyphicon-pencil" title="修改" data-toggle="modal" data-target="#addClass" @click="update({item:'class', obj: item})">.</span>
                                                        {{item.name}}
                                                </li>
                                        </ul>
                                </div>
                        </div>
                        <div class="modal fade" id="addClass" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                <h4 class="modal-title" id="myModalLabel">增加班级名</h4>
                                        </div>
                                        <div class="modal-body">
                                                <form class="form-horizontal" role="form">
                                                        <div class="form-group">
                                                                <label for="name" class="col-sm-2 control-label">班级</label>
                                                                <div class="col-sm-10">
                                                                        <input type="text" class="form-control" id="name" v-model="class_.name" placeholder="请输入名字">
                                                                </div>
                                                        </div>
                                                </form>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                                <button type="button" class="btn btn-primary" @click="change({item: flag, obj:{item:'class',data:class_}})">提交更改</button>
                                        </div>
                                        </div><!-- /.modal-content -->
                                </div><!-- /.modal -->
                        </div>
                </div>
                <div class="col-md-6">
                        <div class="panel panel-primary panels">
                                <div class="icon-container">
                                                <span class="glyphicon glyphicon-th-list" style="color: rgb(132, 69, 102); font-size: 17px; margin:auto;"> </span>
                                </div>
                                <span class="glyphicon glyphicon-plus" style="color: rgb(132, 69, 102); font-size: 17px; float:right; margin-top:10px;" title="添加" data-toggle="modal" data-target="#addProject">&nbsp;&nbsp;</span>
                                        <h3 class="panel-title" style="margin-top:18px;">项目分类</h3>
                                <div class="panel-body">
                                        <ul class="list-group">
                                                <li class="list-group-item" v-for="item in projectList" :key="item.id">
                                                        <span class="badge glyphicon glyphicon-pencil" title="修改" data-toggle="modal" data-target="#addProject" @click="update({item:'project', obj: item})">.</span>
                                                        {{item.name}}
                                                </li>
                                        </ul>
                                </div>
                        </div>
                        <div class="modal fade" id="addProject" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                <h4 class="modal-title" id="myModalLabel">增加项目分类</h4>
                                        </div>
                                        <div class="modal-body">
                                                <form class="form-horizontal" role="form">
                                                        <div class="form-group">
                                                                <label for="name" class="col-sm-2 control-label">项目名</label>
                                                                <div class="col-sm-10">
                                                                        <input type="text" class="form-control" id="name" v-model="project.name" placeholder="请输入名字">
                                                                </div>
                                                        </div>
                                                </form>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                                <button type="button" class="btn btn-primary" @click="change({item: flag, obj:{item:'project',data:project}})">提交更改</button>
                                        </div>
                                        </div><!-- /.modal-content -->
                                </div><!-- /.modal -->
                        </div>
                </div>
                <div class="col-md-6">
                        <div class="panel panel-primary panels">
                                <div class="icon-container">
                                                <span class="glyphicon glyphicon-th-list" style="color: rgb(132, 69, 102); font-size: 17px; margin:auto;"> </span>
                                        </div>
                                        <span class="glyphicon glyphicon-plus" style="color: rgb(132, 69, 102); font-size: 17px; float:right; margin-top:10px;" title="添加" data-toggle="modal" data-target="#addCounselor">&nbsp;&nbsp;</span>
                                        <h3 class="panel-title" style="margin-top:18px;">辅导员 </h3>
                                <div class="panel-body">
                                        <ul class="list-group">
                                                <li class="list-group-item" v-for="item in counselorList" :key="item.id">
                                                        <span class="badge glyphicon glyphicon-pencil" title="修改" data-toggle="modal" data-target="#addCounselor" @click="update({item:'user', obj: item})">.</span>
                                                        {{item.name}}
                                                </li>
                                        </ul>
                                </div>
                        </div>
                         <div class="modal fade" id="addCounselor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                <h4 class="modal-title" id="myModalLabel">增加辅导员用户</h4>
                                        </div>
                                        <div class="modal-body">
                                                <form class="form-horizontal" role="form">
                                                        <div class="form-group">
                                                                <label for="name" class="col-sm-2 control-label">姓名</label>
                                                                <div class="col-sm-10">
                                                                        <input type="text" class="form-control" id="name" v-model="counselor.name" placeholder="请输入名字">
                                                                </div>
                                                        </div>
                                                        <div class="form-group">
                                                                <label for="name" class="col-sm-2 control-label">职工号</label>
                                                                <div class="col-sm-10">
                                                                        <input type="text" class="form-control" id="name" v-model="counselor.s_id" placeholder="请输入名字">
                                                                </div>
                                                        </div>
                                                        <div class="form-group">
                                                                <label for="deparement" class="col-sm-2 control-label">院系</label>
                                                                <div class="col-sm-10">
                                                                        <select v-model="counselor.department" name="project" class="form-control">
                                                                                <option v-for="item in departmentList" :value="item.id" :key="item.id">{{item.name}}</option>
                                                                        </select>
                                                                </div>
                                                        </div>
                                                        <div class="form-group">
                                                                <label for="deparement" class="col-sm-2 control-label">密码</label>
                                                                <div class="col-sm-10">
                                                                         <input type="text" class="form-control" id="name" v-model="counselor.password" placeholder="请输入初始密码">
                                                                </div>
                                                        </div>
                                                </form>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                                <button type="button" class="btn btn-primary" @click="change({item: flag, obj:{item:'user',data:counselor}})">提交更改</button>
                                        </div>
                                        </div><!-- /.modal-content -->
                                </div><!-- /.modal -->
                        </div>
                </div>
        </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { get,post,put } from '../api'

import Spinner from './Spinner.vue'
import util from '../util'
import { config } from '../store/config'

export default {
        name: 'Admin',
        data:() => ({
                loading: false,
                flag: 'add',
                department:{
                        up_one_level:'',
                        name:''
                },
                class_:{
                        name:'',
                },
                project:{
                        name: '',
                },
                counselor:{
                       
                }
        }),
        computed:{
                ...mapGetters('admin',{
                        departmentList: 'departmentList',
                        classList: 'classList',
                        counselorList : 'counselorList',
                        projectList: 'projectList',
                })
        },
        methods:{
                ...mapActions('admin',{
                        reload: 'reload',
                        addData:'addData',
                        updateData: 'updateData'
                }),

                reloadALL(){
                        this.reload({item:'department', params: {}})
                        this.reload({item:'class', params: {}})
                        this.reload({item:'project', params: {}})
                        this.reload({item:'user', params: {}})
                                .then(res => {
                                        this.loading = false
                                        console.log(this.counselorList)
                                })
                                .catch(e => {
                                        console.log(e)
                                })
                },
                addDatas(obj){
                        this.loading=true
                        this.addData(obj)
                                .then(res => {
                                        alert(res.data.data.msg)
                                        this.reload({item: obj.item, params: {}})
                                        this.loading = false
                                         switch(obj.item){
                                                case 'project': 
                                                        this.project = {}
                                                        break
                                                case 'department':
                                                        this.department={}
                                                        break
                                                case 'class':
                                                        this.class_={}
                                                        break
                                                case 'user':
                                                        this.counselor={}
                                                        break
                                                default: 
                                                        alert('error')
                                        }
                                })
                                .catch(e => {
                                      console.log(e)
                                })
                },
                update(obj){
                        this.flag = 'update'
                         switch(obj.item){
                                case 'project': 
                                        this.project = obj.obj
                                        break
                                case 'department':
                                        this.department=obj.obj
                                        break
                                case 'class':
                                        this.class_=obj.obj
                                        break
                                case 'user':
                                        this.counselor=obj.obj
                                        delete this.counselor['class']
                                        delete this.counselor['department']
                                        break
                                default: 
                                        alert('error')
                        }
                },
                updateDatas(obj){
                        this.loading=true
                        this.updateData(obj)
                                .then(res => {
                                        alert(res.data.data.msg)
                                        this.reload({item: obj.item, params: {}})
                                        this.loading = false
                                         switch(obj.item){
                                                case 'project': 
                                                        this.project = {}
                                                        break
                                                case 'department':
                                                        this.department={}
                                                        break
                                                case 'class':
                                                        this.class_={}
                                                        break
                                                case 'user':
                                                        this.counselor={}
                                                        break
                                                default: 
                                                        alert('error')
                                        }
                                })
                                .catch(e => {
                                      console.log(e)
                                })
                },
                change(data){
                        switch(data.item){
                                case 'update': 
                                        console.log(data.obj)
                                        this.updateDatas(data.obj)
                                        this.flag = 'add'
                                        break
                                case 'add':
                                        this.addDatas(data.obj)
                                        break
                                default: 
                                        alert('error')
                        }
                }
        },
        created (){
                this.loading=true
                this.me = JSON.parse(this.$cookie.get('me'))
                if (this.me.role !== 'Administrator'){
                        this.$router.push('/home')
                }
                // let today = new Date()
                // let year = today.getUTCFullYear()
                // this.period = [...[year-4, year-3,year-2, year-1]]
                // let month = today.getMonth()
                // if([9,10,11,12].includes(month)){
                //         this.period.push(year)
                // }
                this.reloadALL()
        },
        components: {
                Spinner,
        }
}
</script>

<style>
.panels{
        height: 0;
        padding-bottom: 50%; 
        overflow-y: auto;
}

.navbar {
        margin-bottom: 20px;
        min-height: 0;
}
.breadcrumb {
        margin-bottom: 0;
}
</style>

