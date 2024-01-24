# SSE Server-Sent Events 服务端推送事件

严格说，`HTTP` 协议无法做到服务器主动推送消息。有一种变通的方法是，服务器向客户端声明接下来要发送的是流信息。

也就是说，发送的不是一次性的数据包，而是一个数据流，会连续不断地发送过来。这时，客户端不会关闭连接，会一直等着服务器发过来的新的数据流，视频播放就是这样的例子。本质上，这种通信就是以流信息的方式，完成一次用时很长的下载。

SSE 就是利用这种机制，使用流信息向浏览器推送信息。和 WebSocket 区别：

- SSE 使用 HTTP 协议，有跨域问题；WebSocket 是一个独立协议，没有跨域问题。
- SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
- SSE 默认支持断线重连，WebSocket 需要自己实现。
- SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
- SSE 支持自定义发送的消息类型。
- SSE 是单向通信，只能由服务器向浏览器发送，WebSocket 是全双工的

客户端可以通过 `EventSource` 来开启与服务器的连接，使用示例：
```js
const source = new EventSource('http://127.0.0.1:3001/api/sse');
source.onopen = (e) => console.log('open 连接已建立', e)
source.onmessage = (event) => {
  console.log(event);
  console.log('data', event.data)
};
source.onerror = (e) => console.log('error', e)

// 服务器自定义事件，通过 addEventListener 来监听
source.addEventListener('chengevent', e => {
  console.log('chengevent event', e)
})

// 关闭连接
// source.close()
```

服务端事件流是一个简单的文本数据流，文本应该使用 UTF-8 格式的编码。事件流中的消息由一对换行符(`\n\n`)分开。
以冒号开头的行为注释行，会被忽略。注释行可以用来防止连接超时，服务器可以定期发送一条消息注释行，以保持连接不断。
每条消息由一行或多行文字组成，格式如：`[field]: value\n`
规范中 field 可以取的值为：`event`, `data`, `id`, `retry`
- `event`: 服务器可以自定义事件名，默认是 message 事件
- `data`: 数据内容
- `id`: 每条数据编号，浏览器可以通过 `lastEventId` 读取这个值，浏览器再重联的时候会带上 `Last-Event-Id` 头字段
- `retry`: 指定浏览器重新发起连接的时间间隔，毫秒，整数，两种情况会导致浏览器重新发起连接：一种是时间间隔到期，二是由于网络错误等原因，导致连接出错。

参考代码：
```mjs
res.writeHead(200, {
  // 跨域
  "Access-Control-Allow-Origin": "*",
  // Content-Type MIME 必须指定为 text/event-stream
  "Content-Type": "text/event-stream",
  // http 模块会自动带上这个头
  // 'Transfer-Encoding': 'chunked',
})

res.write('retry: 10000\n')
res.write('id: msgid\n')
res.write('event: chengevent\n')

setInterval(() => {
  const d = { date: new Date().toLocaleTimeString() }
  res.write(`data: ${JSON.stringify(d)}\n\n`)
}, 2 * 1000)
```

## 参考
[Server-Sent Events 教程](https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)
[使用服务器发送事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events#event)
