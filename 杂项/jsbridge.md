# JSBridge

核心代码参考如下：

```js
let p

function setup(callback) {
  // WKWebViewJavascriptBridge 是 IOS 里最新的高性能容器
  if (window.WKWebViewJavascriptBridge) {
    return callback(WKWebViewJavascriptBridge)
  }
  if (window.WKWVJBCallbacks) {
    return window.WKWVJBCallbacks.push(callback)
  }
  if (window.webkit) {
    // iOS_Native_InjectJavascript 是原生自定义的对象
    window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
    window.WKWVJBCallbacks = [callback]
  }
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      () => callback(window.WebViewJavascriptBridge),
      false
    )
  }
}

function ready() {
  return p || p = new Promise((resolve) => {
    setup(bridge => {
      // 安卓需要调用 init 方法
      if (bridge.hasOwnProperty('init')) {
        bridge.init(() => resolve(bridge))
      }
      resolve(bridge)
    })
  })
}

// JS 调用原生方法
function callHandler(fnName, params, callback) {
  ready().then(bridge => bridge.callHandler(fnName, params, callback))
}

// JS 注册方法供原生调用
function registerHandler(fnName, callback) {
  ready().then(bridge => bridge.registerHandler(fnName, (data, responseCallback) => {
    callback(data, responseCallback)
  }))
}

```
