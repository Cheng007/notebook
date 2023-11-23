```js
const later = (delay, value) =>
  new Promise((resolve) => setTimeout(resolve, delay, value));

// 示例1
later(3 * 1000, "a")
  .then((res) => {
    console.log(res);
    return later(4 * 1000, "b");
  })
  .then((res) => console.log(res));

// 示例2
later(3 * 1000, "a")
  .then((res) => {
    console.log(res);
    later(4 * 1000, "b");
  })
  .then((res) => console.log(res));

// 示例3
later(3 * 1000, "a")
  .then(later(4 * 1000, "b"))
  .then((res) => console.log(res));

// 示例4
later(3 * 1000, "a")
  .then(later)
  .then((res) => console.log(res));
```

## async 函数返回值

`async` 函数在抛出返回值时，会根据返回值类型开启不同数目的微任务（以下简称： `then` 的时间）
（说明：async 函数整体的返回值永远是 `promise`，无论值本身是什么，下面的 `return` 均指本身值类型）

- return 值： `promise`，需额外等待 2 个 `then` 的时间

```js
async function test() {
  return Promise.resolve();
}
test().then(() => console.log(1));
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
```

- return 值：`thenable`，需额外等待 1 个 `then` 的时间

```js
async function test() {
  return {
    then(cb) {
      cb();
    },
  };
}
test().then(() => console.log(1));
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
```

- return 值：其他情况无需额外等待

```js
async function test() {
  return 1;
}
test().then(() => console.log(1));
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
```

## await 右值类型区别

1. `await` 的是 `async` 函数，且返回值本身是 `Promise`，需等两个 `then` 的时间

2. `await` 的是 `thenable`，等待 1 个 then 的时间

```js
async function test() {
  console.log(1);
  await {
    then(cb) {
      cb();
    },
  };
  console.log(2);
}

test();
console.log(3);
Promise.resolve()
  .then(() => console.log(4))
  .then(() => console.log(5))
  .then(() => console.log(6))
  .then(() => console.log(7));
```

3. 其他情况，正常的等待时间

示例 1

```js
async function test() {
  console.log(1);
  await 1;
  console.log(2);
}

test();
console.log(3);
```

示例 2

```js
function func() {
  console.log(2);
}

async function test() {
  console.log(1);
  await func();
  console.log(3);
}

test();
console.log(4);
```

示例 3

```js
async function test() {
  console.log(1);
  await 123;
  console.log(2);
}

test();
console.log(3);

Promise.resolve()
  .then(() => console.log(4))
  .then(() => console.log(5))
  .then(() => console.log(6))
  .then(() => console.log(7));
```

示例 4

```js
async function test() {
  console.log(1);
  await new Promise((resolve) => resolve());
  console.log(2);
}

test();
console.log(3);

Promise.resolve()
  .then(() => console.log(4))
  .then(() => console.log(5))
  .then(() => console.log(6))
  .then(() => console.log(7));
```

## 习题

```js
async function async1() {
  await Promise.resolve();
  console.log("a");
}

async1();

new Promise((resolve) => {
  console.log("b");
  resolve();
})
  .then(() => console.log("c"))
  .then(() => console.log("d"))
  .then(() => console.log("e"));
```

```js
async function async1() {
  await async2();
  console.log("a");
}

async function async2() {
  return Promise.resolve();
}

async1();

new Promise((resolve) => {
  console.log("b");
  resolve();
})
  .then(() => console.log("c"))
  .then(() => console.log("d"))
  .then(() => console.log("e"));
```

```js
async function async2() {
  new Promise((resolve) => resolve());
}
async function async3() {
  return Promise.resolve();
}
async function async1() {
  // 方式一
  await Promise.resolve();

  // 方式二
  // await async2()

  // 方式三
  // await async3()

  console.log("A");
}

async1();

new Promise((resolve) => {
  console.log("B");
  resolve();
})
  .then(() => console.log("C"))
  .then(() => console.log("D"));
```

```js
function func() {
  console.log(2)

  // 方式一
  Promise.resolve()
    .then(() => console.log(5))
    .then(() => console.log(6))
    .then(() => console.log(7))

  // 方式二
  // return Promise.resolve()
  //   .then(() => console.log(5))
  //   .then(() => console.log(6))
  //   .then(() => console.log(7))
}

async function test() {
  console.log(1)
  await func()
  console.log(3)
}

test()
console.log(4)

new Promise((resolve) => {
  console.log('B')
  resolve()
})
.then(() => console.log('C'))
.then(() => console.log('D'))
```

```js
async function test() {
  console.log(1)
  await Promise.resolve()
    .then(() => console.log(5))
    .then(() => console.log(6))
    .then(() => console.log(7))
  console.log(3)
}
test()
console.log(4)
new Promise((resolve) => {
  console.log('B')
  resolve()
})
.then(() => console.log('C'))
.then(() => console.log('D'))
```

```js
async function func() {
  console.log(2)
  return {
    then (cb) { cb() }
  }
}
async function test() {
  console.log(1)
  await func()
  console.log(3)
}
test()
console.log(4)
new Promise((resolve) => {
  console.log('B')
  resolve()
})
.then(() => console.log('C'))
.then(() => console.log('D'))
```

```js
async function async1() {
  console.log("1");

  // async2().then(() => console.log('AAA')) 或者下面代码：
  await async2();
  console.log("AAA");
}

async function async2() {
  console.log("3");
  return new Promise((resolve) => {
    resolve();
    console.log("4");
  });
}

console.log("5");

setTimeout(() => {
  console.log("6");
}, 0);

async1();

new Promise((resolve) => {
  console.log("7");
  resolve();
})
  .then(() => console.log("8"))
  .then(() => console.log("9"))
  .then(() => console.log("10"));

console.log("11");
```

```js
Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(4)
  })
  .then(res => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })
```
