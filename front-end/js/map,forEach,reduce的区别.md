# map, forEach, reduce的区别

## map

map() 方法创建一个新数组，其结果是该数组中每个元素都调用一个提供的函数后返回的结果。
```js
let numbers = [1, 5, 10, 15];
let dobles = numbers.map(x => {
    return x * 2;
});

// dobles is now [2, 10, 20, 30];
// numbers is still [1, 5, 10, 15];
```
map 不修改调用它的原数组本身（当然也可以在 callback 执行时改变原数组）,
使用 map 方法处理数组时，数组元素的范围是在 callback 方法第一次调用就已经确定了。
在 map 方法执行的过程中：原数组中新增加的元素将不会被 callback 访问到；
若已经存在的元素被改变或删除了，则它们的传递到 callback 的值是 map 方法遍历到它们
那一刻的值；而被删除的元素将不会被访问到。

## forEach

forEach() 方法对数组的每个元素执行一次提供的函数
```js
let a = ['a', 'b', 'c'];
a.forEach(element => {
    console.log(element);
});

// a
// b
// c
```
forEach 遍历的范围在第一次调用 callback 前就会确定。调用forEach 后添加到数组中的项
不会被 callback 访问到。如果已经存在的值被改变，则传递给 callback 的值是 forEach 遍
历到他们那一刻的值。已删除的项不会被遍历到。

forEach() 为每个数组元素执行 callback 函数；不像 map() 或者 reduce(),
它总是返回 undefined 值，并且不可链式调用。

没有办法中止或者跳出 forEach 循环，除了抛出一个异常。若想中止，你可以用一个简单的循环代替。

## reduce

reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
```js
let total = [0, 1, 2, 3].reduce((sum, value) => {
    return sum + value;
}, 0);
// total is 6

let flattened = [[0, 1], [2, 3], [4, 5]].reduce((a, b) => {
    return a.concat(b);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]
```

参考：
[map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
[forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
[reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
