# forEach修改数组值问题

```js
let a = [1, 2, 3];
let b = [{num: 1}, {num: 2}, {num: 3}];
a.forEach(item => item = 0); // a = [1, 2, 3]
b.forEach(item => item.num = 0); // b = [{num: 0}, {num: 0}, {num: 0}]
```

forEach的回调函数中的第一个参数 correntValue 是按值传递的，
也就是说原始类型（undefined, null, boolean, number, string, symbol）是复制了一份值，
引用类型是把引用复制下来传递进去（指向不变），
所以会出现上面的情况

## 解决方案：

forEach的回调函数中第三个参数 array 是对正在操作数组的引用，利用 array 可直接修改原始数组

```js
let a = [1, 2, 3];
a.forEach((item ,index, array) => array[index] = 0); // a = [0, 0, 0]
```

## 补充
forEach 不能通过 return 语句跳出循环

## 参考：
[Array.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)