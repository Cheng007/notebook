# `<script type="importmap">`

## 语法
```js
<script type="importmap">
  // JSON object defining import
</script>
```
不得指定 `src`、`async`、`nomodule`、`defer`、`crossorigin`、`integrity` 和 `referrerpolicy` 属性

## 示例
```js
<script type="importmap">
{
  "imports": {
    "module": "/path/to/module.js",
    "lodash-es": "https://unpkg.com/lodash-es",
  },
  "scopes": {
    "/my/page/": {
      "lodash-es": "https://unpkg.com/lodash-es@3.9.2/lodash.js"
    }
  }
}
</script>

<script type="module">
  // 会全量下载所有 lodash-es 方法对应的代码
  import { cloneDeep } from 'lodash-es'
</script>
```

`importmap` 用来指定模块映射，只有在真正使用时才会下载对应的模块

有时候，我们可能需要引入的不只是一个模块，而是一个文件夹里的很多模块，可以这么定义
```js
<script type="importmap">
{
  "imports": {
    "lodash/": "https://unpkg.com/lodash-es/"
  }
}
</script>
```
使用
```js
// 只会下载 cloneDeep.js 相关联的代码
import cloneDeep from 'lodash/cloneDeep'
```

有时候，我们在不同的页面可能需要用到不同版本的同一个模块，可以这么定义
```js
<script type="importmap">
{
  "imports": {
    "lodash": "/path/to/lodash.js"
  },
  "scopes": {
    "/my/page/": {
      "lodash": "/different/path/to/lodash.js"
    }
  }
}
</script>
```

在 `/my/page/` 这个页面，引入 `lodash` 的时候，其实是从 `/different/path/to/lodash.js` 引入
