<template>
        <div class="row">
                 <div class="col-md-12" style="padding-boottom: 48%">
                        <spinner :show='loading'></spinner>
                        <nav class="navbar navbar-default">
                                <ol class="breadcrumb">
                                        <li>
                                                <a href="/audit"> 主页 </a>
                                        </li>
                                        <li class="action">审核</li>
                                </ol>
                        </nav>
                </div>
                <div class="col-md-12">
                        <!-- 待审项目 -->
                        <div class="col-md-6">
                                <div class="panel panel-primary projectList">
                                        <div class="panel-heading">
                                                待审核项目列表
                                        </div>
                                        <div class="panel-body">
                                                <table class="table table-hover">
                                                        <thead>
                                                                 <tr>
                                                                        <th>项目类别</th>
                                                                        <th>项目名</th>
                                                                        <th>专业</th>
                                                                        <th> 班级</th>
                                                                        <th width='80'>状态</th>
                                                                </tr>
                                                        </thead>
                                                          <tbody>
                                                                <tr v-if="project_detail_list.length === 0">
                                                                        <td class="text-center" colspan="10">目前还没有待审核的项目</td>
                                                                </tr>
                                                                <tr v-for="p in project_detail_list"  :key="p.id" @click="getProjectDetailMessageAndBallot(p)">
                                                                        <td>{{p.project.name}}</td>
                                                                        <td>{{p.name}}</td>
                                                                        <td>{{p.department.name}}</td>
                                                                        <td>{{p.class.name}}</td>
                                                                        <td><span class="label label-info">{{ p.status | mapProjectStatus }}</span></td>
                                                                </tr>
                                                        </tbody>
                                                </table>
                                                 <nav aria-label="...">
                                                        <ul class="pager">
                                                                <li class="previous" :class="status.project_detail.has_previous ? '' : 'disabled'"><a @click="changePage(status.project_detail, status.project_detail.current_page - 1)" aria-label="Previous"><span aria-hidden="true">&larr;</span>上一页</a></li>
                                                                <li class="next" :class="status.project_detail.has_next ? '' : 'disabled'"><a @click="changePage(status.project_detail, status.project_detail.current_page + 1)" aria-label="Next">下一页 <span aria-hidden="true">&rarr;</span></a></li>
                                                        </ul>
                                                </nav>
                                        </div>
                                </div>
                        </div>
                        <div class="col-md-6">
                                <div class="panel panel-primary projectList">
                                        <div class="panel-heading">
                                                项目：{{project_detail.name}} 的投票详情
                                        </div>
                                        <div class="panel-body messageBox">
                                                <div class="ballot" v-for="item in ballot_list" :key="item.id" style="position:relative;" data-toggle="modal" data-target="#ballot-detail" @click="ballotDetail(item)">
                                                        {{item.people.name}}
                                                        <br>
                                                        票数: {{item.number}}
                                                </div>
                                                <!-- 模态框 -->
                                                <div class="modal fade" id="ballot-detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                        <div class="modal-header">
                                                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                                                                <h4 class="modal-title" id="myModalLabel">申请详情：</h4>
                                                                        </div>
                                                                        <div class="modal-body">
                                                                                <div class="form-group">
                                                                                        <label class="col-md-4 control-label">申请者：</label>
                                                                                         <div class="col-md-6">
                                                                                                <label for="">{{ballot.people.name}}</label>
                                                                                        </div>
                                                                                </div>
                                                                                <div class="form-group">
                                                                                        <label class="col-md-4 control-label">项目：</label>
                                                                                         <div class="col-md-6">
                                                                                                <label for="">{{ballot.project_detail.name}}</label>
                                                                                        </div>
                                                                                </div>
                                                                                <div class="form-group">
                                                                                        <label class="col-md-4 control-label">得票数：</label>
                                                                                         <div class="col-md-6">
                                                                                                <label for="">{{ballot.number}}</label>
                                                                                        </div>
                                                                                </div>
                                                                                <div class="form-group">
                                                                                        <label class="col-md-4 control-label">投票者有：</label>
                                                                                         <div class="col-md-6">
                                                                                                <label v-for="item in ballot.ballot_people" :key="item">{{item}}、</label>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="col-md-6">
                                <div class="panel panel-primary">
                                        <div class="panel-heading">
                                                项目：{{project_detail.name}} 的讨论记录
                                        </div>
                                        <div class="panel-body messageBox">
                                                <div v-for="(item, index) in messages" :key="index">
                                                        <label style="font-family:'STHeiti ';font-weight: bold;"><b>{{item.name}}:</b> </label>
                                                        <label style="">{{ item.message }}</label>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        </div>
</template>     

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { get } from '../api'

import Spinner from './Spinner.vue'
import util from '../util'
import { config } from '../store/config'

export default {
        name:'Audit',
        data: () => ({
                loading: false,
                project_detail:{},
                ballot:{
                        people:{
                                name:'',
                        },
                        project_detail:{
                                name:''
                        },
                        number:'',
                        ballot_people:[]
                }
        }),
        computed:{
                ...mapGetters('audit', {
                        project_detail_list: 'project_detail_list',
                        ballot_list: 'ballot_list',
                        messages: 'messages',
                        status: 'status'
                })
        },
        methods:{
                ...mapActions('audit',{
                        reload: 'reload',
                        changeProStatus: 'changeProStatus',
                        downloadMessages: 'downloadMessages',
                        getBallot: 'getBallot'
                }),
                reloadALL(){
                        this.reload({item: 'project_detail', params:{status: 2}})
                                .then(res => {
                                        this.getProjectDetailMessageAndBallot(this.project_detail_list[0])
                                        this.loading = false
                                })
                },
                getProjectDetailMessageAndBallot(project_detail){
                        this.project_detail = project_detail;
                        this.getBallot(project_detail)
                        this.downloadMessages(project_detail)
                },
                ballotDetail(ballot){
                        this.ballot = ballot
                         console.log(this.ballot)
                }
        },

        created (){
                this.me = JSON.parse(this.$cookie.get('me'))
                this.loading = true
                this.reloadALL()
        },
        components: {
                Spinner
        }
}
</script>


<style lang="less">
.projectList{
        height:0px;
        padding-bottom: 45%
}
.messageBox{
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #F0F0F0;
}
.ballot{
        width: 75px;
        height: 75px;
        float: left;
        margin: 10px 20px 10px 0;
        border: 2px solid;
        border-radius:10px;
        background-color: white;
}
</style>

