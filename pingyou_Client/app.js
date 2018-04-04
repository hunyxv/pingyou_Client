const express = require('express');
const app = express();
const path = require('path');
const isDebug = process.env.NODE_EVN === 'production'
const port = process.env.POST || 3000

app.use(express.static(path.join(__dirname, 'dist')))

if(!isDebug){
        app.use((req,res) => {
                res.sendFile(path.join(__dirname, 'dist/index.html'))
        })
}

const server = app.listen(port, () => {
        console.log(`mySocket is on port: ${port}!`)
})

// socket 相关代码
const io = require('socket.io').listen(server)

// 房间用户名单
var roomInfo = {};
var numUsers = {};

let headerUrl = [
        'http://bpic.588ku.com/element_origin_min_pic/01/36/33/28573c10f97f97f.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/55/09/6357474dbf2409c.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/55/09/4857474d9d13c31.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/37/09/22573c3a831082c.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/31/87/96573b585a7c9c4.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/55/09/6257474dbc567d0.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/88/79/5157555d24aff47.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/37/59/65573c55d41f5fd.jpg ',
        'http://www.sucaijishi.com/uploadfile/2014/0524/20140524012042475.jpg',//9
        'http://www.sucaijishi.com/uploadfile/2014/0524/20140524012043687.gif',
        'http://www.sucaijishi.com/uploadfile/2014/0524/20140524012044632.jpg',
        'http://www.sucaijishi.com/uploadfile/2014/0524/20140524012047254.png',
        'http://www.sucaijishi.com/uploadfile/2016/0203/20160203022637651.gif',
        'http://www.sucaijishi.com/uploadfile/2016/0203/20160203022635285.png',
        'http://www.sucaijishi.com/uploadfile/2016/0203/20160203022636507.png',
        'http://www.sucaijishi.com/uploadfile/2016/0203/20160203022632945.png'
];

io.sockets.on('connection', (socket) => {
        var roomID = 0;
        var user = '';

        onSocket(socket, 'join', (...args) => {
                user = {
                        name: args[0].name,
                        head: headerUrl[Math.floor(Math.random()*16 )]
                };
                roomID = args[0].roomID
                // 将用户加入到房间名单中
                if (!roomInfo[roomID]){
                        roomInfo[roomID] = [];
                        numUsers[roomID] = 0;
                }
                roomInfo[roomID].push(user);
                // 加入房间
                socket.join(roomID);
                ++numUsers[roomID]
                // 通知房间内的人
                io.sockets.to(roomID).emit('commectionRoomSuccess', {numUser:numUsers[roomID], userInfo: user}, roomInfo[roomID])
                console.log( user.name + '加入'+ roomID)
        });

        onSocket(socket, 'leave', () => {
                socket.emit('disconnect');
        });

        onSocket(socket, 'disconnect', () => {
                let index = roomInfo[roomID].indexOf(user);
                if (index != -1){
                        roomInfo[roomID].splice(index, 1);
                }
                // 退出房间
                socket.leave(roomID);
                numUsers[roomID] = numUsers[roomID]-1
                io.sockets.to(roomID).emit('userLeave', {numUser:numUsers[roomID], userInfo: user}, roomInfo[roomID]);
                console.log(user.name + '退出了' + roomID);
        });

        // 接收 用户消息， 广播给同房间的客户端
        onSocket(socket, 'messageSend', (...arg) => {
                // 验证 如果用户不在房间内则不广播
                let msg = arg[0];
                if (roomInfo[roomID].indexOf(user) === -1){
                        return false;
                }
                io.sockets.to(roomID).emit('messageReceive',  msg, roomInfo[roomID]);
        });

})

function onSocket(socket, eventName, fn){
        socket.on(eventName, (...arg) => {
                let len = arg.length;
                let lastArg = arg[len - 1];

                fn(...arg);

                if (len > 1 && isFunction(lastArg)){
                        lastArg();
                }
        })
}

function isFunction(arg){
        return typeof arg === 'function';
}
