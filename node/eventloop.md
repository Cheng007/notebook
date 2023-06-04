# node 事件循环

官方说的六个阶段：

1. timers
`setTimeout`和`setInterval` 回调执行阶段
```js
setTimeout(() => {     
  console.log('Hello world') // 这一行在 timer 阶段执行   
}, 1000)
```

2. pending callbacks
执行延迟到下一个循环迭代的 I/O 回调，此阶段对某些系统操作（如 TCP 错误类型）执行回调

3. idle, prepare
仅系统内部使用

4. poll
检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 `setImmediate()` 调度的之外），
其余情况 node 将在适当的时候在此阻塞

5. check
`setImmediate` 回调执行阶段
```js
setImmediate(() => {     
  console.log('Hello world') // 这一行在 check 阶段执行   
})
```
6. close callbacks

## `setImmediate()` 对比 `setTimeout()`
如果`setImmediate()`是在 I/O 周期内被调度的，那它将会在其中任何的定时器之前执行

## `process.nextTick()`
`process.nextTick()`不是事件循环的一部分，传递到 process.nextTick() 的回调将在事件循环继续之前执行
使用场景：
1. 回调事件同步变异步
2. 在下一个回调前插入事件

## `process.nextTick()` 对比 `setImmediate()`
`process.nextTick()` 比 `setImmediate()` 触发得更快，因为历史原因，混淆的名字保留了下来


## 代码测试

```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
```
```js
// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

```js
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  testEventLoop()
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function testEventLoop() {
  console.log('=============')

  // Timer
  setTimeout(() => {
    console.log('Timer phase') 
    process.nextTick(() => {
      console.log('Timer phase - nextTick')
    })
    Promise.resolve().then(() => {
      console.log('Timer phase - promise')
    })
  });

  // Check
  setImmediate(() => {
    console.log('Check phase')
    process.nextTick(() => {
      console.log('Check phase - nextTick')
    })
    Promise.resolve().then(() => {
      console.log('Check phase - promise')
    })
  })

  // Poll
  console.log('Poll phase');
  process.nextTick(() => {
    console.log('Poll phase - nextTick')
  })
  Promise.resolve().then(() => {
    console.log('Poll phase - promise')
  })
}
```
