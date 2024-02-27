# js基础

## javascript 的 typeof 返回哪些数据类型？

js中有两大数据类型：

1. 基础类型
2. 引用类型

- 基础类型包括：Number, String, Boolean, Null, Undefined, Symbol（ES2015新增）, BigInt
- 引用类型包括：Object，typeof返回的类型和js定义的类型有细微差异。
typeof 返回的值有八种可能值：
number, string, object, boolean, undefined, symbol, function, bigint

示例如下：
```js
typeof '123'; // string
typeof 123; // number
typeof NaN; // number
typeof true; // boolean
typeof Boolean(''); // boolean， Boolean的参数是0, -0, null, false, NaN, undefined, ''为false，其它任何对象或字符串'false'都为true
typeof function a() {}; // function
typeof Object; // function， Object, Function, Boolean, String, Symbol, Number 均是 function 类型
typeof Null; // undefined
typeof new Function('a', 'b', 'return a + b'); // function
typeof new a(); // object
typeof [1, 2, 3]; // object
typeof null; // object
typeof { age: 1 }; // object
typeof undefined; // undefined
typeof Symbol(1); // symbol
```

## 请写出以下运算的结果：
```js
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof NaN);
console.log(NaN == undefined);
console.log(NaN == NaN);
var str = '123abc';
console.log(typeof str++);
console.log(str);
```

结果如下：
```js
console.log(typeof null); // object
console.log(typeof undefined); // undefined
console.log(typeof NaN); // number
console.log(NaN == undefined);

// false，NaN 与其它数值进行比较的结果总是不相等，包括它自身在内，因此
// 不能与 Number.NaN 比较与检测一个值是不是数字，而只能调用isNaN()来比较
console.log(NaN == NaN); 

var str = '123abc';
console.log(typeof str++); // number，因为str++ 为 NaN;
console.log(str); // NaN
```

## 数字
```js
11 // 11
.11 // 0.11
11. // 11
011 // 9，0 开头的为 8 进制数
080 // 9，0 开头的为 8 进制数，但超出范围了，还是按 10 进制处理
0o11 // 9，0o 开头的为 8 进制数
0o80 // Uncaught SyntaxError: Invalid or unexpected token，0o 开头的为 8 进制数，超出范围报错
0b11 // 3，0b 开头的为 2 进制数
0x11 // 17，0x 开头的位 16 进制数
11e2 // 1100，11 * (10 ** 2)
11.toString() // Uncaught SyntaxError: Invalid or unexpected token，(11.)toString()
11 .toString() // 11
```

## 例举至少 3 种强制类型转换和 2 种隐式类型转换
1. 强制类型转换：明确调用内置函数，强制把一种类型的值转换为另一种类型。强制类型转换的主要有：
Boolean, Number, String, parseInt, parseFloat

2. 隐匿类型转换：在使用算术运算符时，运算符两边的数据类型可以是任意的，比如，一个字符串可以和数字相加，
之所以不同的数据类型之间可以做运算，是因为 js 引擎在运算之前会悄悄的把他们进行了隐匿类型转换，
隐匿类型转换主要有：+、-、==、！

## js 的事件流模型都有什么

事件流包含三个阶段：
1. 事件捕获阶段，事件开始由顶层对象触发，然后逐级向下传播，直到目标元素；
2. 处理目标阶段，处在绑定事件的元素上；
3. 事件冒泡阶段，事件由具体的元素先接收，然后逐级向上传播，直到顶层元素；

## BOM 对象有哪些，列举 window 对象
- window 对象，是浏览器环境中 js 的最顶层对象，其它的 BOM 对象都是 window 对象的属性；
- location 对象，浏览器当前url信息；
- navigator 对象，浏览器本身信息
- screen 对象，客户端屏幕信息；
- history 对象，浏览器访问历史信息

## 简述 ajax 及基本步骤

AJAX即Asynchronous Javascript And XML(异步 JavaScript 和 XML)，是指一种创建交互式网页应用的网页开发技术。
通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下对网页的某部分进行更新。

AJAX 基本步骤：
1. 初使化 ajax 对象
2. 连接地址，准备数据
3. 发送请求
4. 接收数据（正在接收，尚未完成）
5. 接收数据完成

```js
var xhr = new XMLHttpRequest(); // 初使化 ajax 对象
xhr.open('method', 'url', 'async', 'user', 'password'); // 连接地址，准备数据
xhr.onload = function() { } // 接收数据完成触发的事件
xhr.send(); // 发送数据
```

