# ts 访问越界字符串下标返回值类型问题

有如下 ts 代码：

```typescript
const str = ''
function getChar(index) {
  return str[index]
}
const b = getChar(2)
// ts给出的 b 的类型是 string，但此时 b 的值明显为 undefined
```

上面代码中 ts 给出的 `b` 的类型是 `string`，但此时 `b` 的值明显为 `undefined`

![ts 访问越界字符串下标返回值类型问题](./img/ts%20访问越界字符串下标类型问题.png)

暂时不知道是什么原因导致 ts 会这么提示 `b` 的类型

## 暂时解决办法

手动指明返回值可能为 `undefined`：

```ts
const str = ''
function getChar(index: number): string | undefined {
  return str[index]
}
const b = getChar(2)
```
