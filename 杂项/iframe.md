# iframe

## 通信
父页面
```html
<iframe src="./child.html" id="iframe" name="parentIframeName"></iframe>
```

- 父向子传数据
拿到子页面的 window，然后调用 postMessage
```js
const iframe = document.querySelector('#iframe')
const childWindow = iframe.contentWindow // 也可以通过 parentIframeName.window
// 向子页面发消息
childWindow.postMessage({name: 'parent message', age: 10}, '*')

// 能拿到子页面的window，可以做很多事，如：
// 调用子页面的方法
childWindow.childFunc('trigger child page function')
// 触发子页面按钮事件
childWindow.document.querySelector('#btn1').click()
```
子页面通过监听 message 事件，拿到父页面传过来的数据
```js
window.onmessage = e => {
  console.log('message from parent', e)
}
```

- 子向父
拿到父页面的 window，然后调用 postMessage
```js
// 有时需要通过 window.parent[0] 拿
window.parent.postMessage('message from child', '*')

// 能拿到父页面的window，可以做很多事，如：
// 调用父页面的事件
window.parent.parentFunc('trigger parent page function')
// 触发顶层页面按钮事件
window.parent.document.querySelector('#btn1').click()
```
子页面可以通过 `window.parent` 拿到直接父级 window，如果嵌套过深，可以通过 `window.top` 拿到顶层 window，就可以做一些你喜欢的事了

## 如何防止自己的页面被别人通过 iframe 的形式嵌入
见[这里](./一些请求头.md)
