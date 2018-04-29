<template>
        <div class="row">
                <div class="col-md-12" style="padding-boottom: 48%">
                        <spinner :show='loading'></spinner>
                        <nav class="navbar navbar-default">
                                <ol class="breadcrumb">
                                        <li>
                                                <a href="/home">  综合积分 </a>
                                        </li>
                                        <li class="action"> 考核积分表 </li>
                                </ol>
                        </nav>
                </div>
                <div class="col-md-12">
                        <div class="panel panel-default dashboard">
                                <div class="title">
                                        <div class="icon-container pink">
                                                <span class="glyphicon glyphicon-upload" aria-hidden="true"></span>
                                        </div>
                                        <b>上传积分表文件</b>
                                        <p>   </p>
                                </div>
                                <div class="panel-body">
                                        <form action="" @submit.prevent="upload()">
                                                <div class="form-group">
                                                        <label for="inputfile">上传excel文件</label>
                                                        <input type="file" id="inputfile" @change="getFile($event)">
                                                        <p class="help-block">只接受 'et', 'xls', 'xlsx' 文件</p>
                                                         <button class="btn btn-info" ref="uploadfile">&nbsp;&nbsp;上&nbsp;传&nbsp;&nbsp;</button>
                                                </div>
                                        </form>
                                </div>
                        </div>
                         <div class="panel panel-default dashboard">
                                 <div class="panel-heading">考核积分表</div>
                                <div class="panel-body">
                                        <table class="table table-striped">
                                                <thead>
                                                        <tr>
                                                                <th>学号</th>
                                                                <th>姓名</th>
                                                                <th>学期</th>
                                                                <th>总分</th>
                                                                <th>挂科</th>
                                                                <th>记过</th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                        <tr v-for="item in scoreList" :key="item.id">
                                                                <td>{{ item.s_id }}</td>
                                                                <td>{{ item.name }}</td>
                                                                <td>{{item.term}}</td>
                                                                <td>{{item.score}}</td>
                                                                <td>{{item.guake}}</td>
                                                                <td>{{item.jiguo}}</td>
                                                        </tr>
                                                </tbody>
                                        </table>
                                </div>
                         </div>
                </div>
        </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { get,post } from '../api'

import Spinner from './Spinner.vue'
import util from '../util'
import { config } from '../store/config'

export default {
        name: 'Score',
        data:() => ({
                loading: false,
                scoreList: [],
                uping: 0,
                upath : '',
        }),

        methods:{
                reloadALL(){
                        this.loading=true
                         this.getScoreList()
                },
                getFile(event){
                        this.upath = event.target.files[0];
                },
                upload(){
                        let excelFormData = new FormData();
                        excelFormData.append('excelFile.xlsx', this.upath);
                        let filename = this.upath.name
                        let allow_suffix = ['et', 'xls', 'xlsx']
                        let suffix = filename.substring(filename.lastIndexOf('.') + 1)

                        if (! allow_suffix.includes(suffix)){
                                alert('文件格式不对')
                                return
                        }

                        this.uping = 1
                        post('/upload', excelFormData)
                                .then(res => {
                                        alert(res.data.data.msg)
                                        this.uping = 0
                                        this.getScoreList()
                                })
                                .catch(e => {
                                        console.log(e)
                                })
                },
                getScoreList(){
                        this.loading = true
                        get('/upload', {})
                                .then(res => {
                                        this.scoreList = res.data.data
                                        this.loading = false
                                        if(this.me.role === 'Student'){
                                                this.$refs.uploadfile.setAttribute('disabled', true)
                                        }
                                })
                                .catch(e => {
                                        console.log(e)
                                })
                }
        },
        created (){
                this.me = JSON.parse(this.$cookie.get('me'))
               this.reloadALL()

                // let today = new Date()
                // let year = today.getUTCFullYear()
                // this.period = [...[year-4, year-3,year-2, year-1]]
                // let month = today.getMonth()
                // if([9,10,11,12].includes(month)){
                //         this.period.push(year)
                // }
                // this.reloadALL()
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
.breadcrumb {
  margin-bottom: 0;
}
</style>
