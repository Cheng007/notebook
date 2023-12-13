# Service Worker
在 Chrome 中，请访问 chrome://inspect/#service-workers，然后单击注册的服务工作线程下面的“inspect”链接，可以查看 service-worker 正在执行的各种操作的日志记录

注册使用：
```js
try {
  // sw.js 里是 service worker 的执行代码
  const registration = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
  let serviceWorker
  if (registration.installing) {
    console.log('正在安装 Service worker')
    serviceWorker = registration.installing;
  } else if (registration.waiting) {
    serviceWorker = registration.waiting;
    console.log('已安装 service worker')
  } else if (registration.active) {
    serviceWorker = registration.active;
    console.log('激活service worker')
  }

  if (serviceWorker) {
    console.log('state', serviceWorker.state)
    serviceWorker.addEventListener("statechange", (e) => {
      console.log('statechange', e.target.state);
    });
  }
} catch (e) {
  console.error('注册失败', e)
}
```

## 和 web worker 区别
serviceWorker 和 webWorker 都是运行在浏览器中的JavaScript线程，但它们有不同的用途和使用方式：
- 用途：
serviceWorker 用于在后台进行长时间运行的任务，如缓存数据、离线访问、推送通知等。它主要用于改善Web应用的性能和体验。
webWorker 用于执行耗时的计算任务，如大量数据的排序、图像处理等。它的主要作用是提高页面的响应性，防止主线程阻塞。

- 生命周期：
serviceWorker 具有一种独立的生命周期，它能够在Web应用关闭后继续在后台运行，并且可以在需要时被唤醒和更新。
webWorker 的生命周期与页面生命周期紧密相关，它会随着页面的加载和关闭而创建和销毁。

- 使用方式：
serviceWorker 使用 Service Worker API进行注册和管理。它可以拦截和处理来自浏览器的请求，并可以通过缓存和其他技术提供离线访问能力。
webWorker 通过创建一个新的JavaScript文件，并使用 Worker API 进行加载和管理。它可以在后台线程中执行指定的任务，并通过消息传递与主线程进行通信。

## web worker 使用示例：
```js
 // 创建一个Web worker对象
  const worker = new Worker('worker.js');

  // 接收Web worker发送的消息
  worker.onmessage = function(event) {
    console.log('Message from web worker:', event.data);
  };

  // 向Web worker发送消息
  worker.postMessage('Hello from main thread!');
```
接下来，需要创建一个 `worker.js` 文件，此文件将在Web worker中运行。在该文件中，可以使用self(或直接省略)对象来接收和发送消息。
```js
// 接收来自主线程的消息
self.onmessage = function(event) {
  console.log('Message from main thread:', event.data);

  // 向主线程发送消息
  self.postMessage('Hello from web worker!');
};
```

## shared worker
它提供了在多个浏览器窗口或者标签之间共享一个工作线程的能力。
Web Worker是在浏览器后台运行的脚本，可以在独立的线程中执行，而不会影响主线程的性能。
而SharedWorker则可以被多个浏览器窗口或者标签共享，可以实现跨浏览器共享数据和通信。
```js
// 创建SharedWorker
const worker = new SharedWorker('worker.js');
// 连接到 SharedWorker
worker.port.addEventListener('message', function(e) {
  console.log('Received message from SharedWorker: ', e.data);
});
worker.port.start();

// 向sharedworker中发送消息
worker.port.postMessage("Hello, SharedWorker!");
```

`worker.js`文件
```js
onconnect = function(e) {
  const port = e.ports[0];

  port.addEventListener('message', function(e) {
    // 处理收到的消息
    console.log('Received message: ', e.data);
    
    // 发送消息给连接的窗口
    port.postMessage("Hello, Client!");
  });

  port.start();
};
```
