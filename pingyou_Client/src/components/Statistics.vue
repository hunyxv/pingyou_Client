<template>
        <div class="row">
                 <div class="col-md-12" name="top" id="top">
                        <spinner :show='loading'></spinner>
                        <nav class="navbar navbar-default">
                                <ol class="breadcrumb">
                                        <li>
                                                <a href="/audit"> 主页 </a>
                                        </li>
                                        <li class="action">审核</li>
                                </ol>
                        </nav>
                        <div class="panel-container">
                                <div class="row content-header">
                                         <div class="col-md-4">
                                                 <div class="row">
                                                         <div class="col-xs-3" style="padding: 0px 0px 0px 14px; width: 40px; height: 40px">
                                                                <div class="icon-container purple">
                                                                        <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                                                                </div>
                                                        </div>
                                                        <div class="col-xs-3" style="padding: 0px 5px 0px 5px; margin-left: 15px">
                                                                <div class="row" style="margin-left: 0;">
                                                                        <div class="col-md-12" style="height: 15px; font-size: 14px; margin: 0px 0px 3px 0px; padding-left: 0px">
                                                                                统计
                                                                        </div>
                                                                        <div class="col-md-12" style="height: 25px; margin: 0px 0px 3px 0px; padding-left: 0px">
                                                                                <div class="btn-group" style="height: 25px">
                                                                                        <button type="button" class="btn btn-default dropdown-toggle btn-dropdown" style="height: 25px" data-toggle="dropdown" aria-haspopup="true"
                                                                                                aria-expanded="false">
                                                                                                <b style="height: 25px; font-size: 18px">{{ status.item === 'all' ? '全校评选' : '我系评选' }}</b>
                                                                                                <span class="caret" style="padding-bottom: 4px"></span>
                                                                                        </button>
                                                                                        <ul class="dropdown-menu">
                                                                                                <li>
                                                                                                <a @click="reload({ item: 'project-detail', params: {item: 'all'}})">全校评选</a>
                                                                                                </li>
                                                                                                <li>
                                                                                                <a @click="reload({ item: 'project-detail', params: {item: 'my'}})">我系评选</a>
                                                                                                </li>
                                                                                        </ul>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                 </div>
                                         </div>
                                         <div class="col-md-8" style="margin-top: 5px; text-align: right; ">
                                                 <form class="form-inline" @submit.prevent="filter">
                                                         <div class="form-group form-group-sm">
                                                                 <div class="form-group">
                                                                        <select class="form-control" ref="caok" v-model="filterParams.project">
                                                                                <option disabled selected>分类</option>
                                                                                <option v-for="item in project_list" :key="item.id" :value="item.id">{{ item.name }}</option>
                                                                        </select>
                                                                </div>
                                                         </div>
                                                        <div class="form-group">
                                                                <select class="form-control" ref="sales_manager" v-model="filterParams.period">
                                                                        <option disabled selected>届</option>
                                                                        <option v-for="p in period" :value="p" :key="p">{{ p}}</option>
                                                                </select>
                                                        </div>
                                                         <div class="form-group">
                                                                <select class="form-control" ref="sales_manager" v-model="filterParams.department">
                                                                        <option disabled selected>专业</option>
                                                                        <option v-for="d in department_list" :value="d.id" :key="d.id" v-if="d.name !=='<无>'">{{ d.name }}</option>
                                                                </select>
                                                        </div>
                                                        <div class="form-group">
                                                                <div class="btn-group">
                                                                        <button type="submit" class="btn btn-sm btn-default btn-roundedrectangle btn-left">
                                                                        <span class="glyphicon glyphicon-filter"></span>过滤</button>
                                                                        <button type="reset" class="btn btn-sm btn-default btn-roundedrectangle btn-right" @click="reset">
                                                                        <span class="glyphicon glyphicon-glass"></span>还原</button>
                                                                </div>
                                                        </div>
                                                         <div class="form-group">
                                                                <a class="btn btn-sm btn-default btn-roundedrectangle" @click="exportExcel">
                                                                <span class="glyphicon glyphicon-export"></span>
                                                                导出</a>
                                                        </div>
                                                 </form>
                                         </div>
                                </div>
                                <div class="row content-comment">
                                        <table class="table">
                                                <thead>
                                                        <tr>
                                                                <th>项目名</th>
                                                                <th>类别</th>
                                                                <th>专业</th>
                                                                <th>班级</th>
                                                                <th>名额</th>
                                                                <th>期限</th>
                                                                <th>辅导员</th>
                                                                <th>评结果</th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                        <tr v-for="item in project_detail_list" :key="item.id">
                                                                <td>{{item.name}}</td>
                                                                <td>{{item.project.name}}</td>
                                                                <td>{{item.department.name}}</td>
                                                                <td>{{item.class.name}}</td>
                                                                <td>{{item.places}}</td>
                                                                <td>{{item.expiration}}</td>
                                                                <td>{{item.counselor}}</td>
                                                                <td>
                                                                        <div class="btn-group">
                                                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                &nbsp; &nbsp; <span class="caret"></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                        <li v-for="li in item.result" :key="li">{{li}}</li>
                                                                                </ul>
                                                                        </div>
                                                                </td>
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

import Spinner from './Spinner.vue'
import util from '../util'
import { config } from '../store/config'

export default {
        name:'Statistics',
        data: () => ({
                loading: false,
                filterParams:{},
                period:[],
        }),
        computed:{
                ...mapGetters('statistics',{
                        item:'item',
                        project_detail_list: 'project_detail_list',
                        project_list: 'project_list',
                        class_list: 'class_list',
                        department_list:"department_list",
                        status:'status',
                })
        },
        methods:{
                ...mapActions('statistics',{
                        reload: 'reload'
                }),

                reloadALL(){
                        this.reload({item: 'project', params: {}})
                        this.reload({item: 'department', params: {}})
                        this.reload({item: 'class', params: {}})
                        this.reload({item:'project-detail', params:{item:status.customerOption}})
                                .then(res => {
                                        this.loading = false    
                                })
                                .catch(e => {
                                        console.log(e)
                                })
                },
                exportExcel(){
                        if (this.status.item === 'all'){
                                
                        }
                        let params = ''
                        for (var i in this.filterParams){
                                params = params + '&' + i.toString() + '=' + this.filterParams[i]
                        }
                        let  url = `${config.url.baseUrl}/stat?item=all`+ params + '&download=true'
                        window.open(url)
                },
                filter(){
                        this.reload({item: 'project-detail', params: Object.assign({item: this.item}, this.filterParams)})
                        //this.filterParams = {}
                },
                reset(){
                        this.filterParams = {}
                        this.reload({ item: 'project-detail', params: {item: this.item}})
                }
        },


        created (){
                this.me = JSON.parse(this.$cookie.get('me'))
                
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
.form-group {
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
.sales-selector {
  height: 20px !important;
  width: 100px;
}
.btn-group{
  vertical-align: top!important;
}
</style>