## HTTP 状态码 200 302 304 403 404 500 分别表示什么

状态码分为五大类：
- 100-199 用于指定客户端相应的某些动作
- 200-299 表示请求成功
- 300-399 重定向
- 400-499 客户端错误
- 500-599 服务器错误

常见状态码：
- 200 OK
- 301 Moved Permanently 永久重定向
- 302 Move Temporarily 临时重定向
- 304 Not Modified 协商缓存
- 400 Bad Request 客户端请求报文中存在语法错误，服务器无法理解
- 403 Forbidden
- 404 Not Found
- 500 Internal Server Error
- 503 Service Unavailable 由于超载或系统维护，服务器暂时的无法处理客户端的请求

## new 操作符具体干了什么

1. 创建一个空的简单 JavaScript 对象（即`{}`）
2. 链接该对象（即设置该对象的构造函数）到另一个对象
3. 将步骤1新创建的对象作为this的上下文
4. 如果该函数没有返回对象，则返回`this`

```js
var Func = function() {};
var func = new Func();

// new 共经过4个阶段

// 1 创建一个空对象
var obj = {};
// 2 设置原型链
obj.__proto__ = Func.prototype; // 或 Object.setPrototypeOf(obj) = Func.prototype
// 3 让 Func 中的 this 指向 obj, 并执行 Func 的函数体
var result = Func.call(obj);
// 4 判断 Func 的返回值类型：
// 如果是值类型，返回 obj， 如果是引用类型，就返回这个引用类型的对象
if (typeof (result) == 'object') {
  func = result;
} else {
  func = obj;
}
```

## 原型、原型链

- 原型：一种实现对象继承的机制，它允许对象共享属性和方法。
每创建一个函数，函数上都有一个属性为 prototype，它的值是一个对象。 
这个对象的作用在于当使用函数创建实例的时候，那么这些实例都会共享原型上的属性和方法。
- 原型链：每个对象都有一个指向它的原型（prototype）对象的内部链接（proto）。这个原型对象又有自己的原型，
直到某个对象的原型为 null 为止（也就是不再有原型指向）。这种一级一级的链结构就称为原型链（prototype chain）。
当查找一个对象的属性时，JavaScript 会向上遍历原型链，直到找到给定名称的属性为止;到查找到达原型链的顶部（Object.prototype），
仍然没有找到指定的属性，就会返回 undefined

```js
var b = new Array(); // 或 var b = []
Array.prototype.constructor === Array;
b.constructor === Array;
b.__proto__ === Array.prototype; // __proto__用于指向创建它的构造函数的原型对象
Object.getPrototypeOf(b) === Array.prototype
```

## 原型的作用

之所以存在原型，是因为 JS 语言要实现面向对象，而原型是面向对象的实现手段之一。一个能支持面向对象的语言必须做到一点：
能判定一个实例的类型。在 JS 中，通过原型就可以知晓某个对象从属于哪个类型，换句话说，原型的存在避免了类型的丢失。

## 写出下列打印的结果

```js
var a = 10;
var a;
console.log(a);

var b = 10;
var b = undefined;
console.log(b);

function f1(a) {
  console.log(a);
  var a = 1;
  console.log(a);
  console.log(arguments[0])
}

function f2(a) {
  console.log(a);
  var a;
  console.log(a);
  console.log(arguments[0]);
}

f1(10);
f2(10);
```

