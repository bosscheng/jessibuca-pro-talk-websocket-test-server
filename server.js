const WebSocket = require('ws');

const port = 8080;

// 创建 WebSocket 服务器，监听 8080 端口
const wss = new WebSocket.Server({ port: port });

// 当有新的连接建立时
wss.on('connection', function connection(ws) {
    console.log('新的客户端已连接');

    // 监听客户端发送的消息
    ws.on('message', function incoming(message) {
        // 检查消息是否为二进制数据
        if (Buffer.isBuffer(message)) {
            console.log('收到二进制数据，长度:', message.length);
            // 转换为十六进制字符串
            const hexString = message.toString('hex');
            console.log('十六进制表示:', hexString);
            // 直接转发二进制数据
            ws.send(message);
        } else {
            console.log('收到文本消息:', message.toString());
            ws.send(message);
        }
    });

    // 监听连接关闭
    ws.on('close', function close() {
        console.log('客户端已断开连接');
    });

    // 发送欢迎消息
    ws.send('欢迎连接到 WebSocket 服务器！');
});

console.log(`WebSocket 服务器已启动，监听端口 ${port}`);
