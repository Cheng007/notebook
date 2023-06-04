# this相关
当前执行上下文（global、function 或 eval）的一个属性，优先级从高到底如下：

## 箭头函数

箭头函数没有自己的 `this` 对象，内部的 `this` 指向是固定的，就是定义时上层作用域（函数作用域、全局作用域）中的 `this`

## new

当使用new 关键字调用函数时，函数中的this一定是js创建的新对象。

## bind

多次bind时只认第一次bind的值
```js
function func() {
  console.log(this)
}

func.bind(1).bind(2)() // 1
```

箭头函数中的this不会被修改
```js
func = () => {
  // 这里 this 指向取决于外层 this
  console.log(this)
}

func.bind(1)() // Window
```

bind 与 new
```js
function func() {
  console.log(this, this.__proto__ === func.prototype)
}

boundFunc = func.bind(1)
new boundFunc() // Object true, new优先
```

## apply 和 call

apply() 和 call() 的第一个参数都是 this，区别在于通过 apply 调用时实参是放到数组中的，而通过 call 调用时实参是逗号分隔的

箭头函数中的this不会被修改
```js
func = () => {
  // 这里 this 指向取决于外层 this
  console.log(this)
}

func.apply(1) // Window
```

bind 函数中的this不会被修改
```js
function func() {
  console.log(this)
}

func.bind(1).apply(2) // 1，bind优先
```

## obj.
```js
function func() {
  console.log(this.x)
}

obj = { x: 1 }
obj.func = func
obj.func() // 1
```

## 直接调用
在函数不满足前面的场景，被直接调用时，this 将指向全局对象。在浏览器环境中全局对象是 Window，在 Node.js 环境中是 Global，严格模式下为undefined

```js
function func() {
  console.log(this)
}

func() // Window
```

```js
function outerFunc() {
  console.log(this) // { x: 1 }

  function func() {
    console.log(this) // Window
  }

  func()
}

outerFunc.bind({ x: 1 })()
```

# this 判断练习

```js
var fn1 = () => console.log('fn1', this)
var obj = {
  fn1,
  ofn1() {
    fn1()
  },
  ofn2() {
    const f = () => console.log('ofn2', this)
    f()
  },
  p1: {
    pp1: () => console.log('pp1', this),
    pp2() { console.log('pp2', this) }
  },
}

fn1()
obj.fn1()

obj.ofn1()
obj.ofn2()

obj.p1.pp1()
obj.p1.pp2()

var temp1 = obj.p1
var temp2 = obj.p1.pp1
var temp3 = obj.p1.pp2
temp1.pp1()
temp1.pp2()
temp2()
temp3()
```

```js
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
// 42
```

```js
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);

// s1: 3
// s2: 0
// window.s2 为 NaN
```
