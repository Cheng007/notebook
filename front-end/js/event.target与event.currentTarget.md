# `Event.target` 与 `Event.currentTarget`

简单来说 `Event.target` 指向事件触发的元素， `Event.currentTarget`总是指向事件绑定的元素

```js
function hide(e) {
  e.currentTarget.style.visibility = "hidden";
  console.log(e.currentTarget);
  // 该函数用作事件处理器时：this === e.currentTarget
}

var ps = document.getElementsByTagName("p");

for (var i = 0; i < ps.length; i++) {
  // console: 打印被点击的 p 元素
  ps[i].addEventListener("click", hide, false);
}
// console: 打印 body 元素
document.body.addEventListener("click", hide, false);
```

`event.currentTarget` 的值只能在事件处理过程中被使用。如果你尝试用 `console.log()` 在控制台打印 `event` 对象，你会发现 `currentTarget` 的值是 null。如果你想在控制台打印 `currentTarget` 的值，你应该使用 `console.log(event.currentTarget)`，或者也可以在代码中使用 debugger 语句来暂停代码的执行从而看到 `event.currentTarget` 的值。
