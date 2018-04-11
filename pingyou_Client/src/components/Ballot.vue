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
                                <div class="panel-body project" v-if="!project_detail">
                                        <div class="dontproject">没有正在进行中的项目</div>
                                </div>
                                <div class="panel-body" v-if="project_detail">
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
                                                                         <td>创建时间：</td><td>{{ project_detail.create_date | mapTimestamp }}</td><td></td><td>有效期：</td><td>{{ project_detail.expiration }} 天</td>
                                                                         <td></td><td></td><td></td><td></td><td></td>
                                                                </tr>
                                                        </tbody>
                                                </table>
                                        </div>
                                        <div class="col-md-4">
                                                <div class="" style="max-width: 350px;" v-show="me.role ==='Monitor'">
                                                        <button type="button" class="btn btn-success btn-lg btn-block" ref="startballot" @click="startBallot(project_detail.id)">开始投票</button>
                                                        <button type="button" class="btn btn-danger btn-lg btn-block" ref="stopballot" @click="stopBallot(project_detail.id)">结束投票</button>
                                                </div>
                                                <div class="" style="max-width: 350px;" v-show="me.role !=='Monitor'">
                                                        <button type="button" class="btn btn-success btn-lg btn-block" disabled="">开始投票</button>
                                                        <button type="button" class="btn btn-danger btn-lg btn-block"  disabled="">结束投票</button>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
                <div class="">
                        <div class="col-md-8">
                                <div class="panel panel-primary">
                                        <div class="panel-body">
                                                <div  class="overlay" v-show="!canchat">
                                                        <div class="startchat" style="max-width: 400px;">
                                                                 <button type="button" class="btn btn-success btn-lg btn-block" @click="startChat()">进入讨论室</button>
                                                        </div>
                                                </div>
                                                <div class="col-md-12">
                                                        <div class="panel panel-default" v-show="canchat">
                                                                <a href="#">online:  <span class="badge">{{numUser}}</span></a>
                                                                <div class="panel-body">
                                                                        <div class="list-box row" ref="listBox">
                                                                                <slot>
                                                                                        <Message :user="userInfo" :message="item"  v-for="(item, index) in messages" :key="index" ref="messageList"/>
                                                                                </slot>
                                                                        </div>
                                                                </div>
                                                                <div class="input-box row">
                                                                        <form class="col-md-10 col-sm-8">
                                                                                <textarea class="form-control" row ="5" v-model="message" placeholder="Hi！" @keyup.enter="sendMessage(message)"></textarea>
                                                                        </form>
                                                                        <div class="col-md-2 btn-box col-sm-4">
                                                                                <button class="btn btn-primary btn-block" @click="sendMessage(message)">发送</button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div class="col-md-4">
                                <div class="panel panel-primary">
                                        <div class="panel-heading">
                                                投票栏
                                        </div>
                                        <div class="panel-body">
                                                <div class="col-md-12">
                                                        <div class="ballot" v-for="item in ballot_list" :key="item.id" style="position:relative;" @click="Ballot(item.id)">
                                                                <img src="/static/duigou.png" v-if="item.ballot_people.includes(me.s_id)" alt="" style=" width: 71px;height: 71px;position:absolute;">
                                                                {{item.people.name}}
                                                                <br>
                                                                票数: {{item.number}}
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
import Message from './Message.vue'
import util from '../util'
import { config } from '../store/config'

import io from 'socket.io-client'

