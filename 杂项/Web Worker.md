# Web Worker

通过使用 Web Workers，Web 应用程序可以在独立于主线程的后台线程中，运行一个脚本操作。这样做的好处是可以在独立线程中执行费时的处理任务，从而允许主线程（通常是 UI 线程）不会因此被阻塞/放慢，你不能直接在 worker 线程中操纵 DOM 元素；或使用 window 对象中的某些方法和属性。大部分 window 对象的方法和属性是可以使用的，包括 WebSocket，主线程和 worker 线程相互之间使用 postMessage() 方法来发送信息，并且通过 onmessage 这个 event handler 来接收信息（传递的信息包含在 message 这个事件的data属性内) 。数据的交互方式为传递副本，而不是直接共享数据

除了专用 worker 之外，还有一些其他种类的 worker
- `Shared Workers` 可被不同的窗体的多个脚本运行，例如 IFrames 等，只要这些 workers 处于同一主域。共享 worker 比专用 worker 稍微复杂一点 — 脚本必须通过活动端口进行通讯

- `Service Workers` 一般作为 web 应用程序、浏览器和网络（如果可用）之间的代理服务。他们旨在（除开其他方面）创建有效的离线体验，拦截网络请求，以及根据网络是否可用采取合适的行动，更新驻留在服务器上的资源。他们还将允许访问推送通知和后台同步 API