结果如下：
```js
var a = 10;
var a;
console.log(a); // 10

var b = 10;
var b = undefined;
console.log(b); // undefined

function f1(a) {
  console.log(a); // 10
  var a = 1;
  console.log(a); // 1
  console.log(arguments[0]) // 1
}

function f2(a) {
  console.log(a); // 10
  var a;
  console.log(a); // 10
  console.log(arguments[0]); // 10
}

f1(10);
f2(10);
```
分析参考[这里](https://segmentfault.com/q/1010000007278354)

```js
function one(a, b, c) {
  console.log(one.length); // 3，形参的个数
}

function two(a, b, c) {
  console.log(arguments.length); // 0, 实参的个数
}

one();
two();
```

```js
(function() {
  var a = b = 5;
})();
console.log(a); // 报错，未定义
console.log(b); // 5，b为全局变量

(function() {
  a = b = 5;
})();
console.log(a); // 5
console.log(b); // 5
```

```js
var fullname ='John';
var obj ={
    fullname:'Colin',
    prop:{
        fullname:'Aurelio',
        getFullname:function(){
            return this.fullname;
        }
    }
};
console.log(obj.prop.getFullname()); // Aurelio
var test = obj.prop.getFullname;
console.log(test()); // John
console.log(test.call(obj)); // Colin
console.log(test.call(obj.prop)) // Aurelio
```

```js
function fun(n,o) {
  console.log(o)
  return {
    fun: function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,?,?,?
var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,?

// 结果如下：
function fun(n,o) {
  console.log(o);
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,0,0,0
var b = fun(0).fun(1).fun(2).fun(3);//undefined,0,1,2
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,0,1,1
```
分析参考[这里](http://www.cnblogs.com/xxcanghai/p/4991870.html)


```js
function Foo() {
  getName = function() {
    console.log(1);
  };
  return this;
}
Foo.getName = function() {
  console.log(2);
};
Foo.prototype.getName = function() {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}
// 写出以下的输出结果
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
(new Foo()).getName();


// 答案：
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
(new Foo()).getName(); // 3
```
分析参考[这里](http://www.cnblogs.com/xxcanghai/p/5189353.html)

```js
(function () {
  console.log(typeof arguments); // object，arguments是对象，伪数组，可用Array,prototype.slice.call(arguments)转换成数组
})();

var f = function g() {
  console.log(23);
}
typeof g(); 
// 会发生错误，function g() {console.log(23);} 是函数表达式，事实上只有一个名字，
// 不是一个函数声明，函数实际上是绑定到变量f,不是g

(function(x) {
  delete x;
  return x;
})(1); // 1，参数不可删除

(function f(f){
  console.log(typeof f()); // number
})(function(){ return 1; });

var foo = {  
  bar: function() { return this.baz; },  
  baz: 1
};
 
(function(){  
  console.log(typeof arguments[0]()); // foo.bar中的this指向为window
})(foo.bar);

var foo = {
  bar: function(){ return this.baz; },
  baz: 1
}
typeof (f = foo.bar)(); // undefined
```

```js
var y = 1, x = y = typeof x;
console.log(x);

// 重写上面就是：
var y;
var x;
y = 1;
y = typeof x;
x = y;
console.log(x);
```

```js
var f = (function f(){ return "1"; }, function g(){ return 2; })();
typeof f;

// 答案 number
// 逗号操作符行为：
var x = (1, 2, 3); // x = 3
// 当你有一系列的组合在一起，并由逗号分隔的表达式，它们从左到右进行计算，但只有最后一个表达式的结果保存，因此上述可改写为：
var f = (function g(){return 2;})();
typeof f;
```

```js
var x = 1;
if (function f(){}) {
  x += typeof f;
}
console.log(x);

// 难点 if 中的 function f(){} 要如何处理？
// 函数声明只能裸露于全局作用域下或位于函数体中。
// 从语法上讲，不能出现在块中，例如不能出现在 if,while,for语句中，因为块只能包含语句。
// 因此 if()中的f函数不能当做函数声明，而应当成表达式使用
// 可能在预编译阶段做了如下处理
// if(xxx = function() {})
// 因此我们是找不到 f 的
// 答案：1undefined;
```

```js
function t1(a) {
  a.name = 'wang';
}
function t2(a) {
  a = {name: 'li'}
}
b = {name: 'cheng'}

t2(b)
console.log(b)

t1(b)
console.log(b)


// 答案
t2(b)
console.log(b) // {name: 'cheng'}

t1(b)
console.log(b) // {name: 'wang'}
```

## 如何准确判断一个值是数组类型

使用 `Object.prototype.toString.call` 可能不准确
```js
let obj = {
  [Symbol.toStringTag]: 'Array'
}
Object.prototype.toString.call(obj) === '[object Array]' // true
```

使用 `instanceof` 可能不准确
```js
let obj = {}
Object.setPrototypeOf(obj, Array.prototype)
obj instanceof Array // true
```

准确的方案是使用 `Array.isArray`
```js
let obj = {
  [Symbol.toStringTag]: 'Array'
}
Object.setPrototypeOf(obj, Array.prototype)
Array.isArray(obj) // false
```

## `++a`和`a++`的区别
- ++a（前缀自增）：先将a的值加1，然后返回a的新值。
- a++（后缀自增）：先返回a的当前值，然后将a的值加1。
```js
let a = 1;
let b = ++a; // a现在是2，b也是2

let c = 1;
let d = c++; // c现在是2，但d是1
```
