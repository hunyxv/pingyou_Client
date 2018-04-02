<template>
         <div class="row">
                <div class="col-md-12" style="padding-boottom: 48%">
                        <spinner :show='loading'></spinner>
                        <nav class="navbar navbar-default">
                                <ol class="breadcrumb">
                                        <li>
                                                <a href="/home"> 投票 </a>
                                        </li>
                                        <li class="action">首页列表</li>
                                </ol>
                        </nav>
                </div>
                 <div class="col-md-12">
                        <div class="panel panel-primary">
                                <div class="panel-body">
                                        <div class="col-md-8">
                                                <table class="table table-striped">
                                                        <thead>

                                                        </thead>
                                                        <tbody>
                                                                <tr>
                                                                        <td>类型：</td><td>{{ project_detail.project.name }}</td><td></td><td>项目名：</td><td>{{ project_detail.name }}</td>
                                                                         <td>创建者：</td><td>{{ project_detail.counselor }}</td><td></td><td>状态：</td><td><span class="label label-info">{{ project_detail.status | mapProjectStatus }}</span></td>
                                                                </tr>
                                                                
                                                                 <tr>
                                                                         <td>专业：</td><td>{{ project_detail.department.name }}</td><td></td><td>班级：</td><td>{{ project_detail.class.name }}</td>
                                                                         <td>名额：</td><td>{{ project_detail.places }}</td><td></td><td>已申请人数：</td><td>{{ project_detail.participants.length }}</td>
                                                                </tr>
                                                                <tr>
                                                                         <td>创建时间：</td><td>{{ project_detail.create_date }}</td><td></td><td>有效期：</td><td>{{ project_detail.expiration }} 天</td>
                                                                         <td></td><td></td><td></td><td></td><td></td>
                                                                </tr>
                                                        </tbody>
                                                </table>
                                        </div>
                                        <div class="col-md-4">
                                                <div class="" style="max-width: 350px;">
                                                        <button type="button" class="btn btn-success btn-lg btn-block" ref="startballot" @click="startBallot(project_detail.id)">开始投票</button>
                                                        <button type="button" class="btn btn-danger btn-lg btn-block" ref="stopballot" @click="stopBallot(project_detail.id)">结束投票</button>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
                <div class="">
                        <div class="col-md-8">
                                <div class="panel panel-primary">
                                        <div class="panel-body">
                                                <div class="col-md-12">
                                                        <div class="panel panel-default">
                                                                <div class="panel-body">
                                                                        <div class="list-box row">
                                                                                <slot>

                                                                                </slot>
                                                                        </div>
                                                                </div>
                                                                <div class="input-box row">
                                                                        <form class="col-md-10 col-sm-8">
                                                                                <textarea class="form-control" row ="10" v-model="message" placeholder="Hi！"></textarea>
                                                                        </form>
                                                                        <div class="col-md-2 btn-box col-sm-4">
                                                                                <button class="btn btn-primary btn-block" >发送</button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="col-md-4">
                                <div class="panel panel-primary">
                                        <div class="panel-body">
                                                <div class="col-md-12">
                                                        <div class="ballot">

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
import { get } from '../api'

import Spinner from './Spinner.vue'
import util from '../util'
import { config } from '../store/config'

export default {
        
   name: "Ballot",
        data: () => ({
                loading: false,
        }),
         computed:{
                ...mapGetters('ballot',{
                        project_detail: 'project_detail',
                        ballot_list: 'ballot_list'
                })
         },
          methods: {
                  ...mapActions('ballot',{
                          reload: 'reload',
                          changeProStatus: 'changeProStatus',
                  }),
                reloadALL (){
                        this.reload({item: 'project_detail', params:{status:0}})
                                .then(res => {
                                        this.loading = false
                                        // let create_date = new Date(this.project_detail.create_date * 1000)
                                        // this.project_detail.create_date = create_date.toLocaleString()
                                        if (this.project_detail.status  >  0){
                                                this.$refs.startballot.setAttribute('disabled', true)
                                        }
                                         if (this.project_detail.status  >  2){
                                                this.$refs.stopballot.setAttribute('disabled', true)
                                        }
                                })
                },
                startBallot(id){
                        this.loading = true
                        this.changeProStatus({pdid: id, status: 1})
                                .then(res => {
                                        this.$refs.startballot.setAttribute('disabled', true)
                                        this.reload({item: 'project_detail', params:{status:0}})
                                                .then(res => {
                                                        this.loading = false
                                                        // let create_date = new Date(this.project_detail.create_date * 1000)
                                                        // this.project_detail.create_date = create_date.toLocaleString()
                                                })
                                })
                                .catch(e => {
                                        console.log(e)
                                })
                },
                 stopBallot(id){

                 },
          },
          
          
        created (){
                this.me = JSON.parse(this.$cookie.get('me'))
                this.loading = true
                this.reloadALL()
        },
        components: {
                Spinner,
        }
}
</script>

 <style lang="less">
.list-box {
        background: #eee;
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        text-align:left;
        overflow-y: auto;
        height: 70vh;
};
.input-box {
  border-top:1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd;
  overflow: hidden;
  height: 12vh;
  padding:5px 0;
  box-sizing: border-box;
  textarea {
    height: 75px;
    resize: none;
  }
  .btn-box {
    text-align: center;
    margin-top: 6px;
    button {
      height: 50px;
      font-size: 25px;
    }
  }
}
@media (min-width: 320px) and (max-width: 550px) {
  .input-box {
    textarea {
      height: 30px;
    }
    .btn-box {
      button {
        font-size:16px;
        height: 50px;
      }
    }
  }
}
.ballot{
        width: 75px;
        height: 75px;
        background-color: green;
}
</style>