export default {
        name: "Ballot",
        data: () => ({
                roomID:'',
                numUser:0,
                loading: false,
                canchat: false,
                message:'',
                messages: [],
                socket:'',
                userInfo:'',
                me: '',
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
                          updateBallot: 'updateBallot',
                          uploadMessage: 'uploadMessage'
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
                                        this.reload({ item: 'ballot', params: {pdid: this.project_detail.id} })
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
                        this.loading = true
                        // 结束后 改变项目状态为 2 待审核
                        this.changeProStatus({pdid: id, status: 2})
                                .then(res => {
                                        this.$refs.stopballot.setAttribute('disabled', true)
                                        this.reload({item: 'project_detail', params:{status:2}})
                                                .then(res => {
                                                        this.loading = false
                                                        // let create_date = new Date(this.project_detail.create_date * 1000)
                                                        // this.project_detail.create_date = create_date.toLocaleString()
                                                })
                                                .catch(e => {
                                                        console.log(e)
                                                })
                                        let messages_data = {pdid: id, messages: this.messages}
                                         // 保存聊天记录 发送到后端
                                        this.uploadMessage(messages_data)
                                                .then(res => {
                                                        alert(res.data.data.msg + '聊天记录已上传！')
                                                })
                                })
                                .catch(e => {
                                        console.log(e)
                                })
                },
                Ballot(id){
                        this.updateBallot(id)
                                .then(res => {
                                        this.reload({ item: 'ballot', params: {pdid: this.project_detail.id} })
                                        alert(res.data.data.msg)
                                })
                                .catch(e => {
                                        console.log(e)
                                })
                },

                 // 加入聊天室
                startChat(){
                        if(this.project_detail && this.project_detail.status === 1){
                                this.canchat = true
                                // 链接socket 
                                this.connectionSocket()
                                this.getNewMessage()
                                this.subscriptUserLeave()
                        }else{
                                alert('投票还没开始，等待班长开始投票。')
                        }
                },
                // 通知用户 xxx 加入聊天室
                 notification(userInfo){
                        if (window.Notification && Notification.permission !== 'denied'){
                                Notification.requestPermission(() => {
                                        new Notification(`${userInfo.name}~加入了聊天室`, { body: `系统通知！`, icon: userInfo.head });
                                })
                        } else {
                                new Notification(`${userInfo.name}~加入了聊天室`, { body: `系统通知！`, icon: userInfo.head });
                        }
                },
                // 链接 socket
                connectionSocket(){
                        let roomID = this.roomID
                        let name = this.me.name
                        const socketUrl = process.env.NODE_ENV === 'development'? 'http://127.0.0.1:3000': ''
                        const socket = io(socketUrl)
                        const vm = this;
                        console.log(process.env.NODE_ENV);
                        vm.socket  = socket;
                        // 加入房间
                        vm.socket.emit('join', {
                                name: name,  
                                roomID: roomID
                        });
                        // 加入房间成功的回调函数 通知客户端 xxx 加入房间
                        vm.socket.on('commectionRoomSuccess', (data) => {
                                this.numUser = data.numUser;
                                if (data.userInfo){
                                        vm.notification(data.userInfo)
                                        if (this.me.name === data.userInfo.name){
                                                this.userInfo = data.userInfo
                                        }
                                }
                        });
                },
                // 发送消息
                sendMessage(msg){
                        if (msg !== ''){
                                const vm = this;
                                const data = {
                                        head: vm.userInfo.head,
                                        name: vm.userInfo.name,
                                        message:msg,
                                }
                                vm.socket.emit('messageSend', data)
                        } else {
                                alert("You can't send nothing!")
                        }

                        this.message = ''
                },
                // 更新消息列表
                updateMessageFn(message){
                        const vm = this;
                        const len = vm.messages.length;
                        if (len > 2000) {
                                vm.messages.shift();
                        }
                        vm.messages.push(message)
                },
                pushNewMessage(newMessage){
                        const vm = this;
                        if(Array.isArray(newMessage)){
                                newMessage.forEach((item) => {
                                        vm.updateMessageFn(item)
                                }) 
                        } else {
                                vm.updateMessageFn(newMessage);
                        }
                        vm.setScrollTopToBottom();
                },
                // 每来一条新消息使滑动条处于最低端
                setScrollTopToBottom() {
                        const vm = this;
                        const $listBox = vm.$refs.listBox;
                        const top = $listBox && $listBox.scrollHeight || 0;
                        $listBox.scrollTop = top
                },
                // 接收消息
                getNewMessage(){
                        const vm = this;
                        vm.socket.on('messageReceive', (data) => {
                                vm.pushNewMessage(data)
                                setTimeout(vm.setScrollTopToBottom, 0)
                        })
                },
                // 用户离开 更新用户在线数量
                subscriptUserLeave() {
                        this.socket.on('userLeave', (data) => {
                                this.numUser = data.numUser;
                        })
                }
        },
          
          
        created (){
                this.me = JSON.parse(this.$cookie.get('me'))
                this.loading = true
                this.roomID =  Math.floor(this.me.s_id/100)%1000000
                this.reloadALL()
        },
        mounted(){
                window.onbeforeunload = function(event){    
                        return '您若关闭或刷新将丢失聊天记录！班长请确保项目结束后再关闭！'; 
                };
        },
        components: {
                Spinner,
                Message
        }
}
</script>

 <style lang="less">
.list-box {
        background: #eee;
        display: block;
        flex-direction: row;
        justify-content:flex-start;
        text-align:left;
        overflow-y: auto;
        overflow-x: hidden;
        height: 70vh;
};
.input-box {
        margin: auto;
        border-top:1px solid #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        overflow: hidden;
        height: 12vh;
        padding:5px 1px;
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
        float: left;
        margin: 10px 20px 10px 0;
        border: 2px solid;
        border-radius:10px;
        background-color: white;
}
 .overlay {
        background: #eee;
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        text-align:left;
        overflow-y: auto;
        height: 70vh;
}
.startchat, .dontproject{
        margin: auto;
}
.project{
        height: 150px;
}
</style>