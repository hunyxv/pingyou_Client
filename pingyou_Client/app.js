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

var numUsers = 0;
let headerUrl = [
        'http://bpic.588ku.com/element_origin_min_pic/01/36/33/28573c10f97f97f.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/55/09/6357474dbf2409c.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/55/09/4857474d9d13c31.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/37/09/22573c3a831082c.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/31/87/96573b585a7c9c4.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/55/09/6257474dbc567d0.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/88/79/5157555d24aff47.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/01/37/59/65573c55d41f5fd.jpg '
];

io.sockets.on('connection', (socket) => {
        let addedUser = false;
        console.log('连接上sockets');
        // 通知客户端连接成功
        socket.emit('commectionSuccess', {
                numUsers: numUser
        });
        // 监听有新消息
        onSocket(socket, 'createMessage', (...arg) => {
                console.log('create messages')
                let messages = arg[0];
                let time = new Date()
                socket.broadcast.emit('messageAdded', {
                        userInfo: socket.userInfo,
                        messages: messages,
                        time: time.toLocaleString
                })
        });

        //监听所有新用户加入
        onSocket(socket, 'addUser', ())
})
