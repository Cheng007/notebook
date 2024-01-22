在早期 node 的实现方式是 CommonJs，里面提供了如`require`, `exports`, `module.exports`, `__filename`, `__dirname`等全局变量，但这些在 ES Modules 环境均是没有的，`require`, `exports`, `module.exports` 在 ES Modules 中基本对应着 `import`, `export`, `export default`。

那么如何实现 `__filename`, `__dirname` 呢，可以参考如下

```mjs
import fs from 'node:fs'
import path from 'node:path'

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename)
```

`__filename` 表示当前文件所在路径
`__dirname` 表示当前文件所在文件夹的路径
